import { useEffect, useState } from "react";
import DataContext from "@context/data-context.js";
import { APP_KEYS, loadFromStorage, saveToStorage } from "@utils";
import defaultData from "@/data.json";

export default function AppContext({ children }) {
  const [data, setData] = useState(
    loadFromStorage(APP_KEYS.BOARDS, defaultData),
  );
  const [selectedBoardIndex, setSelectedBoardIndex] = useState(
    loadFromStorage(APP_KEYS.BOARD_IDX, 0),
  );

  // Update localStorage whenever data or selectedBoardIndex change
  useEffect(() => {
    saveToStorage(APP_KEYS.BOARDS, data);
    saveToStorage(APP_KEYS.BOARD_IDX, selectedBoardIndex);
  }, [data, selectedBoardIndex]);

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
