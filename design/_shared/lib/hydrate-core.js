/**
 * @typedef {{ path: string, optional?: boolean }} BindSpec
 * @typedef {string | BindSpec} BindEntry
 * @typedef {Record<string, BindEntry>} BindMapInput
 * @typedef {Record<string, string>} BindMapValues
 */

/**
 * @param {BindEntry} entry
 * @returns {BindSpec}
 */
export function normalizeBindEntry(entry) {
  if (typeof entry === "string") {
    return { path: entry, optional: false };
  }
  if (!entry || typeof entry !== "object" || typeof entry.path !== "string") {
    throw new Error("Invalid bind entry");
  }
  return { path: entry.path, optional: entry.optional === true };
}

/**
 * @param {unknown} data
 * @param {string} path
 * @param {{ optional?: boolean }} [options]
 */
export function getValueByPath(data, path, options = {}) {
  const optional = options.optional === true;
  const segments = path.split(".");
  let current = data;

  for (const segment of segments) {
    if (current === null || current === undefined) {
      if (optional) {
        return null;
      }
      throw new Error(
        `Missing value at path "${path}" (stopped at "${segment}")`,
      );
    }

    if (typeof current !== "object") {
      if (optional) {
        return null;
      }
      throw new Error(
        `Missing value at path "${path}" (stopped at "${segment}")`,
      );
    }

    current = current[segment];
  }

  if (
    current === null ||
    current === undefined ||
    (typeof current === "string" && current.length === 0)
  ) {
    if (optional) {
      return null;
    }
    throw new Error(`Missing value at path "${path}"`);
  }

  if (
    typeof current === "string" ||
    typeof current === "number" ||
    typeof current === "boolean"
  ) {
    return current;
  }

  if (optional) {
    return null;
  }

  throw new Error(`Unsupported value type at path "${path}"`);
}

/**
 * @param {unknown} data
 * @param {BindMapInput} bindMap
 * @returns {{ values: BindMapValues, skipped: string[] }}
 */
export function applyBindMap(data, bindMap) {
  /** @type {BindMapValues} */
  const values = {};
  /** @type {string[]} */
  const skipped = [];

  for (const [selector, entry] of Object.entries(bindMap)) {
    const spec = normalizeBindEntry(entry);
    const resolved = getValueByPath(data, spec.path, {
      optional: spec.optional,
    });

    if (resolved === null) {
      skipped.push(selector);
      continue;
    }

    values[selector] = String(resolved);
  }

  return { values, skipped };
}
