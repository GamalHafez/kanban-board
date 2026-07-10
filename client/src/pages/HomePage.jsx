import { useContext } from "react";
import { Link } from "react-router-dom";
import DataContext from "@context/data-context";

export const HomePage = () => {
  const {isAuthenticated} = useContext(DataContext);

  const cta = isAuthenticated
    ? { to: "/boards", text: "My Boards" }
    : { to: "/signup", text: "Get Started" };

  return (
    <div className="mx-auto flex h-full max-w-xl flex-col items-start justify-center place-self-center px-6 text-center md:w-2xl md:pl-0 lg:w-2xl lg:pl-0">
      <h1 className="text-main-blue text-2xl font-bold capitalize md:text-4xl lg:text-4xl">
        Kanban Board
      </h1>
      <p className="pr-15 text-start text-lg text-gray-600 md:pr-0 lg:pr-0">
        Boost productivity using customizable Kanban workflows.
      </p>
      <Link
        to={cta.to}
        className="bg-main-blue mt-6 rounded px-6 py-3 text-white transition hover:bg-blue-600"
      >
        {cta.text}
      </Link>
    </div>
  );
};
