import * as React from "react";
import { useState, FC } from "react";
import { SecurePasswordInput } from "./SecurePasswordInput"; // Adjust path as needed

type PasswordGeneratorProps = {
  minLength?: number;
  maxLength?: number;
  onGenerate?: (password: string) => void;
  showStrengthMeter?: boolean;
};

const generatePassword = (
    length: number,
    options = {
      upper: true,
      lower: true,
      numbers: true,
      symbols: true,
    }
  ): string => {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  
    const charSets: string[] = [];
    const guaranteedChars: string[] = [];
  
    if (options.upper) {
      charSets.push(upper);
      guaranteedChars.push(upper[Math.floor(Math.random() * upper.length)]);
    }
    if (options.lower) {
      charSets.push(lower);
      guaranteedChars.push(lower[Math.floor(Math.random() * lower.length)]);
    }
    if (options.numbers) {
      charSets.push(numbers);
      guaranteedChars.push(numbers[Math.floor(Math.random() * numbers.length)]);
    }
    if (options.symbols) {
      charSets.push(symbols);
      guaranteedChars.push(symbols[Math.floor(Math.random() * symbols.length)]);
    }
  
    const allChars = charSets.join("");
    if (!allChars) return "";
  
    const remainingLength = Math.max(length - guaranteedChars.length, 0);
    const remainingChars: string[] = [];
  
    for (let i = 0; i < remainingLength; i++) {
      remainingChars.push(allChars[Math.floor(Math.random() * allChars.length)]);
    }
  
    const fullPassword = [...guaranteedChars, ...remainingChars];
  
    for (let i = fullPassword.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [fullPassword[i], fullPassword[j]] = [fullPassword[j], fullPassword[i]];
    }
  
    return fullPassword.join("");
  };
  

export const PasswordGenerator: FC<PasswordGeneratorProps> = ({
  minLength = 12,
  maxLength = 20,
  onGenerate,
  showStrengthMeter = true,
}) => {
  const [password, setPassword] = useState("");

  const handleGenerate = () => {
    const generated = generatePassword(minLength);
    setPassword(generated);
    onGenerate?.(generated);
  };

  return (
    <div>
      <SecurePasswordInput
        value={password}
        onChange={setPassword}
        minLength={minLength}
        maxLength={maxLength}
        showStrengthMeter={showStrengthMeter}
      />
      <button
        type="button"
        onClick={handleGenerate}
      >
        Generate Password
      </button>
    </div>
  );
};
