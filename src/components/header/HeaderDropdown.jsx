import { useContext, useState } from "react";
import DataContext from "@context/data-context.js";
import { DialogPrimitive, DropdownPrimitive } from "@components/ui";
import { DeleteBoard, EditBoardForm } from "@components/board";
import { DIALOG_DATA, EDIT_MODES } from "@utils";
import iconVerticalEllipsis from "@assets/icon-vertical-ellipsis.svg";

export function HeaderDropdown() {
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

  return data.length | data[selectedBoardIndex] ? (
    <>
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
    </>
  ) : null;
}
