import { hasSponsors as showSponsors } from "./general";
import { FixturaDataset } from "../types/data/index";

/**
 * Determines the outro duration based on whether sponsors are present
 *
 * @param data - The Fixtura dataset containing video metadata and timing information
 * @returns The duration in frames for the outro section
 */
export const hasSponsors = (data: FixturaDataset): number => {
  return showSponsors(data.videoMeta.Club.Sponsors)
    ? data.timings.FPS_OUTRO
    : 30;
};

/**
 * Calculates the total composition length in frames
 *
 * @param data - The Fixtura dataset containing timing information
 * @returns The total duration in frames
 */
export const CompositionLength = (data: FixturaDataset): number => {
  return [
    data.timings.FPS_INTRO,
    hasSponsors(data),
    data.timings.FPS_MAIN,
  ].reduce((a, b) => a + b, 0);
};
