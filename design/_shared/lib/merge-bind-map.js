/**
 * @typedef {import('./hydrate-core.js').BindMapInput} BindMapInput
 */

/**
 * Variant overlay wins over canonical template keys.
 *
 * @param {BindMapInput} base
 * @param {BindMapInput | null | undefined} overlay
 * @returns {BindMapInput}
 */
export function mergeBindMaps(base, overlay) {
  if (!overlay || typeof overlay !== "object") {
    return { ...base };
  }

  if (overlay.__bindMode === "replace") {
    const { __bindMode, ...map } = overlay;
    return map;
  }

  return { ...base, ...overlay };
}

/**
 * Keys that differ from the canonical bind map (for scaffold materialization).
 *
 * @param {BindMapInput} base
 * @param {BindMapInput} resolved
 */
export function computeBindOverlay(base, resolved) {
  /** @type {BindMapInput} */
  const overlay = {};

  for (const [selector, entry] of Object.entries(resolved)) {
    const baseEntry = base[selector];
    if (JSON.stringify(baseEntry) !== JSON.stringify(entry)) {
      overlay[selector] = entry;
    }
  }

  return overlay;
}

/**
 * Relative URLs for design-site fetch (from site root).
 *
 * @param {{ variantSlug: string; sportSlug: string; assetSlug: string }} context
 */
export function resolveBindMapUrls(context) {
  const { variantSlug, sportSlug, assetSlug } = context;
  return {
    canonical: `/design/_templates/cricket/${assetSlug}.bind.json`,
    overlay: `/design/_shared/hydration/overlays/${variantSlug}/${sportSlug}/${assetSlug}.bind.json`,
    legacy: `/design/_shared/hydration/${variantSlug}/${sportSlug}/${assetSlug}.bind.json`,
  };
}
