import { useContext } from "react";
import clsx from "clsx";
import DataContext from "@context/data-context";

export function HeaderBoardTitle() {
  const { selectedBoardIndex, data } = useContext(DataContext);
  const isEmpty = !data.length || !data[selectedBoardIndex];


  const titleClsx = clsx("text-heading-l lg:text-heading-xl font-semibold", {
    "text-gray-600": isEmpty,
  });

  return (
    <h2 className={titleClsx}>
      {data[selectedBoardIndex]?.title || "Empty Workspace..."}
    </h2>
  );
}
