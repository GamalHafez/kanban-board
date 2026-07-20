import { Outlet, useLocation } from "react-router-dom";
import {
  HeaderBoardTitle,
  HeaderDropdown,
  HeaderIdentity,
} from "@components/header";
import Navbar from "./Navbar";

const RootLayout = () => {
  const location = useLocation();
  const isBoardPage = location.pathname.startsWith("/boards");

  return (
    <main className="font-jakarta flex h-screen flex-col">
      <header className="text-main-blue border-lines-light flex h-[65px] shrink-0 items-center justify-between gap-10 border-b bg-white px-6 capitalize md:h-[97px] lg:h-[97px]">
        <HeaderIdentity />
        <div className="flex w-full items-center justify-between">
          {isBoardPage && (
            <div className="flex items-center justify-between gap-4">
              <HeaderBoardTitle />
              <HeaderDropdown />
            </div>
          )}
          <Navbar />
        </div>
      </header>

      <Outlet />
    </main>
  );
};

export default RootLayout;
