import { FC } from "react";
import { css } from "@emotion/react";
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
    css?: ReturnType<typeof css>;
    toggleCss?: ReturnType<typeof css>;
};
export declare const SecurePasswordInput: FC<SecurePasswordInputProps>;
//# sourceMappingURL=SecurePasswordInput.d.ts.map