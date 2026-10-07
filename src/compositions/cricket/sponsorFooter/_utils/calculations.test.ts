import { describe, expect, it } from "vitest";
import {
  FOOTER_EXIT_ANIMATION_DURATION_FRAMES,
  FOOTER_EXIT_OFFSET_FRAMES,
  FOOTER_LOGO_GAP_PX,
  FOOTER_LOGO_MAX_WIDTH_RATIO,
  calculateFooterExitFrame,
  calculateFooterLogoBox,
  footerLogoContentWidth,
} from "./calculations";

describe("calculateFooterLogoBox", () => {
  it("sizes three logos or fewer by the full footer height", () => {
    for (const count of [1, 2, 3]) {
      expect(calculateFooterLogoBox({ footerHeight: 150, count })).toEqual({
        height: 150,
        width: 150 * FOOTER_LOGO_MAX_WIDTH_RATIO,
        fit: "height",
      });
    }
  });

  it("splits the footer width once more than three logos are shown", () => {
    const contentWidth = footerLogoContentWidth();
    for (const count of [4, 5]) {
      const box = calculateFooterLogoBox({ footerHeight: 150, count });
      const gaps = FOOTER_LOGO_GAP_PX * (count - 1);
      expect(box.fit).toBe("width");
      expect(box.height).toBe(150);
      expect(box.width * count + gaps).toBe(contentWidth);
    }
  });

  it("keeps one logo and three logos the same height", () => {
    expect(calculateFooterLogoBox({ footerHeight: 130, count: 1 }).height).toBe(
      calculateFooterLogoBox({ footerHeight: 130, count: 3 }).height,
    );
  });

  it("returns a zero box for invalid inputs", () => {
    expect(calculateFooterLogoBox({ footerHeight: 0, count: 1 })).toEqual({
      width: 0,
      height: 0,
      fit: "height",
    });
    expect(calculateFooterLogoBox({ footerHeight: 150, count: 0 })).toEqual({
      width: 0,
      height: 0,
      fit: "height",
    });
    expect(
      calculateFooterLogoBox({ footerHeight: Number.NaN, count: 2 }),
    ).toEqual({
      width: 0,
      height: 0,
      fit: "height",
    });
  });
});

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
