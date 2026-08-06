import { useContext } from "react";
import { Link } from "react-router-dom";
import DataContext from "@context/data-context";

export const HomePage = () => {
  const { user, isAuthenticated } = useContext(DataContext);

  const cta = isAuthenticated
    ? { to: "/boards", text: "My Boards" }
    : { to: "/signup", text: "Get Started" };

  return (
    <div className="mx-auto flex h-full max-w-xl flex-col items-center justify-center place-self-center px-6 text-center md:w-2xl md:items-start md:pl-0 lg:w-2xl lg:items-start lg:pl-0">
      <h1 className="text-main-blue text-2xl font-bold capitalize md:text-4xl lg:text-4xl">
        Kanban Board
      </h1>
      <p className="w-2xs text-center text-lg text-gray-600 md:text-start lg:text-start">
        {isAuthenticated && user ? (
          <>
            Welcome, <span className="font-semibold">{user.name}</span>! Your
            boards are ready.
          </>
        ) : (
          "Boost productivity using customizable Kanban workflows."
        )}
      </p>

      <Link
        to={cta.to}
        className="bg-main-blue mt-10 rounded px-6 py-3 text-white transition hover:bg-blue-600 md:mt-6 lg:mt-6"
      >
        {cta.text}
      </Link>
    </div>
  );
};
