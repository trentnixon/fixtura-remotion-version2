import React, { CSSProperties } from "react";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { getBrickworkColourRoles } from "./colours";
import {
  DiagonalEnergyEdge,
  DiagonalEnergyShape,
  ENERGY_ACCENT_OPACITY,
  getEnergyAccentClipPath,
  getEnergyAccentColor,
  clipPathStyle,
} from "./diagonalAccents";

export interface DiagonalEnergyAccentProps {
  edge?: DiagonalEnergyEdge;
  shape?: DiagonalEnergyShape;
  /** Colour source from Brickwork roles. */
  tone?: "primary" | "secondary";
  /** Override accent colour (defaults to primary block at token opacity). */
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Non-interactive diagonal slash on a panel edge — one motif per region.
 * Sits behind content; does not clip text or logos when parent keeps children at z-10+.
 */
export const DiagonalEnergyAccent: React.FC<DiagonalEnergyAccentProps> = ({
  edge = "trailing",
  shape = "diagonalBand",
  tone = "secondary",
  color,
  className = "",
  style,
}) => {
  const { selectedPalette } = useThemeContext();
  const roles = getBrickworkColourRoles(selectedPalette);
  const baseColor =
    tone === "primary" ? roles.primary.block : roles.secondary.accent;
  const accentColor =
    color ?? getEnergyAccentColor(baseColor, ENERGY_ACCENT_OPACITY);

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
      aria-hidden
      style={{
        backgroundColor: accentColor,
        ...clipPathStyle(getEnergyAccentClipPath(edge, shape)),
        ...style,
      }}
    />
  );
};
