import * as Popover from "@radix-ui/react-popover";
import { DELETE_VARIANTS } from "@utils";
import redDeleteImg from "@assets/red-delete.png";
import blueDeleteImg from "@assets/blue-delete.png";

export function DeletePopOver({ deleteHandler, parent, title }) {
  return (
    <Popover.Root>
      <Popover.Trigger
        className={
          parent &&
          `absolute col-start-2 row-span-full w-7 cursor-pointer self-start justify-self-end rounded-full p-2 hover:bg-red-100 lg:invisible lg:w-8 ${DELETE_VARIANTS[parent]}`
        }
      >
        <img src={parent === "task" ? blueDeleteImg : redDeleteImg} alt="" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="w-48 rounded-lg border border-gray-200 bg-blue-100 p-4 shadow-lg">
          <p className="text-sm text-gray-700 capitalize">
            Do you really want to remove “{title}”?
          </p>
          <div className="mt-3 flex justify-end gap-2">
            <Popover.Close className="cursor-pointer text-sm text-gray-700 hover:text-black">
              Cancel
            </Popover.Close>
            <button
              onClick={deleteHandler}
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
