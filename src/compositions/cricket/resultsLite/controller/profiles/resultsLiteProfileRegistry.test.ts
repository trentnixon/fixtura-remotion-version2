import { describe, expect, it } from "vitest";
import type { ResultsLiteLayoutProfile } from "../resultsLiteVariantMatrix";
import { RESULTS_LITE_PROFILE_RENDERERS } from "./resultsLiteProfileRegistry";

const EXPECTED_PROFILES: ResultsLiteLayoutProfile[] = [
  "stackedGap",
  "classicSeparated",
  "classicTwoColumnAnimated",
  "mudgeerabaSeparated",
  "broadcastProGap",
  "cnswRows",
  "scorelineLedger",
  "nightSessionLedger",
];

describe("RESULTS_LITE_PROFILE_RENDERERS", () => {
  it("registers a renderer for every layout profile", () => {
    for (const profile of EXPECTED_PROFILES) {
      expect(RESULTS_LITE_PROFILE_RENDERERS[profile]).toBeTypeOf("function");
    }
    expect(Object.keys(RESULTS_LITE_PROFILE_RENDERERS).sort()).toEqual(
      [...EXPECTED_PROFILES].sort(),
    );
  });
});
