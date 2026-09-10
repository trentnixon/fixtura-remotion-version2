const FONTS_URL = "/design/_shared/fonts.json";

/** @typedef {{ label: string; family: string; tailwindClass: string; tailwindKey: string; googleFontsHref: string; roles: string[] }} FontFamily */

/**
 * @param {string} variantSlug
 */
export async function loadVariantFonts(variantSlug) {
  const response = await fetch(FONTS_URL);
  if (!response.ok) {
    throw new Error("Could not load design fonts catalog");
  }

  const catalog = await response.json();
  const variant = catalog.variantFonts[variantSlug];

  if (!variant) {
    throw new Error(`No fonts registered for variant "${variantSlug}"`);
  }

  const keys = [...new Set(Object.values(variant))];
  /** @type {Record<string, string[]>} */
  const tailwindFontFamily = {};
  /** @type {string[]} */
  const links = [];

  for (const key of keys) {
    const entry = catalog.families[key];
    if (!entry) {
      throw new Error(`Unknown font key "${key}" in variant "${variantSlug}"`);
    }
    tailwindFontFamily[entry.tailwindKey] = [entry.family, "sans-serif"];
    if (!links.includes(entry.googleFontsHref)) {
      links.push(entry.googleFontsHref);
    }
  }

  return { catalog, tailwindFontFamily, links };
}

/**
 * Injects Google Fonts link tags and returns Tailwind fontFamily extend for the variant.
 * @param {string} variantSlug
 */
export async function applyVariantFonts(variantSlug) {
  const { tailwindFontFamily, links } = await loadVariantFonts(variantSlug);

  for (const href of links) {
    if (document.querySelector(`link[data-design-font="${href}"]`)) {
      continue;
    }
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.dataset.designFont = href;
    document.head.appendChild(link);
  }

  return tailwindFontFamily;
}

/**
 * @param {string} variantSlug
 * @returns {Promise<{ heading: FontFamily; body: FontFamily }>}
 */
export async function getVariantFontRoles(variantSlug) {
  const { catalog } = await loadVariantFonts(variantSlug);
  const roles = catalog.variantFonts[variantSlug];

  return {
    heading: catalog.families[roles.heading],
    body: catalog.families[roles.body],
  };
}
