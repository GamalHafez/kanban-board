const getColIndex = (cols, colId) => cols.findIndex((c) => c.id === colId);

const getTaskIndex = (tasks, taskId) => tasks.findIndex((t) => t.id === taskId);

// Extract all required IDs and indexes for active and over tasks from the DnD event.
export const getDragData = (e, board) => {
  // get needed Active Data:
  const activeColId = e?.active?.data?.current?.colId;
  const activeColIdx = getColIndex(board?.columns, activeColId);
  const activeColTasks = board?.columns[activeColIdx]?.tasks;
  const activeId = e?.active?.id;
  const activeIdx = getTaskIndex(activeColTasks, activeId);
  const activeTask = activeColTasks[activeIdx];

  // get needed Over Data:?
  const overColId = e?.over?.data?.current?.colId;
  const overColIdx = getColIndex(board?.columns, overColId);
  const overId = e?.over?.id;
  const overIdx = getTaskIndex(board?.columns[overColIdx]?.tasks, overId);

  return {
    active: {
      id: activeId,
      idx: activeIdx,
      task: activeTask,
      colId: activeColId,
      colIdx: activeColIdx,
    },
    over: {
      id: overId,
      idx: overIdx,
      colId: overColId,
      colIdx: overColIdx,
    },
  };
};
