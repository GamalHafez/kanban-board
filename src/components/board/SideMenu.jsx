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

/**
 *
 * @returns {JSX.Element}
 */

export function SideMenu() {
  const [open, setOpen] = useState(false);
  const { data, selectedBoardIndex, setSelectedBoardIndex } =
    useContext(DataContext);

  // Empty state: no boards exist
  if (!data.length) return <EmptySideMenu />;
  const board = data[selectedBoardIndex];
  // Empty state: invalid or missing board
  if (!board) return <EmptySideMenu />;

  // Normal workspace (boards exist)
  return (
    <aside className="side-menu border-Lines-Light border-lines-light -mt-px w-fit border-r bg-white lg:w-[280px]">
      <p className="text-heading-s text-medium-grey px-8 py-5 font-semibold tracking-widest uppercase lg:my-3 lg:px-8 lg:py-4">
        All Boards
        <span className="text-main-blue ml-1.5 font-bold">({data.length})</span>
      </p>
      <ul>
        {data.map((board, index) => (
          <li key={board.id}>
            <BoardButton
              isSelected={selectedBoardIndex === index}
              onClick={() => setSelectedBoardIndex(index)}
              name={board.title}
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
