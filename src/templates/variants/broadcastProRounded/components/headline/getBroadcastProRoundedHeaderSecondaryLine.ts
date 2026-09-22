import type { VideoMetadata } from "../../../../../core/types/data/videoData";

/** Asset types whose header is logo + title only — no metadata chip. */
export const BROADCAST_PRO_ROUNDED_HEADER_WITHOUT_SECONDARY = new Set([
  "CricketResultSingle",
  "CricketResults",
  "CricketUpcoming",
  "CricketLadder",
  "CricketTeamOfTheWeek",
]);

export const shouldHideBroadcastProRoundedHeaderSecondary = (
  compositionId: string,
): boolean => BROADCAST_PRO_ROUNDED_HEADER_WITHOUT_SECONDARY.has(compositionId);

/**
 * Secondary line under main header title: videoTitle, else titleSplit joined, else club name.
 */
export const getBroadcastProRoundedHeaderSecondaryLine = (
  metadata: VideoMetadata,
  clubName: string,
): string => {
  const videoTitle = metadata.videoTitle
    ?.replace(/\bCricketRoster\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();
  if (videoTitle) return videoTitle;

  const parts = metadata.titleSplit?.filter(Boolean) ?? [];
  if (parts.length > 0) return parts.join(" · ");

  return clubName;
};
