import noBoardsImg from "@assets/kanban-board.png";

export function EmptyWorkSpace() {
  return (
    <article className="bg-light-grey flex h-[calc(100vh-97px)] flex-1 flex-col items-center justify-center gap-10 overflow-auto p-6">
      <img
        src={noBoardsImg}
        className="h-[550px] object-contain"
        alt="Empty Kanban Illustration"
      />
    </article>
  );
}
