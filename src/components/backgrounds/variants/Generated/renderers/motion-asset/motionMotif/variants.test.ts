import { describe, expect, test } from "vitest";
import {
  getMotionMotifGlowIntensity,
  getMotionMotifLoopProgress,
  LOOP_DURATION_IN_SECONDS,
} from "./variants";

describe("motion motif variants", () => {
  test("returns repeating loop progress and glow intensity", () => {
    const fps = 30;
    const loopFrames = fps * LOOP_DURATION_IN_SECONDS;

    expect(getMotionMotifLoopProgress(0, fps)).toBe(0);
    expect(getMotionMotifLoopProgress(loopFrames, fps)).toBe(0);
    expect(getMotionMotifGlowIntensity(0)).toBeCloseTo(0.16, 5);
  });
});
