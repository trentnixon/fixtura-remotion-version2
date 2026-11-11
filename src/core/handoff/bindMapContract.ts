/** Scalar bind selectors use `[data-hydrate="key"]` (see design hydrate bind maps). */
export type BindMapInput = Record<string, unknown>;

const HYDRATE_KEY_FROM_SELECTOR =
  /\[data-hydrate=(?:"([^"]+)"|'([^']+)')\]/;

/**
 * Hydration keys referenced by a merged bind map (ignores meta keys like `__bindMode`).
 */
export const extractHydrateKeysFromBindMap = (
  bindMap: BindMapInput,
): string[] => {
  const keys: string[] = [];
  for (const selector of Object.keys(bindMap)) {
    if (selector.startsWith("__")) {
      continue;
    }
    const match = selector.match(HYDRATE_KEY_FROM_SELECTOR);
    const key = match?.[1] ?? match?.[2];
    if (key) {
      keys.push(key);
    }
  }
  return keys;
};

/** Returns hydrate keys that do not appear as `data-hydrate="key"` in the asset HTML. */
export const findMissingHydrateKeysInHtml = (
  html: string,
  hydrateKeys: readonly string[],
): string[] =>
  hydrateKeys.filter(
    (key) => !html.includes(`data-hydrate="${key}"`),
  );

export const verifyBindMapHtmlContract = (
  html: string,
  bindMap: BindMapInput,
): string[] => {
  const missing = findMissingHydrateKeysInHtml(
    html,
    extractHydrateKeysFromBindMap(bindMap),
  );
  return missing.map(
    (key) => `Bind contract: missing data-hydrate="${key}" in HTML`,
  );
};
