import { compositionExportKeyCandidates } from "../utils/compositionRoutingManifest";
import {
  isTemplateId,
  type TemplateId,
} from "../../templates/templateRegistrationManifest";

export type CompositionExportBlock = string;

const exportBlockPattern = (exportName: string) =>
  new RegExp(
    `export const ${exportName} = buildCompositionVariantMap\\(\\s*\\{([\\s\\S]*?)\\}\\s*(?:,\\s*\\{[\\s\\S]*?\\})?\\s*\\)`,
    "m",
  );

const legacyExportBlockPattern = (exportName: string) =>
  new RegExp(`export const ${exportName} = \\{([\\s\\S]*?)\\n\\};`, "m");

export const extractCompositionExportBlock = (
  cricketIndexSource: string,
  exportName: string,
): CompositionExportBlock => {
  return (
    cricketIndexSource.match(exportBlockPattern(exportName))?.[1] ??
    cricketIndexSource.match(legacyExportBlockPattern(exportName))?.[1] ??
    ""
  );
};

/** True when the cricket index export map lists a routing key for this Registry ID. */
export const compositionExportHasRegistryRouting = (
  cricketIndexSource: string,
  exportName: string,
  registryId: string,
): boolean => {
  if (!isTemplateId(registryId)) {
    return false;
  }
  const candidates = compositionExportKeyCandidates(registryId as TemplateId);
  const block = extractCompositionExportBlock(cricketIndexSource, exportName);
  return candidates.some((key) => new RegExp(`\\b${key}\\s*:`).test(block));
};

export const verifyRegistryInTemplateManifest = (
  registryIdsInSource: Set<string>,
  registryId: string,
): string | null => {
  if (!registryIdsInSource.has(registryId)) {
    return `Handoff: Registry ID ${registryId} not in template registration manifest`;
  }
  return null;
};
