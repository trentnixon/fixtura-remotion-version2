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
  /** Logo fills the full well area (no inset padding). Useful for circular team badges. */
  fullBleed?: boolean;
  /** Hides well border and surface so only the logo shows. */
  borderless?: boolean;
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
  fullBleed = false,
  borderless = false,
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
  const innerSize = fullBleed
    ? size
    : Math.round(size * LOGO_WELL_MAX_LOGO_RATIO);
  const innerPadding = fullBleed ? 0 : LOGO_WELL_PADDING_PX / 2;

  const outerStyle: CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: borderless ? "transparent" : surfaceColor,
    boxSizing: "border-box",
    border: borderless ? "none" : `${borderWidth}px solid ${borderColor}`,
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
      <div
        className="relative z-0 flex h-full w-full items-center justify-center overflow-hidden"
        style={{
          width: `${innerSize}px`,
          height: `${innerSize}px`,
          padding: `${innerPadding}px`,
          ...(variant === "circle" && fullBleed
            ? { borderRadius: "9999px" }
            : {}),
        }}
      >
        {children}
      </div>

      {showCornerAccent && accentClip && (
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          aria-hidden
          style={{
            backgroundColor: colors.primary,
            ...clipPathStyle(accentClip),
          }}
        />
      )}
    </div>
  );
};
