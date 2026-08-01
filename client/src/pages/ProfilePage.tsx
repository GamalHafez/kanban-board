import { PersonalInformation } from "@/components/profile/PersonalInformation";
import DataContext from "@context/data-context";
import { useContext } from "react";

export const ProfilePage = () => {
  const { user } = useContext(DataContext);
  const { name, email } = user;

  return (
    <main className="mx-auto min-h-[calc(100vh-5rem)] w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8 pl-6 md:pl-0">
        <h1 className="md:text-heading-xl text-lg font-bold">My Profile</h1>
      </header>

      <PersonalInformation name={name} email={email} />

      <section className="space-y-8">
        {/* Stats cards */}

        {/* Recent boards */}

        {/* Recent tasks */}

        {/* Activity */}
      </section>
    </main>
  );
};
