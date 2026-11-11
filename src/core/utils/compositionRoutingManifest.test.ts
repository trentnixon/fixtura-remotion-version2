import type { ComponentType } from "react";
import { describe, expect, it } from "vitest";
import routes from "../../../design/_shared/routes.json";
import * as CricketCompositions from "../../compositions/cricket";
import { TEMPLATE_IDS } from "../../templates/templateIds";
import {
  COMPOSITION_REGISTRY_MANIFEST,
  compositionExportKeyCandidates,
  metadataCompositionIdFromRemotionPath,
  registryIdToCanonicalCompositionExportKey,
  resolveCompositionTemplateComponent,
} from "./compositionRoutingManifest";
import { buildCompositionVariantMap } from "./buildCompositionVariantMap";
import { SPORT_COMPOSITION_MODULE_KEYS } from "./compositionSportTypes";

describe("COMPOSITION_REGISTRY_MANIFEST", () => {
  it("lists every Template Registry ID exactly once", () => {
    const manifestIds = COMPOSITION_REGISTRY_MANIFEST.map((e) => e.registryId);
    expect(manifestIds).toHaveLength(TEMPLATE_IDS.length);
    expect(new Set(manifestIds).size).toBe(manifestIds.length);
    for (const id of TEMPLATE_IDS) {
      expect(manifestIds).toContain(id);
    }
  });

  it("uses unique canonical export keys per Registry ID", () => {
    const keys = COMPOSITION_REGISTRY_MANIFEST.map((e) => e.canonicalExportKey);
    expect(new Set(keys).size).toBe(keys.length);
  });
});

describe("registryIdToCanonicalCompositionExportKey", () => {
  it("maps NightSession to nightsession", () => {
    expect(registryIdToCanonicalCompositionExportKey("NightSession")).toBe(
      "nightsession",
    );
  });
});

describe("compositionExportKeyCandidates", () => {
  it("includes nightsession and nightSession aliases for Night Session", () => {
    const keys = compositionExportKeyCandidates("NightSession");
    expect(keys).toContain("nightsession");
    expect(keys).toContain("nightSession");
  });
});

describe("buildCompositionVariantMap", () => {
  const Stub = (() => null) as ComponentType<unknown>;

  it("exposes canonical manifest keys on the export map", () => {
    const map = buildCompositionVariantMap({
      basic: Stub,
      nightsession: Stub,
    });
    expect(map.basic).toBe(Stub);
    expect(map.nightsession).toBe(Stub);
  });

  it("applies legacy export key aliases from the manifest", () => {
    const map = buildCompositionVariantMap({ nightsession: Stub });
    expect(map.nightSession).toBe(Stub);
  });

  it("merges extra export entries for composition-specific overrides", () => {
    const other = (() => null) as ComponentType<unknown>;
    const map = buildCompositionVariantMap({ basic: Stub }, { cnsw: other });
    expect(map.cnsw).toBe(other);
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
