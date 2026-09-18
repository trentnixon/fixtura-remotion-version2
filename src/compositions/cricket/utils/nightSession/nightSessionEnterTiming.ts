import type { Timings } from "../../../../core/types/data/common";
import {
  SCORELINE_INNER_TIER_OFFSETS,
  type ScorelineInnerTier,
} from "../scoreline/scorelineInnerAnimationDelays";
import {
  NIGHT_SESSION_HEADER_COPY_DELAY,
  NIGHT_SESSION_LEDGER_COPY_DELAY,
} from "./nightSessionAnimationTiming";

/** User-facing stills are taken at 50% of the main scene — all enters must finish by then. */
export const NIGHT_SESSION_ENTER_DEADLINE_RATIO = 0.5;

/** Keep in sync with `src/templates/variants/nightSession/animations.ts`. */
export const NIGHT_SESSION_ENTER_FRAME_BUDGET = {
  panelIn: 14,
  copyIn: 13,
  rowShellIn: 12,
  statsCopyIn: 13,
  ledgerCopyDelay: NIGHT_SESSION_LEDGER_COPY_DELAY,
  headerCopyDelay: NIGHT_SESSION_HEADER_COPY_DELAY,
  /** Latest inner tier used on Night Session rows (upcoming `context` is 19f). */
  maxInnerTier: Math.max(
    SCORELINE_INNER_TIER_OFFSETS.stats,
    SCORELINE_INNER_TIER_OFFSETS.context,
  ),
} as const;

/** Keep in sync with `nightSessionRowOut` / `nightSessionPanelOut` in animations.ts */
export const NIGHT_SESSION_EXIT_FRAME_BUDGET = {
  panelOut: 12,
  rowShellOut: 10,
  copyOut: 9,
} as const;

export type NightSessionRowEnterTimingOptions = {
  /** Hold full layout after the 50% enter deadline before exits begin. */
  minHoldAfterEnterFrames?: number;
  /** Spread row exits so the last row finishes near scene end (dense screens). */
  staggerRowExits?: boolean;
  /** Fixed stagger between row shells; use `0` for simultaneous fixture enters. */
  rowStaggerFrames?: number;
};

export const resolveEffectiveNightSessionRowStaggerFrames = (
  itemCount: number,
  sceneDurationFrames: number,
  options?: NightSessionRowEnterTimingOptions,
): number => {
  if (typeof options?.rowStaggerFrames === "number") {
    return Math.max(0, options.rowStaggerFrames);
  }
  return resolveNightSessionRowStaggerFrames(itemCount, sceneDurationFrames);
};

export type NightSessionSceneDurationKey =
  | "FPS_MAIN"
  | "FPS_LADDER"
  | "FPS_SCORECARD"
  | "FPS_PREFORMANCECARD";

const SCENE_DURATION_FALLBACK: Record<NightSessionSceneDurationKey, number> = {
  FPS_MAIN: 300,
  FPS_LADDER: 300,
  FPS_SCORECARD: 270,
  FPS_PREFORMANCECARD: 180,
};

export const resolveNightSessionSceneDurationFrames = (
  timings: Timings | undefined,
  key: NightSessionSceneDurationKey,
): number => {
  const value = timings?.[key];
  if (typeof value === "number" && value > 0) {
    return value;
  }
  return SCENE_DURATION_FALLBACK[key];
};

export const resolveNightSessionEnterDeadlineFrames = (
  sceneDurationFrames: number,
  ratio: number = NIGHT_SESSION_ENTER_DEADLINE_RATIO,
): number => Math.max(1, Math.floor(sceneDurationFrames * ratio));

const resolveLastRowEnterEndFrames = (
  itemCount: number,
  rowStagger: number,
  innerTierScale: number,
): number => {
  if (itemCount <= 0) {
    return 0;
  }
  const lastIndex = itemCount - 1;
  const rowDelay = lastIndex * rowStagger;
  const tierOffset = Math.round(
    NIGHT_SESSION_ENTER_FRAME_BUDGET.maxInnerTier * innerTierScale,
  );
  return rowDelay + tierOffset + NIGHT_SESSION_ENTER_FRAME_BUDGET.statsCopyIn;
};

export const resolveNightSessionRowStaggerFrames = (
  itemCount: number,
  sceneDurationFrames: number,
): number => {
  if (itemCount <= 1) {
    return 0;
  }
  const deadline = resolveNightSessionEnterDeadlineFrames(sceneDurationFrames);
  const tail =
    NIGHT_SESSION_ENTER_FRAME_BUDGET.maxInnerTier +
    NIGHT_SESSION_ENTER_FRAME_BUDGET.statsCopyIn;
  const available = deadline - tail;
  if (available <= 0) {
    return 1;
  }
  return Math.max(1, Math.floor(available / (itemCount - 1)));
};

export const resolveNightSessionInnerTierScale = (
  itemCount: number,
  sceneDurationFrames: number,
  options?: NightSessionRowEnterTimingOptions,
): number => {
  if (itemCount <= 0) {
    return 1;
  }
  const deadline = resolveNightSessionEnterDeadlineFrames(sceneDurationFrames);
  const stagger = resolveEffectiveNightSessionRowStaggerFrames(
    itemCount,
    sceneDurationFrames,
    options,
  );
  const lastEnd = resolveLastRowEnterEndFrames(itemCount, stagger, 1);
  if (lastEnd <= deadline) {
    return 1;
  }
  const lastIndex = itemCount - 1;
  const rowDelay = lastIndex * stagger;
  const tailBudget = Math.max(
    NIGHT_SESSION_ENTER_FRAME_BUDGET.statsCopyIn + 1,
    deadline - rowDelay,
  );
  const scaledTier = tailBudget - NIGHT_SESSION_ENTER_FRAME_BUDGET.statsCopyIn;
  const maxTier = NIGHT_SESSION_ENTER_FRAME_BUDGET.maxInnerTier;
  return Math.min(1, Math.max(0, scaledTier / maxTier));
};

export const calculateNightSessionRowDelay = (
  index: number,
  itemCount: number,
  sceneDurationFrames: number,
  options?: NightSessionRowEnterTimingOptions,
): number => {
  const stagger = resolveEffectiveNightSessionRowStaggerFrames(
    itemCount,
    sceneDurationFrames,
    options,
  );
  return index * stagger;
};

export const resolveNightSessionExitStartFrame = (
  sceneDurationFrames: number,
): number => {
  const tail =
    Math.max(
      NIGHT_SESSION_EXIT_FRAME_BUDGET.panelOut,
      NIGHT_SESSION_EXIT_FRAME_BUDGET.rowShellOut,
    ) + 2;
  return Math.max(0, sceneDurationFrames - tail);
};

export const calculateNightSessionRowExitStartFrame = (
  index: number,
  itemCount: number,
  sceneDurationFrames: number,
  enterDeadlineFrames: number,
  options?: NightSessionRowEnterTimingOptions,
): number => {
  const rowOut = NIGHT_SESSION_EXIT_FRAME_BUDGET.rowShellOut;
  const lastStart = sceneDurationFrames - rowOut;
  const hold = options?.minHoldAfterEnterFrames ?? 0;
  const minFirstStart = enterDeadlineFrames + hold;

  if (!options?.staggerRowExits || itemCount <= 1) {
    return Math.max(
      resolveNightSessionExitStartFrame(sceneDurationFrames),
      minFirstStart,
    );
  }

  const span = Math.max(0, lastStart - minFirstStart);
  const stagger = Math.max(
    1,
    Math.min(3, Math.floor(span / Math.max(1, itemCount - 1))),
  );
  const firstStart = lastStart - stagger * (itemCount - 1);
  return Math.max(minFirstStart, firstStart) + index * stagger;
};

export const calculateNightSessionInnerDelay = (
  rowDelay: number,
  tier: ScorelineInnerTier,
  itemCount: number,
  sceneDurationFrames: number,
  options?: NightSessionRowEnterTimingOptions,
): number => {
  const scale = resolveNightSessionInnerTierScale(
    itemCount,
    sceneDurationFrames,
    options,
  );
  const offset = Math.round(SCORELINE_INNER_TIER_OFFSETS[tier] * scale);
  return rowDelay + offset;
};

export type NightSessionRowEnterTiming = {
  itemCount: number;
  sceneDurationFrames: number;
  enterDeadlineFrames: number;
  rowDelayForIndex: (index: number) => number;
  innerDelay: (rowDelay: number, tier: ScorelineInnerTier) => number;
  rowExitFrameForIndex: (index: number) => number;
  shellExitFrame: number;
};

export const createNightSessionRowEnterTiming = (
  itemCount: number,
  sceneDurationFrames: number,
  options?: NightSessionRowEnterTimingOptions,
): NightSessionRowEnterTiming => {
  const enterDeadlineFrames =
    resolveNightSessionEnterDeadlineFrames(sceneDurationFrames);

  const rowExitFrameForIndex = (index: number) =>
    calculateNightSessionRowExitStartFrame(
      index,
      itemCount,
      sceneDurationFrames,
      enterDeadlineFrames,
      options,
    );

  return {
    itemCount,
    sceneDurationFrames,
    enterDeadlineFrames,
    rowDelayForIndex: (index) =>
      calculateNightSessionRowDelay(
        index,
        itemCount,
        sceneDurationFrames,
        options,
      ),
    innerDelay: (rowDelay, tier) =>
      calculateNightSessionInnerDelay(
        rowDelay,
        tier,
        itemCount,
        sceneDurationFrames,
        options,
      ),
    rowExitFrameForIndex,
    shellExitFrame:
      options?.staggerRowExits && itemCount > 1
        ? rowExitFrameForIndex(itemCount - 1)
        : rowExitFrameForIndex(0),
  };
};
