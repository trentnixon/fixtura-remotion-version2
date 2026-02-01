/**
 * Truncates text to a maximum length, adding ellipsis if truncated
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text with ellipsis if needed
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text || "";
  return text.substring(0, maxLength - 3) + "...";
};

// truncate player name
// reduce player name to first character of first name and full last name
// @param text - The player name to truncate
// @param maxLength - Maximum character length before truncation
// @returns Truncated player name (e.g., "J. Smith") or original if within limit
export const truncatePlayerName = (text: string, maxLength: number = 20): string => {
  if (!text || text.length <= maxLength) return text || "";
  const nameParts = text.split(" ");
  return `${nameParts[0].charAt(0)}. ${nameParts[nameParts.length - 1]}`;
};