// Type definitions for the provided theme configuration object

/**
 * Root interface representing the entire theme configuration.
 */
export interface TemplateThemeConfig {
  fonts?: ThemeFonts;
  fontConfig?: string;
  defaultCopyFontFamily?: string;
  headingFontFamily?: string;
  subheadingFontFamily?: string;
  fontClasses?: ThemeFontClasses;
  componentStyles?: ThemeComponentStyles;
  layout?: ThemeLayout;
  typography?: ThemeTypography;
  colors?: ThemeColors;
  selectedPalette?: ThemeSelectedPalette;
  sports?: Record<string, unknown>;
  gradientDegree?: string;
  animation?: ThemeAnimation;
  media?: ThemeMedia;
  mode?: ThemeModes;
}

/**
 * Defines font settings for titles and copy.
 */
export interface ThemeFonts {
  title: FontDefinition;
  subtitle: FontDefinition;
  copy: FontDefinition;
}

/**
 * Reusable interface for any object that has a `family` property.
 */
export interface FontDefinition {
  family: string;
}

/**
 * Defines font-class mappings for headings, subheadings, and body text.
 */
export interface ThemeFontClasses {
  heading: FontDefinition;
  subheading: FontDefinition;
  body: FontDefinition;
}

/**
 * Defines the shape of each component's `className`.
 */
export interface ComponentStyle {
  className: string;
}

/**
 * All component styles by key, each with a `className`.
 */
export interface ThemeComponentStyles {
  title: ComponentStyle;
  titleSmall: ComponentStyle;
  subtitle: ComponentStyle;
  bodyText: ComponentStyle;
  playerName: ComponentStyle;
  score: ComponentStyle;
  teamName: ComponentStyle;
  label: ComponentStyle;
  ladderGradeLabel: ComponentStyle;
  ladderTeamName: ComponentStyle;
  ladderTeamPoints: ComponentStyle;
  Top5PlayerName: ComponentStyle;
  Top5PlayerTeam: ComponentStyle;
  Top5PlayerScore: ComponentStyle;
  Top5PlayerScoreSuffix: ComponentStyle;
  ResultScore: ComponentStyle;
  ResultScoreFirstInnings: ComponentStyle;
  ResultVS: ComponentStyle;
  ResultScoreYetToBat: ComponentStyle;
  ResultTeamName: ComponentStyle;
  ResultPlayerName: ComponentStyle;
  ResultPlayerScore: ComponentStyle;
  ResultSyntax: ComponentStyle;
  ResultFixtureResult: ComponentStyle;
  ResultMetaData: ComponentStyle;
  RosterPlayerName: ComponentStyle;
  metadataSmall: ComponentStyle;
  metadataMedium: ComponentStyle;
  metadataLarge: ComponentStyle;
}

/**
 * Defines layout-related measurements: heights, spacing, and padding.
 */
export interface ThemeLayout {
  heights: {
    asset: number;
    header: number;
    footer: number;
  };
  spacing: {
    section: string;
    item: string;
  };
  padding: {
    container: string;
    section: string;
    item: string;
  };
  borderRadius: {
    container: string;
  };
}

/**
 * Defines typography settings for specific text categories (e.g., Title).
 */
export interface ThemeTypography {
  Title: {
    sizes: {
      default: string;
    };
    letterSpacing: string;
    lineHeight: string;
    weights: {
      default: string;
    };
  };
}

/**
 * Defines color tokens used throughout the theme.
 */
export interface ThemeColors {
  primary: string;
  secondary: string;
  text: {
    dark: string;
    light: string;
  };
  background: {
    light: string;
    dark: string;
  };
  accent: string;
  utility: {
    success: string;
    warning: string;
    error: string;
  };
}

/**
 * Defines the selected color palette, including background, container, text, and shadow tokens.
 */
export interface ThemeSelectedPalette {
  name: string;
  background: ThemeSelectedPaletteBackground;
  container: ThemeSelectedPaletteContainer;
  text: ThemeSelectedPaletteText;
  shadow: ThemeSelectedPaletteShadow;
}

/**
 * Background definitions within the selected palette, including gradients.
 */
export interface ThemeSelectedPaletteBackground {
  main: string;
  light: string;
  dark: string;
  contrast: string;
  accent: string;
  gradient: {
    primary: GradientDefinition;
    secondary: GradientDefinition;
    primaryToSecondary: GradientDefinition;
    secondaryToPrimary: GradientDefinition;
    primaryAdvanced: GradientDefinition;
    secondaryAdvanced: GradientDefinition;
    primaryRadial: GradientDefinition;
    secondaryRadial: GradientDefinition;
    conicGradient: GradientDefinition;
    meshGradient: GradientDefinition;
    hardStopGradient: GradientDefinition;
  };
}

/**
 * Defines a single gradient’s shape: stops, direction, type, and generated CSS strings.
 */
export interface GradientDefinition {
  type: string;
  direction: string;
  stops: string[];
  css: Record<string, string>;
}

/**
 * Container color tokens for the selected palette (solid colors, semi-transparent, and gradient CSS).
 */
export interface ThemeSelectedPaletteContainer {
  main: string;
  light: string;
  dark: string;
  primary: string;
  secondary: string;
  accent: string;
  muted: string;
  saturated: string;
  highlight: string;
  transparentMain: string;
  transparentSecondary: string;
  transparentAccent: string;
  transparentPrimary: string;
  gradientPrimaryToSecondaryVertical: string;
  gradientSecondaryToPrimaryVertical: string;
  gradientPrimaryToSecondaryHorizontal: string;
  gradientSecondaryToPrimaryHorizontal: string;
}

/**
 * Text color tokens for the selected palette, split between on-background and on-container contexts.
 */
export interface ThemeSelectedPaletteText {
  onBackground: {
    main: string;
    light: string;
    dark: string;
    muted: string;
    accent: string;
  };
  onContainer: {
    primary: string;
    secondary: string;
    light: string;
    dark: string;
    muted: string;
    accent: string;
  };
}

/**
 * Shadow tokens for the selected palette.
 */
export interface ThemeSelectedPaletteShadow {
  small: string;
  medium: string;
  large: string;
  glow: string;
}

/**
 * Animation timing and easing settings.
 */
export interface ThemeAnimation {
  duration: {
    fast: number;
    normal: number;
    slow: number;
  };
  easing: {
    ease: string;
    easeIn: string;
    easeOut: string;
    easeInOut: string;
  };
}

/**
 * Media-related tokens, including aspect ratios and border-radius utility classes.
 */
export interface ThemeMedia {
  aspectRatios: {
    portrait: number;
    square: number;
    landscape: number;
  };
  borderRadius: {
    small: string;
    medium: string;
    large: string;
    full: string;
  };
}

/**
 * Mode-related tokens, including background, container, text, and shadow tokens.
 */
export interface ThemeModes {
  light: ThemeMode;
  dark: ThemeMode;
  lightAlt: ThemeMode;
  darkAlt: ThemeMode;
}

export interface ThemeMode {
  container: ThemeModeContainer;
  text: ThemeModeText;
}

export interface ThemeModeContainer {
  background: string;
  backgroundAlt: string;
  backgroundTransparent: string;
}

export interface ThemeModeText {
  title: string;
  copy: string;
}
