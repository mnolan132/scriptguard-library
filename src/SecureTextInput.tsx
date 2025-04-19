/** @jsxImportSource @emotion/react */
import * as React from "react";
import { useState, useEffect, useRef, ChangeEvent, FC } from "react";
import { css } from "@emotion/react";

export type SecureTextInputProps = {
  value?: string;
  onChange?: (sanitizedValue: string) => void;
  allowedChars?: RegExp;
  maxLength?: number;
  sanitize?: (input: string) => string;
  placeholder?: string;
  className?: string;
  id: string;
  css?: ReturnType<typeof css>; // 👈 Allow passing Emotion CSS styles
};

const defaultSanitize = (input: string) => input.replace(/[<>/'"\\]/g, "");

const defaultInputStyles = css`
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  font-size: 1rem;
  width: 100%;
  transition: border-color 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 2px rgba(49, 130, 206, 0.4);
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

export const SecureTextInput: FC<SecureTextInputProps> = ({
  value = "",
  onChange,
  allowedChars = /^[a-zA-Z0-9\s]*$/,
  maxLength = 255,
  sanitize = defaultSanitize,
  placeholder = "Enter text...",
  className = "",
  id,
  css, // 👈 Optional custom styles
}) => {
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value;

    newValue = newValue
      .split("")
      .filter((char) => allowedChars.test(char))
      .join("");

    newValue = sanitize(newValue).slice(0, maxLength);

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
      css={[defaultInputStyles, css]} // 👈 Merge default + custom
    />
  );
};
