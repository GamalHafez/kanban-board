import * as Popover from "@radix-ui/react-popover";
import DataContext from "@context/data-context";
import { useContext } from "react";
import { produce } from "immer";

export function DeleteTaskPopOver({ id, colId, title }) {
  const { setData, selectedBoardIndex } = useContext(DataContext);

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

  return (
    <Popover.Root>
      <Popover.Trigger className="text-red text-heading-s invisible cursor-pointer font-semibold group-hover/card:visible hover:font-bold">
        Delete
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="w-48 rounded-lg border border-gray-200 bg-blue-100 p-4 shadow-lg">
          <p className="text-sm text-gray-700">
            Do you really want to remove “{title}”?
          </p>
          <div className="mt-3 flex justify-end gap-2">
            <Popover.Close className="cursor-pointer text-sm text-gray-700 hover:text-black">
              Cancel
            </Popover.Close>
            <button
              onClick={deleteTaskHandler}
              className="text-red hover:text-red-hover cursor-pointer text-sm font-semibold"
            >
              Trash
            </button>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
