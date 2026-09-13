import { describe, expect, it } from "vitest";
import cricketResults from "../../../testData/samples/Cricket/Cricket_Results.json";
import routes from "../routes.json";
import resultsBindMap from "../hydration/broadcast-pro/cricket/results.bind.json";
import {
  applyBindMap,
  getValueByPath,
  normalizeBindEntry,
} from "./hydrate-core.js";
import {
  assertNoDuplicateJsonKeys,
  parseBindMapJson,
} from "./bind-json.js";
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
    const { values } = applyBindMap(cricketResults, resultsBindMap);

    for (const [selector, value] of Object.entries(values)) {
      expect(String(value).length, selector).toBeGreaterThan(0);
    }

    expect(values["[data-hydrate=home-team]"]).toBe("Mudgeeraba Blue");
    expect(values["[data-hydrate=away-team]"]).toBe("Coomera");
  });

  it("throws when a required bind-map path is missing from fixture data", () => {
    expect(() =>
      applyBindMap(cricketResults, {
        "[data-hydrate=missing]": "does.not.exist",
      }),
    ).toThrow(/does\.not\.exist/);
  });

  it("skips optional bind-map paths when data is missing", () => {
    const { values, skipped } = applyBindMap(cricketResults, {
      "[data-hydrate=optional-logo]": {
        path: "videoMeta.club.logo.doesNotExist",
        optional: true,
      },
      "[data-hydrate=home-team]": "data.0.homeTeam.name",
    });

    expect(skipped).toContain("[data-hydrate=optional-logo]");
    expect(values["[data-hydrate=home-team]"]).toBe("Mudgeeraba Blue");
    expect(values["[data-hydrate=optional-logo]"]).toBeUndefined();
  });

  it("normalizes string bind entries as required", () => {
    expect(normalizeBindEntry("data.0.homeTeam.name")).toEqual({
      path: "data.0.homeTeam.name",
      optional: false,
    });
  });
});

describe("bind-json", () => {
  it("rejects duplicate top-level keys", () => {
    expect(() =>
      assertNoDuplicateJsonKeys(
        '{"[a]":"x","[a]":"y"}',
      ),
    ).toThrow(/Duplicate bind-map key/);
  });

  it("parses bind maps after duplicate check", () => {
    const map = parseBindMapJson('{"[data-hydrate=x]":"path.one"}');
    expect(map["[data-hydrate=x]"]).toBe("path.one");
  });
});
