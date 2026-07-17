import { getSelectedBoard } from "@/utils";
import { produce } from "immer";

export function useUpdateTask({ selectedBoardId, colId, id, setBoards }) {
  const updateTask = (field, value) => {
    setBoards((prev) =>
      produce(prev, (draft) => {
        const draftBoard = getSelectedBoard(selectedBoardId, draft);
        const cols = draftBoard.columns;
        const targetColIndex = cols.findIndex((col) => col.id === colId);
        const targetTaskIndex = cols[targetColIndex].tasks.findIndex(
          (t) => t.id === id,
        );
        cols[targetColIndex].tasks[targetTaskIndex][field] = value;
      }),
    );
  };

  return updateTask;
}
