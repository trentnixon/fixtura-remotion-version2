/**
 * Parse flat JSON object bind maps and reject duplicate keys
 * (standard JSON.parse keeps the last duplicate silently).
 */

/**
 * @param {string} text
 */
export function assertNoDuplicateJsonKeys(text) {
  /** @type {Set<string>} */
  const seen = new Set();
  let depth = 0;
  let index = 0;

  while (index < text.length) {
    const char = text[index];

    if (char === "{") {
      depth += 1;
      index += 1;
      continue;
    }

    if (char === "}") {
      depth -= 1;
      index += 1;
      continue;
    }

    if (char !== '"') {
      index += 1;
      continue;
    }

    let end = index + 1;
    while (end < text.length) {
      if (text[end] === "\\") {
        end += 2;
        continue;
      }
      if (text[end] === '"') {
        break;
      }
      end += 1;
    }

    const key = text.slice(index + 1, end).replace(/\\"/g, '"');
    index = end + 1;

    while (index < text.length && /\s/.test(text[index])) {
      index += 1;
    }

    if (depth === 1 && text[index] === ":") {
      if (seen.has(key)) {
        throw new Error(`Duplicate bind-map key: ${key}`);
      }
      seen.add(key);
    }
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
