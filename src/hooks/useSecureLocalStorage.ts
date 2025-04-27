import { useState } from "react";
import CryptoJS from "crypto-js";

function encryptData(data: any, secret: string) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secret).toString();
}

function decryptData(cipherText: string, secret: string) {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, secret);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  } catch (error) {
    console.error("Failed to decrypt localStorage data:", error);
    return null;
  }
}

export function useSecureLocalStorage<T>(
  key: string,
  initialValue: T,
  secret: string
) {
  if (!secret) {
    throw new Error("useSecureLocalStorage: A secret key must be provided.");
  }

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? decryptData(item, secret) : initialValue;
    } catch (error) {
      console.error("Error reading secure localStorage key:", error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      const encryptedValue = encryptData(value, secret);
      localStorage.setItem(key, encryptedValue);
      setStoredValue(value);
    } catch (error) {
      console.error("Error setting secure localStorage key:", error);
    }
  };

  const removeValue = () => {
    try {
      localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error("Error removing secure localStorage key:", error);
    }
  };

  return { value: storedValue, setValue, removeValue };
}
