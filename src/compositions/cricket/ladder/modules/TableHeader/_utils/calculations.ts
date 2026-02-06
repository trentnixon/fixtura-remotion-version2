/**
 * Calculate the actual height with max constraint
 * Used for headers and rows that need to respect a maximum height limit
 * @param height - The desired height
 * @param maxHeight - Maximum height constraint (default: 120)
 * @returns The actual height (minimum of height and maxHeight)
 */
export const calculateActualHeight = (
  height: number,
  maxHeight: number = 120,
): number => {
  return Math.min(height, maxHeight);
};
