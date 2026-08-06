import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataContext from "@context/data-context";
import { checkAuth } from "@/services/auth.service";

export const useAuthAction = () => {
  const { setUser } = useContext(DataContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const execute = async (request: () => Promise<any>) => {
    setLoading(true);
    setError("");

    try {
      await request();
      await checkAuth(setUser);
      navigate("/");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, setError, execute };
};
