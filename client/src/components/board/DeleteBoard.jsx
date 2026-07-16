import { Button } from "@components/ui";
import { useContext } from "react";
import DataContext from "@context/data-context";
import { getSelectedBoard } from "@/utils";
import { deleteBoard, getBoards } from "@/services/boards.service";

/**
 * @param {Object} props
 * @param {Function} props.dialogToggle
 * @returns {JSX.Element}
 */

export function DeleteBoard({ dialogToggle }) {
  const { boards, setBoards, selectedBoardId, updateSelectedBoardId } =
    useContext(DataContext);
  const selectedBoard = getSelectedBoard(selectedBoardId, boards);

  const deleteHandler = async () => {
    await deleteBoard(selectedBoardId);
    const fetchedBoards = await getBoards();
    setBoards(fetchedBoards);

    dialogToggle(false);

    // Select the Previous board if avaliable
    const selectedBoardIndex = boards.findIndex(
      (b) => b.id === selectedBoardId,
    );

    const prevIndex = selectedBoardIndex - 1;
    if (prevIndex >= 0) {
      updateSelectedBoardId(boards[prevIndex]?.id);
    } else {
      updateSelectedBoardId(boards[0]?.id ?? "");
    }
  };

  return (
    <>
      <p className="text-heading-xs text-gray-600">
        This action will remove all columns and tasks inside
        <span className="text-main-blue mx-1 font-bold">
          "{selectedBoard?.name}"
        </span>
        and cannot be undone.
      </p>
      <div className="mt-6 flex gap-4">
        <Button
          onClick={deleteHandler}
          isFullWidth
          size="sm"
          variant="destructive"
          type="button"
        >
          Delete
        </Button>
        <Button
          onClick={() => dialogToggle(false)}
          isFullWidth
          size="sm"
          variant="secondary"
          type="button"
        >
          Cancel
        </Button>
      </div>
    </>
  );
}
