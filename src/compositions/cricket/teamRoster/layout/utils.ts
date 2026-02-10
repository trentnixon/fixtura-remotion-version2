import { RosterDataItem } from "../_types/types";
import { truncatePlayerName } from "../../utils/utils-text";

/**
 * Utility functions for roster layout components
 */

export { truncatePlayerName };

/**
 * Truncates text to a specified maximum length and adds ellipsis if needed
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text || "";
  return text.substring(0, maxLength - 3) + "...";
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
