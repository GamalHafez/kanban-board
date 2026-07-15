import { Board } from "@/services/boards.service";

export const getSelectedBoard = (id: string, boards: Board[]) => {
  return boards.find((b) => b.id === id);
};
