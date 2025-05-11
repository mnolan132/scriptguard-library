/** @jsxImportSource @emotion/react */
import React from "react";
interface SecureFileUploadProps {
    onSafeFileSelect: (file: File) => void;
    allowedTypes?: string[];
    maxFileSizeMB?: number;
}
export declare const SecureFileUpload: React.FC<SecureFileUploadProps>;
export {};
//# sourceMappingURL=SecureFileUpload.d.ts.map