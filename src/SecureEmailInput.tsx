/** @jsxImportSource @emotion/react */
import * as React from "react";
import { useState, ChangeEvent, FC } from "react";
import { css } from "@emotion/react";

export type SecureEmailInputProps = {
  value?: string;
  onChange?: (email: string) => void;
  sanitize?: (input: string) => string;
  validateEmail?: (email: string, allowedDomains?: string[]) => string;
  placeholder?: string;
  className?: string;
  allowedDomains?: string[];
  css?: ReturnType<typeof css>;
  errorCss?: ReturnType<typeof css>;
};

const defaultSanitize = (input: string) =>
  input.replace(/[^a-zA-Z0-9@._-]/g, "");

const defaultValidateEmail = (email: string, allowedDomains?: string[]) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) return "Invalid email format";

  if (allowedDomains && allowedDomains.length > 0) {
    const domain = email.split("@")[1];
    if (!allowedDomains.includes(domain)) {
      return `Allowed domains: ${allowedDomains.join(", ")}`;
    }
  }

  return "";
};

const wrapperStyles = css`
  width: 100%;
  position: relative;
`;

const inputStyles = css`
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

const errorStyles = css`
  color: #f56565;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

export const SecureEmailInput: FC<SecureEmailInputProps> = ({
  value = "",
  onChange,
  sanitize = defaultSanitize,
  validateEmail = defaultValidateEmail,
  placeholder = "Enter email...",
  className = "",
  allowedDomains = [],
  css,
  errorCss,
}) => {
  const [email, setEmail] = useState(value);
  const [error, setError] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newEmail = sanitize(event.target.value.trim().toLowerCase());
    setEmail(newEmail);

    const validationError = validateEmail(newEmail, allowedDomains);
    setError(validationError);

    if (!validationError) onChange?.(newEmail);
  };

  return (
    <div
      className={className}
      css={[wrapperStyles]}
    >
      <input
        type="email"
        value={email}
        onChange={handleChange}
        placeholder={placeholder}
        css={[inputStyles, css]}
        aria-label={placeholder}
      />
      {error && <p css={[errorStyles, errorCss]}>{error}</p>}
    </div>
  );
};
