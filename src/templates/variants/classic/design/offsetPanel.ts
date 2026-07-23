import type { CSSProperties } from "react";
import { classicForegroundSurfaces } from "../theme";
import type { ClassicSurfaceRoles } from "./colours";

export type ClassicOffsetPanelDepth = "full" | "compact" | "none";

export interface ClassicOffsetPanelDepthTokens {
  offsetX: number;
  offsetY: number;
  shadow: string;
}

export const getOffsetPanelDepthTokens = (
  depth: ClassicOffsetPanelDepth = "full",
): ClassicOffsetPanelDepthTokens => {
  if (depth === "none") {
    return {
      offsetX: 0,
      offsetY: 0,
      shadow: "none",
    };
  }

  if (depth === "compact") {
    return {
      offsetX: Math.round(classicForegroundSurfaces.offsetX * 0.5),
      offsetY: Math.round(classicForegroundSurfaces.offsetY * 0.5),
      shadow: classicForegroundSurfaces.contentShadowCompact,
    };
  }

  return {
    offsetX: classicForegroundSurfaces.offsetX,
    offsetY: classicForegroundSurfaces.offsetY,
    shadow: classicForegroundSurfaces.contentShadow,
  };
};

export const getClassicStatPlaneStyles = (
  roles: ClassicSurfaceRoles,
): CSSProperties => ({
  background: roles.stat.recessed,
  boxShadow: `inset 2px 0 0 0 ${roles.stat.insetBorder}`,
});
