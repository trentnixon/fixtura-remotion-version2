import React, { createContext, useContext, ReactNode, useMemo } from "react";
import { useGlobalContext } from "./GlobalContext";
import { useVideoDataContext } from "./VideoDataContext";
import { DesignPalette } from "../utils/designPalettes/types";
import { createColorSystem } from "../utils/colorSystem";
import {
  ThemeContextProps,
  ThemeFonts,
  ThemeTypography,
  ThemeLayout,
  ThemeSports,
} from "./types/ThemeContextTypes";

// Create the context with proper typing
const ThemeContext = createContext<ThemeContextProps | null>(null);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { settings } = useGlobalContext();
  const { video } = useVideoDataContext();

  // Create the merged theme using useMemo for performance
  const theme = useMemo(() => {
    // Extract theme data and variations
    const dataTheme = video.appearance.theme || {};
    const templateVariation = video.templateVariation;

    // Create color system with fallbacks
    const primaryColor =
      dataTheme.primary || settings.colors?.primary || "#111111";
    const secondaryColor =
      dataTheme.secondary || settings.colors?.secondary || "#ffffff";

    const selectedMode = templateVariation.mode || "light";
    const useMode = settings.mode[selectedMode];

    const colorSystem = createColorSystem(
      primaryColor,
      secondaryColor,
      useMode,
    );

    // Helper function to get active palette
    const getActivePalette = (paletteName?: string): DesignPalette => {
      if (!paletteName) {
        const variationPalette = templateVariation?.palette;
        paletteName = variationPalette || "primary";
      }

      const palette = colorSystem.palettes[
        paletteName as keyof typeof colorSystem.palettes
      ] as DesignPalette;
      return palette || colorSystem.palettes.primary;
    };

    // Font configuration with fallbacks
    const fontConfig =
      settings.fontConfig || settings.fonts?.title?.family || "Roboto";
    const defaultCopyFontFamily =
      settings.defaultCopyFontFamily ||
      settings.fonts?.copy?.family ||
      fontConfig;
    const headingFontFamily =
      settings.headingFontFamily || settings.fonts?.title?.family || fontConfig;
    const subheadingFontFamily =
      settings.subheadingFontFamily ||
      settings.fonts?.subtitle?.family ||
      fontConfig;

    // Create structured font classes
    const fontClasses = settings.fontClasses || {
      heading: { family: headingFontFamily },
      subheading: { family: subheadingFontFamily },
      body: { family: defaultCopyFontFamily },
    };

    // Create theme object with all required properties and fallbacks
    // NOTE: colors, getActivePalette, selectedPalette MUST come AFTER ...settings
    // so user-derived colors (video.appearance.theme) take precedence over
    // static template/base theme colors (e.g. baseTheme.colors.primary).
    const themeObject: ThemeContextProps = {
      // Core font properties
      fonts: (settings.fonts as ThemeFonts) || {
        title: { family: fontConfig, tailwindClass: "" },
        copy: { family: defaultCopyFontFamily, tailwindClass: "" },
      },
      fontConfig,
      defaultCopyFontFamily,
      headingFontFamily,
      subheadingFontFamily,
      fontClasses,

      // Component and layout styles
      componentStyles: settings.componentStyles || {},
      layout: (settings.layout as ThemeLayout) || {
        heights: { AssetHeight: 1080, Header: 160, Footer: 100 },
      },

      typography: (settings.typography as ThemeTypography) || {
        Title: {
          sizes: { default: "text-6xl" },
          letterSpacing: "tracking-tight",
          lineHeight: "leading-tight",
          weights: { default: "font-bold" },
        },
      },

      // Additional configuration
      sports: (settings.sports as ThemeSports) || {},
      gradientDegree: settings.gradientDegree || "45deg",

      // Include remaining settings (may contain static colors from template)
      ...settings,

      // User-derived colors - MUST override any settings.colors so score bar,
      // result bar, and other accents use video.appearance.theme from user obj
      colors: { colorSystem, primary: primaryColor, secondary: secondaryColor },
      getActivePalette,
      selectedPalette: (() => {
        const palette = getActivePalette();
        return palette;
      })(),
    };

    return themeObject;
  }, [settings, video.appearance.theme, video.templateVariation]);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};
