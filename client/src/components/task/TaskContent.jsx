import { updateTaskService } from "@/services/tasks.service";
import { adjustRows } from "@utils";
import { useContext, useEffect, useRef, useState } from "react";
import DataContext from "@context/data-context";

export function TaskContent({
  id,
  title,
  description,
  isDragging,
  dragJustEnded,
  updateTask,
  rows,
  setRows,
  colId,
}) {
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskDescription, setTaskDescription] = useState(description);

  const originalTitle = useRef(title);
  const originalDescription = useRef(description);

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  const { selectedBoardId } = useContext(DataContext);

  useEffect(() => {
    adjustRows(titleRef.current, "title", setRows);
    adjustRows(descriptionRef.current, "desc", setRows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragJustEnded, isDragging]);

  const changeTaskHandler = (e, currentValue, setValue, key) => {
    const value = e.currentTarget.value;
    if (value === currentValue) return;
    setValue(value);
    updateTask(key, value);
  };

  const onFocusHandler = (e) => e.currentTarget.select();

  const onBlurHandler = async () => {
    try {
      if (
        taskTitle === originalTitle.current &&
        taskDescription === originalDescription.current
      ) {
        return;
      }

      const updated = await updateTaskService(
        selectedBoardId,
        colId,
        id,
        taskTitle,
        taskDescription,
      );

      originalTitle.current = updated.title;
      originalDescription.current = updated.description;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <textarea
        ref={titleRef}
        rows={rows?.title}
        placeholder="Edit title..."
        name={id}
        value={taskTitle}
        disabled={isDragging}
        onChange={(e) => changeTaskHandler(e, taskTitle, setTaskTitle, "title")}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        className="group-hover/card:text-main-blue resize-none font-bold text-gray-800 outline-0 transition-colors duration-300 placeholder:text-gray-500"
      />
      <textarea
        ref={descriptionRef}
        rows={rows?.desc}
        placeholder="Edit description..."
        name={id}
        value={taskDescription}
        onChange={(e) =>
          changeTaskHandler(
            e,
            taskDescription,
            setTaskDescription,
            "description",
          )
        }
        disabled={isDragging}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        className="text-heading-s resize-none text-gray-600 outline-0 transition-colors duration-300 group-hover/card:text-gray-800"
      />
    </div>
  );
}
