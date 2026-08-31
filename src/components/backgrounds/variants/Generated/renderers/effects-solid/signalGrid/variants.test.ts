import { describe, expect, test } from "vitest";
import {
  getGridOffsetY,
  getScanlineOffset,
  getSignalGridLoopProgress,
  LOOP_DURATION_IN_SECONDS,
} from "./variants";

describe("signal grid variants", () => {
  test("returns repeating loop progress and offsets at the loop boundary", () => {
    const fps = 30;
    const loopFrames = fps * LOOP_DURATION_IN_SECONDS;
    const gridSize = 64;

    expect(getSignalGridLoopProgress(0, fps)).toBe(0);
    expect(getSignalGridLoopProgress(loopFrames, fps)).toBe(0);
    expect(getGridOffsetY(0, gridSize)).toBe(0);
    expect(getGridOffsetY(0.5, gridSize)).toBe(32);
    expect(getScanlineOffset(0.5)).toBe(3);
  });
});
