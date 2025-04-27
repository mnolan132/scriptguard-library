export function sanitizeFileName(filename: string): string {
    return filename
      .replace(/[\\/:*?"<>|]+/g, "") // remove forbidden chars
      .replace(/\s+/g, "-")          // replace spaces with dashes
      .toLowerCase();                // normalize casing
  }
  