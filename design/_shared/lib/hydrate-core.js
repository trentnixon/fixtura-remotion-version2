/** @typedef {Record<string, string>} BindMap */

/**
 * @param {unknown} data
 * @param {string} path
 */
export function getValueByPath(data, path) {
  const segments = path.split(".");
  let current = data;

  for (const segment of segments) {
    if (current === null || current === undefined) {
      throw new Error(
        `Missing value at path "${path}" (stopped at "${segment}")`,
      );
    }

    if (typeof current !== "object") {
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
    throw new Error(`Missing value at path "${path}"`);
  }

  if (
    typeof current === "string" ||
    typeof current === "number" ||
    typeof current === "boolean"
  ) {
    return current;
  }

  throw new Error(`Unsupported value type at path "${path}"`);
}

/**
 * @param {unknown} data
 * @param {BindMap} bindMap
 * @returns {BindMap}
 */
export function applyBindMap(data, bindMap) {
  /** @type {BindMap} */
  const values = {};

  for (const [selector, path] of Object.entries(bindMap)) {
    values[selector] = String(getValueByPath(data, path));
  }

  return values;
}
