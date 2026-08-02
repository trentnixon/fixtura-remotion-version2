import { StandardizedPalettes } from "../../utils/colorSystem";
import { DesignPalette } from "../../utils/designPalettes/types";
import type { BroadcastProHeadlineSizing } from "../../../templates/types/broadcast-pro/headline-lockup";
import type { BroadcastProRosterListSizing } from "../../../templates/types/broadcast-pro/roster-list-sizing";
import type { BroadcastProCrestSizing } from "../../../templates/types/broadcast-pro/crest-well";
import type { BroadcastProLadderZoneSizing } from "../../../templates/types/broadcast-pro/ladder-zone";
import type { BroadcastProScoreSizing } from "../../../templates/types/broadcast-pro/score-typography";
import type { BroadcastProRoundedHeadlineSizing } from "../../../templates/types/broadcast-pro-rounded/headline-lockup";
import type { BroadcastProRoundedRosterListSizing } from "../../../templates/types/broadcast-pro-rounded/roster-list-sizing";
import type { BroadcastProRoundedCrestSizing } from "../../../templates/types/broadcast-pro-rounded/crest-well";
import type { BroadcastProRoundedLadderZoneSizing } from "../../../templates/types/broadcast-pro-rounded/ladder-zone";
import type { BroadcastProRoundedScoreSizing } from "../../../templates/types/broadcast-pro-rounded/score-typography";
import type {
  BroadcastProGlassOpacityPreset,
  BroadcastProTransparentLayers,
} from "../../../templates/types/broadcast-pro/transparent-layers";
import type {
  BroadcastProRoundedGlassOpacityPreset,
  BroadcastProRoundedTransparentLayers,
} from "../../../templates/types/broadcast-pro-rounded/transparent-layers";

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
    asset: number;
    header: number;
    footer: number;
    [key: string]: number;
  };
  spacing?: {
    section: string;
    item: string;
    [key: string]: string;
  };
  borderRadius: {
    container: string;
    image?: string;
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

  /** Broadcast Pro: alpha stacks for glass / logo wells / fixture header (see TemplateThemeConfig). */
  broadcastProTransparentLayers?: BroadcastProTransparentLayers;

  /** Broadcast Pro: sm / md / lg glass strength; used when transparent layers are not overridden. */
  broadcastProGlassOpacity?: BroadcastProGlassOpacityPreset;

  /** Broadcast Pro team roster: name + index number scaling (see `variants/broadcastPro/theme/tokens.ts`). */
  broadcastProRosterListSizing?: BroadcastProRosterListSizing;

  /** Broadcast Pro hero headline fitText caps (see `variants/broadcastPro/theme/tokens.ts`). */
  broadcastProHeadlineSizing?: BroadcastProHeadlineSizing;

  /** Broadcast Pro score typography compact tiers (see `variants/broadcastPro/theme/tokens.ts`). */
  broadcastProScoreSizing?: BroadcastProScoreSizing;

  /** Broadcast Pro crest well tier sizing (see `variants/broadcastPro/theme/tokens.ts`). */
  broadcastProCrestSizing?: BroadcastProCrestSizing;

  /** Broadcast Pro ladder zone sizing (see `variants/broadcastPro/theme/tokens.ts`). */
  broadcastProLadderZoneSizing?: BroadcastProLadderZoneSizing;

  /** Broadcast Pro Rounded: alpha stacks for glass / logo wells / fixture header. */
  broadcastProRoundedTransparentLayers?: BroadcastProRoundedTransparentLayers;

  /** Broadcast Pro Rounded: sm / md / lg glass strength. */
  broadcastProRoundedGlassOpacity?: BroadcastProRoundedGlassOpacityPreset;

  /** Broadcast Pro Rounded team roster list sizing (see `variants/broadcastProRounded/theme/tokens.ts`). */
  broadcastProRoundedRosterListSizing?: BroadcastProRoundedRosterListSizing;

  /** Broadcast Pro Rounded hero headline fitText caps (see `variants/broadcastProRounded/theme/tokens.ts`). */
  broadcastProRoundedHeadlineSizing?: BroadcastProRoundedHeadlineSizing;

  /** Broadcast Pro Rounded score typography compact tiers (see `variants/broadcastProRounded/theme/tokens.ts`). */
  broadcastProRoundedScoreSizing?: BroadcastProRoundedScoreSizing;

  /** Broadcast Pro Rounded crest well tier sizing (see `variants/broadcastProRounded/theme/tokens.ts`). */
  broadcastProRoundedCrestSizing?: BroadcastProRoundedCrestSizing;

  /** Broadcast Pro Rounded ladder zone sizing (see `variants/broadcastProRounded/theme/tokens.ts`). */
  broadcastProRoundedLadderZoneSizing?: BroadcastProRoundedLadderZoneSizing;

  // Helper function to get active palette
  getActivePalette: (paletteName?: string) => DesignPalette;

  // Selected palette - direct access to the active palette
  selectedPalette: DesignPalette;
}
