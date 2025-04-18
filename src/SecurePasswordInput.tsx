import * as React from "react";
import { useState, ChangeEvent, FC } from "react";

export type SecurePasswordInputProps = {
    value?: string;
    onChange?: (password: string) => void;
    minLength?: number;
    maxLength?: number;
    sanitize?: (input: string) => string;
    placeholder?: string;
    className?: string;
    showStrengthMeter?: boolean;
    preventPaste?: boolean;
  };
  
const defaultSanitize = (input: string) => input.replace(/\s/g, ""); // Remove spaces

const defaultStrengthCheck = (password: string) => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[@$!%*?&#]/.test(password)) strength++;
  return strength; // Returns a value from 0 (weak) to 5 (strong)
};

export const SecurePasswordInput: FC<SecurePasswordInputProps> = ({
  value = "",
  onChange,
  minLength = 8,
  maxLength = 64,
  sanitize = defaultSanitize,
  placeholder = "Enter password...",
  className = "",
  showStrengthMeter = true,
  preventPaste = false,
}) => {
  const password = value || "";
  const [visible, setVisible] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newPassword = sanitize(event.target.value);
    newPassword = newPassword.slice(0, maxLength); // Enforce max length
    onChange?.(newPassword);
  };

  const strength = defaultStrengthCheck(password);

  return (
    <div className={`relative w-full ${className}`}>
      <input
        type={visible ? "text" : "password"}
        value={password}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full p-2 border rounded"
        minLength={minLength}
        maxLength={maxLength}
        onPaste={preventPaste ? (e) => e.preventDefault() : undefined} // Prevent pasting if enabled
      />
      <button
        type="button"
        className="absolute right-2 top-2 text-gray-500"
        onClick={() => setVisible((prev) => !prev)}
      >
        {visible ? "🙈" : "👁️"}
      </button>

      {showStrengthMeter && (
        <div className="mt-2 w-full h-2 bg-gray-300 rounded">
          <div
            className={`h-full ${
              strength === 5
                ? "bg-green-500"
                : strength >= 3
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
            style={{ width: `${(strength / 5) * 100}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};