// Shared helpers for team sections to avoid duplication

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
 * Normalizes scores so that "N/A" renders as "Yet to Bat"
 * @param rawScore - Raw score string (may be null, undefined, or "N/A")
 * @returns Normalized score string
 */
export const normalizeScore = (rawScore?: string | null): string => {
  const score = (rawScore || "").trim();
  if (score.length === 0 || score.toUpperCase() === "N/A") {
    return "Yet to Bat";
  }
  return score;
};

/**
 * Only render a legitimate first-innings string (not placeholders)
 * @param matchType - Type of match (e.g., "Two Day+")
 * @param inningsValue - First innings score value
 * @returns Object with show flag and value string
 */
export const getFirstInningsDisplay = (
  matchType: string,
  inningsValue?: string | null,
): { show: boolean; value: string } => {
  if (matchType !== "Two Day+") {
    return { show: false, value: "" };
  }
  const value = (inningsValue || "").trim();
  if (value.length === 0) return { show: false, value: "" };
  const lowered = value.toLowerCase();
  if (lowered === "1" || lowered === "n/a" || lowered === "yet to bat") {
    return { show: false, value: "" };
  }
  const looksLikeScore =
    /\d+\s*\/\s*\d+/.test(value) || /\bd\//i.test(value) || value.includes("&");
  if (!looksLikeScore) return { show: false, value: "" };
  return { show: true, value };
};

/**
 * Normalizes overs: hide when value is missing or "N/A"
 * @param raw - Raw overs string (may be null, undefined, or "N/A")
 * @returns Normalized overs string or null if should be hidden
 */
export const normalizeOvers = (raw?: string | null): string | null => {
  const value = (raw || "").trim();
  if (value.length === 0) return null;
  if (value.toUpperCase() === "N/A") return null;
  return value;
};
