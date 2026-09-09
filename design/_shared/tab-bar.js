import {
  listAssetSlugs,
  validateRoutesManifest,
} from "./lib/manifest.js";

const ROUTES_URL = "/design/_shared/routes.json";

/**
 * @param {{ variantSlug: string; sportSlug: string; assetSlug: string }} context
 */
export async function renderTabBar(context) {
  const container = document.querySelector("[data-design-tabs]");
  if (!container) return;

  const response = await fetch(ROUTES_URL);
  if (!response.ok) {
    container.innerHTML =
      '<span class="design-error">Could not load routes manifest.</span>';
    return;
  }

  const manifest = validateRoutesManifest(await response.json());
  const assets = listAssetSlugs(
    manifest,
    context.variantSlug,
    context.sportSlug,
  );
  const variant = manifest.variants[context.variantSlug];

  container.innerHTML = assets
    .map((assetSlug) => {
      const asset = variant.sports[context.sportSlug].assets[assetSlug];
      const href = `/design/variants/${context.variantSlug}/${context.sportSlug}/${assetSlug}.html`;
      const current =
        assetSlug === context.assetSlug ? ' aria-current="page"' : "";
      return `<a href="${href}"${current}>${asset.label}</a>`;
    })
    .join("");
}
