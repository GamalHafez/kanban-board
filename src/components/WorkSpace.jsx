import { Column } from "@components";

// Temporary data for columns
const columns = ["To Do", "In Progress", "Done"];

export function WorkSpace() {
  return (
    <section className="bg-light-grey flex h-[calc(100vh-97px)] flex-1 gap-6 overflow-auto p-6">
      {columns.map((name) => (
        <Column key={name} name={name} />
      ))}
      <button className="bg-lines-light text-heading-l text-medium-grey w-72 shrink-0 cursor-pointer self-start rounded-md p-3 font-bold">
        + New Column
      </button>
    </section>
  );
}
