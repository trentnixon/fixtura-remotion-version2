import { VideoTemplateVariation } from "../types/data/videoData";

const omitNullProperties = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map((item) => omitNullProperties(item));
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  const next: Record<string, unknown> = {};
  for (const [key, child] of Object.entries(value)) {
    if (child === null) continue;
    next[key] = omitNullProperties(child);
  }
  return next;
};

/**
 * Account payloads send `null` for unused background fields.
 * Readers treat a missing field as unset, so null is removed before templates run.
 */
export const normalizeTemplateVariation = (
  variation: VideoTemplateVariation | null | undefined,
): VideoTemplateVariation | undefined => {
  if (!variation) return undefined;
  return omitNullProperties(variation) as VideoTemplateVariation;
};
