import logo from "@assets/kanban.png";
import { useContext } from "react";
import DataContext from "@context/data-context.js";
import { Link } from "react-router-dom";

export function HeaderIdentity() {
  const { isSmallDevice } = useContext(DataContext);

  return (
    <Link
      to="/"
      className="border-lines-light flex self-stretch md:w-[270px] md:border-r md:pl-8 lg:w-[350px] lg:border-r-2 lg:pl-8"
    >
      <div className="flex items-center self-stretch md:gap-2 lg:gap-3">
        <img src={logo} alt="Kanban logo" className="w-7 md:w-8 lg:w-8" />
        {!isSmallDevice && (
          <h1 className="text-heading-l font-bold md:text-[22px] lg:text-[27px]">
            Kanban
          </h1>
        )}
      </div>
    </Link>
  );
}
