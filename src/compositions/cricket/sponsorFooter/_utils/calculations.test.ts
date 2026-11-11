import { describe, expect, it } from "vitest";
import {
  FOOTER_LOGO_GAP_PX,
  FOOTER_LOGO_MAX_WIDTH_RATIO,
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

