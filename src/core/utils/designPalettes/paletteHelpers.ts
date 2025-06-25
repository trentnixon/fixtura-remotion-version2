import { GradientOptions, CSSGradientOptions, TextOptions } from "./types";

// Create a CSS gradient options object
export const createCSSGradientOptions = (
  color1: string,
  color2: string,
): CSSGradientOptions => ({
  DEFAULT: `linear-gradient(to right, ${color1}, ${color2})`,
  DIAGONAL: `linear-gradient(45deg, ${color1}, ${color2})`,
  DIAGONAL_REVERSE: `linear-gradient(135deg, ${color1}, ${color2})`,
  HORIZONTAL: `linear-gradient(90deg, ${color1}, ${color2})`,
  HORIZONTAL_REVERSE: `linear-gradient(270deg, ${color1}, ${color2})`,
  VERTICAL: `linear-gradient(180deg, ${color1}, ${color2})`,
  VERTICAL_REVERSE: `linear-gradient(0deg, ${color1}, ${color2})`,
  CONIC: `conic-gradient(${color1}, ${color2}, ${color1})`,
});

// Create a gradient options object
export const createGradientOptions = (
  color1: string,
  color2: string,
  type: "linear" | "radial" = "linear",
  direction: string = "to right",
): GradientOptions => ({
  direction,
  type,
  stops: [color1, color2],
  css: createCSSGradientOptions(color1, color2),
});

// Create text options with defaults
export const createTextOptions = (
  onBackground: TextOptions["onBackground"],
  onContainer: TextOptions["onContainer"],
  additionalProps: Partial<TextOptions> = {},
): TextOptions => ({
  onBackground: {
    ...onBackground,
    muted: onBackground.muted || `${onBackground.main}CC`,
    accent: onBackground.accent || onBackground.main,
  },
  onContainer: {
    ...onContainer,
    muted: onContainer.muted || `${onContainer.primary}CC`,
    accent: onContainer.accent || onContainer.primary,
  },
  ...additionalProps,
});

// Fix a container with onBackground property
export const createContainerOptions = (
  containerOptions: Record<string, unknown>,
) => {
  // Just return the object as-is, or copy it if needed
  return { ...containerOptions };
};
