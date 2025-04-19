import { FC } from "react";
import { css } from "@emotion/react";
export type SecureEmailInputProps = {
    value?: string;
    onChange?: (email: string) => void;
    sanitize?: (input: string) => string;
    validateEmail?: (email: string, allowedDomains?: string[]) => string;
    placeholder?: string;
    className?: string;
    allowedDomains?: string[];
    css?: ReturnType<typeof css>;
    errorCss?: ReturnType<typeof css>;
};
export declare const SecureEmailInput: FC<SecureEmailInputProps>;
//# sourceMappingURL=SecureEmailInput.d.ts.map