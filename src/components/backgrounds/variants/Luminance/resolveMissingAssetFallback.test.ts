import { describe, expect, it } from "vitest";
import {
  resolveMissingAssetFallback,
  resolveMissingAssetFallbackChain,
} from "./resolveMissingAssetFallback";

describe("resolveMissingAssetFallback", () => {
  it("returns gradient first", () => {
    expect(resolveMissingAssetFallback()).toBe("gradient");
  });

  it("never suggests hero or stock fallback modes", () => {
    expect(resolveMissingAssetFallbackChain()).toEqual(["gradient", "solid"]);
  });
});
