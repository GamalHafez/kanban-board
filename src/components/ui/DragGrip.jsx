import dnd from "@assets/drag.png";

export function DragGrip({ listeners }) {
  return (
    <img
      src={dnd}
      {...listeners}
      className="absolute -top-2 -left-1 h-5 w-5 touch-none active:opacity-100"
    />
  );
}
