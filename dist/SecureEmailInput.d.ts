import { FC } from "react";
export type SecureEmailInputProps = {
    value?: string;
    onChange?: (email: string) => void;
    sanitize?: (input: string) => string;
    validateEmail?: (email: string, allowedDomains?: string[]) => string;
    placeholder?: string;
    className?: string;
    allowedDomains?: string[];
};
export declare const SecureEmailInput: FC<SecureEmailInputProps>;
//# sourceMappingURL=SecureEmailInput.d.ts.map