import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DeletePopOver } from "@components";
import { produce } from "immer";
import DataContext from "@context/data-context";
import { useContext, useEffect, useRef, useState } from "react";
import { adjustRows, useUpdateTask } from "@utils";

/**
 *
 * @param {Object} props
 * @param {string} props.id
 * @param {string} props.title
 * @param {string} props.colId
 * @param {string} props.description
 * @returns {JSX.Element}
 */

export function Task({ title, id, colId, description }) {
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskDescription, setTaskDescription] = useState(description);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
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

  const changeTaskHandler = (e, setChange, key) => {
    const value = e.currentTarget.value;
    if (value === title) return;
    setChange(value);
    updateTask(key, value);
  };

  useEffect(() => {
    adjustRows(titleRef.current, "title", setRows);
    adjustRows(descriptionRef.current, "desc", setRows);
  }, [isDragging, dragJustEnded, taskTitle, taskDescription]);

  const onFocusHandler = (e) => e.currentTarget.select();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className="group/card dragging grid cursor-pointer grid-cols-[6fr_1fr] rounded-lg bg-white px-4 py-3 shadow-sm"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="flex flex-col gap-2">
        <textarea
          ref={titleRef}
          rows={rows?.title}
          placeholder="Edit title..."
          name={id}
          value={taskTitle}
          disabled={isDragging}
          onChange={(e) => changeTaskHandler(e, setTaskTitle, "title")}
          onFocus={onFocusHandler}
          className="group-hover/card:text-main-blue resize-none font-bold text-gray-800 outline-0 transition-colors duration-300 placeholder:text-gray-500"
        />
        <textarea
          ref={descriptionRef}
          rows={rows?.desc}
          placeholder="Edit description..."
          name={id}
          value={taskDescription}
          onChange={(e) =>
            changeTaskHandler(e, setTaskDescription, "description")
          }
          disabled={isDragging}
          onFocus={onFocusHandler}
          className="text-heading-s resize-none text-gray-600 outline-0 transition-colors duration-300 group-hover/card:text-gray-800"
        />
      </div>
      <DeletePopOver
        deleteHandler={deleteTaskHandler}
        parent="card"
        title={title}
      />
    </div>
  );
}
