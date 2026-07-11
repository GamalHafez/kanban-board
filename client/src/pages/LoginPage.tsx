import { LoginForm } from "@/components/forms";

export const LoginPage = () => {
  return (
    <div className="mx-auto flex h-full max-w-xl flex-col items-start justify-center gap-8 place-self-center px-6 text-center md:w-2xl lg:w-2xl">
      <h2 className="text-main-blue text-2xl font-semibold capitalize md:text-2xl lg:text-3xl">
        Log In and Continue Organizing
      </h2>

      <LoginForm />
    </div>
  );
};
