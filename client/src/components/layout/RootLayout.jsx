import { Outlet } from "react-router-dom";
import { HeaderIdentity } from "@components/header";
import Navbar from "./Navbar";

const RootLayout = () => {
  return (
    <main className="font-jakarta flex h-screen flex-col">
      <header className="text-main-blue border-lines-light flex h-[65px] shrink-0 items-center justify-between border-b bg-white capitalize md:h-[97px] lg:h-[97px]">
        <HeaderIdentity />
        <Navbar />
      </header>

      <Outlet />
    </main>
  );
};

export default RootLayout;
