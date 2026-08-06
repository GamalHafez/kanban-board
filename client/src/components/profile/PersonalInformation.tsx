type PersonalInformationProps = {
  name: string;
  email: string;
};
export const PersonalInformation = ({
  name,
  email,
}: PersonalInformationProps) => {
  return (
    <section className="border-lines-light dark:border-lines-dark dark:bg-dark-grey space-y-4 rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex flex-col mb-6">
        <h2 className="text-heading-m lg:text-lg font-bold">Personal Information</h2>
        <p className="text-body-m lg:text-base text-medium-grey">Your account details.</p>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-medium-grey mb-1 text-xs font-semibold tracking-wider uppercase">
            Name
          </p>
          <h3 className="md:text-heading-m text-sm font-bold">{name}</h3>
        </div>

        <div>
          <p className="text-medium-grey mb-1 text-xs font-semibold tracking-wider uppercase">
            Email
          </p>
          <h3 className="md:text-heading-m text-sm font-semibold break-all">{email}</h3>
        </div>
      </div>
    </section>
  );
};
