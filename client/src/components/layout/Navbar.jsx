import { Link } from "react-router-dom";

const Navbar = () => {
  const isAuthenticated = false; // WIll be replaced

  return (
    <nav className="flex items-center gap-4 pr-10 pl-0.5 md:pl-6 lg:pl-20">
      {isAuthenticated ? (
        <>
          <Link to="/boards">Boards</Link>
          <Link to="/profile">Profile</Link>
          <Link
            to="/signin"
            className="rounded-md bg-red-500 px-4 py-2 text-white transition duration-300 ease-in-out hover:bg-red-600"
          >
            Sign Out
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
            to="/signin"
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
