import { describe, expect, it } from "vitest";
import cricketResults from "../../../testData/samples/Cricket/Cricket_Results.json";
import routes from "../routes.json";
import resultsBindMap from "../hydration/broadcast-pro/cricket/results.bind.json";
import { applyBindMap, getValueByPath } from "./hydrate-core.js";
import { resolveAssetEntry, validateRoutesManifest } from "./manifest.js";

describe("routes manifest", () => {
  it("validates the shipped routes manifest structure", () => {
    expect(() => validateRoutesManifest(routes)).not.toThrow();
  });

  it("resolves the broadcast-pro cricket results entry", () => {
    const entry = resolveAssetEntry(
      routes,
      "broadcast-pro",
      "cricket",
      "results",
    );
    expect(entry.fixture).toBe("testData/samples/Cricket/Cricket_Results.json");
    expect(entry.registryId).toBe("BroadcastPro");
  });

  it("throws when the manifest entry is missing", () => {
    expect(() =>
      resolveAssetEntry(routes, "missing-variant", "cricket", "results"),
    ).toThrow(/missing-variant/);
  });
});

describe("hydrate-core", () => {
  it("reads nested fixture values by dot path", () => {
    expect(getValueByPath(cricketResults, "videoMeta.club.name")).toBe(
      "Mudgeeraba Nerang And Districts Cricket Club",
    );
  });

  it("hydrates every bind-map field with a non-empty string from Cricket_Results", () => {
    const values = applyBindMap(cricketResults, resultsBindMap);

    for (const [selector, value] of Object.entries(values)) {
      expect(String(value).length, selector).toBeGreaterThan(0);
    }

    expect(values["[data-hydrate=home-team]"]).toBe("Mudgeeraba Blue");
    expect(values["[data-hydrate=away-team]"]).toBe("Coomera");
  });

  it("throws when a bind-map path is missing from fixture data", () => {
    expect(() =>
      applyBindMap(cricketResults, {
        "[data-hydrate=missing]": "does.not.exist",
      }),
    ).toThrow(/does\.not\.exist/);
  });
});
