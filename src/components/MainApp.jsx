import { WorkSpace } from "@components/workspace";
import { Header } from "@components/header";
import { SideMenu } from "@components/board";
import { useContext } from "react";
import DataContext from "@context/data-context";

export function MainApp() {
  const { isSmallDevice } = useContext(DataContext);

  return (
    <main className="font-jakarta flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {!isSmallDevice && <SideMenu />}
        <WorkSpace />
      </div>
    </main>
  );
}
