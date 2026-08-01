import { createContext } from "react";

// Creating and exporting the DataContext with default values

export default createContext({
  boards: [],
  setBoards: () => {},
  selectedBoardId: "",
  setSelectedBoardId: () => {},
  isSmallDevice: false,

  user: { name: "", email: "" },
  setUser: () => {},
  isAuthenticated: false,
});
