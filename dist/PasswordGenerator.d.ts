import { FC } from "react";
type PasswordGeneratorProps = {
    minLength?: number;
    maxLength?: number;
    onGenerate?: (password: string) => void;
    showStrengthMeter?: boolean;
};
export declare const PasswordGenerator: FC<PasswordGeneratorProps>;
export {};
//# sourceMappingURL=PasswordGenerator.d.ts.map