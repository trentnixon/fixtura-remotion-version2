// Src/structural/Sponsors/Utils/utils.js

import { Sponsor, SponsorsData } from "../types/data/sponsors";

/**
 * Check if the sponsor list has any sponsors.
 *
 * @param sponsorList - Sponsor list object
 * @returns Boolean indicating if sponsors exist
 */
export const hasSponsors = (sponsorList: SponsorsData): boolean => {
  if (!sponsorList) return false;
  const hasPrimary =
    Array.isArray(sponsorList.primary) && sponsorList.primary.length > 0;
  const hasDefault =
    sponsorList.default &&
    Object.values(sponsorList.default).some(
      (arr) => Array.isArray(arr) && arr.length > 0,
    );
  return hasPrimary || hasDefault;
};

/**
 * Get the primary sponsor from the sponsor list.
 *
 * @param sponsorList - Sponsor list object
 * @returns Primary sponsor object or null if not found
 */
export const getPrimarySponsor = (
  sponsorList: SponsorsData,
): Sponsor | null => {
  if (
    !sponsorList ||
    !Array.isArray(sponsorList.primary) ||
    sponsorList.primary.length === 0
  ) {
    return null;
  }
  return sponsorList.primary[0]; // Or adjust logic if needed
};

/**
 * Group sponsors into smaller arrays of a specified size.
 *
 * @param sponsors - Array of sponsor objects
 * @param groupSize - Size of each group (default: 3)
 * @returns Array of grouped sponsor arrays
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
 *
 * @param sponsorCount - Number of sponsors
 * @returns Calculated image size
 * @throws Error if sponsorCount is invalid
 */
export const calculateImgSize = (sponsorCount: number): number => {
  if (!sponsorCount || typeof sponsorCount !== "number") {
    throw new Error("Invalid sponsor count. Expected a number.");
  }

  const baseSize = 250; // Base size for up to 3 sponsors
  if (sponsorCount <= 3) {
    return baseSize;
  }
  if (sponsorCount <= 6) {
    return baseSize * 0.95; // Reduce size by 5% for 4-6 sponsors
  }
  return baseSize * 0.8; // Reduce size by 20% for 7-9 sponsors
};
