import { Button, Label, TextField } from "@components/ui";
import cancelIcon from "@assets/icon-cross.svg";
import { useContext, useReducer, useState } from "react";
import DataContext from "@context/data-context";
import { ACTIONS, EDIT_MODES, initialBoard, reducer } from "@utils";
import { createBoard, getBoards, updateBoard } from "@/services/boards.service";
import { AuthErrorAlert } from "@components/ui/auth";
import { createColumn } from "@/services/columns.service";

/**
 *
 * @param {Object} props
 * @param {Object} props.selectedBoard
 * @param {string} props.submitText
 * @param {Function} props.setOpen
 * @returns {JSX.Element}
 */

export function EditBoardForm({ selectedBoard = {}, editMode, setOpen }) {
  const [boardState, dispatch] = useReducer(
    reducer,
    Object.keys(selectedBoard).length ? selectedBoard : initialBoard(),
  );
  const { setBoards, updateSelectedBoardId } = useContext(DataContext);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate required fields before proceeding
    // Currently only checking the board title;
    // extend this if column validation is needed
    if (!boardState.title.trim()) {
      setError("Provide a board name");
      return;
    }

    try {
      switch (editMode.title) {
        case EDIT_MODES.CREATE.title: {
          const newBoard = await createBoard({ name: boardState.title });

          const columns = boardState.columns.filter((c) => c.title.trim());

          await Promise.all(
            columns.map((column) =>
              createColumn(newBoard.id, {
                title: column.title,
              }),
            ),
          );

          const boards = await getBoards();
          setBoards(boards);

          updateSelectedBoardId(newBoard.id); // Select the newly created board
          break;
        }

        case EDIT_MODES.EDIT.title: {
          await updateBoard(selectedBoard.id, boardState.name);
          const fetchedBoards = await getBoards();
          setBoards(fetchedBoards);
          break;
        }
        default:
          break;
      }
      setOpen(false);
      setError("");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    }
  };

  const addColumn = () => dispatch({ type: ACTIONS.ADD_COLUMN });

  const removeColumn = (id) =>
    dispatch({ type: ACTIONS.REMOVE_COLUMN, payload: { id } });

  const updateBoardTitle = (e) =>
    dispatch({
      type: ACTIONS.UPDATE_TITLE,
      payload: { title: e.target.value },
    });

  const updateColumnTitle = (e, id) =>
    dispatch({
      type: ACTIONS.UPDATE_COLUMN_TITLE,
      payload: { id, title: e.target.value },
    });

  return (
    <>
      {error && <AuthErrorAlert message={error} />}
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-6.5">
        <div>
          <Label id="boardName" label="Board Name" />
          <TextField
            label="Board Name"
            name="boardName"
            isInvalid={Boolean(error) && !boardState.name}
            value={boardState.title || ""}
            onChange={(e) => {
              setError("");
              updateBoardTitle(e);
            }}
            placeholder="e.g. Project Board"
          />
        </div>
        <div>
          {boardState.columns && (
            <Label
              id={boardState.columns?.[0]?.id ?? ""}
              label="Board Columns"
            />
          )}
          {boardState.columns?.map((col) => (
            <div
              key={col?.id}
              className="mb-2.5 flex items-center gap-4 last:mb-0"
            >
              <TextField
                isInvalid={
                  Boolean(error) &&
                  editMode.title === EDIT_MODES.EDIT.title &&
                  !col.title
                }
                placeholder="e.g. ToDo"
                name={col.id ?? ""}
                onChange={(e) => {
                  setError("");
                  updateColumnTitle(e, col.id);
                }}
                value={col.title}
              />
              <button
                onClick={() => removeColumn(col.id)}
                type="button"
                className="cursor-pointer"
              >
                <img src={cancelIcon} alt="Icon cross" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <Button
            variant="secondary"
            type="button"
            size="sm"
            onClick={() => {
              addColumn();
              setError("");
            }}
          >
            + Add New Column
          </Button>
          <Button isFullWidth size="sm" variant="primary">
            {editMode.submitText}
          </Button>
        </div>
      </form>{" "}
    </>
  );
}
