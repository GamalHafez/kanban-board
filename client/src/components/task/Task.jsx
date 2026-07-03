import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DeletePopOver, DragGrip } from "@components/ui";
import { produce } from "immer";
import DataContext from "@context/data-context";
import { useContext, useState } from "react";
import { useUpdateTask } from "@hooks";
import { TaskContent } from "./TaskContent";

/**
 *
 * @param {Object} props
 * @param {string} props.id
 * @param {string} props.title
 * @param {string} props.colId
 * @param {string} props.description
 * @returns {JSX.Element}
 */

export function Task({ title, id, colId, description, isPlaceHolder }) {
  const [rows, setRows] = useState({ title: 1, desc: 1 });
  const {
    attributes,
    listeners,
    setNodeRef,
    dragJustEnded,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, data: { colId, rows, setRows } });
  const { setData, selectedBoardIndex } = useContext(DataContext);
  const updateTask = useUpdateTask({ selectedBoardIndex, colId, id, setData });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const deleteTaskHandler = () =>
    setData((prev) =>
      produce(prev, (draft) => {
        const cols = draft[selectedBoardIndex].columns;
        const targetColIndex = cols.findIndex((col) => col.id === colId);

        cols[targetColIndex].tasks = cols[targetColIndex].tasks.filter(
          (task) => task.id !== id,
        );
      }),
    );

  if (isPlaceHolder) {
    return <div ref={setNodeRef} className="pointer-events-none opacity-0" />;
  }

  return (
    <div
      className="group/card dragging relative grid cursor-pointer grid-cols-[6fr_1fr] rounded-lg bg-white px-4 py-3 shadow-sm"
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <DragGrip listeners={{ ...listeners }} />
      <TaskContent
        id={id}
        title={title}
        description={description}
        isDragging={isDragging}
        updateTask={updateTask}
        dragJustEnded={dragJustEnded}
        setRows={setRows}
        rows={rows}
      />
      <DeletePopOver
        deleteHandler={deleteTaskHandler}
        parent="task"
        title={title}
      />
    </div>
  );
}
