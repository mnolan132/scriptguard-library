/** @jsxImportSource @emotion/react */
import React, { useRef, useState } from "react";
import styled from "@emotion/styled";
import { validateFile } from "./helpers/validateFile";

// Import your validation helpers
// import { validateFile } from './validateFile';

interface SecureFileUploadProps {
  onSafeFileSelect: (file: File) => void;
  allowedTypes?: string[];
  maxFileSizeMB?: number;
}

const FileInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 2px dashed #ccc;
  padding: 24px;
  border-radius: 12px;
  cursor: pointer;
  background-color: #fafafa;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const UploadButton = styled.button`
  padding: 10px 20px;
  background-color: #4f46e5;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4338ca;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.9rem;
  margin-top: 8px;
`;

export const SecureFileUpload: React.FC<SecureFileUploadProps> = ({
  onSafeFileSelect,
  allowedTypes,
  maxFileSizeMB,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Assuming validateFile is your async validation function
    const validationError = await validateFile(file, allowedTypes, maxFileSizeMB);

    if (validationError) {
      setError(validationError);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    setError(null);
    onSafeFileSelect(file);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <FileInputWrapper onClick={handleUploadClick}>
      <HiddenInput
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        accept={allowedTypes?.join(",")}
      />
      <UploadButton>Select File</UploadButton>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FileInputWrapper>
  );
};

