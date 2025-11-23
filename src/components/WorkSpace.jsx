import { Column } from "@components";

/**
 *
 * @param {Object} props
 * @param {Array} props.columns
 * @param {number} props.columns[].id
 * @param {string} props.columns[].title
 * @param {Array} props.columns[].tasks
 * @returns {JSX.Element}
 */

export function WorkSpace({ columns = [] }) {
  return (
    <section className="bg-light-grey flex h-[calc(100vh-97px)] flex-1 gap-6 overflow-auto p-6">
      {columns.map((column) => (
        <Column key={column.id} title={column.title} tasks={column.tasks} />
      ))}
      <button className="bg-lines-light text-heading-l text-medium-grey w-72 shrink-0 cursor-pointer self-start rounded-md p-3 font-bold">
        + New Column
      </button>
    </section>
  );
}
