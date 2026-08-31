import { describe, expect, it } from "vitest";
import { getCanonicalEgress } from "../../components/backgrounds/variants/Generated/catalogue";
import CricketResults from "../../../testData/samples/Cricket/Cricket_Results.json";
import { FixturaDataset } from "../types/data/index";
import { processDatasetForTemplate } from "./datasetProcessing";

describe("processDatasetForTemplate explicit background wire", () => {
  it("injects catalogue canonical egress for Generated dev browse", () => {
    const processed = processDatasetForTemplate(
      CricketResults as FixturaDataset,
      "Basic",
      "Cricket",
      getCanonicalEgress("dot-field"),
      { kind: "generated", presetId: "dot-field" },
    );

    expect(processed.videoMeta?.video?.templateVariation?.useBackground).toBe(
      "Animated",
    );
    expect(processed.videoMeta?.video?.templateVariation?.animation?.type).toBe(
      "dot-field",
    );
    expect(processed.videoMeta?.video?.appearance?.type).toBe("dot-field");
  });

  it("never writes Generated as production wire", () => {
    const processed = processDatasetForTemplate(
      CricketResults as FixturaDataset,
      "Basic",
      "Cricket",
      { useBackground: "Solid" },
      { kind: "passthrough", label: "Solid" },
    );

    expect(processed.videoMeta?.video?.templateVariation?.useBackground).toBe(
      "Solid",
    );
    expect(processed.videoMeta?.video?.appearance?.type).toBe("Solid");
  });
});
