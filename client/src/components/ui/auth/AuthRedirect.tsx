import { Link } from "react-router-dom";

type AuthRedirectProps = {
  message: string;
  actionLabel: string;
  actionHref: string;
};

export const AuthRedirect = ({
  message,
  actionLabel,
  actionHref,
}: AuthRedirectProps) => {
  return (
    <p className="text-sm font-semibold text-gray-600">
      {message}
      <Link
        to={actionHref}
        className="ml-2 font-bold text-gray-950 transition duration-300 ease-in-out hover:underline"
      >
        {actionLabel}
      </Link>
    </p>
  );
};
