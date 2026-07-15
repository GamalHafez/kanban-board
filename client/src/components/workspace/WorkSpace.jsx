import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Column, EmptyWorkSpace } from "@components/workspace";
import { DialogPrimitive } from "@components/ui";
import { EditBoardForm } from "@components/board";
import DataContext from "@context/data-context";
import { calculateRows, EDIT_MODES, getDragData } from "@utils";
import { useContext, useState } from "react";
import { produce } from "immer";
import { getSelectedBoard } from "@/utils";

export function WorkSpace() {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 10 },
    }),
    useSensor(KeyboardSensor),
    useSensor(MouseSensor),
  );
  const { boards, setBoards, selectedBoardId } = useContext(DataContext);
  const [open, setOpen] = useState(false);
  const selectedBoard = getSelectedBoard(selectedBoardId, boards);

  const handleDragEnd = (e) => {
    const { active, over } = getDragData(e, selectedBoard);
    if (active.id === over.id) return;

    const setRows = active.setRows;
    setRows &&
      setRows((prev) => ({
        ...prev,
        title: calculateRows(active.task.title),
        desc: calculateRows(active.task.description, 26.5),
      }));

    // Handle reordering when dragging within the same column.
    if (active.colId === over.colId) {
      setBoards((prev) =>
        produce(prev, (draft) => {
          const board = getSelectedBoard(selectedBoardId, draft);
          const targetCol = board?.columns[active.colIdx];
          targetCol.tasks = arrayMove(targetCol.tasks, active.idx, over.idx);
        }),
      );
    }
  };

  const onDragOverHandler = (e) => {
    const { active, over } = getDragData(e, selectedBoard);
    if (!e.delta.x && !e.delta.y) return;

    /* While dragging, adapt the dragged task's row count to mimic the size
      of whatever task it's hovering over. This gives smoother visual slotting
      and prevents the layout from "jumping" as the placeholder shifts. */
    const setRows = active.setRows;
    setRows &&
      setRows((prev) => ({
        ...prev,
        title: over.rows.title,
        desc: over.rows.desc,
      }));

    // Handle moving a task between two different columns.
    if (active.colId !== over.colId) {
      setBoards((prev) =>
        produce(prev, (draft) => {
          const board = getSelectedBoard(selectedBoardId, draft);
          const cols = board?.columns;
          cols[over.colIdx]?.tasks.splice(over.idx, 0, active.task); // Insert the dragged task into the target column.
          cols[active.colIdx]?.tasks.splice(active.idx, 1); // Remove the task from its original column.
        }),
      );
    }
  };

  // Empty state: no boards exist
  if (!boards.length) return <EmptyWorkSpace />;
  // Empty state: invalid or missing board
  if (!selectedBoard) return <EmptyWorkSpace />;

  // Normal workspace (boards exist)
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragOver={onDragOverHandler}
    >
      <section className="bg-light-grey flex h-[calc(100vh-97px)] flex-1 gap-6 overflow-auto p-6">
        {selectedBoard?.columns?.map((column) => (
          <Column
            key={column.id}
            id={column.id}
            title={column.title}
            tasks={column.tasks}
          />
        ))}
        <DialogPrimitive
          title="Add new Column"
          description="Add a new column to organize your tasks."
          isOpen={open}
          setOpen={setOpen}
          triggerComponent={
            <button className="bg-lines-light text-heading-l text-medium-grey w-72 shrink-0 cursor-pointer self-start rounded-md p-3 font-bold">
              + New Column
            </button>
          }
        >
          <EditBoardForm
            selectedBoard={selectedBoard}
            setOpen={setOpen}
            editMode={EDIT_MODES.EDIT}
          />
        </DialogPrimitive>
      </section>
    </DndContext>
  );
}
