import { PulseLoader } from "react-spinners";
import { Button } from "@components/ui";

type LoadingButtonProps = {
  loading: boolean;
  idleText: string;
  loadingText: string;
};

export const LoadingButton = ({
  loading,
  idleText,
  loadingText,
}: LoadingButtonProps) => {
  return (
    <div className="mt-6 flex items-center justify-between gap-4">
      <Button
        size="sm"
        variant="secondary"
        className="rounded-sm uppercase disabled:cursor-not-allowed"
        type="submit"
        isDisabled={loading}
      >
        {loading ? loadingText : idleText}
      </Button>
      {loading && <PulseLoader color="#3b82f6" />}
    </div>
  );
};
