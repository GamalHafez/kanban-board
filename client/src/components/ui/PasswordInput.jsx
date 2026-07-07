import { useState } from "react";
import { TextField } from ".";
import { Eye, EyeOff } from "lucide-react";

export const PasswordInput = ({ name, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <TextField
        type={showPassword ? "text" : "password"}
        name={name}
        autoComplete="new-password"
        placeholder={placeholder}
      />
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-sm border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        onClick={() => setShowPassword(!showPassword)}
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? <Eye /> : <EyeOff />}
      </button>
    </div>
  );
};
