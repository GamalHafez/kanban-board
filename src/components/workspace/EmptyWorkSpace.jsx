import noBoardsImg from "@assets/kanban-board.png";
import { useContext } from "react";
import DataContext from "@context/data-context";
import { EmptySideMenu } from "@components/board";

// EmptySideMenu
export function EmptyWorkSpace() {
  const { isSmallDevice } = useContext(DataContext);

  return (
    <article className="bg-light-grey flex h-[calc(100vh-97px)] flex-1 flex-col items-center justify-center gap-10 overflow-auto p-6">
      {isSmallDevice ? (
        <EmptySideMenu />
      ) : (
        <img
          src={noBoardsImg}
          className="h-[550px] object-contain"
          alt="Empty Kanban Illustration"
        />
      )}
    </article>
  );
}
