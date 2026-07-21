import React, { CSSProperties, ReactNode } from "react";
import tinycolor from "tinycolor2";
import { clipPathStyle } from "./angles";
import { getPanelDiagonalTextureImage } from "./panelTexture";

/** Low-opacity club-primary underlay for structural depth (no box shadows). */
export const LAYERED_PANEL_UNDERLAY_OPACITY = 0.28;
export const LAYERED_PANEL_OFFSET_X = 6;
export const LAYERED_PANEL_OFFSET_Y = 5;

export const getLayeredUnderlayColor = (
  primaryColor: string,
  opacity = LAYERED_PANEL_UNDERLAY_OPACITY,
): string => tinycolor(primaryColor).setAlpha(opacity).toRgbString();

export interface LayeredAngularPanelProps {
  clipPath: string;
  surfaceColor: string;
  underlayColor: string;
  className?: string;
  style?: CSSProperties;
  surfaceClassName?: string;
  surfaceStyle?: CSSProperties;
  offsetX?: number;
  offsetY?: number;
  /** Faint shallow-angle hatch on the surface. Default true. */
  showSurfaceTexture?: boolean;
  children?: ReactNode;
}

/**
 * Primary angular panel with a slightly offset underlay polygon for depth.
 * Underlay is positioned (not transformed) so clip-path edges stay parallel to the surface.
 */
export const LayeredAngularPanel: React.FC<LayeredAngularPanelProps> = ({
  clipPath,
  surfaceColor,
  underlayColor,
  className = "",
  style,
  surfaceClassName = "",
  surfaceStyle,
  offsetX = LAYERED_PANEL_OFFSET_X,
  offsetY = LAYERED_PANEL_OFFSET_Y,
  showSurfaceTexture = true,
  children,
}) => {
  const layerWidth = `calc(100% - ${offsetX}px)`;
  const textureImage = getPanelDiagonalTextureImage(surfaceColor);

  return (
    <div
      className={`relative overflow-visible ${className}`}
      style={{
        ...style,
        // Bleed offset into adjacent gap so layout height stays unchanged.
        marginRight: -offsetX,
        marginBottom: -offsetY,
      }}
    >
      <div
        className="absolute pointer-events-none"
        aria-hidden
        style={{
          top: offsetY,
          left: offsetX,
          width: layerWidth,
          height: "100%",
          backgroundColor: underlayColor,
          ...clipPathStyle(clipPath),
        }}
      />
      <div
        className={`relative z-10 min-h-0 ${surfaceClassName}`}
        style={{
          width: layerWidth,
          height: "100%",
          backgroundColor: surfaceColor,
          ...clipPathStyle(clipPath),
          ...surfaceStyle,
        }}
      >
        {showSurfaceTexture && (
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden
            style={{ backgroundImage: textureImage }}
          />
        )}
        {children}
      </div>
    </div>
  );
};
