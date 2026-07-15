import { Button, Label, TextField } from "@components/ui";
import cancelIcon from "@assets/icon-cross.svg";
import { useContext, useReducer, useState } from "react";
import DataContext from "@context/data-context";
import { ACTIONS, EDIT_MODES, initialBoard, reducer } from "@utils";
import { createBoard } from "@/services/boards.service";

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
  const { setBoards, boards, setSelectedBoardId } = useContext(DataContext);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields before proceeding
    // Currently only checking the board title;
    // extend this if column validation is needed
    if (!boardState.title) {
      setError(true);
      return;
    }

    switch (editMode.title) {
      case EDIT_MODES.CREATE.title: {
        const newBoard = await createBoard({ name: boardState.title });
        setBoards((prev) => [...prev, newBoard]);
        setSelectedBoardId(newBoard.id); // Select the newly created board
        break;
      }

      case EDIT_MODES.EDIT.title: {
        const selectedBoardId = boards.find(
          (board) => board.id === selectedBoard.id,
        ).id;
        setBoards((prev) => [
          ...prev.filter((board) => board.id !== selectedBoardId),
          boardState,
        ]);
        break;
      }
      default:
        break;
    }

    setOpen(false);
    setError(false);
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-6.5">
      <div>
        <Label id="boardName" label="Board Name" />
        <TextField
          label="Board Name"
          name="boardName"
          isInvalid={!boardState.title && error}
          value={boardState.title || ""}
          onChange={updateBoardTitle}
          placeholder="e.g. Project Board"
        />
      </div>
      <div>
        <Label id={boardState.columns[0]?.id} label="Board Columns" />
        {boardState.columns?.map((col, index) => (
          <div key={index} className="mb-2.5 flex items-center gap-4 last:mb-0">
            <TextField
              isInvalid={
                editMode.title === EDIT_MODES.EDIT.title && !col.title && error
              }
              placeholder="e.g. ToDo"
              name={col.id}
              onChange={(e) => updateColumnTitle(e, col.id)}
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
        <Button variant="secondary" type="button" size="sm" onClick={addColumn}>
          + Add New Column
        </Button>
        <Button isFullWidth size="sm" variant="primary">
          {editMode.submitText}
        </Button>
      </div>
    </form>
  );
}
