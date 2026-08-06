import { useEffect, useState } from "react";
import DataContext from "@context/data-context.js";
import { APP_KEYS, loadFromStorage } from "@utils";
import { useMediaQuery } from "@uidotdev/usehooks";
import { checkAuth } from "@/services/auth.service";
import { getBoards } from "@/services/boards.service";
import { saveToStorage } from "@/utils";
import { PulseLoader } from "react-spinners";

export function AppProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
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
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, [selectedBoardId]);

  const updateSelectedBoardId = (newId) => {
    setSelectedBoardId(newId);
    saveToStorage(APP_KEYS.selectedBoardId, newId);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <PulseLoader color="#3b82f6" />
      </div>
    );
  }

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
        isLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
