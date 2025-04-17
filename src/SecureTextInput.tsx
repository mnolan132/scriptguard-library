import * as React from "react";
import { useState, useEffect, useRef, ChangeEvent, FC } from "react";

export type SecureTextInputProps = {
  value?: string;
  onChange?: (sanitizedValue: string) => void;
  allowedChars?: RegExp;
  maxLength?: number;
  sanitize?: (input: string) => string;
  placeholder?: string;
  className?: string;
  id: string
}

const defaultSanitize = (input: string) => input.replace(/[<>/'"\\]/g, ""); // Remove potential XSS characters

export const SecureTextInput: FC<SecureTextInputProps> = ({
  value = "",
  onChange,
  allowedChars = /^[a-zA-Z0-9\s]*$/, // Allow alphanumeric and spaces
  maxLength = 255,
  sanitize = defaultSanitize,
  placeholder = "Enter text...",
  className = "",
  id,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value;

    newValue = newValue.split("").filter((char) => allowedChars.test(char)).join("");

    newValue = sanitize(newValue).slice(0, maxLength); // Sanitize & enforce max length

    if (newValue !== inputValue) {
      setInputValue(newValue);
      onChange?.(newValue);
    }
  };

  return (
    <input
      ref={inputRef}
      type="text"
      value={inputValue}
      onChange={handleChange}
      placeholder={placeholder}
      className={className}
      id={id}
      aria-label={placeholder}
    />
  );
};