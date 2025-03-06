// Src/structural/Sponsors/Utils/utils.js

/**
 * Calculate image dimensions maintaining aspect ratio.
 *
 * @param logo - Logo object containing width and height
 * @param dimensions - Array with base width, base height, and max height
 * @returns Object containing calculated width and height
 */
export const calculateImageDimensions = (
  logo: { width: number; height: number },
  [baseWidth, baseHeight, maxHeight]: [number, number, number],
): { width: number; height: number } => {
  const aspectRatio = logo.width / logo.height;
  let width = baseWidth;
  let height = baseHeight;
  if (logo.height > maxHeight) {
    height = maxHeight;
    width = height * aspectRatio;
  }

  return { width, height };
};

/**
 * Check if the sponsor list has any sponsors.
 *
 * @param sponsorList - Sponsor list object
 * @returns Boolean indicating if sponsors exist
 */
export const hasSponsors = (sponsorList: any): boolean => {
  if (!sponsorList || !sponsorList.default) {
    return false;
  }
  const hasGeneral = Boolean(sponsorList.default.general_sponsors?.length);
  const hasPrimary = Boolean(sponsorList.default.primary_sponsor);
  // Return true if either hasGeneral or hasPrimary is true
  return hasGeneral || hasPrimary;
};

/**
 * Get the primary sponsor from the sponsor list.
 *
 * @param sponsorList - Sponsor list object
 * @returns Primary sponsor object or null if not found
 */
export const getPrimarySponsor = (sponsorList: any): any | null => {
  if (
    !sponsorList ||
    !sponsorList.default ||
    !sponsorList.default.primary_sponsor
  ) {
    // Console.error("Primary sponsor not found");
    return null;
  }
  return sponsorList.default.primary_sponsor;
};

/**
 * Get sponsors relevant to a specific fixture.
 *
 * @param sponsorList - Sponsor list object
 * @param fixture - Fixture object containing match details
 * @returns Array of sponsors relevant to the fixture
 */
export const getSponsorsForFixture = (
  sponsorList: any,
  fixture: any,
): any[] => {
  console.log("sponsorList ", sponsorList, fixture);
  if (!sponsorList || !fixture) return [];
  const sponsors: any[] = [];

  // Add logic to get sponsors based on the fixture details (team, league, grade)
  if (fixture.gradeName) {
    sponsors.push(
      ...sponsorList.grade.filter((s: any) => s.level === fixture.gradeName),
    );
  }
  if (fixture.teamHome || fixture.teamAway) {
    sponsors.push(
      ...sponsorList.team.filter(
        (s: any) =>
          s.level === fixture.teamHome || s.level === fixture.teamAway,
      ),
    );
  }
  if (fixture.league) {
    sponsors.push(
      ...sponsorList.league.filter((s: any) => s.level === fixture.league),
    );
  }

  return sponsors;
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
