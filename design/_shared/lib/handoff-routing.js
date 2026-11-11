import fs from "node:fs";
import path from "node:path";

/**
 * @param {string} cricketIndexSource
 * @param {string} exportName
 */
export function extractCompositionExportBlock(cricketIndexSource, exportName) {
  const mapRe = new RegExp(
    `export const ${exportName} = buildCompositionVariantMap\\(\\s*\\{([\\s\\S]*?)\\}\\s*(?:,\\s*\\{[\\s\\S]*?\\})?\\s*\\)`,
    "m",
  );
  const legacyRe = new RegExp(
    `export const ${exportName} = \\{([\\s\\S]*?)\\n\\};`,
    "m",
  );
  return (
    cricketIndexSource.match(mapRe)?.[1] ??
    cricketIndexSource.match(legacyRe)?.[1] ??
    ""
  );
}

/**
 * @param {string} repoRoot
 */
export function loadTemplateRegistryIds(repoRoot) {
  const manifestPath = path.join(
    repoRoot,
    "src/templates/templateRegistrationManifest.ts",
  );
  const text = fs.readFileSync(manifestPath, "utf8");
  /** @type {Set<string>} */
  const ids = new Set();
  for (const match of text.matchAll(/registryId:\s*"([^"]+)"/g)) {
    ids.add(match[1]);
  }
  return ids;
}

/**
 * Routing keys for a Registry ID (canonical + legacy), from template registration manifest.
 *
 * @param {string} repoRoot
 * @param {string} registryId
 */
export function compositionRoutingKeyCandidates(repoRoot, registryId) {
  const manifestPath = path.join(
    repoRoot,
    "src/templates/templateRegistrationManifest.ts",
  );
  const text = fs.readFileSync(manifestPath, "utf8");
  const entryRe = new RegExp(
    `registryId:\\s*"${registryId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[\\s\\S]*?compositionExportKey:\\s*"([^"]+)"(?:[\\s\\S]*?legacyCompositionExportKeys:\\s*\\[([^\\]]*)\\])?`,
    "m",
  );
  const match = text.match(entryRe);
  if (!match) {
    return [];
  }
  /** @type {string[]} */
  const keys = [match[1]];
  const legacyBlock = match[2];
  if (legacyBlock) {
    for (const legacy of legacyBlock.matchAll(/"([^"]+)"/g)) {
      keys.push(legacy[1]);
    }
  }
  return keys;
}

/**
 * @param {string} cricketIndexSource
 * @param {string} exportName
 * @param {string} registryId
 * @param {string} repoRoot
 */
export function compositionExportHasRegistryRouting(
  cricketIndexSource,
  exportName,
  registryId,
  repoRoot,
) {
  const candidates = compositionRoutingKeyCandidates(repoRoot, registryId);
  const block = extractCompositionExportBlock(cricketIndexSource, exportName);
  return candidates.some((key) => new RegExp(`\\b${key}\\s*:`).test(block));
}
