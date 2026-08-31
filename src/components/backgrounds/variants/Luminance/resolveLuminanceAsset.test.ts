import { describe, expect, it } from "vitest";
import { resolveLuminanceAssetSrc } from "./resolveLuminanceAsset";

describe("resolveLuminanceAssetSrc", () => {
  it("prefers account CDN url from the data OBJ (production path)", () => {
    expect(
      resolveLuminanceAssetSrc({
        url: "https://cdn.example.com/masters/club-a.png",
        asset: "_verify/test001.png",
        name: "ignored-when-url-set",
      }),
    ).toBe("https://cdn.example.com/masters/club-a.png");
  });

  it("returns undefined for unknown local keys (missing master → fallback)", () => {
    expect(
      resolveLuminanceAssetSrc({ asset: "missing-asset-key.png" }),
    ).toBeUndefined();
  });

  it("resolves known local library keys when url is unset", () => {
    expect(resolveLuminanceAssetSrc({ asset: "smooth-ramp.png" })).toContain(
      "smooth-ramp.png",
    );
  });

  it("resolves verify test masters under _verify/ when url is unset", () => {
    expect(
      resolveLuminanceAssetSrc({
        name: "Test 001",
        asset: "_verify/test001.png",
      }),
    ).toContain("_verify/test001.png");
  });
});
