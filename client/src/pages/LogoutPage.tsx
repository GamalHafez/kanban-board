import { LogOut } from "lucide-react";
// @ts-expect-error
import { Button } from "@components/ui";
import { useNavigate } from "react-router-dom";

export const LogoutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex h-full max-w-xl flex-col items-center justify-center gap-5 place-self-center px-6 text-center md:w-2xl lg:w-2xl">
      <LogOut className="text-red-900" size={50} />

      <div>
        <h2 className="text-2xl text-red-900">
          Are you sure you want to <span className="font-bold">log out?</span>
        </h2>
        <p className="text-sm text-gray-600">
          You'll need to sign in again to access your boards.
        </p>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          className="text-body-l h-10 cursor-pointer rounded-full px-6 font-bold text-red-900 duration-200"
          onClick={() => navigate("/")}
        >
          Cancel
        </button>
        <Button
          size="sm"
          className="bg-red-900 hover:bg-red-900/85"
          onClick={() => {}}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};
