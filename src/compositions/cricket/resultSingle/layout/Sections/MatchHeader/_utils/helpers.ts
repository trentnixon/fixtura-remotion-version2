/**
 * Truncates text to a maximum length, adding ellipsis if truncated
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text with ellipsis if needed
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text || "";
  return text.substring(0, maxLength - 3) + "...";
};

/**
 * Formats the left side text for match header - uses type and round, or date and round, or just round
 * @param type - Match type (optional)
 * @param date - Match date (optional)
 * @param round - Match round
 * @returns Formatted left text string
 */
export const formatLeftText = (
  type?: string,
  date?: string,
  round: string = "",
): string => {
  if (type) {
    return `${type} - ${round}`;
  }
  if (date) {
    return `${date} - ${round}`;
  }
  return round;
};
