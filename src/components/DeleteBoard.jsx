import { Button } from "@components";
import { useContext } from "react";
import DataContext from "@context/data-context";

/**
 * @param {Object} props
 * @param {Function} props.dialogToggle
 * @returns {JSX.Element}
 */

export function DeleteBoard({ dialogToggle }) {
  const { data, setData, setSelectedBoardIndex, selectedBoardIndex } =
    useContext(DataContext);

  const deleteHandler = () => {
    setData((prev) => prev.toSpliced(selectedBoardIndex, 1));
    dialogToggle(false);

    // Select the Previous board if avaliable
    if (selectedBoardIndex - 1 >= 0) {
      setSelectedBoardIndex(selectedBoardIndex - 1);
    }
  };

  return (
    <>
      <p className="text-heading-xs text-gray-600">
        This action will remove all columns and tasks inside
        <span className="text-main-blue mx-1 font-bold">
          "{data[selectedBoardIndex]?.title}"
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
