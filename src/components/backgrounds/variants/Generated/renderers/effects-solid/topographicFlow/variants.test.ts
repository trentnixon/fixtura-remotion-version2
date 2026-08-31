import { describe, expect, test } from "vitest";
import { getContourPhase, LOOP_DURATION_IN_SECONDS } from "./variants";

describe("topographic flow variants", () => {
  test("returns a repeating contour phase at the loop boundary", () => {
    const fps = 30;
    const loopFrames = fps * LOOP_DURATION_IN_SECONDS;

    expect(getContourPhase(0, fps)).toBe(0);
    expect(getContourPhase(loopFrames, fps)).toBe(0);
    expect(getContourPhase(loopFrames / 2, fps)).toBeCloseTo(Math.PI, 5);
  });
});
