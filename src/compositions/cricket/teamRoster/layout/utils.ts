import { RosterDataItem } from "../types";

/**
 * Utility functions for roster layout components
 */

/**
 * Truncates text to a specified maximum length and adds ellipsis if needed
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text || "";
  return text.substring(0, maxLength - 3) + "...";
};

/**
 * Truncates player name to show first character of first name and full last name
 * Handles role indicators, captain/vice-captain suffixes, and invalid entries
 */
export const truncatePlayerName = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text || "";

  const trimmedText = text.trim();

  // Check if this is a role indicator (like "B. (WK) VC") - not a player name
  if (isRoleIndicator(trimmedText)) {
    return trimmedText;
  }

  // Extract ALL role suffixes (C, VC, (WK), etc.) to append later
  const { cleanedName, roleSuffixes } = extractAllRoleSuffixes(trimmedText);

  const nameParts = cleanedName.split(" ");
  if (nameParts.length < 2) {
    // If only one name, just truncate normally
    const truncated = cleanedName.substring(0, maxLength - 3) + "...";
    return roleSuffixes.length > 0
      ? `${truncated} ${roleSuffixes.join(" ")}`
      : truncated;
  }

  const firstName = nameParts[0];
  const lastName = nameParts[nameParts.length - 1];
  const truncatedName = `${firstName.charAt(0)}. ${lastName}`;

  // If even the truncated version is too long, fall back to normal truncation
  if (truncatedName.length > maxLength) {
    const truncated = cleanedName.substring(0, maxLength - 3) + "...";
    return roleSuffixes.length > 0
      ? `${truncated} ${roleSuffixes.join(" ")}`
      : truncated;
  }

  // Append all role suffixes if they exist
  return roleSuffixes.length > 0
    ? `${truncatedName} ${roleSuffixes.join(" ")}`
    : truncatedName;
};

/**
 * Checks if text is a role indicator rather than a player name
 */
const isRoleIndicator = (text: string): boolean => {
  // Only detect pure role indicators - single letter followed by roles only
  // This excludes player names that happen to start with a single letter
  const rolePatterns = [
    /^[A-Z]\.\s*\([^)]+\)$/, // Pattern like "B. (WK)" - single letter + role in parentheses only
    /^[A-Z]\.\s*[A-Z]+$/, // Pattern like "B. WK" - single letter + role only
    /^\([^)]+\)$/, // Pattern like "(WK)" - just role in parentheses
  ];

  return rolePatterns.some((pattern) => pattern.test(text));
};

/**
 * Extracts ALL role suffixes from player names and returns both cleaned name and all suffixes
 */
const extractAllRoleSuffixes = (
  text: string,
): { cleanedName: string; roleSuffixes: string[] } => {
  // All possible role suffixes
  const roleSuffixPatterns = [
    " (WK)", // Wicket keeper in parentheses
    " VC", // Vice captain
    " C", // Captain
    " (VC)", // Vice captain in parentheses
    " (C)", // Captain in parentheses
  ];

  let cleaned = text;
  const extractedSuffixes: string[] = [];

  // Extract all suffixes in order of appearance
  for (const suffix of roleSuffixPatterns) {
    if (cleaned.includes(suffix)) {
      extractedSuffixes.push(suffix.trim());
      cleaned = cleaned.replace(suffix, "").trim();
    }
  }

  return {
    cleanedName: cleaned.trim(),
    roleSuffixes: extractedSuffixes,
  };
};

/**
 * Team details interface for account holder/against team determination
 */
export interface TeamDetails {
  name: string;
  logoUrl: string;
  isAccountHolder: boolean;
}

/**
 * Account holder and against team details
 */
export interface TeamPerspective {
  accountHolder: TeamDetails;
  against: TeamDetails;
}

/**
 * Determines which team is the account holder and which is the against team
 * based on the roster data and returns all details needed for rendering
 */
export const getTeamPerspective = (roster: RosterDataItem): TeamPerspective => {
  // Account holder is determined by roster.isHomeTeam
  const isHomeTeamAccountHolder = roster.isHomeTeam;

  const accountHolder: TeamDetails = {
    name: isHomeTeamAccountHolder ? roster.teamHome : roster.teamAway,
    logoUrl: isHomeTeamAccountHolder
      ? roster.teamHomeLogo
      : roster.teamAwayLogo,
    isAccountHolder: true,
  };

  const against: TeamDetails = {
    name: isHomeTeamAccountHolder ? roster.teamAway : roster.teamHome,
    logoUrl: isHomeTeamAccountHolder
      ? roster.teamAwayLogo
      : roster.teamHomeLogo,
    isAccountHolder: false,
  };

  return {
    accountHolder,
    against,
  };
};
