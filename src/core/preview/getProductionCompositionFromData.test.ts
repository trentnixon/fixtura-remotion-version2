import { describe, expect, it } from "vitest";
import { getCanonicalEgress } from "../../components/backgrounds/variants/Generated/catalogue";
import CricketUpcoming from "../../../testData/samples/Cricket/Cricket_upcoming.json";
import { processDatasetForTemplate } from "../utils/datasetProcessing";
import { FixturaDataset } from "../types/data/index";
import { getProductionCompositionFromData } from "./getProductionCompositionFromData";

describe("getProductionCompositionFromData", () => {
  it("dual-registers Studio generated composition ID for catalogue presets", () => {
    const processed = processDatasetForTemplate(
      CricketUpcoming as FixturaDataset,
      "Mudgeeraba",
      "Cricket",
      getCanonicalEgress("html-scoreboard-grid"),
      { kind: "generated", presetId: "html-scoreboard-grid" },
    );

    const result = getProductionCompositionFromData(processed);

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

    const result = getProductionCompositionFromData(processed);

    expect(result.remoteCompositionId).toBe("Mudgeeraba-Solid-CricketUpcoming");
    expect(result.studioGeneratedCompositionId).toBeUndefined();
  });
});
