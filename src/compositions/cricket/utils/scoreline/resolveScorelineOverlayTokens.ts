import type { DesignPalette } from "../../../../core/utils/designPalettes/types";
import {
  isOverlayDarkContainerMode,
  resolveOverlayContainerCopyTokens,
  resolveOverlayHeroRowSurface,
  resolveOverlayMatchContextTokens,
  resolveOverlayModeSurfaceVars,
  resolveOverlayPerformanceAreaSurface,
  type OverlayContainerCopyTokens,
  type OverlayModeSurfaceVars,
} from "../overlayFamily/containerTokens";

export {
  isOverlayDarkContainerMode as isScorelineDarkContainerMode,
  resolveOverlayContainerCopyTokens as resolveScorelineContainerCopyTokens,
  resolveOverlayModeSurfaceVars as resolveScorelineModeSurfaceVars,
  resolveOverlayMatchContextTokens as resolveScorelineMatchContextTokens,
};

export type ScorelineModeSurfaceVars = OverlayModeSurfaceVars;
export type ScorelineContainerCopyTokens = OverlayContainerCopyTokens;

export type ScorelineMatchContextTokens = ReturnType<
  typeof resolveOverlayMatchContextTokens
>;

export const resolveScorelinePerformanceAreaSurface =
  resolveOverlayPerformanceAreaSurface;

export const resolveScorelineLadderRowSurface = (
  selectedPalette: DesignPalette,
): string => resolveOverlayPerformanceAreaSurface(selectedPalette);

export const resolveScorelineLeaderboardHeroRowSurface =
  resolveOverlayHeroRowSurface;

export const resolveScorelineRosterRowSurface = resolveOverlayHeroRowSurface;
