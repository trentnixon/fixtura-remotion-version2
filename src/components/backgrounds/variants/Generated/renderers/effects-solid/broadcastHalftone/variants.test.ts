import { describe, expect, test } from "vitest";
import { getWavePhase, LOOP_DURATION_IN_SECONDS } from "./variants";

describe("broadcast halftone variants", () => {
  test("returns a repeating wave phase at the loop boundary", () => {
    const fps = 30;
    const loopFrames = fps * LOOP_DURATION_IN_SECONDS;

    expect(getWavePhase(0, fps)).toBe(0);
    expect(getWavePhase(loopFrames, fps)).toBe(0);
    expect(getWavePhase(loopFrames / 2, fps)).toBeCloseTo(Math.PI, 5);
  });
});
