import { Task } from "@components";
import DataContext from "@context/data-context";
import { DEFAULT_TASK } from "@utils";
import { useContext } from "react";

/**
 * @param {Object} props
 * @param {string} props.title
 * @param {Array} props.tasks
 * @returns {JSX.Element}
 */

export function Column({ id, title, tasks = [] }) {
  const { setData, selectedBoardIndex } = useContext(DataContext);

  const addNewTaskHandler = () =>
    // Safely update the selected column's tasks by cloning state and appending a new empty task.
    setData((prev) => {
      const copy = structuredClone(prev);
      const board = copy[selectedBoardIndex];

      const colIndex = board.columns.findIndex((c) => c.id === id);
      const targetCol = board.columns[colIndex];

      targetCol.tasks = [
        ...targetCol.tasks,
        {
          id: crypto.randomUUID(),
          title: DEFAULT_TASK.title,
          description: DEFAULT_TASK.description,
        },
      ];

      return copy;
    });

  return (
    <article className="bg-lines-light flex w-72 shrink-0 flex-col gap-6 self-start rounded-lg px-2 py-4 shadow">
      <h2 className="text-heading-s group/column text-medium-grey bg-lines-light relative top-0 rounded px-2 font-bold tracking-widest uppercase">
        {title}
        <span className="text-main-blue ml-1.5">({tasks.length})</span>
      </h2>
      <div className="mb-2 flex h-[420px] flex-col gap-5 overflow-y-auto pr-3">
        {tasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            colId={id}
            title={task.title}
            description={task.description}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={addNewTaskHandler}
        className="border-light-grey bg-lines-light text-heading-m text-medium-grey -mx-2 mt-auto cursor-pointer border-t px-2 py-4"
      >
        + Add New Task
      </button>
    </article>
  );
}
