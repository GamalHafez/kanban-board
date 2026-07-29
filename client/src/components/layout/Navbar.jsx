import { useContext } from "react";
import { Link } from "react-router-dom";
import DataContext from "@context/data-context";

const Navbar = () => {
  const { isAuthenticated } = useContext(DataContext);

  return (
    <nav className="flex  items-center gap-4 pl-0.5 md:ml-auto md:pr-10 md:pl-6 lg:pr-10 lg:pl-20">
      {isAuthenticated ? (
        <>
          <Link to="/boards">Boards</Link>
          <Link to="/profile">Profile</Link>
          <Link
            to="/logout"
            className="rounded-md bg-red-500 px-4 py-2 text-white transition duration-300 ease-in-out hover:bg-red-600"
          >
            Logout
          </Link>
        </>
      ) : (
        <>
          <Link
            to="/signup"
            className="rounded-md bg-blue-500 px-4 py-2 text-white transition duration-300 ease-in-out hover:bg-blue-600"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="rounded-md bg-gray-200 px-4 py-2 text-gray-800 transition duration-300 ease-in-out hover:bg-gray-300"
          >
            Sign In
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
