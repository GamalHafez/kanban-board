import { createContext } from "react";

// Creating and exporting the DataContext with default values

export default createContext({
  data: [],
  setData: () => {},
  selectedBoardIndex: 0,
  setSelectedBoardIndex: () => {},
  isSmallDevice: false,
});
