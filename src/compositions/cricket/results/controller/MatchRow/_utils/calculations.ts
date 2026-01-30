/**
 * Calculates animation delay based on row index
 * @param index - The index of the row
 * @returns Base delay value for animation
 */
export const calculateDelay = (index: number): number => {
  return index * 5; // Base delay for animation
};

/**
 * Calculates the animation out frame based on timing configuration
 * @param fpsScorecard - FPS_SCORECARD timing value (optional)
 * @returns Animation out frame number
 */
export const calculateAnimationOutFrame = (fpsScorecard?: number): number => {
  return fpsScorecard ? fpsScorecard - 20 : 280;
};
