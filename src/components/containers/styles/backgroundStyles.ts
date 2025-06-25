import { DesignPalette } from "../../../core/utils/designPalettes";
import { ContainerBackgroundColor } from "../types";

/**
 * Generates background color styles based on the theme
 */
export const getBackgroundColorStyle = (
  backgroundColor: ContainerBackgroundColor,
  themePalette: DesignPalette,
): React.CSSProperties => {
  if (backgroundColor === "none") {
    return {};
  }

  // Map backgroundColor to theme colors
  switch (backgroundColor) {
    case "primary":
      return { backgroundColor: themePalette.container.primary };
    case "secondary":
      return { backgroundColor: themePalette.container.secondary };
    case "main":
      return { backgroundColor: themePalette.container.main };
    case "muted":
      return { backgroundColor: themePalette.container.muted };
    case "saturated":
      return { backgroundColor: themePalette.container.saturated };
    case "light":
      return { backgroundColor: themePalette.container.light };
    case "dark":
      return { backgroundColor: themePalette.container.dark };
    case "accent":
      return { backgroundColor: themePalette.container.accent };
    case "highlight":
      return { backgroundColor: themePalette.container.highlight };
    case "transparent":
      return { backgroundColor: themePalette.container.transparentMain };
    case "transparentSecondary":
      return { backgroundColor: themePalette.container.transparentSecondary };
    case "gradientPrimaryToSecondaryVertical":
      return {
        background: themePalette.container.gradientPrimaryToSecondaryVertical,
      };
    case "gradientSecondaryToPrimaryVertical":
      return {
        background: themePalette.container.gradientSecondaryToPrimaryVertical,
      };
    case "gradientPrimaryToSecondaryHorizontal":
      return {
        background: themePalette.container.gradientPrimaryToSecondaryHorizontal,
      };
    case "gradientSecondaryToPrimaryHorizontal":
      return {
        background: themePalette.container.gradientSecondaryToPrimaryHorizontal,
      };
    default:
      return {};
  }
};
