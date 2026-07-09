export const ErrorMessage = ({ message, className }) => {
  return (
    <p className={className || "mt-0.5 text-xs text-red-500"}>{message}</p>
  );
};
