import { describe, expect, it } from "vitest";
import {
  ForegroundProtection,
  LUMINANCE_LAYER_Z_INDEX,
} from "./ForegroundProtection";

describe("ForegroundProtection layer order", () => {
  it("uses a higher z-index than the mapped image layer constant", () => {
    expect(LUMINANCE_LAYER_Z_INDEX.protection).toBeGreaterThan(
      LUMINANCE_LAYER_Z_INDEX.mappedImage,
    );
  });

  it("exposes a none preset that produces no protection layer at the seam", () => {
    expect(
      ForegroundProtection({ preset: "none", scrimColor: "#001122" }),
    ).toBeNull();
  });
});
