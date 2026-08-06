import { AppProvider } from "@context/AppProvider.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "@components/layout/RootLayout";
import {
  HomePage,
  SignupPage,
  LogoutPage,
  LoginPage,
  BoardsPage,
  ProfilePage,
} from "@pages";
import { ProtectedRoute, GuestRoute } from "@/pages/auth-routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        element: <GuestRoute />,
        children: [
          {
            path: "/signup",
            element: <SignupPage />,
          },
          {
            path: "/login",
            element: <LoginPage />,
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/logout",
            element: <LogoutPage />,
          },
          {
            path: "/boards",
            element: <BoardsPage />,
          },
          {
            path: "/profile",
            element: <ProfilePage />,
          },
        ],
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
