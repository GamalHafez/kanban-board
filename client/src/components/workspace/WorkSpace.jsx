import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Column, EmptyWorkSpace } from "@components/workspace";
import { DialogPrimitive } from "@components/ui";
import { EditBoardForm } from "@components/board";
import DataContext from "@context/data-context";
import { calculateRows, EDIT_MODES, getDragData } from "@utils";
import { useContext, useEffect, useState } from "react";
import { produce } from "immer";
import { getSelectedBoard } from "@/utils";
import { reorderTasks } from "@/services/tasks.service";
import { getBoards } from "@/services/boards.service";

export function WorkSpace() {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 10 },
    }),
    useSensor(KeyboardSensor),
    useSensor(MouseSensor),
  );
  const { boards, setBoards, updateSelectedBoardId, selectedBoardId } =
    useContext(DataContext);
  const [open, setOpen] = useState(false);
  const selectedBoard = getSelectedBoard(selectedBoardId, boards);
  const [dragInfo, setDragInfo] = useState(null);

  const handleDragStart = (e) => {
    setDragInfo({
      sourceColumnId: e.active.data.current.colId,
    });
  };

  useEffect(() => {
    if (!boards.length) {
      updateSelectedBoardId("");
      return;
    }

    const exists = boards.some((board) => board.id === selectedBoardId);

    if (!exists) {
      updateSelectedBoardId(boards[0].id);
    }
  }, [boards, selectedBoardId, updateSelectedBoardId]);

  const handleDragEnd = async (e) => {
    const { active, over } = getDragData(e, selectedBoard);

    const setRows = active.setRows;
    setRows &&
      setRows((prev) => ({
        ...prev,
        title: calculateRows(active.task.title),
        desc: calculateRows(active.task.description, 26.5),
      }));

    const sourceColumnId = dragInfo.sourceColumnId;
    const targetColumnId = e.over.data.current.colId;

    // Handle reordering when dragging within the same column.
    if (sourceColumnId === targetColumnId) {
      const reorderedTasks = arrayMove(
        [...active.colTasks],
        active.idx,
        over.idx,
      );

      setBoards((prev) =>
        produce(prev, (draft) => {
          const board = getSelectedBoard(selectedBoardId, draft);
          const targetCol = board?.columns[active.colIdx];
          targetCol.tasks = arrayMove(targetCol.tasks, active.idx, over.idx);
        }),
      );

      try {
        await reorderTasks(selectedBoardId, active.colId, {
          sourceColumnId: active.colId,
          targetColumnId: over.colId,
          sourceTasks: reorderedTasks.map((task, index) => ({
            id: task.id,
            position: index,
          })),
        });
      } finally {
        const fetchedBoards = await getBoards();
        setBoards(fetchedBoards);
      }
    }

    if (sourceColumnId !== targetColumnId) {
      const sourceColumn = selectedBoard.columns.find(
        (c) => c.id === sourceColumnId,
      );

      const targetColumn = selectedBoard.columns.find(
        (c) => c.id === targetColumnId,
      );
      try {
        await reorderTasks(selectedBoardId, active.colId, {
          sourceColumnId: sourceColumn.id,
          targetColumnId: targetColumn.id,

          sourceTasks: sourceColumn.tasks.map((task, index) => ({
            id: task.id,
            position: index,
          })),

          targetTasks: targetColumn.tasks.map((task, index) => ({
            id: task.id,
            position: index,
          })),
        });
      } catch {
        const fetchedBoards = await getBoards();
        setBoards(fetchedBoards);
      }
    }
  };

  const onDragOverHandler = (e) => {
    const { active, over } = getDragData(e, selectedBoard);

    if (!over) return;
    if (!e.delta.x && !e.delta.y) return;

    const setRows = active.setRows;

    setRows &&
      setRows((prev) => ({
        ...prev,
        title: over.rows.title,
        desc: over.rows.desc,
      }));

    if (active.colId === over.colId) return;

    setBoards((prev) =>
      produce(prev, (draft) => {
        const board = getSelectedBoard(selectedBoardId, draft);

        const sourceColumn = board.columns.find((c) => c.id === active.colId);

        const targetColumn = board.columns.find((c) => c.id === over.colId);

        const [task] = sourceColumn.tasks.splice(active.idx, 1);

        targetColumn.tasks.splice(over.idx, 0, task);
      }),
    );
  };

  // Empty state: no boards exist
  if (!boards.length) return <EmptyWorkSpace />;
  // Empty state: invalid or missing board
  if (!selectedBoard && !boards.length) return <EmptyWorkSpace />;

  // Normal workspace (boards exist)
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragOver={onDragOverHandler}
      onDragStart={handleDragStart}
    >
      <section className="bg-light-grey flex h-[calc(100vh-97px)] flex-1 gap-6 overflow-auto p-6">
        {selectedBoard?.columns?.map((column) => (
          <Column
            key={column.id}
            id={column.id}
            title={column.title}
            tasks={column.tasks}
          />
        ))}
        <DialogPrimitive
          title="Add new Column"
          description="Add a new column to organize your tasks."
          isOpen={open}
          setOpen={setOpen}
          triggerComponent={
            <button className="bg-lines-light text-heading-l text-medium-grey w-72 shrink-0 cursor-pointer self-start rounded-md p-3 font-bold">
              + New Column
            </button>
          }
        >
          <EditBoardForm
            selectedBoard={selectedBoard}
            setOpen={setOpen}
            editMode={EDIT_MODES.EDIT}
          />
        </DialogPrimitive>
      </section>
    </DndContext>
  );
}
