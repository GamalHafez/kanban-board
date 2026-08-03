import { Board } from "@/services/boards.service";

type UserBoardsProps = {
  boards: Board[];
  isLoading: boolean;
  error: string;
};

export const UserBoards = ({ boards, isLoading, error }: UserBoardsProps) => {
  return (
    <section className="mt-10">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-heading-l font-bold">Your Boards</h2>

        <span className="text-zinc-700">
          {boards.length} {boards.length === 1 ? "Board" : "Boards"}
        </span>
      </div>

      {isLoading ? (
        <p className="text-medium-grey">Loading boards...</p>
      ) : error ? (
        <p className="text-red">{error}</p>
      ) : boards.length === 0 ? (
        <div className="border-lines-light dark:border-lines-dark dark:bg-dark-grey rounded-xl border bg-white p-8 text-center">
          <h3 className="text-heading-m mb-2 font-bold">No boards yet</h3>

          <p className="text-medium-grey">
            Create your first board to start organizing your tasks.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {boards.map((board) => (
            <article
              key={board.id}
              className="border-lines-light dark:border-lines-dark dark:bg-dark-grey hover:border-main-purple rounded-xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h3 className="text-heading-m mb-2 font-bold">
                    {board.name}
                  </h3>

                  <p className="text-medium-grey text-sm">
                    {board.columns?.length}{" "}
                    {board.columns?.length === 1 ? "Column" : "Columns"}
                  </p>
                </div>

                <div className="bg-main-purple h-3 w-3 rounded-full" />
              </div>

              <div className="border-lines-light dark:border-lines-dark border-t pt-4">
                <p className="text-medium-grey text-xs tracking-wider uppercase">
                  Last Updated
                </p>

                <p className="mt-1 text-sm font-medium">
                  {new Date(board.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <button className="focus:ring-main-purple/30 mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-300 px-4 py-3 text-sm font-semibold text-black transition-colors duration-200 hover:bg-blue-400 focus:ring-2 focus:outline-none">
                See Board
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
