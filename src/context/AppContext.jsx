import { useState } from "react";
import defaultData from "@/data.json";
import DataContext from "@context/data-context.js";

export default function AppContext({ children }) {
  const [data, setData] = useState(defaultData);
  const [selectedBoardIndex, setSelectedBoardIndex] = useState(0);

  return (
    <DataContext.Provider
      value={{ data, setData, selectedBoardIndex, setSelectedBoardIndex }}
    >
      {children}
    </DataContext.Provider>
  );
}
