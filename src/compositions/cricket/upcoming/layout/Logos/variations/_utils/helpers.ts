/**
 * Logo size configurations for different display contexts
 */
export const LOGO_SIZES = {
  large: { container: "w-35 h-35", size: 35 },
  medium: { container: "w-20 h-20", size: 20 },
  small: { container: "w-16 h-16", size: 16 },
};

/**
 * CSS class mappings for logo positioning in LogosOnly component
 */
export const LOGO_POSITION_CLASSES: Record<
  string,
  { home: string; away: string }
> = {
  center: {
    home: "flex-1 flex flex-col items-center",
    away: "flex-1 flex flex-col items-center",
  },
  split: {
    home: "flex-1 flex flex-col items-start px-4",
    away: "flex-1 flex flex-col items-end px-4",
  },
  together: {
    home: "flex-1 flex flex-col items-end px-4",
    away: "flex-1 flex flex-col items-start px-4",
  },
};
