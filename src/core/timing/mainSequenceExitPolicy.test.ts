import { describe, expect, it } from "vitest";
import { calculateFooterExitFrame } from "../../compositions/cricket/sponsorFooter/_utils/calculations";
import {
  MAIN_HEADER_EXIT_OFFSET_FRAMES,
  MAIN_ROW_EXIT_OFFSET_FRAMES,
  calculateMainHeaderExitFrame,
  calculateMainRowExitFrame,
} from "./mainSequenceExitPolicy";

describe("mainSequenceExitPolicy", () => {
  it("starts main header exit 30 frames before FPS_MAIN", () => {
    expect(calculateMainHeaderExitFrame({ FPS_MAIN: 360 })).toBe(330);
    expect(calculateMainHeaderExitFrame(undefined)).toBe(0);
    expect(calculateMainHeaderExitFrame({ FPS_MAIN: 0 })).toBe(0);
  });

  it("matches legacy row exit framing with FPS_MAIN fallback", () => {
    expect(calculateMainRowExitFrame({ FPS_MAIN: 360 })).toBe(
      360 - MAIN_ROW_EXIT_OFFSET_FRAMES,
    );
    expect(calculateMainRowExitFrame(undefined)).toBe(
      30 - MAIN_ROW_EXIT_OFFSET_FRAMES,
    );
    expect(calculateMainRowExitFrame({ FPS_MAIN: 0 })).toBe(0);
  });

  it("keeps footer exit on FPS_MAIN − 15 (ADR-0001)", () => {
    expect(MAIN_HEADER_EXIT_OFFSET_FRAMES).toBe(30);
    expect(calculateFooterExitFrame({ FPS_MAIN: 360 })).toBe(345);
    expect(calculateMainHeaderExitFrame({ FPS_MAIN: 360 })).not.toBe(
      calculateFooterExitFrame({ FPS_MAIN: 360 }),
    );
  });
});
