import { GameData } from "../../../_types/types";
import { buildMultiRowFooterSponsors } from "../../../../../../core/utils/sponsors";
import type { Sponsor } from "../../../../../../core/types/data/sponsors";

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
  cardSpacing: 36,
};

/** Space between fixture cards (divider sits centred in this band). */
export const BROADCAST_PRO_UPCOMING_LIST_ITEM_SPACING_PX =
  BROADCAST_PRO_UPCOMING_SPACING.cardSpacing;

/** Vertical gap between header, matchup, and ground strips — keep in sync with `game-card-broadcastPro`. */
export const BROADCAST_PRO_UPCOMING_SECTION_GAP_PX = 10;

/** Centred rule between upcoming fixture cards — keep in sync with `games-list-broadcastPro`. */
export const BROADCAST_PRO_UPCOMING_LIST_DIVIDER_WIDTH_PX = 20;
export const BROADCAST_PRO_UPCOMING_LIST_DIVIDER_HEIGHT_PX = 2;

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
 * Build footer logos for fixtures currently on screen (multi-row v2 policy).
 */
export const buildUpcomingFooterSponsors = (games: GameData[]): Sponsor[] => {
  return buildMultiRowFooterSponsors(games);
};
