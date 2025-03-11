// designPalettes/lightPalette.ts
import { DesignPalette } from "./types";
import tinycolor from "tinycolor2";

export const createLightPalette = (
  primary: string,
  secondary: string,
  backgrounds: any,
  textColors: any,
  shadows: any,
  utility: any,
  contrast: any,
): DesignPalette => {
  const lightBg = backgrounds.light || "#F9FAFB";

  return {
    name: "Light",
    background: {
      main: lightBg,
      light: "#FFFFFF",
      dark: "#E5E7EB",
      contrast: "#111827",
      accent: primary,
      gradient: {
        primary: "#F9FAFB",
        secondary: "#FFFFFF",
        css: `linear-gradient(to bottom, #F9FAFB, #FFFFFF)`,
        primaryToSecondary: `linear-gradient(to right, #F9FAFB, #FFFFFF)`,
        secondaryToPrimary: `linear-gradient(to left, #F9FAFB, #FFFFFF)`,
        radial: `radial-gradient(circle, #F9FAFB, #FFFFFF)`,
      },
    },
    container: {
      primary: "#FFFFFF",
      secondary: "#F3F4F6",
      light: "#FFFFFF",
      dark: "#E5E7EB",
      transparent: "rgba(255, 255, 255, 0.8)",
      accent: primary,
      highlight: secondary,
      onBackground: {
        main: "#FFFFFF",
        light: "#F3F4F6",
        dark: "#E5E7EB",
      },
    },
    text: {
      onBackground: {
        main: textColors.onLight,
        light: textColors.onLight,
        dark: textColors.onLight,
      },
      onContainer: {
        primary: textColors.onLight,
        secondary: textColors.onLight,
        light: textColors.onLight,
        dark: textColors.onLight,
      },
      title: "#111827",
      body: "#374151",
      muted: "#6B7280",
      primary: "#111827",
      secondary: "#374151",
      accent: primary,
      contrast: textColors.onLight,
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
        `0 0 15px ${tinycolor(lightBg).setAlpha(0.5).toRgbString()}`,
    },
  };
};
