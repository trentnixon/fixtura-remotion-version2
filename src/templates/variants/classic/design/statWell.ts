import type { CSSProperties } from "react";
import type { ClassicSurfaceRoles } from "./colours";
import { getClassicStatPlaneStyles } from "./offsetPanel";

export type ClassicStatWellVariant = "recessed" | "contrast";

export type ClassicStatWellWidth =
  | "compact"
  | "ladderColumn"
  | "ladderPoints"
  | "resultScore"
  | "resultPlayerStat"
  | "fit"
  | "full";

export type ClassicStatWellAlign = "start" | "center" | "end";

export interface ClassicStatWellLayoutTokens {
  widthClass: string;
  minWidthPx?: number;
  paddingClass: string;
  alignClass: string;
}

const STAT_WELL_WIDTH_TOKENS: Record<
  ClassicStatWellWidth,
  Pick<ClassicStatWellLayoutTokens, "widthClass" | "minWidthPx">
> = {
  compact: { widthClass: "w-full", minWidthPx: 48 },
  ladderColumn: { widthClass: "w-10", minWidthPx: 40 },
  ladderPoints: { widthClass: "w-20", minWidthPx: 80 },
  /** Hug score text width — no fixed min-width. */
  resultScore: { widthClass: "w-auto" },
  resultPlayerStat: { widthClass: "w-auto" },
  fit: { widthClass: "w-auto" },
  full: { widthClass: "w-full" },
};

const STAT_WELL_ALIGN_CLASSES: Record<ClassicStatWellAlign, string> = {
  start: "justify-start items-center",
  center: "justify-center items-center",
  end: "justify-end items-center",
};

export const getClassicStatWellLayoutTokens = (
  width: ClassicStatWellWidth = "compact",
  align: ClassicStatWellAlign = "center",
): ClassicStatWellLayoutTokens => {
  const widthTokens = STAT_WELL_WIDTH_TOKENS[width];
  return {
    ...widthTokens,
    paddingClass: "px-1 py-0",
    alignClass: `flex h-full ${STAT_WELL_ALIGN_CLASSES[align]}`,
  };
};

export const getClassicStatWellSurfaceStyles = (
  roles: ClassicSurfaceRoles,
  variant: ClassicStatWellVariant = "recessed",
): CSSProperties => {
  if (variant === "contrast") {
    return {
      background: roles.content.surfaceContrast,
    };
  }
  return getClassicStatPlaneStyles(roles);
};
