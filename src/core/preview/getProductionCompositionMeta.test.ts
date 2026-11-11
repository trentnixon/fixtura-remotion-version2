import { describe, expect, it } from "vitest";
import { getCanonicalEgress } from "../../components/backgrounds/variants/Generated/catalogue";
import CricketUpcoming from "../../../testData/samples/Cricket/Cricket_upcoming.json";
import { processDatasetForTemplate } from "../utils/datasetProcessing";
import { FixturaDataset } from "../types/data/index";
import { getProductionCompositionMeta } from "./getProductionCompositionMeta";

describe("getProductionCompositionMeta", () => {
  it("returns Studio generated composition alias fields for catalogue presets", () => {
    const processed = processDatasetForTemplate(
      CricketUpcoming as FixturaDataset,
      "Mudgeeraba",
      "Cricket",
      getCanonicalEgress("html-scoreboard-grid"),
      { kind: "generated", presetId: "html-scoreboard-grid" },
    );

    const result = getProductionCompositionMeta(processed);

    expect(result.templateId).toBe("Mudgeeraba");
    expect(result.remoteCompositionId).toBe(
      "Mudgeeraba-Animated-CricketUpcoming",
    );
    expect(result.studioGeneratedCompositionId).toBe(
      "Mudgeeraba-generated-html-scoreboard-grid-CricketUpcoming",
    );
  });

  it("omits Studio alias for passthrough backgrounds", () => {
    const processed = processDatasetForTemplate(
      CricketUpcoming as FixturaDataset,
      "Mudgeeraba",
      "Cricket",
      { useBackground: "Solid" },
      { kind: "passthrough", label: "Solid" },
    );

    const result = getProductionCompositionMeta(processed);

    expect(result.remoteCompositionId).toBe("Mudgeeraba-Solid-CricketUpcoming");
    expect(result.studioGeneratedCompositionId).toBeUndefined();
  });
});
