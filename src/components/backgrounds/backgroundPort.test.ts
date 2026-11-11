import { describe, expect, it } from "vitest";
import { getCanonicalEgress } from "./variants/Generated/catalogue";
import CricketUpcoming from "../../../testData/samples/Cricket/Cricket_upcoming.json";
import { processDatasetForTemplate } from "../../core/utils/datasetProcessing";
import type { FixturaDataset } from "../../core/types/data/index";
import {
  buildProductionCompositionIds,
  listProductionCompositionIds,
  resolveBackgroundIngress,
} from "./backgroundPort";

describe("resolveBackgroundIngress", () => {
  it("matches legacy Pattern wire to a generated route", () => {
    const resolved = resolveBackgroundIngress({
      useBackground: "Pattern",
      pattern: { type: "dots" },
    });

    expect(resolved.match.outcome).toBe("generated");
    expect(resolved.route.kind).toBe("pattern");
    expect(resolved.display).toEqual({
      category: "generated",
      presetId: "dot-field",
    });
    expect(resolved.legacyUseBackgroundForCompositionId).toBe("Pattern");
  });

  it("passes through Solid without catalogue preset", () => {
    const resolved = resolveBackgroundIngress({ useBackground: "Solid" });

    expect(resolved.match.outcome).toBe("passthrough");
    expect(resolved.route.kind).toBe("solid");
    expect(resolved.display).toEqual({
      category: "passthrough",
      useBackground: "Solid",
    });
  });
});

describe("buildProductionCompositionIds", () => {
  it("keeps legacy useBackground in remote ID for generated ingress", () => {
    const processed = processDatasetForTemplate(
      CricketUpcoming as FixturaDataset,
      "Mudgeeraba",
      "Cricket",
      getCanonicalEgress("html-scoreboard-grid"),
      { kind: "generated", presetId: "html-scoreboard-grid" },
    );

    const video = processed.videoMeta.video;
    const ids = buildProductionCompositionIds({
      templateId: video.appearance.template,
      compositionId: video.metadata.compositionId,
      legacyUseBackground: video.templateVariation.useBackground,
      appearanceType: video.appearance.type,
    });

    expect(ids.remoteCompositionId).toBe("Mudgeeraba-Animated-CricketUpcoming");
    expect(ids.studioGeneratedCompositionId).toBe(
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

    const video = processed.videoMeta.video;
    const ids = buildProductionCompositionIds({
      templateId: video.appearance.template,
      compositionId: video.metadata.compositionId,
      legacyUseBackground: video.templateVariation.useBackground,
      appearanceType: video.appearance.type,
    });

    expect(ids.remoteCompositionId).toBe("Mudgeeraba-Solid-CricketUpcoming");
    expect(ids.studioGeneratedCompositionId).toBeUndefined();
  });
});

describe("listProductionCompositionIds", () => {
  it("registers dual IDs when Studio alias differs from legacy wire ID", () => {
    expect(
      listProductionCompositionIds({
        remoteCompositionId: "Mudgeeraba-Animated-CricketUpcoming",
        studioGeneratedCompositionId:
          "Mudgeeraba-generated-html-scoreboard-grid-CricketUpcoming",
      }),
    ).toEqual([
      "Mudgeeraba-Animated-CricketUpcoming",
      "Mudgeeraba-generated-html-scoreboard-grid-CricketUpcoming",
    ]);
  });

  it("dedupes when alias equals remote ID", () => {
    expect(
      listProductionCompositionIds({
        remoteCompositionId: "Basic-Solid-CricketResults",
        studioGeneratedCompositionId: "Basic-Solid-CricketResults",
      }),
    ).toEqual(["Basic-Solid-CricketResults"]);
  });
});
