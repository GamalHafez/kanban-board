import { Button, TextField } from "@/components";

export default function App() {
  return (
    <div className="font-jakarta text-heading-xl text-main-blue text-center font-bold">
      <Button variant="secondary" size="lg">
        Click me
      </Button>
      <TextField isInvalid></TextField>
    </div>
  );
}
