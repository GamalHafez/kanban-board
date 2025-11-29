import { DeletePopOver } from "@components";
import { produce } from "immer";
import DataContext from "@context/data-context";
import { useContext, useState } from "react";
import { useUpdateTask } from "@utils";

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
  const { setData, selectedBoardIndex } = useContext(DataContext);
  const updateTask = useUpdateTask({ selectedBoardIndex, colId, id, setData });
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskDescription, setTaskDescription] = useState(description);

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

  const onFocusHandler = (e) => e.currentTarget.select();

  return (
    <div className="group/card flex min-h-16 transform justify-between rounded-lg bg-white px-4 py-3 shadow-sm duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Edit title..."
          name={id}
          value={taskTitle}
          onChange={(e) => changeTaskHandler(e, setTaskTitle, "title")}
          onFocus={onFocusHandler}
          className="group-hover/card:text-main-blue font-bold text-gray-800 outline-0 transition-colors duration-300"
        />
        <input
          type="text"
          placeholder="Edit description..."
          name={id}
          value={taskDescription}
          onChange={(e) =>
            changeTaskHandler(e, setTaskDescription, "description")
          }
          onFocus={onFocusHandler}
          className="text-heading-s text-gray-600 outline-0 transition-colors duration-300 group-hover/card:text-gray-800"
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
