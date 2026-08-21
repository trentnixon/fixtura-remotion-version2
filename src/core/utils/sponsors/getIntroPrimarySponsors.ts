import { Sponsor, SponsorsData } from "../../types/data/sponsors";

export const INTRO_PRIMARY_SPONSOR_MAX = 4;

/**
 * Account primaries for intro screens only (never general/entity). Cap at four.
 */
export const getIntroPrimarySponsors = (
  sponsors: SponsorsData | null | undefined,
  max: number = INTRO_PRIMARY_SPONSOR_MAX,
): Sponsor[] => {
  if (!sponsors?.primary?.length) return [];
  return sponsors.primary
    .filter((sponsor) => Boolean(sponsor?.logo?.url))
    .slice(0, max);
};
