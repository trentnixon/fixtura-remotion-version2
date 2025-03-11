/**
 * Utility function to conditionally join class names together
 * Similar to the classnames npm package
 *
 * @example
 * classNames('foo', 'bar'); // => 'foo bar'
 * classNames('foo', { bar: true }); // => 'foo bar'
 * classNames({ 'foo-bar': true }); // => 'foo-bar'
 * classNames({ 'foo-bar': false }); // => ''
 * classNames({ foo: true }, { bar: true }); // => 'foo bar'
 * classNames({ foo: true, bar: false }); // => 'foo'
 */
export function classNames(
  ...classes: (string | Record<string, boolean> | undefined | null | false)[]
): string {
  return classes
    .filter(Boolean)
    .map((cls) => {
      if (typeof cls === "string") {
        return cls.trim();
      } else if (cls !== null && typeof cls === "object") {
        return Object.keys(cls as Record<string, boolean>)
          .filter((key) => Boolean((cls as Record<string, boolean>)[key]))
          .map((key) => key.trim())
          .join(" ");
      }
      return "";
    })
    .filter(Boolean)
    .join(" ");
}

/**
 * Extract base Tailwind prefix (bg, text, etc.) from a class name
 * For classes like bg-blue-100, it returns just "bg"
 */
function getPrefix(cls: string): string {
  const match = cls.match(/^([a-z]+(?:-[a-z]+)*?)-/);

  if (match) {
    const fullPrefix = match[1];
    // Get only the first part before any dash
    return fullPrefix.split("-")[0];
  }

  return cls;
}

/**
 * Utility function to merge Tailwind classes with priority
 * Ensures parent-provided classes override default classes
 *
 * @param defaultClasses - Default classes to use as fallbacks
 * @param priorityClasses - Priority classes that should override defaults
 */
export function mergeWithPriority(
  defaultClasses: string,
  priorityClasses: string,
): string {
  if (!priorityClasses) return defaultClasses;
  if (!defaultClasses) return priorityClasses;

  // Split classes into arrays
  const defaults = defaultClasses.split(/\s+/).filter(Boolean);
  const priorities = priorityClasses.split(/\s+/).filter(Boolean);

  // Create a map to track which prefixes have been used
  const prefixMap = new Map();

  // Add all defaults first
  const result = [...defaults];

  // Track which prefixes are used in defaults
  defaults.forEach((cls) => {
    prefixMap.set(getPrefix(cls), true);
  });

  // Add priority classes, replacing defaults with same prefix
  priorities.forEach((cls) => {
    const prefix = getPrefix(cls);

    if (prefixMap.has(prefix)) {
      // Find and remove the default class with the same prefix
      const indexToRemove = result.findIndex((c) => getPrefix(c) === prefix);
      if (indexToRemove !== -1) {
        result.splice(indexToRemove, 1);
      }
    }

    // Add the priority class
    result.push(cls);
  });

  return result.join(" ");
}
