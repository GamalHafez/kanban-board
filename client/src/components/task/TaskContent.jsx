import { adjustRows } from "@utils";
import { useEffect, useRef, useState } from "react";

export function TaskContent({
  id,
  title,
  description,
  isDragging,
  dragJustEnded,
  updateTask,
  rows,
  setRows,
}) {
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskDescription, setTaskDescription] = useState(description);

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    adjustRows(titleRef.current, "title", setRows);
    adjustRows(descriptionRef.current, "desc", setRows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragJustEnded, isDragging]);

  const changeTaskHandler = (e, setChange, key) => {
    const value = e.currentTarget.value;
    if (value === taskTitle) return;
    setChange(value);
    updateTask(key, value);
  };

  const onFocusHandler = (e) => e.currentTarget.select();

  return (
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
  );
}
