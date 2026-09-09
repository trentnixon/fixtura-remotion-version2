/**
 * @param {unknown} manifest
 */
export function validateRoutesManifest(manifest) {
  if (!manifest || typeof manifest !== "object") {
    throw new Error("Routes manifest must be an object");
  }

  if (!manifest.variants || typeof manifest.variants !== "object") {
    throw new Error("Routes manifest requires a variants object");
  }

  for (const [variantSlug, variant] of Object.entries(manifest.variants)) {
    if (!variant.label || !variant.registryId || !variant.sports) {
      throw new Error(`Variant "${variantSlug}" is missing required fields`);
    }

    for (const [sportSlug, sport] of Object.entries(variant.sports)) {
      if (!sport.assets || typeof sport.assets !== "object") {
        throw new Error(
          `Sport "${sportSlug}" under "${variantSlug}" requires assets`,
        );
      }

      for (const [assetSlug, asset] of Object.entries(sport.assets)) {
        if (!asset.label || !asset.fixture || !asset.remotion?.composition) {
          throw new Error(
            `Asset "${assetSlug}" under "${variantSlug}/${sportSlug}" is incomplete`,
          );
        }
      }
    }
  }

  return manifest;
}

/**
 * @param {import('./manifest.js').RoutesManifest} manifest
 */
export function resolveAssetEntry(manifest, variantSlug, sportSlug, assetSlug) {
  const variant = manifest.variants[variantSlug];
  if (!variant) {
    throw new Error(`Unknown variant "${variantSlug}"`);
  }

  const sport = variant.sports[sportSlug];
  if (!sport) {
    throw new Error(`Unknown sport "${sportSlug}" for variant "${variantSlug}"`);
  }

  const asset = sport.assets[assetSlug];
  if (!asset) {
    throw new Error(
      `Unknown asset "${assetSlug}" for variant "${variantSlug}" / sport "${sportSlug}"`,
    );
  }

  return {
    label: asset.label,
    fixture: asset.fixture,
    registryId: variant.registryId,
    remotion: asset.remotion,
  };
}

/** @param {import('./manifest.js').RoutesManifest} manifest */
export function listVariantSlugs(manifest) {
  return Object.keys(manifest.variants);
}

/** @param {import('./manifest.js').RoutesManifest} manifest */
export function listAssetSlugs(manifest, variantSlug, sportSlug) {
  const sport = manifest.variants[variantSlug]?.sports[sportSlug];
  return sport ? Object.keys(sport.assets) : [];
}
