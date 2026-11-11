import type { ComponentType } from "react";
import { COMPOSITION_REGISTRY_MANIFEST } from "./compositionRoutingManifest";

export type CompositionVariantComponents = Partial<
  Record<string, ComponentType<unknown>>
>;

/**
 * Builds a sport composition submodule export object from canonical keys in
 * {@link COMPOSITION_REGISTRY_MANIFEST}, plus optional per-asset overrides.
 */
export function buildCompositionVariantMap(
  byCanonicalKey: CompositionVariantComponents,
  extra?: CompositionVariantComponents,
): Record<string, ComponentType<unknown>> {
  const out: Record<string, ComponentType<unknown>> = {};

  for (const entry of COMPOSITION_REGISTRY_MANIFEST) {
    const component = byCanonicalKey[entry.canonicalExportKey];
    if (!component) continue;

    out[entry.canonicalExportKey] = component;
    for (const legacyKey of entry.legacyExportKeys ?? []) {
      out[legacyKey] = component;
    }
  }

  if (extra) {
    Object.assign(out, extra);
  }

  return out;
}
