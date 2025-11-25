import { DeleteBoard, DialogPrimitive, DropdownPrimitive } from "@components";
import iconVerticalEllipsis from "@assets/icon-vertical-ellipsis.svg";
import { useContext, useState } from "react";
import DataContext from "@context/data-context.js";

const DIALOG_DATA = {
  edit: {
    title: "Edit Board",
    description: "Make changes to your profile here.",
  },
  delete: {
    title: "Delete this Board?",
    description: "Are you sure you want to delete this board?",
  },
};

/**
 *
 * @returns {JSX.Element}
 */

export function Header() {
  const { selectedBoardIndex, data } = useContext(DataContext);
  const [open, setOpen] = useState(false);
  const [dialogType, setDialogType] = useState("edit");

  const dropDownItems = {
    edit: {
      label: "Edit Board",
      onClick: () => {
        setDialogType("edit");
        setOpen(true);
      },
    },
    delete: {
      label: "Delete Board",
      onClick: () => {
        setDialogType("delete");
        setOpen(true);
      },
    },
  };

  return (
    <header className="text-main-blue border-lines-light flex h-[97px] shrink-0 items-center border-b bg-white capitalize">
      <h1 className="border-lines-light flex w-[300px] items-center gap-4 self-stretch border-r border-b pl-8 text-[32px] font-bold">
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
          dialogType={dialogType}
          title={DIALOG_DATA[dialogType].title}
          isOpen={open}
          setOpen={setOpen}
          description={DIALOG_DATA[dialogType].description}
        >
          {dialogType === "delete" ? (
            <DeleteBoard dialogToggle={setOpen} />
          ) : null}
        </DialogPrimitive>
      </div>
    </header>
  );
}
