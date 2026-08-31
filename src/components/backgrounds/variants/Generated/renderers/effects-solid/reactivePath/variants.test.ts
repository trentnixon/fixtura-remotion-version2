import { describe, expect, test } from "vitest";
import {
  getReactivePathLoopProgress,
  LOOP_DURATION_IN_SECONDS,
  pointOnRoute,
  REACTIVE_PATH_ROUTES,
  routeProgress,
} from "./variants";

describe("reactive path variants", () => {
  test("returns repeating loop progress at the loop boundary", () => {
    const fps = 30;
    const loopFrames = fps * LOOP_DURATION_IN_SECONDS;

    expect(getReactivePathLoopProgress(0, fps)).toBe(0);
    expect(getReactivePathLoopProgress(loopFrames, fps)).toBe(0);
  });

  test("computes route travel and points within frame bounds", () => {
    const route = REACTIVE_PATH_ROUTES[0];
    const progress = routeProgress(route, 0.25);
    const point = pointOnRoute(route, 1080, 1350, progress);

    expect(progress).toBeGreaterThanOrEqual(0);
    expect(progress).toBeLessThan(1);
    expect(point.x).toBeGreaterThanOrEqual(0);
    expect(point.x).toBeLessThanOrEqual(1080);
    expect(point.y).toBeGreaterThanOrEqual(0);
    expect(point.y).toBeLessThanOrEqual(1350);
  });
});
