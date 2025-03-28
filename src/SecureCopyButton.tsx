import * as React from "react";
import { useState, FC } from "react";

export type SecureCopyButtonProps = {
    text: string; // The text to copy
    className?: string; // Custom class names
    buttonText?: string; // Default button label (e.g., "Copy")
    copiedText?: string; // Text shown after copying (e.g., "Copied!")
    maskText?: boolean; // If true, hides the text (shows "••••••••••")
    autoClearClipboard?: boolean; // Clears clipboard after X ms
    clearTimeoutMs?: number; // Time (ms) before clipboard clears
  };
  
const SecureCopyButton: FC<SecureCopyButtonProps> = ({
  text,
  className = "",
  buttonText = "Copy",
  copiedText = "Copied!",
  maskText = false,
  autoClearClipboard = false,
  clearTimeoutMs = 3000,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      if (autoClearClipboard) {
        setTimeout(async () => {
          await navigator.clipboard.writeText(""); // Clears clipboard
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
    <div className={`relative ${className}`}>
      <span className="mr-2">
        {maskText ? "••••••••••" : text}
      </span>
      <button
        type="button"
        onClick={handleCopy}
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {copied ? copiedText : buttonText}
      </button>
    </div>
  );
};

export default SecureCopyButton;
