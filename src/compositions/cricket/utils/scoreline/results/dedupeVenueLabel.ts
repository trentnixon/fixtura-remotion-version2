const isPrefixSegment = (prefix: string, candidate: string): boolean => {
  const prefixKey = prefix.toLowerCase();
  const candidateKey = candidate.toLowerCase();

  if (candidateKey.length <= prefixKey.length) {
    return false;
  }

  if (!candidateKey.startsWith(prefixKey)) {
    return false;
  }

  const nextChar = candidateKey[prefixKey.length];
  return nextChar === " " || nextChar === "/";
};

/** Drop segments superseded by a later, more specific venue (e.g. parent oval + numbered ground). */
const collapsePrefixVenueSegments = (parts: string[]): string[] =>
  parts.filter(
    (part, index) =>
      !parts.some(
        (other, otherIndex) =>
          index !== otherIndex && isPrefixSegment(part, other),
      ),
  );

/** Mirrors design/_shared/scoreline-layout.js dedupeVenueLabel. */
export const dedupeVenueLabel = (value: string): string => {
  const parts = value
    .split("/")
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length <= 1) {
    return value.trim();
  }

  const seen = new Set<string>();
  const unique: string[] = [];

  for (const part of parts) {
    const key = part.toLowerCase();
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    unique.push(part);
  }

  const collapsed = collapsePrefixVenueSegments(unique);
  return collapsed.join(" / ");
};
