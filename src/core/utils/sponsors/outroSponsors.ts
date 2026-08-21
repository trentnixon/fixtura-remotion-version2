import { Sponsor } from "../../types/data/sponsors";

export const OUTRO_SPONSOR_PAGE_SIZE = 6;

export type BuildOutroSponsorSequenceInput = {
  primary: Sponsor[];
  general: Sponsor[];
};

/** Account outro sequence: all primaries, then all generals. */
export const buildOutroSponsorSequence = ({
  primary,
  general,
}: BuildOutroSponsorSequenceInput): Sponsor[] => {
  return [...primary, ...general];
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
