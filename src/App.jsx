import { AppProvider } from "@context/AppProvider.jsx";
import { MainApp } from "@components/MainApp";

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
