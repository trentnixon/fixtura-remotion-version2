import React, { CSSProperties, ReactNode } from "react";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { classicForegroundSurfaces } from "../theme";
import { getClassicSurfaceRoles } from "./colours";
import {
  ClassicOffsetPanelDepth,
  getOffsetPanelDepthTokens,
} from "./offsetPanel";
import { ClassicPanelTextureOverlay } from "./PanelTextureOverlayView";

export interface ClassicOffsetPanelProps {
  depth?: ClassicOffsetPanelDepth;
  height?: number | string;
  className?: string;
  style?: CSSProperties;
  /** Fine paper grain on the content plane only. Default true. */
  showSurfaceTexture?: boolean;
  children?: ReactNode;
}

/**
 * Square Classic foreground panel: offset backplane + readable content plane.
 * Stat recess styling is applied separately via getClassicStatPlaneStyles().
 */
export const ClassicOffsetPanel: React.FC<ClassicOffsetPanelProps> = ({
  depth = "full",
  height = "100%",
  className = "",
  style,
  showSurfaceTexture = true,
  children,
}) => {
  const { selectedPalette, colors } = useThemeContext();
  const roles = getClassicSurfaceRoles(selectedPalette, {
    primary: colors.primary,
    secondary: colors.secondary,
  });
  const depthTokens = getOffsetPanelDepthTokens(depth);
  const { offsetX, offsetY, shadow } = depthTokens;
  const layerWidth =
    offsetX > 0 ? `calc(100% - ${offsetX}px)` : "100%";
  const layerHeight =
    offsetY > 0 ? `calc(100% - ${offsetY}px)` : "100%";

  return (
    <div
      className={`relative overflow-visible ${className}`}
      style={{
        height,
        width: "100%",
        marginRight: offsetX > 0 ? -offsetX : undefined,
        marginBottom: offsetY > 0 ? -offsetY : undefined,
        ...style,
      }}
    >
      {offsetX > 0 || offsetY > 0 ? (
        <div
          className="pointer-events-none absolute"
          aria-hidden
          style={{
            top: offsetY,
            left: offsetX,
            width: layerWidth,
            height: layerHeight,
            backgroundColor: roles.foreground.backplane,
            filter: `blur(${classicForegroundSurfaces.backplaneBlurPx}px)`,
          }}
        />
      ) : null}
      <div
        className="relative z-10 min-h-0 h-full overflow-hidden"
        style={{
          width: layerWidth,
          height: layerHeight,
          backgroundColor: roles.content.surface,
          boxShadow: shadow,
          isolation: "isolate",
        }}
      >
        {showSurfaceTexture ? <ClassicPanelTextureOverlay /> : null}
        <div className="relative z-[2] h-full min-h-0 w-full">{children}</div>
      </div>
    </div>
  );
};
