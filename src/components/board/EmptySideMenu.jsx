import { EDIT_MODES } from "@utils";
import { EditBoardForm } from "@components/board";
import { DialogPrimitive } from "@components/ui";
import DataContext from "@context/data-context.js";
import { useContext, useState } from "react";
import defaultData from "@/data.json";

export function EmptySideMenu() {
  const [open, setOpen] = useState(false);
  const { setData } = useContext(DataContext);

  const onPushDefault = () => setData(defaultData);

  return (
    <aside className="side-menu border-lines-light -mt-px flex w-[280px] flex-col items-center justify-center gap-4 border-r bg-white p-6">
      <h2 className="text-heading-xl text-center font-semibold text-gray-600">
        Start Quickly
      </h2>
      <button
        onClick={onPushDefault}
        className="text-heading-n text-main-blue bg-lines-light w-full cursor-pointer rounded-md py-3 font-bold hover:bg-gray-200"
      >
        With Default Data
      </button>
      <h2 className="text-heading-xl text-center font-semibold text-gray-600">
        Or
      </h2>

      <DialogPrimitive
        title="Create your first board"
        description="Create a new board to organize your tasks."
        isOpen={open}
        setOpen={setOpen}
        triggerComponent={
          <button className="text-heading-l text-main-blue bg-lines-light w-full cursor-pointer rounded-md py-3 font-bold hover:bg-gray-200">
            Begin From Scratch
          </button>
        }
      >
        <EditBoardForm editMode={EDIT_MODES.CREATE} setOpen={setOpen} />
      </DialogPrimitive>
    </aside>
  );
}
