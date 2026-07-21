/**
 * Get available height from theme layout
 * @param heights - Layout heights object from theme context
 * @returns Available height value
 */
export const getAvailableHeight = (heights: { asset: number }): number => {
  return heights.asset;
};

/**
 * Height for the main roster body when a sponsor/footer strip (`layout.heights.footer`)
 * is stacked below the content (same pattern as ladder/top5 BroadcastPro).
 */
export const getAvailableHeightReservingFooter = (heights: {
  asset: number;
  footer: number;
}): number => {
  return Math.max(1, heights.asset - heights.footer);
};

/**
 * Get background color from theme palette
 * @param selectedPalette - Selected palette from theme context
 * @returns Background color string
 */
export const getBackgroundColor = (selectedPalette: {
  container: {
    backgroundTransparent: {
      high: string;
    };
  };
}): string => {
  return selectedPalette.container.backgroundTransparent.high;
};
