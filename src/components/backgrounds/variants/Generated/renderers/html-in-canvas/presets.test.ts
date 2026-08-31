import { describe, expect, test } from "vitest";
import {
  HTML_IN_CANVAS_PRESET_IDS,
  HTML_IN_CANVAS_PRESETS,
  isHtmlInCanvasPresetId,
} from "./presets";

describe("html-in-canvas presets", () => {
  test("registers three standalone preset configurations", () => {
    expect(HTML_IN_CANVAS_PRESET_IDS).toEqual([
      "html-orbit-rings",
      "html-scoreboard-grid",
      "html-neon-beams",
    ]);
    expect(HTML_IN_CANVAS_PRESETS["html-neon-beams"].chromaticAmount).toBeGreaterThan(
      0,
    );
    expect(HTML_IN_CANVAS_PRESETS["html-scoreboard-grid"].graphicId).toBe(
      "scoreboard-grid",
    );
  });

  test("validates preset ids", () => {
    expect(isHtmlInCanvasPresetId("html-orbit-rings")).toBe(true);
    expect(isHtmlInCanvasPresetId("html-broadcast")).toBe(false);
  });
});
