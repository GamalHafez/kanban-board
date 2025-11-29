import * as Popover from "@radix-ui/react-popover";

export function DeletePopOver({ deleteHandler, parent, title }) {
  return (
    <Popover.Root>
      <Popover.Trigger
        className={`text-red text-heading-s invisible cursor-pointer font-semibold group-hover/${parent}:visible hover:font-bold`}
      >
        Delete
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
