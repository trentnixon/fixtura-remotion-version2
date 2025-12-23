import { TeamOfTheWeekPlayer, ScreenCalculationResult } from "../types";

/**
 * Get items for a specific screen
 * @param items - Full array of players
 * @param screenIndex - Current screen index (0-based)
 * @param itemsPerScreen - Number of items to display per screen
 * @returns Sliced array for the specific screen
 */
export const getItemsForScreen = (
  items: TeamOfTheWeekPlayer[],
  screenIndex: number,
  itemsPerScreen: number,
): TeamOfTheWeekPlayer[] => {
  const startIndex = screenIndex * itemsPerScreen;
  const endIndex = startIndex + itemsPerScreen;
  return items.slice(startIndex, endIndex);
};

/**
 * Calculate total number of screens needed
 * @param totalItems - Total number of items
 * @param itemsPerScreen - Number of items per screen
 * @returns Total screens needed
 */
export const calculateTotalScreens = (
  totalItems: number,
  itemsPerScreen: number,
): number => {
  return Math.ceil(totalItems / itemsPerScreen);
};

/**
 * Calculate screen configuration for Team of the Week
 * @param items - Full array of players
 * @param itemsPerScreen - Number of items to display per screen
 * @returns Screen calculation result with helper functions
 */
export const calculateScreens = (
  items: TeamOfTheWeekPlayer[],
  itemsPerScreen: number,
): ScreenCalculationResult => {
  const totalScreens = calculateTotalScreens(items.length, itemsPerScreen);

  return {
    totalScreens,
    itemsPerScreen,
    getItemsForScreen: (screenIndex: number) =>
      getItemsForScreen(items, screenIndex, itemsPerScreen),
  };
};
