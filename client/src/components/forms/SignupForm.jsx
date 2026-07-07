import { Button, Label, PasswordInput, TextField } from "@components/ui";

export const SignupForm = () => {
  const handleSignup = (e) => {
    e.preventDefault();
  };

  return (
    <form
      className="flex flex-col items-start justify-center"
      onSubmit={handleSignup}
    >
      <Label id="name" label="Name" />
      <TextField name="name" autoComplete="name" placeholder="Ex: Omar Gamal" />

      <Label id="email" label="Email" className="mt-3" />
      <TextField
        name="email"
        type="email"
        autoComplete="email"
        placeholder="Ex: omar.gamal@example.com"
      />

      <Label
        id="password"
        autoComplete="new-password"
        label="Password"
        className="mt-3"
      />
      <PasswordInput name="password" placeholder="Enter your password" />

      <Label
        id="confirmPassword"
        autoComplete="new-password"
        label="Confirm Password"
        className="mt-3"
      />
      <PasswordInput
        name="confirmPassword"
        placeholder="Confirm your password"
      />

      <Button
        size="sm"
        variant="secondary"
        className="mt-6 rounded-sm"
        type="submit"
      >
        Create Account
      </Button>
    </form>
  );
};
