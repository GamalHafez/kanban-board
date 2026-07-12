import {
  ErrorMessage,
  Label,
  LoadingButton,
  PasswordInput,
  TextField,
} from "@components/ui";
import { useForm } from "react-hook-form";
import { signUpSchema } from "@shared/schemas/auth.validators.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthAction } from "@/hooks";
import { createUser } from "@/services/auth.service";

export const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    mode: "onTouched",
  });
  const { loading, error, setError, execute } = useAuthAction();

  const onSubmit = (data) => {
    execute(() => createUser(data));
  };

  return (
    <>
      {error && <AuthErrorAlert message={error} />}

      <form
        className="flex flex-col items-start justify-center"
        onSubmit={handleSubmit(onSubmit)}
        onChange={() => setError("")}
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

        <LoadingButton
          loading={loading}
          idleText="Create Account"
          loadingText="Creating account..."
        />
      </form>
    </>
  );
};
