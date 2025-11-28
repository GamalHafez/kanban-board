import { Column, DialogPrimitive, EditBoardForm } from "@components";
import DataContext from "@context/data-context";
import { EDIT_MODES } from "@utils";
import { useContext, useState } from "react";

/**
 *
 * @param {Object} props
 * @param {Array} props.columns
 * @param {number} props.columns[].id
 * @param {string} props.columns[].title
 * @param {Array} props.columns[].tasks
 * @returns {JSX.Element}
 */

export function WorkSpace() {
  const { data, selectedBoardIndex } = useContext(DataContext);
  const [open, setOpen] = useState(false);

  return (
    <section className="bg-light-grey flex h-[calc(100vh-97px)] flex-1 gap-6 overflow-auto p-6">
      {data[selectedBoardIndex]?.columns.map((column) => (
        <Column
          key={column.id}
          id={column.id}
          title={column.title}
          tasks={column.tasks}
        />
      ))}
      <DialogPrimitive
        title="Add new Column"
        description="Add a new column to organize your tasks."
        isOpen={open}
        setOpen={setOpen}
        triggerComponent={
          <button className="bg-lines-light text-heading-l text-medium-grey w-72 shrink-0 cursor-pointer self-start rounded-md p-3 font-bold">
            + New Column
          </button>
        }
      >
        <EditBoardForm
          selectedBoard={data[selectedBoardIndex]}
          setOpen={setOpen}
          editMode={EDIT_MODES.EDIT}
        />
      </DialogPrimitive>
    </section>
  );
}
