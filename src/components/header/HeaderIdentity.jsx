import logo from "@assets/kanban.png";
import { useContext } from "react";
import DataContext from "@context/data-context.js";

export function HeaderIdentity() {
  const { isSmallDevice } = useContext(DataContext);

  return (
    <div className="border-lines-light flex items-center gap-1.5 self-stretch border-b pl-4 lg:w-[280px] lg:gap-3 lg:border-r lg:pl-8">
      <img src={logo} alt="Kanban logo" className="w-7 lg:w-8" />
      <h1 className="text-heading-l font-bold lg:text-[32px]">
        {!isSmallDevice && "Kanban"}
      </h1>
    </div>
  );
}
