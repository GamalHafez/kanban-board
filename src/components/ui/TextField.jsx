import clsx from "clsx";

/**
 * @param {Object} props
 * @param {string} props.placeholder
 * @param {boolean} props.isInvalid
 * @param {string} props.name
 * @param {boolean} props.required
 * @param {string} props.defaultValue
 * @param {string} props.label
 * @returns {JSX.Element}
 */

export function TextField({ isInvalid, name, ...props }) {
  return (
    <div className="relative flex flex-1 flex-col gap-1 md:min-w-80 lg:min-w-80">
      {isInvalid && (
        <span className="text-body-l text-red absolute top-1/2 right-4 -translate-y-1/2 font-bold">
          Can’t be empty
        </span>
      )}
      <input
        type="text"
        id={name}
        name={name}
        {...props}
        className={clsx(
          "border-medium-grey/25 text-body-l w-full rounded-sm border py-2 pl-4 font-semibold text-black outline-none placeholder:font-medium placeholder:tracking-wider",
          {
            "border-b-red border-2 pr-32": isInvalid,
            "pr-4": !isInvalid,
          },
        )}
      />
    </div>
  );
}
