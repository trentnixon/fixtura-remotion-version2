/**
 * Truncates a string to a specified length and appends ellipsis if needed
 * @param text - The string to truncate
 * @param maxLength - Maximum length before truncation (default: 35)
 * @returns Truncated string with ellipsis if needed, or empty string if input is null/undefined
 */
export const truncateString = (
  text: string | null | undefined,
  maxLength: number = 35,
): string => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};
