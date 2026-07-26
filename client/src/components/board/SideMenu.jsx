import {
  BoardButton,
  BoardSvg,
  EditBoardForm,
  EmptySideMenu,
} from "@components/board";
import { DialogPrimitive } from "@components/ui";
import { useContext, useState } from "react";
import DataContext from "@context/data-context";
import { EDIT_MODES } from "@utils";
import { APP_KEYS, getSelectedBoard, saveToStorage } from "@/utils";

/**
 *
 * @returns {JSX.Element}
 */

export function SideMenu() {
  const [open, setOpen] = useState(false);
  const { boards, selectedBoardId, setSelectedBoardId } =
    useContext(DataContext);
  const selectedBoard = getSelectedBoard(selectedBoardId, boards);

  // Empty state: no boards exist
  if (!boards.length) return <EmptySideMenu />;
  // Empty state: invalid or missing board
  if (!selectedBoard && !boards.length) return <EmptySideMenu />;

  // Normal workspace (Boards exist)
  return (
    <aside className="side-menu border-Lines-Light border-lines-light -mt-px w-fit border-r bg-white lg:w-[310px] lg:border-r-2">
      <p className="text-heading-s text-medium-grey px-8 py-5 font-semibold tracking-widest uppercase lg:my-3 lg:px-8 lg:py-4">
        All Boards
        <span className="text-main-blue ml-1.5 font-bold">
          ({boards.length})
        </span>
      </p>
      <ul>
        {boards.map((board) => (
          <li key={board.id}>
            <BoardButton
              isSelected={selectedBoardId === board.id}
              onClick={() => {
                setSelectedBoardId(board.id);
                saveToStorage(APP_KEYS.selectedBoardId, board.id);
              }}
              name={board.name}
            />
          </li>
        ))}
        <li>
          <DialogPrimitive
            title="Create a New Board"
            description="Create a new board to organize your tasks."
            isOpen={open}
            setOpen={setOpen}
            triggerComponent={
              <button className="text-heading-n text-main-blue flex w-full cursor-pointer items-center gap-4 px-8 py-4 font-bold lg:py-3.5">
                <BoardSvg color="blue" />+ Create New Board
              </button>
            }
          >
            <EditBoardForm editMode={EDIT_MODES.CREATE} setOpen={setOpen} />
          </DialogPrimitive>
        </li>
      </ul>
    </aside>
  );
}
