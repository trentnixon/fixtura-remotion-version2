import { DesignPalette } from "../designPalettes/types";

export type GradientDirectionKey =
  | "HORIZONTAL"
  | "HORIZONTAL_REVERSE"
  | "VERTICAL"
  | "VERTICAL_REVERSE"
  | "DIAGONAL"
  | "DIAGONAL_REVERSE"
  | "CONIC"
  | "DEFAULT"
  | string;

type GradientEntry = unknown; // runtime-checked
type GradientMap = Record<string, GradientEntry>;

/**
 * Determine the effective gradient type for a given palette.
 * For palettes that include OnBlack/OnWhite, coerce base primary/secondary to cross-color gradients.
 */
export const determineGradientTypeForPalette = (
  paletteName: string | undefined,
  baseType: string,
): string => {
  if (!paletteName) return baseType;
  const lower = paletteName.toLowerCase();
  const isOnBlackOrWhite =
    lower.includes("onblack") || lower.includes("onwhite");
  if (!isOnBlackOrWhite) return baseType;

  if (baseType === "primary") return "primaryToSecondary";
  if (baseType === "secondary") return "secondaryToPrimary";
  return baseType;
};

/**
 * Resolve a CSS gradient string from a palette by type and direction.
 * Falls back to DEFAULT or the first available CSS entry when needed.
 */
export const resolvePaletteGradient = (
  palette: DesignPalette,
  type: string,
  direction: GradientDirectionKey,
  devWarn = process?.env?.NODE_ENV !== "production",
): string | null => {
  const gradients = (
    palette?.background as unknown as {
      gradient?: GradientMap;
    }
  )?.gradient;
  if (!gradients) return null;

  const entry = gradients[type as keyof GradientMap];
  if (!entry) {
    if (devWarn) {
      console.warn("[gradientResolver] Unknown gradient type", {
        paletteName: palette?.name,
        type,
        availableTypes: Object.keys(gradients),
      });
    }
    return null;
  }

  // entry can be a string or an object with css map
  if (typeof entry === "string") return entry;

  const maybeCss = (entry as { css?: unknown })?.css;
  if (!maybeCss || typeof maybeCss !== "object") return null;
  const css = maybeCss as Record<string, string>;
  return (
    css[direction] ||
    (css as Record<string, string>).DEFAULT ||
    Object.values(css)[0] ||
    null
  );
};
