import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { TEMPLATE_PREVIEW_LOADERS } from "./templatePreviewLoaders";
import {
  TEMPLATE_IDS,
  TEMPLATE_REGISTRATION_MANIFEST,
  listPreviewPublishChunkDistStems,
} from "./templateRegistrationManifest";
import {
  COMPOSITION_REGISTRY_MANIFEST,
  REGISTRY_ID_TO_COMPOSITION_KEY,
} from "../core/utils/compositionRoutingManifest";

function sortedIds(ids: readonly string[]): string[] {
  return [...ids].sort();
}

describe("TEMPLATE_REGISTRATION_MANIFEST", () => {
  it("defines unique Registry IDs", () => {
    const ids = TEMPLATE_REGISTRATION_MANIFEST.map((e) => e.registryId);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toHaveLength(TEMPLATE_IDS.length);
  });

  it("aligns preview loaders and composition keys with the manifest", () => {
    const manifestIds = sortedIds(TEMPLATE_IDS);
    expect(sortedIds(Object.keys(TEMPLATE_PREVIEW_LOADERS))).toEqual(
      manifestIds,
    );
    expect(sortedIds(Object.keys(REGISTRY_ID_TO_COMPOSITION_KEY))).toEqual(
      manifestIds,
    );
  });

  it("derives composition manifest from the same registration list", () => {
    expect(COMPOSITION_REGISTRY_MANIFEST).toHaveLength(
      TEMPLATE_REGISTRATION_MANIFEST.length,
    );
    for (const entry of TEMPLATE_REGISTRATION_MANIFEST) {
      const composition = COMPOSITION_REGISTRY_MANIFEST.find(
        (c) => c.registryId === entry.registryId,
      );
      expect(composition?.canonicalExportKey).toBe(entry.compositionExportKey);
    }
  });

  it("lists preview publish chunk stems that match tsup entry keys", () => {
    const tsupSource = readFileSync(
      join(process.cwd(), "tsup.config.ts"),
      "utf8",
    );
    const stems = listPreviewPublishChunkDistStems();
    expect(stems.sort()).toEqual(["mudgeeraba", "night-session", "scoreline"]);
    for (const stem of stems) {
      expect(tsupSource).toContain(`"templates/${stem}"`);
    }
  });
});
