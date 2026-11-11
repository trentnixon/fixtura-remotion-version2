const isPrefixSegment = (prefix, candidate) => {
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

const collapsePrefixVenueSegments = (parts) =>
  parts.filter(
    (part, index) =>
      !parts.some(
        (other, otherIndex) =>
          index !== otherIndex && isPrefixSegment(part, other),
      ),
  );

/**
 * Collapse duplicate venue fragments in slash-separated ground labels.
 *
 * @param {string} value
 */
export function dedupeVenueLabel(value) {
  const parts = String(value)
    .split("/")
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length <= 1) {
    return String(value).trim();
  }

  const seen = new Set();
  const unique = [];

  for (const part of parts) {
    const key = part.toLowerCase();
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    unique.push(part);
  }

  return collapsePrefixVenueSegments(unique).join(" / ");
}
