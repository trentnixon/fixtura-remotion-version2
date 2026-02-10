/**
 * Get subtle background color from theme palette
 * @param selectedPalette - Selected palette from theme context
 * @returns Background color string for subtle wrapper
 */
export const getSubtleBackgroundColor = (selectedPalette: {
  container: {
    backgroundTransparent: {
      subtle: string;
    };
  };
}): string => {
  return selectedPalette.container.backgroundTransparent.subtle;
};
