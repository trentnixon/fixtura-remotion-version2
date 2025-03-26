// designPalettes/darkPalette.ts
import { DesignPalette, GradientOptions } from "./types";
import tinycolor from "tinycolor2";

// Helper function to create gradient options
const createGradientOptions = (
  color1: string,
  color2: string,
  type: "linear" | "radial" = "linear",
  direction: string = "to right",
): GradientOptions => ({
  direction,
  type,
  stops: [color1, color2],
  css: {
    DEFAULT: `linear-gradient(to right, ${color1}, ${color2})`,
    DIAGONAL: `linear-gradient(45deg, ${color1}, ${color2})`,
    DIAGONAL_REVERSE: `linear-gradient(135deg, ${color1}, ${color2})`,
    HORIZONTAL: `linear-gradient(90deg, ${color1}, ${color2})`,
    HORIZONTAL_REVERSE: `linear-gradient(270deg, ${color1}, ${color2})`,
    VERTICAL: `linear-gradient(180deg, ${color1}, ${color2})`,
    VERTICAL_REVERSE: `linear-gradient(0deg, ${color1}, ${color2})`,
    CONIC: `conic-gradient(${color1}, ${color2}, ${color1})`,
  },
});

export const createDarkPalette = (
  backgrounds: any,
  textColors: any,
  shadows: any,
  utility: any,
  contrast: any,
  primary: string,
): DesignPalette => {
  const darkBg = backgrounds.dark || "#111827";
  const darkBgLight = "#2D3748";
  const darkBgDark = "#111827";

  return {
    name: "Dark",
    background: {
      main: darkBg,
      light: darkBgLight,
      dark: darkBgDark,
      contrast: "#FFFFFF",
      accent: primary,
      gradient: {
        primary: createGradientOptions(darkBgDark, "#1F2937"),
        secondary: createGradientOptions("#1F2937", darkBgLight),
        primaryToSecondary: createGradientOptions(darkBgDark, "#1F2937"),
        secondaryToPrimary: createGradientOptions(
          "#1F2937",
          darkBgDark,
          "linear",
          "to left",
        ),
        radial: `radial-gradient(circle, ${darkBgDark}, #1F2937)`,
        conicGradient: createGradientOptions(darkBgDark, "#1F2937"),
        hardStopGradient: createGradientOptions(darkBgDark, "#1F2937"),
        meshGradient: createGradientOptions(darkBgDark, "#1F2937"),
        primaryAdvanced: createGradientOptions(darkBgDark, "#1F2937"),
        primaryRadial: createGradientOptions(darkBgDark, "#1F2937", "radial"),
        secondaryAdvanced: createGradientOptions("#1F2937", darkBgLight),
        secondaryRadial: createGradientOptions(
          "#1F2937",
          darkBgLight,
          "radial",
        ),
      },
    },
    container: {
      primary: darkBgLight,
      secondary: "#4A5568",
      main: darkBgLight,
      light: "#4A5568",
      dark: "#1A202C",
      transparent: "rgba(26, 32, 44, 0.8)",
      accent: primary,
      highlight: "#4B5563",
    },
    text: {
      onBackground: {
        main: textColors.onDark,
        light: textColors.onDark,
        dark: textColors.onDark,
        muted: tinycolor(textColors.onDark).setAlpha(0.7).toRgbString(),
        accent: primary,
      },
      onContainer: {
        primary: textColors.onDark,
        secondary: textColors.onDark,
        light: textColors.onDark,
        dark: textColors.onDark,
        muted: tinycolor(textColors.onDark).setAlpha(0.7).toRgbString(),
        accent: primary,
      },
      title: textColors.onDark,
      body: tinycolor(textColors.onDark).setAlpha(0.9).toRgbString(),
      primary: textColors.onDark,
      secondary: textColors.onDark,
      contrast: textColors.onDark,
      safePrimary: contrast.primary.safeColor,
      safeSecondary: contrast.secondary.safeColor,
      highlight: utility.success,
    },

    shadow: {
      small: shadows.small,
      medium: shadows.medium,
      large: shadows.large,
      glow:
        shadows.glow ||
        `0 0 15px ${tinycolor(darkBg).setAlpha(0.5).toRgbString()}`,
    },
  };
};
