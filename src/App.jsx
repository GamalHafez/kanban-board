import { Header, SideMenu, WorkSpace } from "@components";
import { useState } from "react";
import data from "@/data.json";

export default function App() {
  const [dataState, setDataState] = useState(data);
  const [selectedBoardIndex, setSelectedBoardIndex] = useState(0);

  return (
    <main className="font-jakarta flex h-screen flex-col">
      <Header boardName={dataState[selectedBoardIndex].title} />
      <div className="flex flex-1 overflow-hidden">
        <SideMenu
          data={dataState}
          selectedBoardIndex={selectedBoardIndex}
          setSelectedBoardIndex={setSelectedBoardIndex}
        />
        <WorkSpace columns={dataState[selectedBoardIndex]?.columns} />
      </div>
    </main>
  );
}
