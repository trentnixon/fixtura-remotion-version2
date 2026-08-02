import type { VideoMetadata } from "../../../../../core/types/data/videoData";

/**
 * Secondary line under main header title: videoTitle, else titleSplit joined, else club name.
 */
export const getBroadcastProRoundedHeaderSecondaryLine = (
  metadata: VideoMetadata,
  clubName: string,
): string => {
  const videoTitle = metadata.videoTitle?.trim();
  if (videoTitle) return videoTitle;

  const parts = metadata.titleSplit?.filter(Boolean) ?? [];
  if (parts.length > 0) return parts.join(" · ");

  return clubName;
};
