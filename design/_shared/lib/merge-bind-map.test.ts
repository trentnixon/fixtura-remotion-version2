import { describe, expect, it } from "vitest";
import {
  computeBindOverlay,
  mergeBindMaps,
  resolveBindMapUrls,
} from "./merge-bind-map.js";

describe("mergeBindMaps", () => {
  it("replaces the canonical map when overlay requests replace mode", () => {
    const base = {
      "[data-hydrate=a]": "path.a",
      "[data-hydrate=b]": "path.b",
    };
    const overlay = {
      __bindMode: "replace",
      "[data-hydrate=c]": "path.c",
    };

    expect(mergeBindMaps(base, overlay)).toEqual({
      "[data-hydrate=c]": "path.c",
    });
  });

  it("overlays variant-specific paths onto the canonical map", () => {
    const base = {
      "[data-hydrate=club-name]": "videoMeta.club.name",
      "[data-hydrate=home-team]": "data.0.teamHome",
    };
    const overlay = {
      "[data-hydrate=home-team]": "data.0.homeTeam",
    };

    expect(mergeBindMaps(base, overlay)).toEqual({
      "[data-hydrate=club-name]": "videoMeta.club.name",
      "[data-hydrate=home-team]": "data.0.homeTeam",
    });
  });
});

describe("computeBindOverlay", () => {
  it("returns only selectors that differ from canonical", () => {
    const base = {
      a: "path.a",
      b: "path.b",
    };
    const resolved = {
      a: "path.a",
      b: "path.b2",
      c: "path.c",
    };

    expect(computeBindOverlay(base, resolved)).toEqual({
      b: "path.b2",
      c: "path.c",
    });
  });
});

describe("resolveBindMapUrls", () => {
  it("points at canonical template and overlay paths", () => {
    expect(
      resolveBindMapUrls({
        variantSlug: "night-session",
        sportSlug: "cricket",
        assetSlug: "results",
      }),
    ).toEqual({
      canonical: "/design/_templates/cricket/results.bind.json",
      overlay:
        "/design/_shared/hydration/overlays/night-session/cricket/results.bind.json",
      legacy:
        "/design/_shared/hydration/night-session/cricket/results.bind.json",
    });
  });
});
