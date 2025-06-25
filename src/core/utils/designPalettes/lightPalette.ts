// designPalettes/lightPalette.ts
import {
  DesignPalette,
  GradientOptions,
  TextColors,
  ShadowOptions,
  UtilityColors,
  ContrastOptions,
} from "./types";
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
// REVIEW: BUGS IN SECONDARY COLOR
export const createLightPalette = (
  primary: string,
  secondary: string,
  backgrounds: { light?: string },
  textColors: TextColors,
  shadows: ShadowOptions,
  utility: UtilityColors,
  contrast: ContrastOptions,
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
        primary: createGradientOptions("#F9FAFB", "#FFFFFF"),
        secondary: createGradientOptions("#FFFFFF", "#F3F4F6"),
        primaryToSecondary: createGradientOptions("#F9FAFB", "#FFFFFF"),
        secondaryToPrimary: createGradientOptions(
          "#FFFFFF",
          "#F9FAFB",
          "linear",
          "to left",
        ),
        radial: `radial-gradient(circle, #F9FAFB, #FFFFFF)`,
        conicGradient: createGradientOptions("#F9FAFB", "#FFFFFF"),
        hardStopGradient: createGradientOptions("#F9FAFB", "#FFFFFF"),
        meshGradient: createGradientOptions("#F9FAFB", "#FFFFFF"),
        primaryAdvanced: createGradientOptions("#F9FAFB", "#FFFFFF"),
        primaryRadial: createGradientOptions("#F9FAFB", "#FFFFFF", "radial"),
        secondaryAdvanced: createGradientOptions("#FFFFFF", "#F3F4F6"),
        secondaryRadial: createGradientOptions("#FFFFFF", "#F3F4F6", "radial"),
      },
    },
    container: {
      primary: "#FFFFFF",
      secondary: "#F3F4F6",
      main: "#FFFFFF",
      light: "#FFFFFF",
      dark: "#E5E7EB",
      transparent: "rgba(255, 255, 255, 0.8)",
      accent: primary,
      highlight: secondary,
      gradientPrimaryToSecondaryHorizontal: `linear-gradient(to right, #FFFFFF, ${secondary})`,
      gradientPrimaryToSecondaryVertical: `linear-gradient(to bottom, #FFFFFF, ${secondary})`,
      gradientSecondaryToPrimaryHorizontal: `linear-gradient(to right, ${secondary}, #FFFFFF)`,
      gradientSecondaryToPrimaryVertical: `linear-gradient(to bottom, ${secondary}, #FFFFFF)`,
      saturated: tinycolor("#FFFFFF").saturate(20).toString(),
      transparentAccent: tinycolor(primary).setAlpha(0.7).toRgbString(),
      transparentMain: tinycolor("#FFFFFF").setAlpha(0.7).toRgbString(),
      transparentSecondary: tinycolor("#F3F4F6").setAlpha(0.7).toRgbString(),
      transparentPrimary: tinycolor("#FFFFFF").toRgbString(),
      muted: tinycolor("#FFFFFF").setAlpha(0.5).toRgbString(),
    },
    text: {
      onBackground: {
        main: textColors.onLight || "#111827",
        light: textColors.onLight || "#F3F4F6",
        dark: textColors.onLight || "#374151",
        muted: tinycolor(textColors.onLight || "#111827")
          .setAlpha(0.7)
          .toRgbString(),
        accent: primary,
      },
      onContainer: {
        primary: textColors.onLight || "#111827",
        secondary: textColors.onLight || "#F3F4F6",
        light: textColors.onLight || "#F3F4F6",
        dark: textColors.onLight || "#374151",
        muted: tinycolor(textColors.onLight || "#111827")
          .setAlpha(0.7)
          .toRgbString(),
        accent: primary,
      },
      title: "#111827",
      body: "#374151",
      primary: "#111827",
      secondary: "#374151",
      accent: primary,
      contrast: textColors.onLight || "#111827",
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
