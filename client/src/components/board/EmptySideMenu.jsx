import { EDIT_MODES } from "@utils";
import { EditBoardForm } from "@components/board";
import { DialogPrimitive } from "@components/ui";
import { useState } from "react";

export function EmptySideMenu() {
  const [open, setOpen] = useState(false);

  return (
    <aside
      className="side-menu border-lines-light -mt-px flex w-fit flex-col items-center justify-center gap-6 border-r p-6 md:bg-white lg:w-[288px] lg:border-r-2 lg:bg-white"
      aria-label="Empty side menu"
    >
      <h2 className="text-heading-xl text-center font-semibold text-gray-600">
        Start Quickly
      </h2>

      <DialogPrimitive
        title="Create your first board"
        description="Create a new board to organize your tasks."
        isOpen={open}
        setOpen={setOpen}
        triggerComponent={
          <button
            className="text-heading-l text-main-blue bg-lines-light focus:ring-main-blue w-full cursor-pointer rounded-md py-3 font-bold transition-colors hover:bg-gray-200 focus:ring-2 focus:outline-none"
            type="button"
          >
            Begin From Scratch
          </button>
        }
      >
        <EditBoardForm editMode={EDIT_MODES.CREATE} setOpen={setOpen} />
      </DialogPrimitive>

      <p className="max-w-xs text-center text-sm text-gray-500">
        You don’t have any boards yet. Create one to start organizing your
        projects and tasks.
      </p>
    </aside>
  );
}
