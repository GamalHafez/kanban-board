import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Column, DialogPrimitive, EditBoardForm } from "@components";
import DataContext from "@context/data-context";
import { EDIT_MODES, getDragData } from "@utils";
import { useContext, useMemo, useState } from "react";
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
    if (active.id === over.id) return;

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

  const tasksIds = useMemo(
    () =>
      data[selectedBoardIndex]?.columns.flatMap((col) =>
        col.tasks.map((t) => t.id),
      ),
    [data, selectedBoardIndex],
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragOver={onDragOverHandler}
    >
      <section className="bg-light-grey flex h-[calc(100vh-97px)] flex-1 gap-6 overflow-auto p-6">
        <SortableContext
          items={tasksIds}
          strategy={verticalListSortingStrategy}
        >
          {data[selectedBoardIndex]?.columns.map((column) => (
            <Column
              key={column.id}
              id={column.id}
              title={column.title}
              tasks={column.tasks}
            />
          ))}
        </SortableContext>
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
