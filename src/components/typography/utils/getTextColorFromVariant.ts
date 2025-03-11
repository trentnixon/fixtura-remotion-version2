import { ColorPalette } from "../../../core/utils/themeColorUtils";

export type TextVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "contrast-safe"
  | "on-dark"
  | "on-light"
  | "success"
  | "warning"
  | "error"
  | "info";

export const getTextColorFromVariant = (
  variant: TextVariant,
  palette: ColorPalette,
): string => {
  switch (variant) {
    case "primary":
      return palette.text.primary;
    case "secondary":
      return palette.text.secondary;
    case "accent":
      return palette.text.accent;
    case "contrast-safe":
      return palette.text.contrastSafe;
    case "on-dark":
      return palette.text.onDark;
    case "on-light":
      return palette.text.onLight;

    default:
      return palette.text.primary;
  }
};
