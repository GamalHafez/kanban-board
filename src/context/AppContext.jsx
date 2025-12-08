import { useEffect, useState } from "react";
import DataContext from "@context/data-context.js";
import { APP_KEYS, loadFromStorage, saveToStorage } from "@utils";
import { useMediaQuery } from "@uidotdev/usehooks";

export default function AppContext({ children }) {
  const [data, setData] = useState(loadFromStorage(APP_KEYS.BOARDS, []));
  const [selectedBoardIndex, setSelectedBoardIndex] = useState(
    loadFromStorage(APP_KEYS.BOARD_IDX, 0),
  );

  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

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
        isSmallDevice,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
