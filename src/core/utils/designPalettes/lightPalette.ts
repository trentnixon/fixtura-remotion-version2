// designPalettes/lightPalette.ts
import {
  DesignPalette,
  TextColors,
  ShadowOptions,
  UtilityColors,
  ContrastOptions,
} from "./types";
import tinycolor from "tinycolor2";
import {
  createBackgroundIdentity,
  createContainerSurfaceFields,
  createGradientOptions,
  createOnContainerContentText,
} from "./paletteHelpers";

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
  const onLight = textColors.onLight || "#111827";

  return {
    name: "Light",
    background: {
      ...createBackgroundIdentity(primary, secondary),
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
      ...createContainerSurfaceFields(lightBg),
    },
    text: {
      onBackground: {
        main: onLight,
        light: textColors.onLight || "#F3F4F6",
        dark: textColors.onLight || "#374151",
        muted: tinycolor(onLight).setAlpha(0.7).toRgbString(),
        accent: primary,
      },
      onContainer: {
        primary: onLight,
        secondary: textColors.onLight || "#F3F4F6",
        light: textColors.onLight || "#F3F4F6",
        dark: textColors.onLight || "#374151",
        muted: tinycolor(onLight).setAlpha(0.7).toRgbString(),
        accent: primary,
        ...createOnContainerContentText(lightBg, onLight),
      },
      title: "#111827",
      body: "#374151",
      primary: "#111827",
      secondary: "#374151",
      accent: primary,
      contrast: onLight,
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
