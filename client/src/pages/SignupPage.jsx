import { SignupForm } from "@components/forms";

export const SignupPage = () => {
  return (
    <div className="mx-auto flex h-full max-w-xl flex-col md:items-start items-center lg:items-start justify-center gap-8 place-self-center px-6 text-center md:w-2xl lg:w-2xl">
      <h2 className="text-main-blue text-2xl font-semibold capitalize md:text-2xl lg:text-3xl">
        Register and Unlock Your{" "}
        <strong className="text-main-blue-hover">Kanban</strong>
      </h2>

      <SignupForm />
    </div>
  );
};
