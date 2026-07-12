import { Ban } from "lucide-react";
import { ErrorMessage } from "@components/ui";

export const AuthErrorAlert = ({ message }: { message: string }) => {
  return (
    <div className="flex w-full items-center gap-4 rounded-md bg-red-900 px-3 py-4">
      <Ban color="#ffffff" size={30} />
      <ErrorMessage message={message} className="text-sm text-white" />
    </div>
  );
};
