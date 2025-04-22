import { useState } from "react";

const sanitizeValue = (value: string): string => {
  const temp = document.createElement("div");
  temp.textContent = value.trim();
  return temp.innerHTML;
};

export function useSanitizedForm<T extends Record<string, string>>(initialState: T) {
  const [values, setValues] = useState<T>(initialState);

  const setSanitizedValue = (key: keyof T, value: string) => {
    setValues((prev) => ({
      ...prev,
      [key]: sanitizeValue(value),
    }));
  };

  const handleChange =
    (key: keyof T) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSanitizedValue(key, e.target.value);
    };

  const sanitizeAll = (): T => {
    const sanitized: T = Object.keys(values).reduce((acc, key) => {
      acc[key as keyof T] = sanitizeValue(values[key]) as T[keyof T];
      return acc;
    }, {} as T);
    return sanitized;
  };

  return {
    values,
    setSanitizedValue,
    sanitizeAll,
    handleChange,
  };
}

