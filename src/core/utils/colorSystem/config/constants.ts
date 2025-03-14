/**
 * Color system constants
 */

// Web Content Accessibility Guidelines (WCAG) contrast ratios
export const WCAG = {
  // Minimum contrast for normal text (WCAG AA)
  AA_NORMAL_TEXT: 4.5,
  // Minimum contrast for large text (WCAG AA)
  AA_LARGE_TEXT: 3.0,
  // Minimum contrast for normal text (WCAG AAA)
  AAA_NORMAL_TEXT: 7.0,
  // Minimum contrast for large text (WCAG AAA)
  AAA_LARGE_TEXT: 4.5,
};

// Standard color enhancement amounts
export const COLOR_AMOUNTS = {
  // Light color variations
  LIGHTEN_SMALL: 10,
  LIGHTEN_MEDIUM: 20,
  LIGHTEN_LARGE: 30,

  // Dark color variations
  DARKEN_SMALL: 10,
  DARKEN_MEDIUM: 20,
  DARKEN_LARGE: 30,

  // Opacity levels
  OPACITY_HIGH: 0.9,
  OPACITY_MEDIUM: 0.7,
  OPACITY_LOW: 0.5,
  OPACITY_VERY_LOW: 0.2,

  // Saturation adjustments
  SATURATE: 20,
  DESATURATE: -20,
};

// Color angle shifts for relationships (in degrees)
export const COLOR_ANGLES = {
  // Complementary color (opposite on the color wheel)
  COMPLEMENTARY: 180,

  // Split complementary
  SPLIT_COMPLEMENTARY_1: 150,
  SPLIT_COMPLEMENTARY_2: 210,

  // Analogous colors
  ANALOGOUS_1: 30,
  ANALOGOUS_2: -30,

  // Triadic colors (form an equilateral triangle)
  TRIADIC_1: 120,
  TRIADIC_2: 240,

  // Tetradic colors (form a rectangle)
  TETRADIC_1: 60,
  TETRADIC_2: 180,
  TETRADIC_3: 240,

  // Accent color shift
  ACCENT: 30,
};

// Default colors used as fallbacks
export const DEFAULT_COLORS = {
  PRIMARY: "#1a73e8", // Blue
  SECONDARY: "#34a853", // Green
  SUCCESS: "#34a853", // Green
  ERROR: "#ea4335", // Red
  WARNING: "#fbbc04", // Yellow
  INFO: "#4285f4", // Light blue
  LIGHT: "#f8f9fa", // Light gray
  DARK: "#202124", // Dark gray
  NEUTRAL: "#6B7280", // Medium gray
  MUTED: "#9CA3AF", // Muted gray
};

// Standard gradient directions
export const GRADIENT_DIRECTIONS = {
  HORIZONTAL: "to right",
  HORIZONTAL_REVERSE: "to left",
  VERTICAL: "to bottom",
  VERTICAL_REVERSE: "to top",
  DIAGONAL: "to bottom right",
  DIAGONAL_REVERSE: "to top left",
  CONIC: "to bottom",
};

// Shadow sizes
export const SHADOW_SIZES = {
  SMALL: 5,
  MEDIUM: 10,
  LARGE: 20,
};
