import { describe, expect, it } from "vitest";
import { resolveBroadcastProTransparentLayers } from "../../../../templates/types/TemplateThemeConfig";
import { resolveBroadcastProRoundedTransparentLayers } from "../../../../templates/types/broadcast-pro-rounded/transparent-layers";
import {
  getBroadcastProCoreGlassSurface,
  resolveBroadcastProCoreGlass,
} from "./glass";

describe("broadcastProCore glass", () => {
  const surfaceBase = "#112233";

  it("resolves square and rounded stacks through the same core surface roles", () => {
    const square = resolveBroadcastProCoreGlass({
      surfaceBase,
      layers: resolveBroadcastProTransparentLayers({}),
    });
    const rounded = resolveBroadcastProCoreGlass({
      surfaceBase,
      layers: resolveBroadcastProRoundedTransparentLayers({}),
    });

    expect(getBroadcastProCoreGlassSurface(square, "panel")).toMatch(
      /^rgba\(/,
    );
    expect(getBroadcastProCoreGlassSurface(rounded, "panel")).toMatch(
      /^rgba\(/,
    );
    expect(getBroadcastProCoreGlassSurface(square, "panel")).not.toBe(
      getBroadcastProCoreGlassSurface(square, "strong"),
    );
  });
});
