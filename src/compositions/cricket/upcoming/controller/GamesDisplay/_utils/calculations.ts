import { GameData } from "../../../_types/types";
import { AssignSponsors } from "../../../../_types/composition-types";

/**
 * Default spacing configuration for game card height calculations
 */
export interface GameCardSpacing {
  headerHeight: number;
  contentPadding: number;
  cardSpacing: number;
}

/**
 * Default spacing values used by most components
 */
export const DEFAULT_SPACING: GameCardSpacing = {
  headerHeight: 100,
  contentPadding: 40,
  cardSpacing: 20,
};

/** Broadcast Pro upcoming — asset area is fixtures only; footer is a sibling. */
export const BROADCAST_PRO_UPCOMING_SPACING: GameCardSpacing = {
  headerHeight: 0,
  contentPadding: 0,
  cardSpacing: 4,
};

const getBroadcastProUpcomingCardHeightCap = (
  gamesOnScreen: number,
): number => {
  if (gamesOnScreen >= 3) {
    return 210;
  }
  if (gamesOnScreen === 2) {
    return 260;
  }
  return 320;
};

/**
 * Fixed row height for Broadcast Pro upcoming cards so fixtures + sponsors fit the frame.
 * Capped below even-split height so multiple fixtures group toward the top of the asset.
 */
export const calculateBroadcastProGameCardHeight = (
  assetHeight: number,
  gamesOnScreen: number,
  spacing: GameCardSpacing = BROADCAST_PRO_UPCOMING_SPACING,
): number => {
  if (gamesOnScreen <= 0) {
    return 0;
  }

  const gapTotal = spacing.cardSpacing * Math.max(0, gamesOnScreen - 1);
  const evenSplit = Math.floor((assetHeight - gapTotal) / gamesOnScreen);
  return Math.min(
    evenSplit,
    getBroadcastProUpcomingCardHeightCap(gamesOnScreen),
  );
};

/**
 * Calculates which games should be displayed on the current screen
 * @param games - All available games
 * @param gamesPerScreen - Number of games to show per screen
 * @param screenIndex - Current screen index (0-based)
 * @returns Array of games to display on this screen
 */
export const calculateDisplayedGames = (
  games: GameData[],
  gamesPerScreen: number,
  screenIndex: number,
): GameData[] => {
  const startIndex = screenIndex * gamesPerScreen;
  const endIndex = Math.min(startIndex + gamesPerScreen, games.length);
  return games.slice(startIndex, endIndex);
};

/**
 * Calculates the height for each game card based on available space and spacing configuration
 * @param assetHeight - Total height of the asset
 * @param gamesPerScreen - Number of games displayed per screen
 * @param spacing - Spacing configuration (headerHeight, contentPadding, cardSpacing)
 * @returns Calculated game card height in pixels
 */
export const calculateGameCardHeight = (
  assetHeight: number,
  gamesPerScreen: number,
  spacing: GameCardSpacing = DEFAULT_SPACING,
): number => {
  const { headerHeight, contentPadding, cardSpacing } = spacing;
  const availableHeight = assetHeight - headerHeight - contentPadding;
  return Math.floor(availableHeight / gamesPerScreen - cardSpacing);
};

/**
 * Merges all assignSponsors objects from an array of games into a single object
 * @param games - Array of games with assignSponsors properties
 * @returns Merged AssignSponsors object
 */
export const mergeAssignSponsors = (games: GameData[]): AssignSponsors => {
  return games.reduce(
    (acc, game) => ({ ...acc, ...game.assignSponsors }),
    {} as AssignSponsors,
  );
};
