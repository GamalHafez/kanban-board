import { DeletePopOver } from "@components";
import { produce } from "immer";
import DataContext from "@context/data-context";
import { useContext } from "react";

/**
 *
 * @param {Object} props
 * @param {string} props.id
 * @param {string} props.title
 * @param {string} props.colId
 * @param {string} props.description
 * @returns {JSX.Element}
 */

export function Task({ title, id, colId, description }) {
  const { setData, selectedBoardIndex } = useContext(DataContext);

  const deleteTaskHandler = () =>
    setData((prev) =>
      produce(prev, (draft) => {
        const cols = draft[selectedBoardIndex].columns;
        const targetColIndex = cols.findIndex((col) => col.id === colId);

        cols[targetColIndex].tasks = cols[targetColIndex].tasks.filter(
          (task) => task.id !== id,
        );
      }),
    );

  return (
    <div className="group/card flex min-h-16 transform justify-between rounded-lg bg-white px-4 py-3 shadow-sm duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-lg">
      <div>
        <h3 className="group-hover/card:text-main-blue font-bold text-gray-800 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-heading-s text-gray-600 transition-colors duration-300 group-hover/card:text-gray-800">
          {description}
        </p>
      </div>
      <DeletePopOver
        deleteHandler={deleteTaskHandler}
        parent="card"
        title={title}
      />
    </div>
  );
}
