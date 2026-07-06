import logo from "@assets/kanban.png";
import { useContext } from "react";
import DataContext from "@context/data-context.js";
import { Link } from "react-router-dom";

export function HeaderIdentity() {
  const { isSmallDevice } = useContext(DataContext);

  return (
    <div
      to="/"
      className="border-lines-light flex self-stretch border-l pl-4 md:w-[280px] md:border-r md:pl-8 lg:w-[280px] lg:border-r-2 lg:pl-8"
    >
      <Link className="flex items-center gap-1.5 self-stretch md:gap-2 lg:gap-3">
        <img src={logo} alt="Kanban logo" className="w-7 md:w-8 lg:w-8" />
        <h1 className="text-heading-l font-bold md:text-[22px] lg:text-[27px]">
          {!isSmallDevice && "Kanban"}
        </h1>
      </Link>
    </div>
  );
}
