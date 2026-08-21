import { describe, expect, it } from "vitest";
import {
  FOOTER_EXIT_ANIMATION_DURATION_FRAMES,
  FOOTER_EXIT_OFFSET_FRAMES,
  calculateFooterExitFrame,
} from "./calculations";

describe("calculateFooterExitFrame", () => {
  it("starts exit FOOTER_EXIT_OFFSET_FRAMES before FPS_MAIN", () => {
    expect(calculateFooterExitFrame({ FPS_MAIN: 360 })).toBe(345);
    expect(calculateFooterExitFrame({ FPS_MAIN: 720 })).toBe(705);
    expect(calculateFooterExitFrame({ FPS_MAIN: 510 })).toBe(495);
  });

  it("returns 0 when FPS_MAIN is missing or invalid", () => {
    expect(calculateFooterExitFrame(undefined)).toBe(0);
    expect(calculateFooterExitFrame({})).toBe(0);
    expect(calculateFooterExitFrame({ FPS_MAIN: 0 })).toBe(0);
    expect(calculateFooterExitFrame({ FPS_MAIN: -10 })).toBe(0);
  });

  it("clamps short mains so exit does not start before frame 0", () => {
    expect(calculateFooterExitFrame({ FPS_MAIN: 10 })).toBe(0);
    expect(calculateFooterExitFrame({ FPS_MAIN: 15 })).toBe(0);
    expect(calculateFooterExitFrame({ FPS_MAIN: 16 })).toBe(1);
  });

  it("keeps exit window constants aligned", () => {
    expect(FOOTER_EXIT_OFFSET_FRAMES).toBe(15);
    expect(FOOTER_EXIT_ANIMATION_DURATION_FRAMES).toBe(15);
  });
});
