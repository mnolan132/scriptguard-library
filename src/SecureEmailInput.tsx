import * as React from "react";
import { useState, ChangeEvent, FC } from "react";

export type SecureEmailInputProps = {
    value?: string;
    onChange?: (email: string) => void;
    sanitize?: (input: string) => string;
    validateEmail?: (email: string, allowedDomains?: string[]) => string;
    placeholder?: string;
    className?: string;
    allowedDomains?: string[]; // Restrict emails to specific domains
  };
  
const defaultSanitize = (input: string) => 
  input.replace(/[^a-zA-Z0-9@._-]/g, ""); // Remove dangerous characters

const defaultValidateEmail = (email: string, allowedDomains?: string[]) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  if (!emailRegex.test(email)) return "Invalid email format";

  if (allowedDomains && allowedDomains.length > 0) {
    const domain = email.split("@")[1];
    if (!allowedDomains.includes(domain)) return `Allowed domains: ${allowedDomains.join(", ")}`;
  }

  return "";
};

const SecureEmailInput: FC<SecureEmailInputProps> = ({
  value = "",
  onChange,
  sanitize = defaultSanitize,
  validateEmail = defaultValidateEmail,
  placeholder = "Enter email...",
  className = "",
  allowedDomains = [],
}) => {
  const [email, setEmail] = useState(value);
  const [error, setError] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newEmail = sanitize(event.target.value.trim().toLowerCase()); // Trim & Normalize

    setEmail(newEmail);
    const validationError = validateEmail(newEmail, allowedDomains);
    setError(validationError);
    
    if (!validationError) onChange?.(newEmail);
  };

  return (
    <div className={`relative w-full ${className}`}>
      <input
        type="email"
        value={email}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full p-2 border rounded"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default SecureEmailInput;
