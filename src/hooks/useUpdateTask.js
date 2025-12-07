import { produce } from "immer";

export function useUpdateTask({ selectedBoardIndex, colId, id, setData }) {
  const updateTask = (field, value) => {
    setData((prev) =>
      produce(prev, (draft) => {
        const cols = draft[selectedBoardIndex].columns;
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
