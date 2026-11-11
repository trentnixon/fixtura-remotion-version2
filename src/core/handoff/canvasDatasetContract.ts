import { resolveOverlayCanvasDataset } from "../../compositions/cricket/utils/overlayFamily/canvasDataset";

const CANVAS_ROOT_CLASS_PATTERN =
  /(?:template-canvas|design-social-canvas|scoreline-canvas|night-session-canvas)/;

/**
 * Parse `data-*` attribute names on the design canvas root (first matching social canvas).
 */
export const parseDesignCanvasDataAttrNames = (html: string): Set<string> => {
  const tagMatch = html.match(
    new RegExp(
      `<div[^>]*class="[^"]*${CANVAS_ROOT_CLASS_PATTERN.source}[^"]*"[^>]*>`,
      "i",
    ),
  );
  if (!tagMatch) {
    return new Set();
  }
  const tag = tagMatch[0];
  const names = new Set<string>();
  for (const match of tag.matchAll(/\s(data-[a-z0-9-]+)/gi)) {
    const name = match[1];
    if (
      name &&
      name !== "data-hydrate" &&
      name !== "data-hydrate-attr" &&
      name !== "data-hydrate-error"
    ) {
      names.add(name);
    }
  }
  return names;
};

export const expectedCanvasDatasetAttrNames = (
  compositionId: string,
): string[] => Object.keys(resolveOverlayCanvasDataset(compositionId));

/**
 * When Remotion sets a dataset value (e.g. leaderboard batting vs bowling), design HTML must match.
 */
export const readCanvasDataAttrValue = (
  html: string,
  attrName: string,
): string | undefined => {
  const tagMatch = html.match(
    new RegExp(
      `<div[^>]*class="[^"]*${CANVAS_ROOT_CLASS_PATTERN.source}[^"]*"[^>]*>`,
      "i",
    ),
  );
  if (!tagMatch) {
    return undefined;
  }
  const tag = tagMatch[0];
  const quoted = tag.match(
    new RegExp(`${attrName}\\s*=\\s*"([^"]*)"`, "i"),
  )?.[1];
  if (quoted !== undefined) {
    return quoted;
  }
  if (new RegExp(`\\s${attrName}(?:\\s|/|>)`, "i").test(tag)) {
    return "";
  }
  return undefined;
};

export const verifyCanvasDatasetContract = (
  html: string,
  compositionId: string,
): string[] => {
  const expected = resolveOverlayCanvasDataset(compositionId);
  const errors: string[] = [];
  const present = parseDesignCanvasDataAttrNames(html);

  for (const attrName of Object.keys(expected)) {
    if (!present.has(attrName)) {
      errors.push(
        `Dataset contract: canvas root missing ${attrName} (composition ${compositionId})`,
      );
      continue;
    }
    const expectedValue = expected[attrName as keyof typeof expected];
    if (expectedValue !== undefined && expectedValue !== "") {
      const actual = readCanvasDataAttrValue(html, attrName);
      if (actual !== expectedValue) {
        errors.push(
          `Dataset contract: ${attrName} should be "${expectedValue}" but HTML has "${actual ?? "(boolean)"}"`,
        );
      }
    }
  }

  return errors;
};
