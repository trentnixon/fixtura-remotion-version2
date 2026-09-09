import { listVariantSlugs, validateRoutesManifest } from "./lib/manifest.js";

const ROUTES_URL = "/design/_shared/routes.json";

/** @param {string | undefined} activeVariantSlug */
export async function renderVariantNav(activeVariantSlug) {
  const container = document.querySelector("[data-design-variant-nav]");
  if (!container) return;

  const response = await fetch(ROUTES_URL);
  if (!response.ok) {
    container.innerHTML =
      '<li><span class="design-error">Nav unavailable</span></li>';
    return;
  }

  const manifest = validateRoutesManifest(await response.json());
  const slugs = listVariantSlugs(manifest);

  container.innerHTML = slugs
    .map((slug) => {
      const variant = manifest.variants[slug];
      const firstSport = Object.keys(variant.sports)[0];
      const firstAsset = Object.keys(variant.sports[firstSport].assets)[0];
      const href = `/design/variants/${slug}/${firstSport}/${firstAsset}.html`;
      const current =
        slug === activeVariantSlug ? ' aria-current="page"' : "";
      return `<li><a href="${href}"${current}>${variant.label}</a></li>`;
    })
    .join("");
}
