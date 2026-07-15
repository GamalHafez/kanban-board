import { useEffect, useState } from "react";
import DataContext from "@context/data-context.js";
import { APP_KEYS, loadFromStorage } from "@utils";
import { useMediaQuery } from "@uidotdev/usehooks";
import { checkAuth } from "@/services/auth.service";
import { getBoards } from "@/services/boards.service";
import { saveToStorage } from "@/utils";

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const isAuthenticated = user !== null;
  const [boards, setBoards] = useState([]);

  const [selectedBoardId, setSelectedBoardId] = useState(
    loadFromStorage(APP_KEYS.selectedBoardId, ""),
  );
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  useEffect(() => {
    const initialize = async () => {
      try {
        await checkAuth(setUser);
        const fetchedBoards = await getBoards();

        if (!selectedBoardId) {
          saveToStorage(APP_KEYS.selectedBoardId, fetchedBoards[0]?.id);
        }
        setBoards(fetchedBoards);
      } catch {
        setUser(null);
        setBoards([]);
      }
    };

    initialize();
  }, [selectedBoardId]);

  const updateSelectedBoardId = (newId) => {
    setSelectedBoardId(newId);
    saveToStorage(APP_KEYS.selectedBoardId, newId);
  };

  return (
    <DataContext.Provider
      value={{
        selectedBoardId,
        setSelectedBoardId,
        updateSelectedBoardId,
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
