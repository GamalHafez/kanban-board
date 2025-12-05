const getColIndex = (cols, colId) => cols.findIndex((c) => c.id === colId);

const getTaskIndex = (tasks, taskId) =>
  tasks && tasks.findIndex((t) => t.id === taskId);

// Extract all required IDs and indexes for active and over tasks from the DnD event.
export const getDragData = (e, board) => {
  // --- Active
  const activeColId = e?.active?.data?.current?.colId;
  const activeColIdx = getColIndex(board?.columns, activeColId);
  const activeColTasks = board?.columns[activeColIdx]?.tasks;
  const activeId = e?.active?.id;
  const activeIdx = getTaskIndex(activeColTasks, activeId);
  const activeTask = activeColTasks?.[activeIdx];
  const activeSetRows = e?.active?.data?.current?.setRows;

  // --- Over
  const overColId = e?.over?.data?.current?.colId;
  const overColIdx = getColIndex(board?.columns, overColId);
  const overId = e?.over?.id;
  const overIsPlaceholder =
    typeof overId === "string" && overId.startsWith("placeholder-");
  const overIdx = overIsPlaceholder
    ? 0 // always insert at index 0
    : getTaskIndex(board?.columns[overColIdx]?.tasks, overId);
  const overRows = e?.over?.data?.current?.rows;

  const overIsColumn = !overColId; // empty column

  return {
    active: {
      id: activeId,
      idx: activeIdx,
      task: activeTask,
      colId: activeColId,
      colIdx: activeColIdx,
      setRows: activeSetRows,
    },
    over: {
      id: overId,
      idx: overIdx,
      colId: overColId,
      colIdx: overColIdx,
      rows: overRows,
      isColumn: overIsColumn,
    },
  };
};

// Calculate rows needed based on character length
export const calculateRows = (text, charsPerLine = 20) => {
  if (!text) return 1;
  return Math.ceil(text.length / charsPerLine);
};

export const adjustRows = (el, key, setRows) => {
  if (!el) return;

  const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
  const neededRows = Math.ceil(el.scrollHeight / lineHeight);
  setRows((prev) => ({ ...prev, [key]: neededRows }));
};
