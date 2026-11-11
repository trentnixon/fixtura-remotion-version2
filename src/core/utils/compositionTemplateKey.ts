import type { ComponentType } from "react";
import { isTemplateId, type TemplateId } from "../../templates/templateIds";

/**
 * Canonical Registry ID → export key on cricket composition maps (CricketResults, …).
 */
export const REGISTRY_ID_TO_COMPOSITION_KEY: Record<TemplateId, string> = {
  Basic: "basic",
  Brickwork: "brickwork",
  Classic: "classic",
  CNSW: "cnsw",
  CNSWPrivate: "cnswprivate",
  Sixers: "sixers",
  Thunder: "thunder",
  TwoColumnClassic: "twocolumnclassic",
  Mudgeeraba: "mudgeeraba",
  BroadcastPro: "broadcastpro",
  BroadcastProRounded: "broadcastprorounded",
  Scoreline: "scoreline",
  NightSession: "nightsession",
};

/** Legacy alias keys still present on some composition submodules. */
const COMPOSITION_KEY_ALIASES: Record<string, readonly string[]> = {
  nightsession: ["nightSession", "nightsession"],
  brickwork: ["brickwork", "brickWork"],
  twocolumnclassic: ["twocolumnclassic", "classicTwoColumn", "classicTwoColumns"],
  cnswprivate: ["cnswprivate", "cnswPrivate"],
  broadcastpro: ["broadcastpro", "broadcastPro"],
  broadcastprorounded: ["broadcastprorounded", "broadcastProRounded"],
};

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
