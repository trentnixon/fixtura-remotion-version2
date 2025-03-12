import { setOpacity } from "../core/baseManipulation";

/**
 * Generate themed shadow
 */
export const generateThemedShadow = (color: string, size: number): string => {
  const shadowColor = setOpacity(color, 0.2);
  const defaultShadows = {
    5: `0 1px 3px 0 ${shadowColor}, 0 1px 2px 0 ${setOpacity(color, 0.1)}`,
    10: `0 4px 6px -1px ${shadowColor}, 0 2px 4px -1px ${setOpacity(color, 0.1)}`,
    20: `0 10px 15px -3px ${shadowColor}, 0 4px 6px -2px ${setOpacity(color, 0.1)}`,
  };

  return (
    defaultShadows[size as keyof typeof defaultShadows] || defaultShadows[10]
  );
};

/**
 * Generates shadow styles based on a color
 */
export const generateShadows = (color: string) => {
  return {
    small: generateThemedShadow(color, 5),
    medium: generateThemedShadow(color, 10),
    large: generateThemedShadow(color, 20),
    glow: `0 0 15px ${setOpacity(color, 0.5)}`,
  };
};
