import { Task } from "@components";

/**
 * @param {Object} props
 * @param {string} props.title
 * @param {Array} props.tasks
 * @returns {JSX.Element}
 */

export function Column({ title, tasks = [] }) {
  return (
    <article className="bg-lines-light flex w-72 shrink-0 flex-col gap-6 self-start rounded-lg px-2 py-4 shadow">
      <h2 className="text-heading-s group/column text-medium-grey bg-lines-light relative top-0 rounded px-2 font-bold tracking-widest uppercase">
        {title}
        <span className="text-main-blue ml-1.5">({tasks.length})</span>
      </h2>
      <div className="mb-5 flex flex-col gap-5">
        {tasks.map((task) => (
          <Task
            key={task.id}
            title={task.title}
            description={task.description}
          />
        ))}
      </div>
      <button className="border-light-grey bg-lines-light text-heading-m text-medium-grey -mx-2 mt-auto cursor-pointer border-t px-2 py-4">
        + Add New Task
      </button>
    </article>
  );
}
