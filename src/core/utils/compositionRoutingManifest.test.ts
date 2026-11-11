import type { ComponentType } from "react";
import { describe, expect, it } from "vitest";
import routes from "../../../design/_shared/routes.json";
import * as CricketCompositions from "../../compositions/cricket";
import {
  compositionExportKeyCandidates,
  resolveCompositionTemplateComponent,
} from "./compositionTemplateKey";
import { metadataCompositionIdFromRemotionPath } from "./compositionRoutingManifest";
import { SPORT_COMPOSITION_MODULE_KEYS } from "./compositionSportTypes";

describe("compositionExportKeyCandidates", () => {
  it("includes nightsession and nightSession aliases for Night Session", () => {
    const keys = compositionExportKeyCandidates("NightSession");
    expect(keys).toContain("nightsession");
    expect(keys).toContain("nightSession");
  });
});

describe("design routes ↔ composition routing", () => {
  const sportModule = CricketCompositions as Record<
    string,
    Record<string, ComponentType>
  >;

  for (const [variantSlug, variant] of Object.entries(routes.variants)) {
    const cricket = variant.sports?.cricket;
    if (!cricket?.assets) continue;

    for (const [assetSlug, asset] of Object.entries(cricket.assets)) {
      it(`resolves ${variant.registryId} for ${variantSlug}/cricket/${assetSlug}`, () => {
        const compositionId = metadataCompositionIdFromRemotionPath(
          asset.remotion.composition,
          assetSlug,
        );
        const compositionType =
          SPORT_COMPOSITION_MODULE_KEYS.cricket[compositionId];
        expect(compositionType).toBeTruthy();

        const compositionModule = sportModule[compositionType];
        expect(compositionModule).toBeTruthy();

        const component = resolveCompositionTemplateComponent(
          compositionModule,
          variant.registryId,
        );
        expect(
          component,
          `Missing composition fork for ${variant.registryId} on ${compositionType}`,
        ).toBeDefined();
      });
    }
  }
});
