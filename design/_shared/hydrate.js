import { applyBindMap } from "./lib/hydrate-core.js";
import { parseBindMapJson } from "./lib/bind-json.js";
import { resolveAssetEntry, validateRoutesManifest } from "./lib/manifest.js";

const ROUTES_URL = "/design/_shared/routes.json";

/**
 * @param {{ variantSlug: string; sportSlug: string; assetSlug: string }} context
 * @returns {Promise<boolean>}
 */
export async function hydratePage(context) {
  const banner = document.querySelector("[data-hydrate-error]");
  const handoff = document.querySelector("[data-design-handoff]");
  const assetLabel = `${context.variantSlug}/${context.sportSlug}/${context.assetSlug}`;

  const showError = (message) => {
    const full = `${assetLabel}: ${message}`;
    if (banner) {
      banner.textContent = `Hydration error: ${full}`;
      banner.hidden = false;
    } else {
      console.error(full);
    }
  };

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

    const bindUrl = `/design/_shared/hydration/${context.variantSlug}/${context.sportSlug}/${context.assetSlug}.bind.json`;
    const bindResponse = await fetch(bindUrl);
    if (!bindResponse.ok) {
      throw new Error(`Could not load hydration bind map at ${bindUrl}`);
    }

    const bindMap = parseBindMapJson(await bindResponse.text());
    const fixtureResponse = await fetch(`/${entry.fixture}`);
    if (!fixtureResponse.ok) {
      throw new Error(`Could not load fixture at ${entry.fixture}`);
    }

    const fixture = await fixtureResponse.json();
    const { values } = applyBindMap(fixture, bindMap);

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

    if (banner) {
      banner.hidden = true;
      banner.textContent = "";
    }

    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Hydration failed";
    showError(message);
    return false;
  }
}
