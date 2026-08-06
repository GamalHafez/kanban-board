import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useContext, useState } from "react";
import { PulseLoader } from "react-spinners";
import { Button } from "@/components/ui";
import DataContext from "@/context/data-context";
import { logout, UserResponse } from "@/services/auth.service";

export const LogoutPage = () => {
  const { setUser } = useContext(DataContext) as {
    setUser: React.Dispatch<React.SetStateAction<UserResponse | null>>;
  };
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);

    try {
      await logout();
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error(error); // A todo task later
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex h-full max-w-xl flex-col items-center justify-center gap-5 place-self-center px-6 text-center md:w-2xl lg:w-2xl">
      {loading ? (
        <PulseLoader color="var(--color-red-hover)" />
      ) : (
        <LogOut className="text-red-900" size={50} />
      )}

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
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};
