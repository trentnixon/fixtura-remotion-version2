// Define all available typography variants in one place
export type TypographyVariant =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "contrast"
  | "gradient"
  | "muted"
  | "safe-primary"
  | "safe-secondary"
  | "highlight";

// Define component-specific variant subsets if needed
export type HeadingVariant = TypographyVariant;
export type BodyVariant = Exclude<TypographyVariant, "gradient">; // Example: body text doesn't support gradient
export type SportVariant = TypographyVariant | "team-color" | "opponent-color"; // Sports-specific variants

// Define variant handler functions that can be reused across components
export interface VariantStyle {
  color?: string | null;
  additionalStyles?: React.CSSProperties;
}

// This is the function that will process variants consistently across components
export const getVariantStyles = (
  variant: string, // Changed from TypographyVariant to string to accept any variant
  utils: any,
  colors: any,
  contrastSafe: boolean = true,
): VariantStyle => {
  let textColor: string | null = null;
  let additionalStyles = {};

  // Get the active palette
  const activePaletteName = colors.activePalette || "primary";
  const palette = utils.designPalettes[activePaletteName];

  if (!palette) {
    console.warn(
      `Palette "${activePaletteName}" not found, using fallback styles`,
    );
    return { color: null, additionalStyles: {} };
  }

  switch (variant) {
    case "primary":
      textColor = palette.text.primary;
      break;
    case "secondary":
      textColor = palette.text.secondary;
      break;
    case "accent":
      textColor = palette.text.accent;
      break;
    case "contrast":
      textColor = palette.text.contrast;
      break;
    case "safe-primary":
      // Use contrast-safe color for primary
      textColor = palette.text.safePrimary;
      break;
    case "safe-secondary":
      // Use contrast-safe color for secondary
      textColor = palette.text.safeSecondary;
      break;
    case "gradient":
      // Use gradient text
      additionalStyles = {
        background: palette.background.gradient.primaryToSecondary,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      };
      break;
    case "muted":
      textColor = palette.text.muted;
      break;
    case "highlight":
      textColor = palette.text.highlight;
      break;
    // Sport-specific variants are handled in the component
    case "team-color":
    case "opponent-color":
      // These will be handled by the component
      textColor = null;
      break;
    default:
      // Default varies by component type, so we'll return null and let components decide
      textColor = null;
  }

  return {
    color: textColor,
    additionalStyles,
  };
};

// Helper function to apply contrast safety
export const applyContrastSafety = (
  textColor: string | null | undefined,
  variant: string, // Changed from TypographyVariant to string to accept any variant
  utils: any,
  contrastSafe: boolean = true,
): string | null | undefined => {
  if (!textColor) return textColor;

  // Skip contrast safety for certain variants
  if (
    !contrastSafe ||
    variant === "gradient" ||
    variant === "safe-primary" ||
    variant === "safe-secondary" ||
    variant === "team-color" ||
    variant === "opponent-color"
  ) {
    return textColor;
  }

  // Get the active palette
  const activePaletteName = utils.activePalette || "primary";
  const palette = utils.designPalettes[activePaletteName];

  if (!palette) {
    return textColor;
  }

  // Check if the current text color has good contrast against the background
  const backgroundSafety = utils.contrast?.background?.primary;

  if (backgroundSafety && !backgroundSafety.isAccessible) {
    // If contrast is poor, use the safe color
    return backgroundSafety.safeColor;
  }

  return textColor;
};
