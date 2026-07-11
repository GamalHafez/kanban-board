export function Label({ id, label, className = "" }) {
  return (
    <label
      className={`text-heading-s text-medium-grey block cursor-pointer font-bold ${className || ""}`}
      htmlFor={id}
    >
      {label}
    </label>
  );
}
