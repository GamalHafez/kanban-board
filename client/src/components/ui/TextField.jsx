import clsx from "clsx";
import DataContext from "@context/data-context";
import { useContext } from "react";

export function TextField({ isInvalid = false, name, ...props }) {
  const { isSmallDevice } = useContext(DataContext);

  return (
    <div
      className={clsx("relative flex flex-1 flex-col gap-1", {
        "min-w-full": isSmallDevice,
        "md:min-w-80 lg:min-w-80": !isSmallDevice,
      })}
    >
      {isInvalid && (
        <span
          className={clsx(
            "text-red absolute right-4 -translate-y-1/2 font-bold",
            "text-body-m top-1/2", // default for mobile
            "md:text-body-l lg:text-body-l", // upscale for bigger screens
          )}
        >
          Can’t be empty
        </span>
      )}

      <input
        type="text"
        id={name}
        name={name}
        {...props}
        className={clsx(
          "w-full rounded-sm border py-2 pl-3 text-black outline-none",
          "text-body-m placeholder:text-sm",
          "md:text-body-l md:placeholder:text-base",
          "font-semibold placeholder:font-medium placeholder:tracking-wider",
          {
            "border-b-red pr-28": isInvalid,
            "pr-4": !isInvalid,
          },
        )}
      />
    </div>
  );
}
