import { Sponsor, SponsorsData } from "../../types/data/sponsors";
import { asSponsorArray } from "./asSponsorArray";

export const OUTRO_SPONSOR_PAGE_SIZE = 6;

/** Per-page outro timing: animate in + hold + animate out. */
export const OUTRO_PAGE_ANIMATE_IN_FRAMES = 15;
export const OUTRO_PAGE_HOLD_FRAMES = 90;
export const OUTRO_PAGE_ANIMATE_OUT_FRAMES = 15;
export const OUTRO_PAGE_DURATION_FRAMES =
  OUTRO_PAGE_ANIMATE_IN_FRAMES +
  OUTRO_PAGE_HOLD_FRAMES +
  OUTRO_PAGE_ANIMATE_OUT_FRAMES;

/** Start exit so animate-out fits in the last OUTRO_PAGE_ANIMATE_OUT_FRAMES of the page. */
export const OUTRO_PAGE_LOGO_EXIT_FRAME =
  OUTRO_PAGE_DURATION_FRAMES - OUTRO_PAGE_ANIMATE_OUT_FRAMES;

export const OUTRO_NO_SPONSORS_DURATION_FRAMES = 30;

export type BuildOutroSponsorSequenceInput = {
  primary: Sponsor[];
  general: Sponsor[];
};

/** Account outro sequence: all primaries, then all generals. */
export const buildOutroSponsorSequence = ({
  primary,
  general,
}: BuildOutroSponsorSequenceInput): Sponsor[] => {
  return [...asSponsorArray(primary), ...asSponsorArray(general)];
};

export const chunkSponsors = <T>(
  sponsors: T[],
  pageSize: number = OUTRO_SPONSOR_PAGE_SIZE,
): T[][] => {
  const pages: T[][] = [];
  for (let i = 0; i < sponsors.length; i += pageSize) {
    pages.push(sponsors.slice(i, i + pageSize));
  }
  return pages;
};

export const countOutroSponsors = (
  sponsors: SponsorsData | null | undefined,
): number => {
  if (!sponsors) return 0;
  const fromBuckets =
    asSponsorArray(sponsors.primary).length +
    asSponsorArray(sponsors.general).length;
  if (fromBuckets > 0) return fromBuckets;
  return typeof sponsors.sponsorNum === "number" && sponsors.sponsorNum > 0
    ? sponsors.sponsorNum
    : 0;
};

/**
 * Outro duration in frames from sponsor count.
 * pages = ceil(count / 6); duration = pages × (15 + 90 + 15).
 */
export const calculateOutroDurationFromSponsors = (
  sponsors: SponsorsData | null | undefined,
  doesAccountHaveSponsors: boolean,
): number => {
  if (!doesAccountHaveSponsors) {
    return OUTRO_NO_SPONSORS_DURATION_FRAMES;
  }

  const count = countOutroSponsors(sponsors);
  if (count <= 0) {
    return OUTRO_NO_SPONSORS_DURATION_FRAMES;
  }

  const pages = Math.ceil(count / OUTRO_SPONSOR_PAGE_SIZE);
  return pages * OUTRO_PAGE_DURATION_FRAMES;
};
