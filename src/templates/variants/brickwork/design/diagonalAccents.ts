import type { CSSProperties } from "react";
import tinycolor from "tinycolor2";

/** Brickwork diagonal energy system — restrained 8–12° family (default 12°). */
export const BRICKWORK_DIAGONAL_ANGLE_DEG = 12;

/** Trailing-edge slash width as a share of the container width. */
export const ENERGY_ACCENT_STRIP_WIDTH_PERCENT = 20;

/** Corner wedge reach up the edge (percent of height). */
export const ENERGY_ACCENT_CORNER_REACH_PERCENT = 55;

/** Full-height band width (percent of container). */
export const ENERGY_ACCENT_BAND_WIDTH_PERCENT = 24;

/** Pilot-visible opacity — tune down after Studio review. */
export const ENERGY_ACCENT_OPACITY = 0.45;

export type DiagonalEnergyEdge = "leading" | "trailing";

export type DiagonalEnergyShape = "diagonalBand" | "cornerWedge" | "edgeSlash";

/** Horizontal inset on the inner edge for the token angle on typical row panels. */
export const getEnergyAccentInnerCutPercent = (
  angleDeg = BRICKWORK_DIAGONAL_ANGLE_DEG,
): number => Math.round(Math.tan((angleDeg * Math.PI) / 180) * 100);

export const getTrailingEnergySlashClipPath = (
  stripWidthPercent = ENERGY_ACCENT_STRIP_WIDTH_PERCENT,
  angleDeg = BRICKWORK_DIAGONAL_ANGLE_DEG,
): string => {
  const cut = getEnergyAccentInnerCutPercent(angleDeg);
  const innerTop = 100 - stripWidthPercent;
  const innerBottom = Math.max(0, innerTop - cut);

  return `polygon(${innerTop}% 0%, 100% 0%, 100% 100%, ${innerBottom}% 100%)`;
};

export const getLeadingEnergySlashClipPath = (
  stripWidthPercent = ENERGY_ACCENT_STRIP_WIDTH_PERCENT,
  angleDeg = BRICKWORK_DIAGONAL_ANGLE_DEG,
): string => {
  const cut = getEnergyAccentInnerCutPercent(angleDeg);
  const innerTop = stripWidthPercent;
  const innerBottom = Math.min(100, stripWidthPercent + cut);

  return `polygon(0% 0%, ${innerTop}% 0%, ${innerBottom}% 100%, 0% 100%)`;
};

/** Bottom-corner wedge — reads more clearly than a full-height edge strip. */
export const getTrailingCornerWedgeClipPath = (
  angleDeg = BRICKWORK_DIAGONAL_ANGLE_DEG,
  cornerReachPercent = ENERGY_ACCENT_CORNER_REACH_PERCENT,
): string => {
  const spread = getEnergyAccentInnerCutPercent(angleDeg) + 6;
  const topY = Math.max(0, 100 - cornerReachPercent);

  return `polygon(100% 100%, 100% ${topY}%, ${100 - spread}% 100%)`;
};

export const getLeadingCornerWedgeClipPath = (
  angleDeg = BRICKWORK_DIAGONAL_ANGLE_DEG,
  cornerReachPercent = ENERGY_ACCENT_CORNER_REACH_PERCENT,
): string => {
  const spread = getEnergyAccentInnerCutPercent(angleDeg) + 6;
  const topY = Math.max(0, 100 - cornerReachPercent);

  return `polygon(0% 100%, 0% ${topY}%, ${spread}% 100%)`;
};

export const getEnergyAccentClipPath = (
  edge: DiagonalEnergyEdge,
  shape: DiagonalEnergyShape = "diagonalBand",
  stripWidthPercent = ENERGY_ACCENT_BAND_WIDTH_PERCENT,
  angleDeg = BRICKWORK_DIAGONAL_ANGLE_DEG,
): string => {
  if (shape === "cornerWedge") {
    return edge === "trailing"
      ? getTrailingCornerWedgeClipPath(angleDeg)
      : getLeadingCornerWedgeClipPath(angleDeg);
  }

  return getEnergySlashClipPath(
    edge,
    shape === "edgeSlash"
      ? ENERGY_ACCENT_STRIP_WIDTH_PERCENT
      : stripWidthPercent,
    angleDeg,
  );
};

export const getEnergySlashClipPath = (
  edge: DiagonalEnergyEdge,
  stripWidthPercent = ENERGY_ACCENT_STRIP_WIDTH_PERCENT,
  angleDeg = BRICKWORK_DIAGONAL_ANGLE_DEG,
): string =>
  edge === "trailing"
    ? getTrailingEnergySlashClipPath(stripWidthPercent, angleDeg)
    : getLeadingEnergySlashClipPath(stripWidthPercent, angleDeg);

export const getEnergyAccentColor = (
  baseColor: string,
  opacity = ENERGY_ACCENT_OPACITY,
): string => tinycolor(baseColor).setAlpha(opacity).toRgbString();

export const clipPathStyle = (clipPath: string): CSSProperties => ({
  clipPath,
  WebkitClipPath: clipPath,
});
