import React, { createContext, useContext, ReactNode, useMemo } from "react";
import { useGlobalContext } from "./GlobalContext";
import { useVideoDataContext } from "./VideoDataContext";

import {
  createThemeColorUtils,
  ThemeColorUtils,
} from "../utils/themeColorUtils";
import { DesignPalette } from "../utils/designPalettes/types";
// Define theme structure with TypeScript for better type safety and documentation
export interface FontClass {
  family: string;
  size: string;
  weight: string;
  spacing: string;
  leading: string;
}

export interface ThemeFont {
  family: string;
  tailwindClass: string;
}

export interface ThemeFonts {
  title: ThemeFont;
  copy: ThemeFont;
  [key: string]: ThemeFont;
}

// Define the ColorPalette interface
export interface ColorPalette {
  name: string;
  background: string;
  text: string;
  container: string;
  containerText: string;
  accent: string;
  highlight: string;
}

// Define the ThemePalettes interface
export interface ThemePalettes {
  primary: ColorPalette;
  secondary: ColorPalette;
  dark: ColorPalette;
  light: ColorPalette;
  accent: ColorPalette;
  [key: string]: ColorPalette; // Allow for custom palettes
}

// Enhanced color interface that includes our utilities
export interface ThemeColors {
  // Base colors (from user data)
  primary: string;
  secondary: string;

  // Enhanced color utilities - this contains all our color variations and options
  utils: ThemeColorUtils;

  // Palettes system
  //palettes: ThemePalettes;

  // Legacy/fallback properties for backward compatibility
  // These can be removed once all components are updated to use utils
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
}

export interface TypographySize {
  [key: string]: string;
}

export interface TypographyWeight {
  [key: string]: string;
}

export interface TypographyElement {
  sizes: TypographySize;
  letterSpacing: string;
  lineHeight: string;
  weights: TypographyWeight;
}

export interface ThemeTypography {
  Title: TypographyElement;
  Subtitle?: TypographyElement;
  Body?: TypographyElement;
  Sports?: {
    Player?: TypographyElement;
    Score?: TypographyElement;
    Stat?: TypographyElement;
    Label?: TypographyElement;
    [key: string]: any;
  };

  // Legacy properties
  TitleAlt?: TypographyElement;
  Copy?: TypographyElement;

  // Allow additional typography properties
  [key: string]: any;
}

export interface ThemeLayout {
  heights: {
    AssetHeight: number;
    Header: number;
    Footer: number;
    [key: string]: number;
  };
  spacing?: {
    section: string;
    item: string;
    [key: string]: string;
  };
  [key: string]: any;
}

export interface ThemeSports {
  cricket?: {
    playerCardStyle: string;
    statHighlightColor: string;
    [key: string]: any;
  };
  football?: {
    playerCardStyle: string;
    statHighlightColor: string;
    [key: string]: any;
  };
  [key: string]: any;
}

// Add component styles interface
export interface ComponentStyles {
  [key: string]: {
    className: string;
    style: Record<string, any>;
  };
}

export interface ThemeContextProps {
  // Font configurations
  fonts?: ThemeFonts;
  fontConfig: string;
  defaultCopyFontFamily: string;
  headingFontFamily: string;
  subheadingFontFamily: string;

  // Font classes for Tailwind
  fontClasses: {
    heading: FontClass;
    subheading: FontClass;
    body: FontClass;
    playerName?: FontClass;
    score?: FontClass;
    label?: FontClass;
    statValue?: FontClass;
    teamName?: FontClass;
    [key: string]: FontClass | undefined;
  };

  // Colors
  colors: ThemeColors;

  // Typography
  typography: ThemeTypography;

  // Layout
  layout: ThemeLayout;

  // Component styles (new)
  componentStyles: ComponentStyles;

  // Sports-specific configurations
  sports?: ThemeSports;

  // Template-specific properties
  gradientDegree?: string;

  // Helper function to get active palette
  getActivePalette: (paletteName?: string) => DesignPalette;

  // Selected palette - direct access to the active palette
  selectedPalette: DesignPalette;

  // Allow additional theme properties
  [key: string]: any;
}

const ThemeContext = createContext<ThemeContextProps | null>(null);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { settings } = useGlobalContext();
  const { Video } = useVideoDataContext();

  // Create the merged theme using useMemo for performance
  const theme = useMemo(() => {
    // Start with the template settings
    const baseTheme = { ...settings };

    // Get theme from Video data
    const dataTheme = Video.Theme || {};
    console.log("[dataTheme]", dataTheme);

    // Extract primary and secondary colors
    const primaryColor = dataTheme.primary || settings.primary || "#111111";
    const secondaryColor =
      dataTheme.secondary || settings.secondary || "#ffffff";

    // Generate enhanced color utilities (now includes designPalettes)
    const colorUtils = createThemeColorUtils(primaryColor, secondaryColor);

    // Build the complete color object
    const colors: ThemeColors = {
      // Base colors
      primary: primaryColor,
      secondary: secondaryColor,

      // Enhanced color utilities
      utils: colorUtils,

      // Palettes - now directly from colorUtils
      //palettes: colorUtils.designPalettes,
    };

    // Create component styles if not already defined
    const componentStyles: ComponentStyles = settings.componentStyles || {
      // Default component styles
      title: {
        className:
          "text-6xl font-bold tracking-tight leading-tight text-center m-0 px-4",
        style: {},
      },
      subtitle: {
        className:
          "text-3xl font-semibold tracking-normal leading-snug text-center m-0 px-4",
        style: {},
      },
      body: {
        className: "text-lg font-normal tracking-normal leading-relaxed",
        style: {},
      },
    };

    // Helper function to get active palette
    const getActivePalette = (paletteName?: string): DesignPalette => {
      if (!paletteName) {
        // Get from template variation or default to primary
        const variationPalette =
          Video.TemplateVariation?.Palette?.toLowerCase();
        paletteName = variationPalette || "primary";
      }

      return (
        colorUtils.designPalettes[paletteName?.toLowerCase() || "primary"] ||
        colorUtils.designPalettes.primary
      );
    };

    // Get the currently selected palette
    const selectedPalette = getActivePalette();

    // Return the complete theme
    return {
      ...baseTheme,
      colors,
      componentStyles,
      getActivePalette,
      selectedPalette,
    };
  }, [settings, Video.Theme, Video.TemplateVariation]);

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
