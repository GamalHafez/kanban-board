import { useEffect, useState } from "react";
import DataContext from "@context/data-context.js";
import { APP_KEYS, loadFromStorage, saveToStorage } from "@utils";
import { useMediaQuery } from "@uidotdev/usehooks";
import { checkAuth } from "@/services/auth.service";

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const isAuthenticated = user !== null;

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

  useEffect(() => {
    checkAuth(setUser);
  }, []);

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        selectedBoardIndex,
        setSelectedBoardIndex,
        isSmallDevice,

        user,
        setUser,
        isAuthenticated,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
