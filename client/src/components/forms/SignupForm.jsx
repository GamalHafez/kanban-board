import { Button, Label, TextField } from "@components/ui";

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
      <TextField name="name" />

      <Label id="email" label="Email" className="mt-3" />
      <TextField name="email" />

      <Label id="password" label="Password" className="mt-3" />
      <TextField name="password" />

      <Label id="confirmPassword" label="Confirm Password" className="mt-3" />
      <TextField name="confirmPassword" />

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
