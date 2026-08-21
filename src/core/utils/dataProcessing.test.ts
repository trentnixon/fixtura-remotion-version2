import { describe, expect, it } from "vitest";
import { mergeData } from "./dataProcessing";
import { processDatasetForTemplate } from "./datasetProcessing";
import { buildOutroSponsorSequence } from "./sponsors/outroSponsors";
import CricketResults from "../../../testData/samples/Cricket/Cricket_Results.json";
import { FixturaDataset } from "../types/data/index";

describe("mergeData", () => {
  it("replaces arrays instead of converting them to objects", () => {
    const base = {
      sponsors: {
        primary: [{ id: 1 }],
        general: [{ id: 2 }],
      },
    };
    const override = {
      sponsors: {
        primary: [{ id: 1 }, { id: 3 }],
        general: [{ id: 2 }],
      },
    };

    const merged = mergeData(base, override);

    expect(Array.isArray(merged.sponsors.primary)).toBe(true);
    expect(merged.sponsors.primary.map((s) => s.id)).toEqual([1, 3]);
    expect(Array.isArray(merged.sponsors.general)).toBe(true);
  });
});

describe("processDatasetForTemplate + outro sponsors", () => {
  it("keeps club sponsor buckets iterable after template merge", () => {
    const processed = processDatasetForTemplate(
      CricketResults as FixturaDataset,
      "basic",
      "Basic",
      "Cricket",
    );

    const sponsors = processed.videoMeta?.club?.sponsors;
    expect(Array.isArray(sponsors?.primary)).toBe(true);
    expect(Array.isArray(sponsors?.general)).toBe(true);

    const sequence = buildOutroSponsorSequence({
      primary: sponsors?.primary ?? [],
      general: sponsors?.general ?? [],
    });

    expect(sequence.length).toBeGreaterThan(0);
  });
});
