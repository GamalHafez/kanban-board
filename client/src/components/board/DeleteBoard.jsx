import { Button } from "@components/ui";
import { useContext } from "react";
import DataContext from "@context/data-context";
import { getSelectedBoard } from "@/utils";

/**
 * @param {Object} props
 * @param {Function} props.dialogToggle
 * @returns {JSX.Element}
 */

export function DeleteBoard({ dialogToggle }) {
  const { boards, selectedBoardId } = useContext(DataContext);
  const selectedBoard = getSelectedBoard(selectedBoardId, boards);

  const deleteHandler = () => {
    dialogToggle(false);

    // Select the Previous board if avaliable
    /**  if (selectedBoardId - 1 >= 0) {
      setSelectedBoardIndex(selectedBoardIndex - 1);
    } 
      */
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
