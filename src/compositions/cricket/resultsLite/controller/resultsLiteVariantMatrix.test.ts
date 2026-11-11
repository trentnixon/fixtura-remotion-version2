import { describe, expect, it } from "vitest";
import {
  RESULTS_LITE_COMPOSITION_VARIANT_KEYS,
  RESULTS_LITE_VARIANT_IDS,
  getResultsLiteVariantConfig,
  resolveResultsLiteVariantId,
} from "./resultsLiteVariantMatrix";
import { RESULTS_LITE_PER_SCREEN } from "./resultsLiteConstants";

describe("resultsLiteVariantMatrix", () => {
  it("lists every composition export key used by CricketResultsLite", () => {
    const expected = [
      "basic",
      "brickwork",
      "classic",
      "twocolumnclassic",
      "cnsw",
      "cnswprivate",
      "sixers",
      "thunder",
      "mudgeeraba",
      "broadcastpro",
      "broadcastprorounded",
      "scoreline",
      "nightsession",
    ];
    expect([...RESULTS_LITE_COMPOSITION_VARIANT_KEYS].sort()).toEqual(
      expected.sort(),
    );
  });

  it("resolves alias keys to a canonical display variant", () => {
    expect(resolveResultsLiteVariantId("cnswprivate")).toBe("cnsw");
    expect(resolveResultsLiteVariantId("sixers")).toBe("sixersThunder");
    expect(resolveResultsLiteVariantId("thunder")).toBe("sixersThunder");
    expect(resolveResultsLiteVariantId("twocolumnclassic")).toBe(
      "classicTwoColumn",
    );
    expect(resolveResultsLiteVariantId("broadcastpro")).toBe("broadcastPro");
    expect(resolveResultsLiteVariantId("broadcastprorounded")).toBe(
      "broadcastProRounded",
    );
    expect(resolveResultsLiteVariantId("nightsession")).toBe("nightSession");
  });

  it("defines a config for each canonical variant id", () => {
    for (const id of RESULTS_LITE_VARIANT_IDS) {
      const config = getResultsLiteVariantConfig(id);
      expect(config.profile).toBeTruthy();
      expect(config.fixturesPerScreen ?? RESULTS_LITE_PER_SCREEN).toBe(4);
    }
  });
});
