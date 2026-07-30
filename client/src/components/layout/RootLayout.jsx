import { Outlet, useLocation } from "react-router-dom";
import {
  HeaderBoardTitle,
  HeaderDropdown,
  HeaderIdentity,
} from "@components/header";
import Navbar from "./Navbar";
import { useState } from "react";
import { X } from "lucide-react";

const RootLayout = () => {
  const location = useLocation();
  const isBoardPage = location.pathname.startsWith("/boards");
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <main className="font-jakarta flex h-screen flex-col">
      <header className="text-main-blue border-lines-light flex h-[65px] shrink-0 items-center justify-between gap-10 border-b bg-white px-6 capitalize md:h-[97px] lg:h-[97px]">
        {/* Brand / Identity */}
        <HeaderIdentity />

        {/* Right side: hamburger + optional dropdown */}
        <div className="flex w-full items-center justify-between md:flex-row lg:flex-row">
          {isBoardPage && (
            <div className="flex items-center justify-between gap-4">
              <HeaderBoardTitle />
              <HeaderDropdown />
            </div>
          )}

          <div className="ml-auto hidden md:flex">
            <Navbar />
          </div>

          <button
            className="text-main-blue hover:bg-brand-50 ml-auto rounded-md p-2 md:hidden"
            aria-label="Open navigation"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {isNavOpen && (
          <div
            className={`fixed inset-y-15 right-0 z-50 flex h-2/6 w-64 transform flex-col bg-white shadow-xl transition-transform duration-300 ease-in-out md:hidden ${isNavOpen ? "translate-x-0" : "translate-x-full"}`}
          >
            {/* Close button */}
            <div className="border-lines-light flex items-center justify-end border-b p-3">
              <button
                className="text-main-blue hover:bg-brand-50 rounded-md p-2"
                onClick={() => setIsNavOpen(false)}
                aria-label="Close navigation"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Nav content */}
            <div className="mt-5 flex-1 p-4">
              <Navbar />
            </div>
          </div>
        )}
      </header>

      <Outlet />
    </main>
  );
};

export default RootLayout;
