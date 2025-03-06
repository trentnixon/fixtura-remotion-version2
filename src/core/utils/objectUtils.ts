/**
 * Utility functions for working with objects
 */

/**
 * Deep merges two objects, recursively merging nested objects
 * @param target The target object to merge into
 * @param source The source object to merge from
 * @returns A new object with properties from both target and source
 */
export function deepMerge<T extends object = object, S extends object = T>(
  target: T,
  source: S,
): T & S {
  // Create a new object to avoid mutating the originals
  const output = { ...target } as T & S;

  // If source is not an object or is null, return target
  if (!source || typeof source !== "object" || Array.isArray(source)) {
    return output;
  }

  // Iterate through source properties
  Object.keys(source).forEach((key) => {
    const targetValue = (target as any)[key];
    const sourceValue = (source as any)[key];

    // If both values are objects, recursively merge them
    if (
      targetValue &&
      typeof targetValue === "object" &&
      sourceValue &&
      typeof sourceValue === "object" &&
      !Array.isArray(targetValue) &&
      !Array.isArray(sourceValue)
    ) {
      (output as any)[key] = deepMerge(targetValue, sourceValue);
    }
    // If source value is an array, use it directly (don't merge arrays)
    else if (Array.isArray(sourceValue)) {
      (output as any)[key] = [...sourceValue];
    }
    // Otherwise, use the source value
    else if (sourceValue !== undefined) {
      (output as any)[key] = sourceValue;
    }
  });

  return output;
}

/**
 * Flattens a nested object structure into a single-level object with dot notation keys
 * @param obj The object to flatten
 * @param prefix The prefix to use for keys
 * @returns A flattened object
 */
export function flattenObject(
  obj: Record<string, any>,
  prefix = "",
): Record<string, any> {
  return Object.keys(obj).reduce(
    (acc, k) => {
      const pre = prefix.length ? `${prefix}.` : "";
      if (
        typeof obj[k] === "object" &&
        obj[k] !== null &&
        !Array.isArray(obj[k])
      ) {
        Object.assign(acc, flattenObject(obj[k], pre + k));
      } else {
        acc[pre + k] = obj[k];
      }
      return acc;
    },
    {} as Record<string, any>,
  );
}

/**
 * Gets a value from an object using a path string (e.g., 'a.b.c')
 * @param obj The object to get the value from
 * @param path The path to the value
 * @param defaultValue The default value to return if the path doesn't exist
 * @returns The value at the path or the default value
 */
export function getValueByPath<T = any>(
  obj: Record<string, any>,
  path: string,
  defaultValue?: T,
): T {
  const keys = path.split(".");
  let result = obj;

  for (const key of keys) {
    if (result === undefined || result === null) {
      return defaultValue as T;
    }
    result = result[key];
  }

  return (result === undefined ? defaultValue : result) as T;
}
