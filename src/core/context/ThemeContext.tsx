import React, { createContext, useContext, ReactNode, useMemo } from "react";
import { useGlobalContext } from "./GlobalContext";
import { useVideoDataContext } from "./VideoDataContext";

import {
  createThemeColorUtils,
  ThemeColorUtils,
} from "../utils/themeColorUtils";

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

// Enhanced color interface that includes our utilities
export interface ThemeColors {
  // Base colors (from user data)
  primary: string;
  secondary: string;

  // Enhanced color utilities - this contains all our color variations and options
  utils: ThemeColorUtils;

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
  [key: string]: any; // Allow additional theme properties
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

    // Generate enhanced color utilities
    const colorUtils = createThemeColorUtils(primaryColor, secondaryColor);

    // Build the complete color object
    const colors: ThemeColors = {
      // Base colors
      primary: primaryColor,
      secondary: secondaryColor,

      // Enhanced color utilities
      utils: colorUtils,
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

    // Return the complete theme
    return {
      ...baseTheme,
      colors,
      componentStyles,
    };
  }, [settings, Video.Theme]);

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
