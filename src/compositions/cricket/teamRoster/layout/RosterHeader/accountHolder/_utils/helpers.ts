/**
 * Parse logo size string to number
 * @param logoSize - Logo size as string
 * @returns Parsed logo size as number
 */
export const parseLogoSize = (logoSize: string): number => {
  return parseInt(logoSize);
};

/**
 * Generate Tailwind CSS class for logo size
 * @param logoSize - Logo size as string
 * @returns Tailwind CSS class string
 */
export const getLogoSizeClass = (logoSize: string): string => {
  return `w-[${logoSize}px] h-[${logoSize}px]`;
};

/**
 * Check if backgroundColor should be applied
 * @param backgroundColor - Background color value
 * @returns True if backgroundColor is not "none"
 */
export const shouldApplyBackgroundColor = (
  backgroundColor: string | undefined,
): boolean => {
  return backgroundColor !== undefined && backgroundColor !== "none";
};
