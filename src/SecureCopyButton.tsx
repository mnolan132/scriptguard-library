/** @jsxImportSource @emotion/react */
import * as React from "react";
import { useState, FC } from "react";
import { css } from "@emotion/react";

export type SecureCopyButtonProps = {
  text: string;
  className?: string;
  buttonText?: string;
  copiedText?: string;
  maskText?: boolean;
  autoClearClipboard?: boolean;
  clearTimeoutMs?: number;
  textCss?: ReturnType<typeof css>;
  buttonCss?: ReturnType<typeof css>;
};

const textStyles = css`
  margin-right: 0.5rem;
  font-family: monospace;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const buttonStyles = css`
  padding: 0.4rem 0.75rem;
  background-color: #4299e1;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #3182ce;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.5);
  }
`;

export const SecureCopyButton: FC<SecureCopyButtonProps> = ({
  text,
  className = "",
  buttonText = "Copy",
  copiedText = "Copied!",
  maskText = false,
  autoClearClipboard = false,
  clearTimeoutMs = 3000,
  textCss,
  buttonCss,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      if (autoClearClipboard) {
        setTimeout(async () => {
          await navigator.clipboard.writeText("");
          setCopied(false);
        }, clearTimeoutMs);
      } else {
        setTimeout(() => setCopied(false), 1500);
      }
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  return (
    <div className={`flex items-center ${className}`}>
      <span css={[textStyles, textCss]}>
        {maskText ? "••••••••••" : text}
      </span>
      <button type="button" onClick={handleCopy} css={[buttonStyles, buttonCss]}>
        {copied ? copiedText : buttonText}
      </button>
    </div>
  );
};
