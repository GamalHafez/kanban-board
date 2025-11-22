import { Header, SideMenu } from "@components";

export default function App() {
  return (
    <main className="font-jakarta flex h-screen flex-col">
      <Header boardName="Test Board" />
      <div className="flex flex-1 overflow-hidden">
        <SideMenu />
      </div>
    </main>
  );
}
