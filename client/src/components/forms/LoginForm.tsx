import { login } from "@/services/auth.service";
import { ErrorMessage, Label, PasswordInput, TextField } from "@components/ui";
import {
  AuthRedirect,
  LoadingButton,
  AuthErrorAlert,
} from "@components/ui/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@shared/schemas/auth.validators";
import { useForm } from "react-hook-form";
import z from "zod";
import { useAuthAction } from "@/hooks";

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
  const { loading, error, setError, execute } = useAuthAction();

  const onSubmit = (data: LoginFormData) => {
    execute(() => login(data));
  };

  return (
    <>
      {error && <AuthErrorAlert message={error} />}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-start justify-center"
        onChange={() => setError("")}
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

        <LoadingButton
          loading={loading}
          idleText="Login"
          loadingText="Logging in..."
        />
      </form>

      <AuthRedirect
        message="Don’t have an account?"
        actionLabel="Sign up"
        actionHref="/signup"
      />
    </>
  );
};
