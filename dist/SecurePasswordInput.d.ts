import { FC } from "react";
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
};
export declare const SecurePasswordInput: FC<SecurePasswordInputProps>;
//# sourceMappingURL=SecurePasswordInput.d.ts.map