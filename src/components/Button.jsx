import { cva } from "class-variance-authority";

const button = cva("rounded-full px-6 duration-200 text-[13px] font-bold", {
  variants: {
    variant: {
      primary: "text-white bg-main-blue hover:bg-main-blue-hover",
      secondary: "text-main-blue bg-main-blue/12 hover:bg-main-blue/25",
      destructive: "text-white bg-red hover:bg-red-hover",
    },
    size: {
      sm: "h-10",
      lg: "h-12",
    },
    isFullWidth: {
      true: "w-full",
    },
    isDisabled: {
      true: "cursor-not-allowed opacity-25 hover:bg-main-blue",
    },
  },

  defaultVariants: {
    variant: "primary",
    size: "lg",
  },
});

export function Button({
  children,
  size,
  variant,
  isDisabled,
  className,
  isFullWidth,
  ...props
}) {
  return (
    <button
      className={button({ variant, size, isFullWidth, className, isDisabled })}
      {...props}
    >
      {children}
    </button>
  );
}
