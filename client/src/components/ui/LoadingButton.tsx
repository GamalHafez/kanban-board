import { PulseLoader } from "react-spinners";
import { Button } from "./Button";

export const LoadingButton = ({
  loading,
  idleText,
  loadingText,
}: {
  loading: boolean;
  idleText: string;
  loadingText: string;
}) => {
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
