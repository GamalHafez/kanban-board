import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DeletePopOver, DragGrip } from "@components/ui";
import { produce } from "immer";
import DataContext from "@context/data-context";
import { useContext, useState } from "react";
import { useUpdateTask } from "@hooks";
import { TaskContent } from "./TaskContent";
import { getSelectedBoard } from "@/utils";
import { deleteTask } from "@/services/tasks.service";

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
  const { setBoards, selectedBoardId } = useContext(DataContext);

  const updateTask = useUpdateTask({
    selectedBoardId,
    colId,
    id,
    setBoards,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const deleteTaskHandler = async () => {
    try {
      await deleteTask(selectedBoardId, colId, id);

      setBoards((prev) =>
        produce(prev, (draft) => {
          const board = getSelectedBoard(selectedBoardId, draft);

          const column = board.columns.find((c) => c.id === colId);

          if (!column) return;

          column.tasks = column.tasks.filter((task) => task.id !== id);
        }),
      );
    } catch (err) {
      console.log(err);
    }
  };

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
        colId={colId}
      />
      <DeletePopOver
        deleteHandler={deleteTaskHandler}
        parent="task"
        title={title}
      />
    </div>
  );
}
