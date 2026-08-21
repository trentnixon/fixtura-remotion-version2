import { Sponsor, SponsorsData } from "../types/data/sponsors";

/**
 * Check if the account sponsor list has any sponsors (v2).
 */
export const hasSponsors = (sponsorList: SponsorsData | null | undefined): boolean => {
  if (!sponsorList) return false;
  if (typeof sponsorList.sponsorNum === "number" && sponsorList.sponsorNum > 0) {
    return true;
  }
  const hasPrimary =
    Array.isArray(sponsorList.primary) && sponsorList.primary.length > 0;
  const hasGeneral =
    Array.isArray(sponsorList.general) && sponsorList.general.length > 0;
  return hasPrimary || hasGeneral;
};

/**
 * Get the primary sponsor from the sponsor list.
 */
export const getPrimarySponsor = (
  sponsorList: SponsorsData | null | undefined,
): Sponsor | null => {
  if (
    !sponsorList ||
    !Array.isArray(sponsorList.primary) ||
    sponsorList.primary.length === 0
  ) {
    return null;
  }
  return sponsorList.primary[0];
};

/**
 * Group sponsors into smaller arrays of a specified size.
 */
export const groupSponsors = <T>(
  sponsors: T[],
  groupSize: number = 3,
): T[][] => {
  const groupedSponsors: T[][] = [];
  for (let i = 0; i < sponsors.length; i += groupSize) {
    groupedSponsors.push(sponsors.slice(i, i + groupSize));
  }
  return groupedSponsors;
};

/**
 * Calculate image size based on the number of sponsors.
 */
export const calculateImgSize = (sponsorCount: number): number => {
  if (!sponsorCount || typeof sponsorCount !== "number") {
    throw new Error("Invalid sponsor count. Expected a number.");
  }

  const baseSize = 250;
  if (sponsorCount <= 3) {
    return baseSize;
  }
  if (sponsorCount <= 6) {
    return baseSize * 0.95;
  }
  return baseSize * 0.8;
};
