import { FC } from "react";
import { css } from "@emotion/react";
export type SecureCopyButtonProps = {
    text: string;
    className?: string;
    buttonText?: string;
    copiedText?: string;
    maskText?: boolean;
    autoClearClipboard?: boolean;
    clearTimeoutMs?: number;
    textCss?: ReturnType<typeof css>;
    buttonCss?: ReturnType<typeof css>;
};
export declare const SecureCopyButton: FC<SecureCopyButtonProps>;
//# sourceMappingURL=SecureCopyButton.d.ts.map