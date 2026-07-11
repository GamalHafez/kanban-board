import {
  Button,
  ErrorMessage,
  Label,
  PasswordInput,
  TextField,
} from "@components/ui";
import { useForm } from "react-hook-form";
import { signUpSchema } from "@shared/schemas/auth.validators.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { createUser } from "@/services/auth.service.js";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { Ban } from "lucide-react";

export const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    mode: "onTouched",
  });
  const navigate = useNavigate();
  const [signupError, setSignupError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    setSignupError("");

    try {
      await createUser(data);
      navigate("/");
    } catch (error) {
      setSignupError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {signupError && (
        <div className="flex w-full items-center gap-4 rounded-md bg-red-900 px-3 py-4">
          <Ban color="#ffffff" size={30} />
          <ErrorMessage message={signupError} className="text-sm text-white" />
        </div>
      )}

      <form
        className="flex flex-col items-start justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Label id="name" label="Name" />
        <TextField
          {...register("name")}
          name="name"
          autoComplete="name"
          placeholder="Ex: Omar Gamal"
        />
        {errors.name && <ErrorMessage message={errors.name.message} />}

        <Label id="email" label="Email" className="mt-4" />
        <TextField
          name="email"
          type="email"
          {...register("email")}
          autoComplete="email"
          placeholder="Ex: omar.gamal@example.com"
        />
        {errors.email && <ErrorMessage message={errors.email.message} />}

        <Label id="password" label="Password" className="mt-4" />
        <PasswordInput
          {...register("password")}
          name="password"
          placeholder="Enter your password"
        />
        {errors.password && <ErrorMessage message={errors.password.message} />}

        <Label
          id="confirmPassword"
          autoComplete="new-password"
          label="Confirm Password"
          className="mt-4"
        />
        <PasswordInput
          {...register("confirmPassword")}
          name="confirmPassword"
          placeholder="Confirm your password"
        />
        {errors.confirmPassword && (
          <ErrorMessage message={errors.confirmPassword.message} />
        )}

        <div className="mt-6 flex items-center justify-between gap-4">
          <Button
            size="sm"
            variant="secondary"
            className="rounded-sm disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
            type="submit"
            disabled={loading}
            onClick={() => setSignupError("")}
          >
            {loading ? "Creating account..." : "Create Account"}{" "}
          </Button>
          {loading && <PulseLoader color="#3b82f6" />}
        </div>
      </form>
    </>
  );
};
