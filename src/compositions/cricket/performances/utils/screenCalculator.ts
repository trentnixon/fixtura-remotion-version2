import { PerformanceData, ScreenCalculationResult } from "../types";

/**
 * Calculate screen configuration for pagination
 * @param items Array of performance items
 * @param itemsPerScreen Number of items to display per screen (default: 5)
 * @returns Screen calculation result with helper functions
 */
export const calculateScreens = (
  items: PerformanceData[],
  itemsPerScreen: number = 5,
): ScreenCalculationResult => {
  if (!items || items.length === 0) {
    return {
      totalScreens: 0,
      itemsPerScreen,
      getItemsForScreen: () => [],
    };
  }

  const totalScreens = Math.ceil(items.length / itemsPerScreen);

  /**
   * Get items for a specific screen
   * @param screenIndex Zero-based screen index
   * @returns Array of items for that screen
   */
  const getItemsForScreen = (screenIndex: number): PerformanceData[] => {
    if (screenIndex < 0 || screenIndex >= totalScreens) {
      return [];
    }

    const startIndex = screenIndex * itemsPerScreen;
    const endIndex = Math.min(startIndex + itemsPerScreen, items.length);

    return items.slice(startIndex, endIndex);
  };

  return {
    totalScreens,
    itemsPerScreen,
    getItemsForScreen,
  };
};

/**
 * Get items for a specific screen (standalone function)
 * @param items Array of performance items
 * @param screenIndex Zero-based screen index
 * @param itemsPerScreen Number of items per screen (default: 5)
 * @returns Array of items for that screen
 */
export const getItemsForScreen = (
  items: PerformanceData[],
  screenIndex: number,
  itemsPerScreen: number = 5,
): PerformanceData[] => {
  if (!items || items.length === 0 || screenIndex < 0) {
    return [];
  }

  const totalScreens = Math.ceil(items.length / itemsPerScreen);
  if (screenIndex >= totalScreens) {
    return [];
  }

  const startIndex = screenIndex * itemsPerScreen;
  const endIndex = Math.min(startIndex + itemsPerScreen, items.length);

  const result = items.slice(startIndex, endIndex);

  // Debug logging (remove in production)
  console.log("[getItemsForScreen] Debug:", {
    screenIndex,
    itemsPerScreen,
    totalItems: items.length,
    totalScreens,
    startIndex,
    endIndex,
    resultCount: result.length,
    resultNames: result.map((item) => item.name),
  });

  return result;
};
