/* eslint-disable @typescript-eslint/no-explicit-any */
import { TypographyElement } from "../../../core/context/types/ThemeContextTypes";

// Interface for the processed typography styles
export interface ProcessedTypographyStyles {
  className: string;
  style: React.CSSProperties;
}

// Function to extract typography styles from theme
export const getTypographyStyles = (
  typography: TypographyElement | undefined,
  componentStyles: any,
  variant: string,
  defaultSize: string,
  defaultWeight: string,
  additionalClasses: string = "",
): ProcessedTypographyStyles => {
  // Start with component styles for backward compatibility
  const styles = {
    className:
      componentStyles?.className ||
      `text-${defaultSize} font-${defaultWeight} m-0`,
    style: { ...(componentStyles?.style || {}) },
  };

  // If we have typography settings, apply them
  if (typography) {
    // Extract size based on variant or use default
    const size =
      typography.sizes?.[variant] || typography.sizes?.default || defaultSize;

    const weight =
      typography.weights?.[variant] ||
      typography.weights?.default ||
      defaultWeight;

    // Create the className
    styles.className =
      `text-${size} font-${weight} ${additionalClasses}`.trim();

    // Add typography-specific styles
    styles.style = {
      ...styles.style,
      letterSpacing: typography.letterSpacing,
      lineHeight: typography.lineHeight,
    };
  }

  return styles;
};
