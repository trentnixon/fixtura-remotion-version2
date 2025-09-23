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
 */
export const truncatePlayerName = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text || "";

  const nameParts = text.trim().split(" ");
  if (nameParts.length < 2) {
    // If only one name, just truncate normally
    return text.substring(0, maxLength - 3) + "...";
  }

  const firstName = nameParts[0];
  const lastName = nameParts[nameParts.length - 1];
  const truncatedName = `${firstName.charAt(0)}. ${lastName}`;

  // If even the truncated version is too long, fall back to normal truncation

  return truncatedName;
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
