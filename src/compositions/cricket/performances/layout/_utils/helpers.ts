import {
  PerformanceData,
  isBattingPerformance,
  isBowlingPerformance,
} from "../../_types/types";

/**
 * Truncate text to a maximum length, adding ellipsis if truncated
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text with ellipsis if needed
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + "...";
};



/**
 * Calculate player name length - returns the actual length of the name
 * @param name - The player name
 * @returns The length of the name
 */
export const getPlayerNameLength = (name: string): number => {
  return name ? name.length : 0;
};

/**
 * Format player name as "First Initial. Last Name"
 * Position indicators like (C), (VC), (WK) are kept in the output
 * @param name - The full player name
 * @returns Formatted name (e.g., "J. CUNNINGHAM" or "J. SMITH (C)")
 */
export const formatPlayerName = (name: string): string => {
  if (!name) return "";
  
  // Split by space and filter out empty strings (handles multiple spaces)
  const nameParts = name.trim().split(" ").filter(part => part.length > 0);
  
  if (nameParts.length < 2) {
    // If only one name part, return as is
    return name.toUpperCase();
  }
  
  // Check if the last part is a position indicator
  const lastPart = nameParts[nameParts.length - 1];
  const isPosition = /^\((C|VC|WK)\)$/i.test(lastPart);
  
  // If last part is a position, we need at least 3 parts (first, last, position)
  // Otherwise, we need at least 2 parts (first, last)
  const minRequiredParts = isPosition ? 3 : 2;
  
  if (nameParts.length < minRequiredParts) {
    // Not enough parts - return as is (might be just "F (C)" or similar)
    return name.toUpperCase();
  }
  
  // If last part is a position, use second-to-last as last name
  // Otherwise, use the last part as last name
  const lastNameIndex = isPosition ? nameParts.length - 2 : nameParts.length - 1;
  
  // Ensure we have a valid last name (not the first name)
  if (lastNameIndex <= 0) {
    // Edge case: can't extract last name, return as is
    return name.toUpperCase();
  }
  
  const firstName = nameParts[0];
  const lastName = nameParts[lastNameIndex];
  
  // Ensure lastName is not empty and is different from firstName
  if (!lastName || lastName === firstName) {
    return name.toUpperCase();
  }
  
  const formattedName = `${firstName.charAt(0).toUpperCase()}. ${lastName.toUpperCase()}`;
  
  // Append position indicator if present
  return isPosition ? `${formattedName} ${lastPart.toUpperCase()}` : formattedName;
};

/**
 * Get score display values based on performance type (batting or bowling)
 * @param performance - The performance data object
 * @returns Object with mainValue and suffix for score display
 */
export const getScoreValues = (
  performance: PerformanceData,
): { mainValue: string; suffix: string } => {
  if (isBattingPerformance(performance)) {
    // Main value is runs (with * for not out), suffix is balls faced
    const mainValue = performance.notOut
      ? `${performance.runs}*`
      : `${performance.runs}`;
    const suffix = performance.balls > 0 ? `(${performance.balls})` : "";
    return { mainValue, suffix };
  } else if (isBowlingPerformance(performance)) {
    // Main value is wickets-runs, suffix is overs
    const mainValue = `${performance.wickets}/${performance.runs}`;
    const suffix = `(${performance.overs})`;
    return { mainValue, suffix };
  }

  // Fallback
  return { mainValue: "--", suffix: "" };
};
