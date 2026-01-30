// Shared utilities to determine which player stat blocks to render
// Covers Two Day+ partial-innings behavior and account-club focused display

export type VisibilityFlags = {
  homeShowBatting: boolean;
  homeShowBowling: boolean;
  awayShowBatting: boolean;
  awayShowBowling: boolean;
};

export type VisibilityResult = VisibilityFlags & {
  isPartialTwoDay: boolean;
  isSingleTeamPerformances: boolean;
};

/**
 * Determine if we are in a Two Day+ game with only one team having batted so far
 */
export function isTwoDaySingleInnings(
  matchType?: string,
  matchStatus?: string,
  homeBatted?: boolean,
  awayBatted?: boolean,
): boolean {
  return (
    matchType === "Two Day+" &&
    matchStatus === "In Progress" &&
    !!homeBatted !== !!awayBatted
  );
}

/**
 * Compute baseline visibility from Two Day+ partial-innings logic
 */
export function computePartialTwoDayVisibility(params: {
  matchType?: string;
  matchStatus?: string;
  homeBatted: boolean;
  awayBatted: boolean;
}): { flags: VisibilityFlags; isPartialTwoDay: boolean } {
  const { matchType, matchStatus, homeBatted, awayBatted } = params;
  const isPartialTwoDay = isTwoDaySingleInnings(
    matchType,
    matchStatus,
    homeBatted,
    awayBatted,
  );

  const flags: VisibilityFlags = {
    homeShowBatting: !isPartialTwoDay || homeBatted,
    homeShowBowling: !isPartialTwoDay || !homeBatted,
    awayShowBatting: !isPartialTwoDay || awayBatted,
    awayShowBowling: !isPartialTwoDay || !awayBatted,
  };

  return { flags, isPartialTwoDay };
}

/**
 * Overlay account-club focused display rules on top of baseline visibility
 * - If only home is club → show home batting + away bowling
 * - If only away is club → show away batting + home bowling
 * - If both are club or neither → leave baseline intact
 */
export function applyAccountClubOverlay(
  base: VisibilityFlags,
  params: { isAccountClub: boolean; homeIsClub: boolean; awayIsClub: boolean },
): { flags: VisibilityFlags; isSingleTeamPerformances: boolean } {
  const { isAccountClub, homeIsClub, awayIsClub } = params;
  let flags = { ...base };

  if (isAccountClub) {
    if (homeIsClub && !awayIsClub) {
      flags = {
        homeShowBatting: true,
        homeShowBowling: false,
        awayShowBatting: false,
        awayShowBowling: true,
      };
    } else if (!homeIsClub && awayIsClub) {
      flags = {
        homeShowBatting: false,
        homeShowBowling: true,
        awayShowBatting: true,
        awayShowBowling: false,
      };
    }
  }

  const isSingleTeamPerformances =
    isAccountClub &&
    ((homeIsClub && !awayIsClub) || (!homeIsClub && awayIsClub));

  return { flags, isSingleTeamPerformances };
}

/**
 * Full computation in one call for convenience.
 */
export function computePlayerVisibility(params: {
  matchType?: string;
  matchStatus?: string;
  homeBatted: boolean;
  awayBatted: boolean;
  isAccountClub: boolean;
  homeIsClub: boolean;
  awayIsClub: boolean;
}): VisibilityResult {
  const { flags: baseFlags, isPartialTwoDay } = computePartialTwoDayVisibility({
    matchType: params.matchType,
    matchStatus: params.matchStatus,
    homeBatted: params.homeBatted,
    awayBatted: params.awayBatted,
  });

  const { flags, isSingleTeamPerformances } = applyAccountClubOverlay(
    baseFlags,
    {
      isAccountClub: params.isAccountClub,
      homeIsClub: params.homeIsClub,
      awayIsClub: params.awayIsClub,
    },
  );

  return { ...flags, isPartialTwoDay, isSingleTeamPerformances };
}
