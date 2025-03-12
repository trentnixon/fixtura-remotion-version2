import { DesignPalette } from "../../designPalettes";

// Define interfaces for our color system
export interface ColorVariations {
  base: string;
  light: string;
  lighter: string;
  lightest: string;
  dark: string;
  darker: string;
  darkest: string;
  transparent: string;
  semiTransparent: string;
  contrastText: string;
  saturated: string;
  desaturated: string;
  muted: string;
  accent: string;
  [key: string]: string;
}

export interface GradientOptions {
  direction: string;
  type: "linear" | "radial";
  stops: string[];
  css: string;
}

export interface ColorPalettes {
  default: string[];
  monochromatic: string[];
  analogous: string[];
  complementary: string[];
  triadic: string[];
  categorical: string[];
  sequential: string[];
  diverging: string[];
  [key: string]: string[];
}

export interface ContrastSafety {
  safeColor: string;
  contrastRatio: number;
  isAccessible: boolean;
  isLargeTextAccessible: boolean;
  adjustedColor?: string;
}

export interface ThemeColorUtils {
  variations: {
    primary: ColorVariations;
    secondary: ColorVariations;
  };
  designPalettes: {
    primary: DesignPalette;
    secondary: DesignPalette;
    dark: DesignPalette;
    light: DesignPalette;
    accent: DesignPalette;
    complementary: DesignPalette;
    triadic: DesignPalette;
    monochromatic: DesignPalette;
    [key: string]: DesignPalette;
  };
}
