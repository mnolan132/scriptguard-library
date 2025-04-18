# Scriptguard Library

A React component library for secure input handling, designed to prevent XSS attacks, enforce input validation, and enhance security.

## 🚀 Installation

To install the library via npm:

```bash
npm install scriptguard-library
```

Or using yarn:

```bash
yarn add scriptguard-library
```

## 📦 Available Components

### 1️⃣ SecureTextInput
A sanitized text input field that prevents XSS attacks and enforces character restrictions.

#### ✅ Usage:
```tsx
import { SecureTextInput } from "scriptguard-library";

const MyComponent = () => {
  const handleChange = (value: string) => console.log(value);
  
  return (
    <SecureTextInput onChange={handleChange} maxLength={100} />
  );
};
```

### 2️⃣ SecurePasswordInput
A secure password input field with sanitization and optional strength meter.

#### ✅ Usage:
```tsx
import { SecurePasswordInput } from "scriptguard-library";

const MyComponent = () => {
  return (
    <SecurePasswordInput minLength={8} />
  );
};
```

### 3️⃣ SecureEmailInput
A validated email input field with optional domain restrictions.

#### ✅ Usage:
```tsx
import { SecureEmailInput } from "scriptguard-library";

const MyComponent = () => {
  return (
    <SecureEmailInput allowedDomains={["example.com"]} />
  );
};
```

### 4️⃣ SecureCopyButton
A secure button to copy text to the clipboard with optional auto-clear functionality.

#### ✅ Usage:
```tsx
import { SecureCopyButton } from "scriptguard-library";

const MyComponent = () => {
  return (
    <SecureCopyButton text="Sensitive Data" maskText autoClearClipboard />
  );
};
```

### 5️⃣ PasswordGenerator
A secure password generator component that ensures strong, customizable passwords.
Always includes at least one uppercase, lowercase, number, and symbol (if enabled).

#### ✅ Usage:
```tsx
import { PasswordGenerator } from "scriptguard-library";

const MyComponent = () => {
  const handleGenerate = (password: string) => {
    console.log("Generated password:", password);
  };

  return (
    <PasswordGenerator minLength={12} onGenerate={handleGenerate} />
  );
};
```

## 🔄 Updating the Package

To update the package to the latest version:

```bash
npm update scriptguard-library
```

## 🛠 Development & Contribution

1. Clone the repository:
```bash
git clone https://github.com/mnolan132/scriptguard-library.git
```
2. Install dependencies:
```bash
cd scriptguard-library
npm install
```
3. Build the package:
```bash
npm run build
```
4. Run tests:
```bash
npm test
```

## 📜 License

MIT License © 2025 Matthew Nolan

