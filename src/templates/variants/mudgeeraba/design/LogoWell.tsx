import React, { CSSProperties, ReactNode } from "react";
import tinycolor from "tinycolor2";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import {
  STEEP_LOGO_WELL_LEFT,
  STEEP_LOGO_WELL_RIGHT,
  clipPathStyle,
} from "./angles";

export type LogoWellVariant = "steepLeft" | "steepRight" | "circle";

export const LOGO_WELL_PADDING_PX = 8;
export const LOGO_WELL_MAX_LOGO_RATIO = 0.72;
export const LOGO_WELL_BORDER_WIDTH_PX = 1;
export const LOGO_WELL_ACCENT_SIZE_PX = 6;

/** Primary tick at the flush bottom-left corner (steepLeft wells, row-left logos). */
const ACCENT_CLIP_FLUSH_BOTTOM_LEFT = "polygon(0% 65%, 0% 100%, 35% 100%)";
/** Primary tick at the flush bottom-right corner (steepRight wells, row-right logos). */
const ACCENT_CLIP_FLUSH_BOTTOM_RIGHT = "polygon(100% 65%, 100% 100%, 65% 100%)";

const getAccentClip = (variant: LogoWellVariant): string | undefined => {
  if (variant === "steepLeft") return ACCENT_CLIP_FLUSH_BOTTOM_LEFT;
  if (variant === "steepRight") return ACCENT_CLIP_FLUSH_BOTTOM_RIGHT;
  return undefined;
};

const getWellClipPath = (variant: LogoWellVariant): string | undefined => {
  if (variant === "steepLeft") return STEEP_LOGO_WELL_LEFT;
  if (variant === "steepRight") return STEEP_LOGO_WELL_RIGHT;
  return undefined;
};

export interface LogoWellProps {
  variant: LogoWellVariant;
  size: number;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Use club primary for the outer border (match headers). Default: subtle neutral border. */
  emphasisBorder?: boolean;
  showCornerAccent?: boolean;
}

/**
 * Standard Mudgeeraba logo frame: controlled surface, subtle border,
 * small primary corner accent, consistent padding and max logo area.
 */
export const LogoWell: React.FC<LogoWellProps> = ({
  variant,
  size,
  children,
  className = "",
  style,
  emphasisBorder = false,
  showCornerAccent = true,
}) => {
  const { colors, selectedPalette } = useThemeContext();
  const clipPath = getWellClipPath(variant);
  const surfaceColor = selectedPalette.container.backgroundTransparent.strong;
  const borderColor = emphasisBorder
    ? colors.primary
    : tinycolor(selectedPalette.text.onContainer.copy)
        .setAlpha(0.22)
        .toRgbString();
  const borderWidth = emphasisBorder ? 4 : LOGO_WELL_BORDER_WIDTH_PX;
  const accentClip = getAccentClip(variant);

  const outerStyle: CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: surfaceColor,
    boxSizing: "border-box",
    border: `${borderWidth}px solid ${borderColor}`,
    ...(variant === "circle"
      ? { borderRadius: "9999px" }
      : clipPath
        ? clipPathStyle(clipPath)
        : {}),
    ...style,
  };

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden ${className}`}
      style={outerStyle}
    >
      {showCornerAccent && accentClip && (
        <div
          className="absolute pointer-events-none"
          aria-hidden
          style={{
            inset: 0,
            backgroundColor: colors.primary,
            ...clipPathStyle(accentClip),
          }}
        />
      )}

      <div
        className="relative z-10 flex items-center justify-center overflow-hidden"
        style={{
          width: `${Math.round(size * LOGO_WELL_MAX_LOGO_RATIO)}px`,
          height: `${Math.round(size * LOGO_WELL_MAX_LOGO_RATIO)}px`,
          padding: `${LOGO_WELL_PADDING_PX / 2}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
};
