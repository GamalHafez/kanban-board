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
import {
  Column,
  DialogPrimitive,
  EditBoardForm,
  EmptyWorkSpace,
} from "@components";
import DataContext from "@context/data-context";
import { calculateRows, EDIT_MODES, getDragData } from "@utils";
import { useContext, useState } from "react";
import { produce } from "immer";

export function WorkSpace() {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 10 },
    }),
    useSensor(KeyboardSensor),
    useSensor(MouseSensor),
  );
  const { data, setData, selectedBoardIndex } = useContext(DataContext);
  const [open, setOpen] = useState(false);

  const handleDragEnd = (e) => {
    const { active, over } = getDragData(e, data[selectedBoardIndex]);
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
      setData((prev) =>
        produce(prev, (draft) => {
          const targetCol = draft[selectedBoardIndex]?.columns[active.colIdx];
          targetCol.tasks = arrayMove(targetCol.tasks, active.idx, over.idx);
        }),
      );
    }
  };

  const onDragOverHandler = (e) => {
    const { active, over } = getDragData(e, data[selectedBoardIndex]);
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
      setData((prev) =>
        produce(prev, (draft) => {
          const cols = draft[selectedBoardIndex]?.columns;

          cols[over.colIdx]?.tasks.splice(over.idx, 0, active.task); // Insert the dragged task into the target column.
          cols[active.colIdx]?.tasks.splice(active.idx, 1); // Remove the task from its original column.
        }),
      );
    }
  };

  // Empty state: no boards exist
  if (!data.length) return <EmptyWorkSpace />;
  const board = data[selectedBoardIndex];
  // Empty state: invalid or missing board
  if (!board) return <EmptyWorkSpace />;

  // Normal workspace (boards exist)
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragOver={onDragOverHandler}
    >
      <section className="bg-light-grey flex h-[calc(100vh-97px)] flex-1 gap-6 overflow-auto p-6">
        {data[selectedBoardIndex]?.columns.map((column) => (
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
            selectedBoard={data[selectedBoardIndex]}
            setOpen={setOpen}
            editMode={EDIT_MODES.EDIT}
          />
        </DialogPrimitive>
      </section>
    </DndContext>
  );
}
