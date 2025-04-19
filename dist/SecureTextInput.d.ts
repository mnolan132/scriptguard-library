import { FC } from "react";
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
    css?: ReturnType<typeof css>;
};
export declare const SecureTextInput: FC<SecureTextInputProps>;
//# sourceMappingURL=SecureTextInput.d.ts.map