import { AppProvider } from "@context/AppProvider.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "@components/layout/RootLayout";
import { HomePage, SignupPage, LogoutPage, LoginPage } from "@pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/logout",
        element: <LogoutPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);

export default function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}
