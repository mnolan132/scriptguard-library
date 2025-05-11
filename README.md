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

### 6️⃣ useSanitizedForm
A custom hook for managing form values with automatic sanitization of input values to prevent XSS attacks.

#### ✅ Usage:
```tsx
import { useSanitizedForm } from "scriptguard-library";

const MyComponent = () => {
  const { values, handleChange, sanitizeAll } = useSanitizedForm({
    name: "",
    email: "",
  });

  return (
    <>
      <input
        type="text"
        value={values.name}
        onChange={handleChange("name")}
      />
      <input
        type="email"
        value={values.email}
        onChange={handleChange("email")}
      />
      <button onClick={() => console.log(sanitizeAll())}>
        Submit
      </button>
    </>
  );
};

```

### 7️⃣ useSecureLocalStorage
A custom hook to securely store and retrieve encrypted values from localStorage using a provided secret key.

#### ✅ Usage:
```tsx
import { useSecureLocalStorage } from "scriptguard-library";

const mySecretKey = "your-very-secure-key"; //STORE AS AN ENVIRONMENT VARIABLE!!

const MyComponent = () => {
  const { value, setValue, removeValue } = useSecureLocalStorage('userData', { name: '', email: '' }, mySecretKey);

  return (
    <div>
      <button onClick={() => setValue({ name: 'John Doe', email: 'john@example.com' })}>
        Save User
      </button>
      <button onClick={removeValue}>
        Remove User
      </button>
      <pre>{JSON.stringify(value, null, 2)}</pre>
    </div>
  );
};

```

### 8️⃣ useInactivityLock
A custom hook that locks the user out after a specified period of inactivity, ideal for protecting sensitive sessions.

#### ✅ Usage:
```tsx
import { useInactivityLock } from "scriptguard-library";

const MyComponent = () => {
  useInactivityLock({
    timeout: 5, // in minutes (can be fractional like 0.5 for 30s)
    onLock: () => {
      alert("You've been locked out due to inactivity.");
      // Optional: redirect to login or lock screen
    }
  });

  return (
    <div>
      <h1>Welcome back!</h1>
      <p>This page will auto-lock if you're inactive for 5 minutes.</p>
    </div>
  );
};


```

### 9️⃣ SecureFileUpload
A secure file upload component that validates selected files against strict security rules, preventing suspicious or dangerous uploads.

- Detects double extensions (e.g., file.php.jpg)

- Blocks dangerous file types (e.g., .php, .exe, .bat)

- Verifies file content using magic numbers (binary signatures)

- Supports allowed MIME types

- Enforces optional maximum file size

- Displays friendly error messages for users

#### ✅ Usage:
```tsx
import { SecureFileUpload } from "scriptguard-library";

const MyComponent = () => {
  const handleSafeFileSelect = (file: File) => {
    console.log("Safe file selected:", file.name);
    // Handle file upload or further processing
  };

  return (
    <SecureFileUpload
      onSafeFileSelect={handleSafeFileSelect}
      allowedTypes={["image/jpeg", "application/pdf"]}
      maxFileSizeMB={5}
    />
  );
};

```
🔍 Validation checks performed:
- Filename Sanitization: Blocks suspicious patterns like file.php.jpg.

- Extension Check: Rejects dangerous extensions (.php, .exe, .bat, etc.).

- MIME Type Check: Ensures the file type matches allowed MIME types if provided.

- Magic Number Check: Confirms file content matches its extension (e.g., a .jpg is truly an image).

- File Size Limit: Rejects files larger than specified maxFileSizeMB.


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

