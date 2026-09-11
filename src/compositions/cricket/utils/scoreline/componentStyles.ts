import type { ComponentStyles } from "../../../../core/context/types/ThemeContextTypes";

export const csClass = (styles: ComponentStyles, key: string): string =>
  styles[key]?.className ?? "";
