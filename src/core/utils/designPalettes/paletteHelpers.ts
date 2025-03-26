import { GradientOptions, CSSGradientOptions } from "./types";

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
  onBackground: any,
  onContainer: any,
  additionalProps: any = {},
) => ({
  onBackground: {
    ...onBackground,
    muted: onBackground.muted || `${onBackground.main}CC`, // Add 80% opacity if not provided
    accent: onBackground.accent || onBackground.main,
  },
  onContainer: {
    ...onContainer,
    muted: onContainer.muted || `${onContainer.primary}CC`, // Add 80% opacity if not provided
    accent: onContainer.accent || onContainer.primary,
  },
  ...additionalProps,
});

// Fix a container with onBackground property
export const createContainerOptions = (containerOptions: any) => {
  const { onBackground, ...restOptions } = containerOptions;
  return restOptions;
};
