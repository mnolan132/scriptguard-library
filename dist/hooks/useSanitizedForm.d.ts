export declare function useSanitizedForm<T extends Record<string, string>>(initialState: T): {
    values: T;
    setSanitizedValue: (key: keyof T, value: string) => void;
    sanitizeAll: () => T;
    handleChange: (key: keyof T) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};
//# sourceMappingURL=useSanitizedForm.d.ts.map