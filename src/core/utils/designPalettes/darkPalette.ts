// designPalettes/darkPalette.ts
import { DesignPalette } from "./types";
import tinycolor from "tinycolor2";

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
        primary: darkBgDark,
        secondary: "#1F2937",
        css: `linear-gradient(to bottom, ${darkBgDark}, #1F2937)`,
        primaryToSecondary: `linear-gradient(to right, ${darkBgDark}, #1F2937)`,
        secondaryToPrimary: `linear-gradient(to left, ${darkBgDark}, #1F2937)`,
        radial: `radial-gradient(circle, ${darkBgDark}, #1F2937)`,
      },
    },
    container: {
      primary: darkBgLight,
      secondary: "#4A5568",
      light: "#4A5568",
      dark: "#1A202C",
      transparent: "rgba(26, 32, 44, 0.8)",
      accent: primary,
      highlight: "#4B5563",
      onBackground: {
        main: "#2D3748",
        light: "#4A5568",
        dark: "#1A202C",
      },
    },
    text: {
      onBackground: {
        main: textColors.onDark,
        light: textColors.onDark,
        dark: textColors.onDark,
      },
      onContainer: {
        primary: textColors.onDark,
        secondary: textColors.onDark,
        light: textColors.onDark,
        dark: textColors.onDark,
      },
      title: textColors.onDark,
      body: tinycolor(textColors.onDark).setAlpha(0.9).toRgbString(),
      muted: tinycolor(textColors.onDark).setAlpha(0.7).toRgbString(),
      primary: textColors.onDark,
      secondary: textColors.onDark,
      accent: primary,
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
