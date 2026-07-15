import { useContext, useEffect, useState } from "react";
import { DialogPrimitive } from "@components/ui";
import clsx from "clsx";
import DataContext from "@context/data-context.js";
import arrowDown from "@assets/icon-chevron-down.svg";
import arrowUp from "@assets/icon-chevron-up.svg";
import { DIALOG_DATA } from "@utils";
import { SideMenu } from "@components/board";

export function HeaderBoardTitle() {
  const [open, setOpen] = useState(false);
  const { selectedBoardId, boards, isSmallDevice } = useContext(DataContext);
  const isEmpty = !boards.length || !boards[selectedBoardId];

  const titleClsx = clsx("text-heading-l lg:text-heading-xl font-semibold", {
    "text-gray-600": isEmpty,
  });

  useEffect(() => {
    const timeout = setTimeout(() => setOpen(false), 0);
    return () => clearTimeout(timeout);
  }, [selectedBoardId]);

  const selectedBoardIndex = boards.findIndex((b) => b.id === selectedBoardId);
  const title = boards[selectedBoardIndex]?.name ?? "No Boards Available";

  return (
    <div className="flex items-center gap-2 lg:gap-0">
      {isSmallDevice && !isEmpty ? (
        <DialogPrimitive
          dialogType={DIALOG_DATA.MOBILE_MENU.key}
          isOpen={open}
          setOpen={setOpen}
          triggerComponent={
            <button
              aria-label="Board Dialog"
              className="flex cursor-pointer items-center gap-1 outline-0 hover:bg-gray-200"
            >
              <span className={titleClsx}>{title}</span>
              <img src={open ? arrowUp : arrowDown} alt="Arrow Icon down" />
            </button>
          }
        >
          <SideMenu />
        </DialogPrimitive>
      ) : (
        // On normal devices, just render the title normally
        <h2 className={titleClsx}>{title}</h2>
      )}
    </div>
  );
}
