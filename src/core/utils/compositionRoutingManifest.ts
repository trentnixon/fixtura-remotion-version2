import type { ComponentType } from "react";
import { isTemplateId, TEMPLATE_IDS, type TemplateId } from "../../templates/templateIds";

/**
 * Authoritative Registry ID → cricket composition submodule wiring.
 * Single module behind runtime routing, design routes parity tests, and export maps.
 */
export type CompositionRegistryManifestEntry = {
  registryId: TemplateId;
  /** Primary key on `CricketResults`, `CricketLadder`, etc. export objects */
  canonicalExportKey: string;
  /** Legacy keys still present on some composition submodules */
  legacyExportKeys?: readonly string[];
};

export const COMPOSITION_REGISTRY_MANIFEST: CompositionRegistryManifestEntry[] =
  [
    { registryId: "Basic", canonicalExportKey: "basic" },
    {
      registryId: "Brickwork",
      canonicalExportKey: "brickwork",
      legacyExportKeys: ["brickWork"],
    },
    { registryId: "Classic", canonicalExportKey: "classic" },
    { registryId: "CNSW", canonicalExportKey: "cnsw" },
    {
      registryId: "CNSWPrivate",
      canonicalExportKey: "cnswprivate",
      legacyExportKeys: ["cnswPrivate"],
    },
    { registryId: "Sixers", canonicalExportKey: "sixers" },
    { registryId: "Thunder", canonicalExportKey: "thunder" },
    {
      registryId: "TwoColumnClassic",
      canonicalExportKey: "twocolumnclassic",
      legacyExportKeys: ["classicTwoColumn", "classicTwoColumns"],
    },
    { registryId: "Mudgeeraba", canonicalExportKey: "mudgeeraba" },
    {
      registryId: "BroadcastPro",
      canonicalExportKey: "broadcastpro",
      legacyExportKeys: ["broadcastPro"],
    },
    {
      registryId: "BroadcastProRounded",
      canonicalExportKey: "broadcastprorounded",
      legacyExportKeys: ["broadcastProRounded"],
    },
    { registryId: "Scoreline", canonicalExportKey: "scoreline" },
    {
      registryId: "NightSession",
      canonicalExportKey: "nightsession",
      legacyExportKeys: ["nightSession"],
    },
  ];

function assertManifestCoversTemplateIds(): void {
  const ids = new Set(COMPOSITION_REGISTRY_MANIFEST.map((e) => e.registryId));
  for (const id of TEMPLATE_IDS) {
    if (!ids.has(id)) {
      throw new Error(`COMPOSITION_REGISTRY_MANIFEST missing TemplateId: ${id}`);
    }
  }
}
assertManifestCoversTemplateIds();

export const REGISTRY_ID_TO_COMPOSITION_KEY: Record<TemplateId, string> =
  Object.fromEntries(
    COMPOSITION_REGISTRY_MANIFEST.map((entry) => [
      entry.registryId,
      entry.canonicalExportKey,
    ]),
  ) as Record<TemplateId, string>;

const COMPOSITION_KEY_ALIASES: Record<string, readonly string[]> =
  Object.fromEntries(
    COMPOSITION_REGISTRY_MANIFEST.filter(
      (e) => e.legacyExportKeys && e.legacyExportKeys.length > 0,
    ).map((e) => [e.canonicalExportKey, e.legacyExportKeys ?? []]),
  );

/**
 * Maps design-site `remotion.composition` paths to runtime composition metadata IDs.
 * Keep aligned with `design/_shared/routes.json` asset entries.
 */
export const REMOTION_COMPOSITION_PATH_TO_ID: Record<string, string> = {
  "cricket/ladder": "CricketLadder",
  "cricket/results": "CricketResults",
  "cricket/results-lite": "CricketResultsLite",
  "cricket/upcoming": "CricketUpcoming",
  "cricket/result-single": "CricketResultSingle",
  "cricket/resultSingle": "CricketResultSingle",
  "cricket/top5": "CricketTop5Batting",
  "cricket/performances": "CricketBattingPerformances",
  "cricket/team-roster": "CricketRoster",
  "cricket/teamRoster": "CricketRoster",
  "cricket/team-of-the-week": "CricketTeamOfTheWeek",
  "cricket/teamOfTheWeek": "CricketTeamOfTheWeek",
};

export function registryIdToCanonicalCompositionExportKey(
  registryId: string,
): string | undefined {
  if (!isTemplateId(registryId)) {
    return undefined;
  }
  return REGISTRY_ID_TO_COMPOSITION_KEY[registryId];
}

/**
 * @param remotionComposition e.g. `cricket/results`
 */
export function metadataCompositionIdFromRemotionPath(
  remotionComposition: string,
  assetSlug?: string,
): string {
  if (assetSlug === "top5-bowling") {
    return "CricketTop5Bowling";
  }
  if (assetSlug === "performances-bowling") {
    return "CricketBowlingPerformances";
  }
  if (assetSlug === "performances-batting") {
    return "CricketBattingPerformances";
  }
  if (assetSlug === "top5-batting") {
    return "CricketTop5Batting";
  }

  const mapped = REMOTION_COMPOSITION_PATH_TO_ID[remotionComposition];
  if (!mapped) {
    throw new Error(`Unknown remotion composition path: ${remotionComposition}`);
  }
  return mapped;
}

/**
 * Ordered export-key candidates for a Registry ID (PascalCase from production DATA).
 */
export function compositionExportKeyCandidates(registryId: string): string[] {
  const keys: string[] = [];

  if (isTemplateId(registryId)) {
    keys.push(REGISTRY_ID_TO_COMPOSITION_KEY[registryId]);
  }

  const lower = registryId.toLowerCase();
  const collapsed = lower.replace(/-/g, "");
  const camel =
    registryId.length > 0
      ? `${registryId.charAt(0).toLowerCase()}${registryId.slice(1)}`
      : lower;

  keys.push(camel, lower, collapsed, registryId);

  const canonical = isTemplateId(registryId)
    ? REGISTRY_ID_TO_COMPOSITION_KEY[registryId]
    : undefined;
  if (canonical && COMPOSITION_KEY_ALIASES[canonical]) {
    keys.push(...COMPOSITION_KEY_ALIASES[canonical]);
  }

  return [...new Set(keys.filter(Boolean))];
}

type CompositionModule = Record<string, ComponentType<unknown>>;

export function resolveCompositionTemplateComponent(
  compositionModule: CompositionModule | ComponentType<unknown>,
  registryId: string,
): ComponentType<unknown> | undefined {
  if (typeof compositionModule === "function") {
    return undefined;
  }

  for (const key of compositionExportKeyCandidates(registryId)) {
    const candidate = compositionModule[key];
    if (candidate) {
      return candidate;
    }
  }

  return undefined;
}
