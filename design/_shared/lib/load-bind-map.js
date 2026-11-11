import fs from "node:fs";
import path from "node:path";
import { parseBindMapJson } from "./bind-json.js";
import { mergeBindMaps, resolveBindMapUrls } from "./merge-bind-map.js";

/**
 * @param {string} repoRoot
 * @param {string} urlPath
 */
function readBindFile(repoRoot, urlPath) {
  const rel = urlPath.replace(/^\//, "");
  const filePath = path.join(repoRoot, ...rel.split("/"));
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return parseBindMapJson(fs.readFileSync(filePath, "utf8"));
}

/**
 * @param {{ variantSlug: string; sportSlug: string; assetSlug: string }} context
 * @param {string} repoRoot
 */
export function loadMergedBindMapFromFs(context, repoRoot) {
  const urls = resolveBindMapUrls(context);
  const canonical = readBindFile(repoRoot, urls.canonical);

  if (!canonical) {
    const legacy = readBindFile(repoRoot, urls.legacy);
    if (!legacy) {
      throw new Error(`No bind map sources for ${context.assetSlug}`);
    }
    return legacy;
  }

  const overlay = readBindFile(repoRoot, urls.overlay);
  if (overlay) {
    return mergeBindMaps(canonical, overlay);
  }

  const legacy = readBindFile(repoRoot, urls.legacy);
  if (legacy) {
    return legacy;
  }

  return canonical;
}

/**
 * @param {{ variantSlug: string; sportSlug: string; assetSlug: string }} context
 * @param {(url: string) => Promise<Response>} fetchFn
 */
export async function loadMergedBindMap(context, fetchFn = fetch) {
  const urls = resolveBindMapUrls(context);

  const canonicalResponse = await fetchFn(urls.canonical);
  if (!canonicalResponse.ok) {
    throw new Error(`Could not load canonical bind map at ${urls.canonical}`);
  }

  const base = parseBindMapJson(await canonicalResponse.text());

  const overlayResponse = await fetchFn(urls.overlay);
  if (overlayResponse.ok) {
    const overlay = parseBindMapJson(await overlayResponse.text());
    return mergeBindMaps(base, overlay);
  }

  const legacyResponse = await fetchFn(urls.legacy);
  if (legacyResponse.ok) {
    return parseBindMapJson(await legacyResponse.text());
  }

  return base;
}
