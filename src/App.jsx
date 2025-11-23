import { Header, SideMenu, WorkSpace } from "@components";
import AppContext from "@context/AppContext.jsx";

export default function App() {
  return (
    <AppContext>
      <main className="font-jakarta flex h-screen flex-col">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <SideMenu />
          <WorkSpace />
        </div>
      </main>
    </AppContext>
  );
}
