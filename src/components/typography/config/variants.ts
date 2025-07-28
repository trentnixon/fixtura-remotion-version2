import { DesignPalette } from "../../../core/utils/designPalettes";

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
  selectedPalette: DesignPalette,
): VariantStyle => {
  let textColor: string | null = null;
  let additionalStyles = {};

  // Get the active palette
  const palette = selectedPalette || "primary";

  switch (variant) {
    case "main":
      textColor = palette.text.onBackground.main;
      break;
    case "onBackgroundMain":
      textColor = palette.text.onBackground.main;
      break;
    case "onBackgroundAccent":
      textColor = palette.text.onBackground.accent;
      break;
    case "onBackgroundDark":
      textColor = palette.text.onBackground.dark;
      break;
    case "onBackgroundLight":
      textColor = palette.text.onBackground.light;
      break;
    case "onBackgroundMuted":
      textColor = palette.text.onBackground.muted;
      break;

    case "onContainerMain":
      textColor = palette.text.onContainer.primary;
      break;
    case "onContainerSecondary":
      textColor = palette.text.onContainer.secondary;
      break;

    case "onContainerDark":
      textColor = palette.text.onContainer.dark;
      break;
    case "onContainerLight":
      textColor = palette.text.onContainer.light;
      break;

    case "onContainerAccent":
      textColor = palette.text.onContainer.accent;
      break;
    case "onContainerMuted":
      textColor = palette.text.onContainer.muted;
      break;
    case "onContainerCopy":
      textColor = palette.text.onContainer.copy;
      break;
    case "onContainerTitle":
      textColor = palette.text.onContainer.title;
      break;
    case "onContainerCopyNoBg":
      textColor = palette.text.onContainer.copyNoBg;
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
  selectedPalette: DesignPalette,
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

  const palette = selectedPalette;

  if (!palette) {
    return textColor;
  }

  return textColor;
};
