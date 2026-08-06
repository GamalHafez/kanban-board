import { SideMenu } from "@/components/board";
import { WorkSpace } from "@/components/workspace";
import { useContext } from "react";
import DataContext from "@context/data-context.js";

export const BoardsPage = () => {
  const { isSmallDevice } = useContext(DataContext);

  return (
    <div className="flex flex-1 overflow-hidden">
      {!isSmallDevice && <SideMenu />}
      <WorkSpace />
    </div>
  );
};
