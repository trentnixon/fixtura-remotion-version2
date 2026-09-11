import { applyBindMap } from "./lib/hydrate-core.js";
import { resolveAssetEntry, validateRoutesManifest } from "./lib/manifest.js";

const ROUTES_URL = "/design/_shared/routes.json";

/**
 * @param {{ variantSlug: string; sportSlug: string; assetSlug: string }} context
 */
export async function hydratePage(context) {
  const banner = document.querySelector("[data-hydrate-error]");
  const handoff = document.querySelector("[data-design-handoff]");

  try {
    const routesResponse = await fetch(ROUTES_URL);
    if (!routesResponse.ok) {
      throw new Error("Could not load routes manifest");
    }

    const manifest = validateRoutesManifest(await routesResponse.json());
    const entry = resolveAssetEntry(
      manifest,
      context.variantSlug,
      context.sportSlug,
      context.assetSlug,
    );

    const bindResponse = await fetch(
      `/design/_shared/hydration/${context.variantSlug}/${context.sportSlug}/${context.assetSlug}.bind.json`,
    );
    if (!bindResponse.ok) {
      throw new Error("Could not load hydration bind map");
    }

    const bindMap = await bindResponse.json();
    const fixtureResponse = await fetch(`/${entry.fixture}`);
    if (!fixtureResponse.ok) {
      throw new Error(`Could not load fixture at ${entry.fixture}`);
    }

    const fixture = await fixtureResponse.json();
    const values = applyBindMap(fixture, bindMap);

    for (const [selector, value] of Object.entries(values)) {
      const nodes = document.querySelectorAll(selector);
      if (nodes.length === 0) {
        throw new Error(`No element found for selector ${selector}`);
      }
      nodes.forEach((node) => {
        const attribute = node.getAttribute("data-hydrate-attr");
        const format = node.getAttribute("data-hydrate-format");

        if (attribute) {
          node.setAttribute(attribute, value);
          return;
        }

        if (format === "not-out") {
          node.textContent = value === "true" ? "*" : "";
          return;
        }

        node.textContent = value;
      });
    }

    if (handoff) {
      handoff.innerHTML = [
        `Handoff: <code>${context.variantSlug}</code> / <code>${context.sportSlug}</code> / <code>${context.assetSlug}</code>`,
        `· Registry: <code>${entry.registryId}</code>`,
        `· Fixture: <code>${entry.fixture}</code>`,
        `· Remotion: <code>${entry.remotion.composition}</code>`,
      ].join(" ");
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Hydration failed";
    if (banner) {
      banner.textContent = `Hydration error: ${message}`;
      banner.hidden = false;
    } else {
      console.error(message);
    }
  }
}
