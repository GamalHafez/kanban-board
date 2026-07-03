import { BoardSvg } from "@components/board";
import clsx from "clsx";

const BOARD_BUTTON_CLSX = (isSelected) =>
  clsx(
    "flex capitalize items-center text-heading-m text-medium-grey max-w-full cursor-pointer gap-4 rounded-e-full px-8 py-4 font-bold",
    isSelected
      ? "bg-main-blue text-white"
      : "hover:bg-main-blue/10 hover:text-main-blue transition duration-300 ease-in-out",
  );

/**
 *
 * @param {Object} props
 * @param {boolean} props.isSelected
 * @param {Function} props.onClick
 * @param {string} props.name
 * @returns {JSX.Element}
 */
export function BoardButton({ isSelected, onClick, name }) {
  return (
    <button className={BOARD_BUTTON_CLSX(isSelected)} onClick={onClick}>
      <BoardSvg color={isSelected ? "white" : ""} />
      {name}
    </button>
  );
}
