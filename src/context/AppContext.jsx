import { useEffect, useState } from "react";
import DataContext from "@context/data-context.js";
import { BOARDS_KEY, loadBoards } from "@utils";

export default function AppContext({ children }) {
  const [data, setData] = useState(loadBoards);

  // Update localStorage whenever data change
  useEffect(() => {
    localStorage.setItem(BOARDS_KEY, JSON.stringify(data));
  }, [data]);

  const [selectedBoardIndex, setSelectedBoardIndex] = useState(0);

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        selectedBoardIndex,
        setSelectedBoardIndex,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
