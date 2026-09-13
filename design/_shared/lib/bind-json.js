/**
 * Parse flat JSON object bind maps and reject duplicate keys
 * (standard JSON.parse keeps the last duplicate silently).
 */

const TOP_LEVEL_KEY = /"((?:\\.|[^"\\])*)"\s*:/g;

/**
 * @param {string} text
 */
export function assertNoDuplicateJsonKeys(text) {
  const seen = new Set();
  let match;

  while ((match = TOP_LEVEL_KEY.exec(text)) !== null) {
    const key = match[1].replace(/\\"/g, '"');
    if (seen.has(key)) {
      throw new Error(`Duplicate bind-map key: ${key}`);
    }
    seen.add(key);
  }
}

/**
 * @param {string} text
 */
export function parseBindMapJson(text) {
  assertNoDuplicateJsonKeys(text);
  const parsed = JSON.parse(text);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("Bind map must be a JSON object");
  }
  return parsed;
}
