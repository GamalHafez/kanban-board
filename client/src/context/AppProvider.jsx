import { useEffect, useState } from "react";
import DataContext from "@context/data-context.js";
import { APP_KEYS, loadFromStorage } from "@utils";
import { useMediaQuery } from "@uidotdev/usehooks";
import { checkAuth } from "@/services/auth.service";
import { getBoards } from "@/services/boards.service";

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const isAuthenticated = user !== null;
  const [boards, setBoards] = useState([]);

  const [selectedBoardIndex, setSelectedBoardIndex] = useState(
    loadFromStorage(APP_KEYS.BOARD_IDX, 0),
  );
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  useEffect(() => {
    const initialize = async () => {
      try {
        await checkAuth(setUser);
        const fetchedBoards = await getBoards();

        setBoards(fetchedBoards);
      } catch {
        setUser(null);
        setBoards([]);
      }
    };

    initialize();
  }, []);

  return (
    <DataContext.Provider
      value={{
        selectedBoardIndex,
        setSelectedBoardIndex,
        isSmallDevice,

        boards,
        setBoards,
        user,
        setUser,
        isAuthenticated,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
