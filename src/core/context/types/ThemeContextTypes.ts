import { StandardizedPalettes } from "../../utils/colorSystem";
import { DesignPalette } from "../../utils/designPalettes/types";

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
  //utils: ThemeColorUtils;
  colorSystem: StandardizedPalettes;

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
  };

  // Legacy properties
  TitleAlt?: TypographyElement;
  Copy?: TypographyElement;
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
  borderRadius: {
    container: string;
  };
}

export interface ThemeSports {
  cricket?: {
    playerCardStyle: string;
    statHighlightColor: string;
  };
  football?: {
    playerCardStyle: string;
    statHighlightColor: string;
  };
}

// Add component styles interface
export interface ComponentStyles {
  [key: string]: {
    className: string;
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
}
