import { getContrastColor, setOpacity } from "../core/baseManipulation";
import { getTitleColorOverGradient, getForegroundColor } from "./contrastUtils";

/**
 * Generates text colors optimized for different backgrounds
 */
export const generateTextColors = (primary: string, secondary: string) => {
  return {
    onPrimary: getContrastColor(primary),
    onSecondary: getContrastColor(secondary),
    onLight: "#1F2937",
    onDark: "#F9FAFB",
    title: getTitleColorOverGradient(primary, secondary),
    body: getForegroundColor(primary, secondary),
    muted: setOpacity(getContrastColor(primary), 0.7),
  };
};
