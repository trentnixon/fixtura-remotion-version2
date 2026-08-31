import { staticFile } from "remotion";
import { isKnownLuminanceAsset } from "./knownAssets";

const isUrlLike = (value?: string) =>
  Boolean(value && /^(https?:)?\/\//i.test(value));

/**
 * Resolve luminance master like Texture: account JSON supplies `url` and/or `name`.
 * Priority: url → url-like name/asset → known local library key via staticFile.
 */
export const resolveLuminanceAssetSrc = ({
  asset,
  name,
  url,
}: {
  asset?: string | null;
  name?: string | null;
  url?: string | null;
}): string | undefined => {
  if (url && url.length > 0) {
    return url;
  }

  const key =
    (asset && asset.length > 0 ? asset : undefined) ||
    (name && name.length > 0 ? name : undefined);
  if (!key) {
    return undefined;
  }

  if (isUrlLike(key) || key.startsWith("/")) {
    return key;
  }

  // Local library keys only (fixtures / bundled masters). Account CDN URLs use `url`.
  if (!isKnownLuminanceAsset(key)) {
    return undefined;
  }

  return staticFile(`luminance/${key}`);
};
