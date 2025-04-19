/** @jsxImportSource @emotion/react */
import * as React from "react";
import { useState, ChangeEvent, FC, useEffect } from "react";
import { css } from "@emotion/react";

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
  css?: ReturnType<typeof css>;
  toggleCss?: ReturnType<typeof css>;
};

const defaultSanitize = (input: string) => input.replace(/\s/g, "");

const defaultStrengthCheck = (password: string) => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[@$!%*?&#]/.test(password)) strength++;
  return strength;
};

const wrapperStyles = css`
  position: relative;
  width: 100%;
`;

const inputStyles = css`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  font-size: 1rem;
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

const toggleButtonStyles = css`
  position: absolute;
  top: 0.5rem;
  right: 0.75rem;
  background: transparent;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: #718096;

  &:hover {
    color: #4a5568;
  }
`;

const strengthBarStyles = css`
  margin-top: 0.5rem;
  width: 100%;
  height: 0.5rem;
  background-color: #e2e8f0;
  border-radius: 0.375rem;
  overflow: hidden;
`;

const getStrengthColor = (strength: number) => {
  if (strength === 5) return "#48bb78";
  if (strength >= 3) return "#ecc94b";
  return "#f56565";
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
  css,
  toggleCss,
}) => {
  const [internalValue, setInternalValue] = useState(value);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newPassword = sanitize(event.target.value).slice(0, maxLength);
    setInternalValue(newPassword);
    onChange?.(newPassword);
  };

  const strength = defaultStrengthCheck(internalValue);

  return (
    <div css={wrapperStyles} className={className}>
      <input
        type={visible ? "text" : "password"}
        value={internalValue}
        onChange={handleChange}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        onPaste={preventPaste ? (e) => e.preventDefault() : undefined}
        css={[inputStyles, css]}
        aria-label={placeholder}
      />
      <button
        type="button"
        onClick={() => setVisible((prev) => !prev)}
        css={[toggleButtonStyles, toggleCss]}
        aria-label="Toggle password visibility"
      >
        {visible ? "🙈" : "👁️"}
      </button>

      {showStrengthMeter && (
        <div css={strengthBarStyles}>
          <div
            style={{
              width: `${(strength / 5) * 100}%`,
              height: "100%",
              backgroundColor: getStrengthColor(strength),
            }}
          ></div>
        </div>
      )}
    </div>
  );
};
