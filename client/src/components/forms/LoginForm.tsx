import { checkAuth, login } from "@/services/auth.service";
import {
  Button,
  ErrorMessage,
  Label,
  PasswordInput,
  TextField,
} from "@components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@shared/schemas/auth.validators";
import { Ban } from "lucide-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { PulseLoader } from "react-spinners";
import z from "zod";
import DataContext from "@context/data-context";
import { useNavigate } from "react-router-dom";

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });
  const { setUser } = useContext(DataContext);
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setLoginError("");

    try {
      await login(data);
      await checkAuth(setUser);
      navigate("/");
    } catch (err) {
      if (err instanceof Error) {
        setLoginError(err.message);
      } else {
        setLoginError(String(err));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loginError && (
        <div className="flex w-full items-center gap-4 rounded-md bg-red-900 px-3 py-4">
          <Ban color="#ffffff" size={30} />
          <ErrorMessage message={loginError} className="text-sm text-white" />
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-start justify-center"
        onChange={() => setLoginError("")}
      >
        <Label id="email" label="Email" />
        <TextField
          {...register("email")}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Enter your email"
        />
        {errors.email && <ErrorMessage message={errors.email.message} />}

        <Label id="password" label="Password" className="mt-4" />
        <PasswordInput
          {...register("password")}
          name="password"
          autoComplete="current-password"
          placeholder="Enter your password"
        />
        {errors.password && <ErrorMessage message={errors.password.message} />}

        <div className="mt-6 flex items-center justify-between gap-4">
          <Button
            size="sm"
            variant="secondary"
            className="rounded-sm uppercase disabled:cursor-not-allowed"
            type="submit"
            isDisabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
          {loading && <PulseLoader color="#3b82f6" />}
        </div>
      </form>
    </>
  );
};
