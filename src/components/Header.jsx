import {
  DeleteBoard,
  DialogPrimitive,
  DropdownPrimitive,
  EditBoardForm,
} from "@components";
import iconVerticalEllipsis from "@assets/icon-vertical-ellipsis.svg";
import { useContext, useState } from "react";
import DataContext from "@context/data-context.js";
import { DIALOG_DATA, EDIT_MODES } from "@utils";

export function Header() {
  const { selectedBoardIndex, data } = useContext(DataContext);
  const [open, setOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState(DIALOG_DATA.EDIT);

  const dialogOnClick = (dialogMode) => {
    setDialogMode(dialogMode);
    setOpen(true);
  };

  const dropDownItems = {
    edit: {
      label: DIALOG_DATA.EDIT.label,
      onClick: () => dialogOnClick(DIALOG_DATA.EDIT),
    },
    delete: {
      label: DIALOG_DATA.DELETE.label,
      onClick: () => dialogOnClick(DIALOG_DATA.DELETE),
    },
  };

  return (
    <header className="text-main-blue border-lines-light flex h-[97px] shrink-0 items-center border-b bg-white capitalize">
      <h1 className="border-lines-light flex w-[280px] items-center gap-4 self-stretch border-r border-b pl-8 text-[32px] font-bold">
        Kanban
      </h1>
      <div className="border-lines-light flex flex-1 items-center justify-between self-stretch border-b pr-6 pl-6">
        <h2 className="text-heading-xl font-semibold">
          {data[selectedBoardIndex]?.title}
        </h2>
        <DropdownPrimitive
          items={dropDownItems}
          triggerComponent={() => (
            <button
              aria-label="Board Options"
              className="cursor-pointer rounded-full p-4 outline-0 hover:bg-gray-200"
            >
              <img src={iconVerticalEllipsis} alt="Icon vertical ellipsis" />
            </button>
          )}
        />
        <DialogPrimitive
          dialogType={dialogMode.key}
          title={dialogMode.title}
          isOpen={open}
          setOpen={setOpen}
          description={dialogMode.description}
        >
          {dialogMode.key === DIALOG_DATA.DELETE.key ? (
            <DeleteBoard dialogToggle={setOpen} />
          ) : (
            <EditBoardForm
              selectedBoard={data[selectedBoardIndex]}
              setOpen={setOpen}
              editMode={EDIT_MODES.EDIT}
            />
          )}
        </DialogPrimitive>
      </div>
    </header>
  );
}
