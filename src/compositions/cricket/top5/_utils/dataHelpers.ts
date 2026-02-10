import { PlayerData } from "../_types/types";
import { Sponsor } from "../../../../core/types/data/sponsors";

/**
 * Check if players data is valid
 * @param playersData - Data from video context
 * @returns True if data is valid and non-empty array
 */
export const hasValidPlayersData = (playersData: unknown): boolean => {
  return (
    playersData !== null &&
    playersData !== undefined &&
    Array.isArray(playersData) &&
    playersData.length > 0
  );
};

/**
 * Cast players data to typed array
 * @param playersData - Data from video context
 * @returns Typed array of PlayerData
 */
export const castToPlayerDataArray = (
  playersData: unknown,
): PlayerData[] => {
  return playersData as unknown as PlayerData[];
};

/**
 * Extract composition ID from video metadata
 * @param videoMeta - Video metadata from context
 * @returns Composition ID string (empty string if not available)
 */
export const extractCompositionId = (videoMeta: {
  video?: { metadata?: { compositionId?: string } };
} | undefined): string => {
  return videoMeta?.video?.metadata?.compositionId || "";
};

/**
 * Extract primary sponsors array from video metadata
 * @param videoMeta - Video metadata from context
 * @returns Array of Sponsor objects (empty array if not available)
 */
export const extractPrimarySponsors = (videoMeta: {
  club?: { sponsors?: { primary?: Sponsor[] } };
} | undefined): Sponsor[] => {
  return videoMeta?.club?.sponsors?.primary || [];
};
