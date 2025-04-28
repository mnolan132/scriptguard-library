export const MAGIC_NUMBERS: Record<string, string> = {
    "image/png": "89504E47",
    "image/jpeg": "FFD8FF",
    "application/pdf": "25504446",
    "image/gif": "47494638",
    "application/zip": "504B0304",
    "application/msword": "D0CF11E0", // .doc
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "504B0304", // .docx
    "application/vnd.ms-excel": "D0CF11E0", // .xls
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "504B0304", // .xlsx
    "video/mp4": "00000018", // MP4 is tricky — signature varies, but this can catch basics
    "audio/mpeg": "494433", // MP3 ID3 tag
    "image/svg+xml": "3C3F786D6C", // "<?xml" for some SVGs
  };
  
  export async function readMagicNumber(file: File, length: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onloadend = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const uint8Array = new Uint8Array(arrayBuffer);
        const hexString = Array.from(uint8Array)
          .map(byte => byte.toString(16).padStart(2, "0"))
          .join("")
          .toUpperCase(); // Match your MAGIC_NUMBERS format
        resolve(hexString);
      };
  
      reader.onerror = reject;
  
      const blob = file.slice(0, length);
      reader.readAsArrayBuffer(blob);
    });
  }
  