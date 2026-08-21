import { hasSponsors as showSponsors } from "./general";
import { FixturaDataset } from "../types/data/index";
import { calculateOutroDurationFromSponsors } from "./sponsors";

/**
 * Determines the outro duration based on whether sponsors are present
 *
 * @param data - The Fixtura dataset containing video metadata and timing information
 * @returns The duration in frames for the outro section
 */
export const hasSponsors = (data: FixturaDataset): number => {
  const sponsors = data.videoMeta.club.sponsors;
  return calculateOutroDurationFromSponsors(
    sponsors,
    showSponsors(sponsors) ||
      Boolean(data.videoMeta.video?.metadata?.includeSponsors),
  );
};

/**
 * Calculates the total composition length in frames
 *
 * @param data - The Fixtura dataset containing timing information
 * @returns The total duration in frames
 */
export const CompositionLength = (data: FixturaDataset): number => {
  return [
    data.timings.FPS_INTRO ?? 0,
    hasSponsors(data),
    data.timings.FPS_MAIN ?? 0,
  ].reduce((a, b) => (a || 0) + (b || 0), 0);
};
