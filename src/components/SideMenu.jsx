import { BoardButton, BoardSvg, DialogPrimitive, EditBoard } from "@components";
import { useContext, useState } from "react";
import DataContext from "@context/data-context";

/**
 *
 * @returns {JSX.Element}
 */

export function SideMenu() {
  const [open, setOpen] = useState(false);
  const { data, selectedBoardIndex, setSelectedBoardIndex } =
    useContext(DataContext);

  return (
    <aside className="side-menu border-Lines-Light border-lines-light -mt-px w-[300px] border-r bg-white">
      <p className="text-heading-s text-medium-grey my-3 px-8 py-4 font-semibold tracking-widest uppercase">
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
            title="Create New Board"
            description="Create a new board to organize your tasks."
            isOpen={open}
            setOpen={setOpen}
            triggerComponent={
              <button className="text-heading-n text-main-blue flex w-full cursor-pointer items-center gap-4 px-8 py-3.5 font-bold">
                <BoardSvg color="blue" />+ Create New Board
              </button>
            }
          >
            <EditBoard
              columns={data[selectedBoardIndex]?.columns}
              submitText="+ Create New Board"
            />
          </DialogPrimitive>
        </li>
      </ul>
    </aside>
  );
}
