import type { ComponentStyles } from "../../../../core/context/types/ThemeContextTypes";

/** Theme componentStyles class lookup shared by Scoreline and Night Session overlays. */
export const csClass = (styles: ComponentStyles, key: string): string =>
  styles[key]?.className ?? "";
