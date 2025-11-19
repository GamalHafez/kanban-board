import { Button, TextField, DropdownPrimitive } from "@/components";

export default function App() {
  return (
    <div className="font-jakarta text-heading-xl text-main-blue text-center font-bold">
      <Button variant="secondary" size="lg">
        Click me
      </Button>
      <TextField isInvalid></TextField>
      <DropdownPrimitive
        triggerComponent={() => (
          <Button variant="secondary" size="sm">
            Open Menu
          </Button>
        )}
        items={{
          item1: { label: "Edit", onClick: () => console.log("Edit clicked") },
          item2: {
            label: "Delete",
            onClick: () => console.log("Delete clicked"),
          },
        }}
      />
    </div>
  );
}
