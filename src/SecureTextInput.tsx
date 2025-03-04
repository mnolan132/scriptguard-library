import * as React from "react";
import { useState, ChangeEvent, type FC } from "react";

export interface SecureTextInputProps {
  value?: string;
  onChange?: (sanitizedValue: string) => void;
  allowedChars?: RegExp;
  maxLength?: number;
  sanitize?: (input: string) => string;
  placeholder?: string;
  className?: string;
}

const defaultSanitize = (input: string) => {
  return input.replace(/[<>/'"\\]/g, ""); // Remove potential XSS characters
};

const SecureTextInput: React.FC<SecureTextInputProps> = ({
  value = "",
  onChange,
  allowedChars = /^[a-zA-Z0-9\s]*$/, // Default: Allow alphanumeric and spaces
  maxLength = 255,
  sanitize = defaultSanitize,
  placeholder = "Enter text...",
  className = "",
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value;

    if (!allowedChars.test(newValue)) return; // Enforce character filtering

    newValue = sanitize(newValue); // Sanitize input
    newValue = newValue.slice(0, maxLength); // Enforce max length

    setInputValue(newValue);
    onChange?.(newValue);
  };

  return (
    <input
      type="text"
      value={inputValue}
      onChange={handleChange}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default SecureTextInput;
