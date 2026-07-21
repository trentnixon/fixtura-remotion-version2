import { SponsorsData } from "../../../../core/types/data/sponsors";
import { VideoMeta } from "../../../../core/types/data/videoData";
import { TeamOfTheWeekPlayer } from "../types";

const EMPTY_SPONSORS: SponsorsData = {
  primary: [],
  default: {},
};

/**
 * Check if team of the week data is valid
 * @param teamOfTheWeekData - Data from video context
 * @returns True if data is valid and non-empty
 */
export const hasValidTeamOfTheWeekData = (
  teamOfTheWeekData: unknown,
): boolean => {
  return (
    teamOfTheWeekData !== null &&
    teamOfTheWeekData !== undefined &&
    Array.isArray(teamOfTheWeekData) &&
    teamOfTheWeekData.length > 0
  );
};

/**
 * Cast team of the week data to typed array
 * @param teamOfTheWeekData - Data from video context
 * @returns Typed array of TeamOfTheWeekPlayer
 */
export const castToTeamOfTheWeekPlayers = (
  teamOfTheWeekData: unknown,
): TeamOfTheWeekPlayer[] => {
  return teamOfTheWeekData as unknown as TeamOfTheWeekPlayer[];
};

/**
 * Extract sponsors from video metadata
 * @param videoMeta - Video metadata from context
 * @returns SponsorsData (empty primary/default if not available)
 */
export const extractSponsors = (
  videoMeta: VideoMeta | undefined,
): SponsorsData => {
  return videoMeta?.club?.sponsors ?? EMPTY_SPONSORS;
};
