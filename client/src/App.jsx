import { AppProvider } from "@context/AppProvider.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "@components/layout/RootLayout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [],
  },
]);

export default function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}
