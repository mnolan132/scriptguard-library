import { MAGIC_NUMBERS, readMagicNumber } from "./magicNumbers";
import { sanitizeFileName } from "./sanitizeFileName";

export async function validateFile(
    file: File,
    allowedTypes?: string[],
    maxFileSizeMB?: number
  ): Promise<string | null> {
    const fileName = sanitizeFileName(file.name);
    const fileType = file.type;
    const fileSizeMB = file.size / (1024 * 1024);
  
    const nameParts = fileName.split(".");
    const extension = nameParts.pop()?.toLowerCase();
  
    // 1. Double extensions
    if (nameParts.length > 1) {
      return "Suspicious file name detected (multiple extensions).";
    }
  
    // 2. Forbidden characters
    const forbiddenChars = /[\\/:*?"<>|]/;
    if (forbiddenChars.test(fileName)) {
      return "Filename contains forbidden characters.";
    }
  
    // 3. Size check
    if (maxFileSizeMB && fileSizeMB > maxFileSizeMB) {
      return `File size exceeds limit (${maxFileSizeMB}MB).`;
    }
  
    // 4. Dangerous extensions
    const dangerousExtensions = ["php", "exe", "js", "sh", "bat", "cmd"];
    if (extension && dangerousExtensions.includes(extension)) {
      return `Dangerous file extension detected (.${extension}).`;
    }
  
    // 5. Allowed MIME type check
    if (allowedTypes && !allowedTypes.includes(fileType)) {
      return `File type not allowed. Allowed types: ${allowedTypes.join(", ")}`;
    }
  
    // 6. Magic number check
    const expectedMagic = MAGIC_NUMBERS[fileType];
    if (expectedMagic) {
      const magic = await readMagicNumber(file, expectedMagic.length / 2); // 2 hex chars per byte
      if (!magic.startsWith(expectedMagic)) {
        return `File content does not match expected type (${fileType}).`;
      }
    }
  
    return null; // All checks passed
  }
  