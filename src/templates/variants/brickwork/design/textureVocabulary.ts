import type { CSSProperties } from "react";

/** Atmosphere-layer opacity — pilot default 4% (acceptance band 3–6%). */
export const BRICKWORK_TEXTURE_OPACITY = 0.04;

export const BRICKWORK_TEXTURE_BLEND_MODE: CSSProperties["mixBlendMode"] =
  "soft-light";

export type BrickworkTextureVariant =
  | "grain"
  | "speckle"
  | "halftone"
  | "screenPrint"
  | "none";

export interface BrickworkAtmosphereConfig {
  enabled: boolean;
  variant: BrickworkTextureVariant;
  opacity: number;
  blendMode?: CSSProperties["mixBlendMode"];
}

export const BRICKWORK_DEFAULT_ATMOSPHERE: BrickworkAtmosphereConfig = {
  enabled: true,
  variant: "grain",
  opacity: BRICKWORK_TEXTURE_OPACITY,
  blendMode: BRICKWORK_TEXTURE_BLEND_MODE,
};

const encodeSvg = (svg: string): string =>
  `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;

/** Fine film grain — deterministic SVG turbulence tile. */
export const getGrainTextureImage = (): string =>
  encodeSvg(
    `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128">
      <filter id="g"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch"/></filter>
      <rect width="100%" height="100%" filter="url(#g)"/>
    </svg>`,
  );

/** Sparse concrete speckle. */
export const getSpeckleTextureImage = (): string =>
  encodeSvg(
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <circle cx="4" cy="6" r="0.9" fill="#000"/>
      <circle cx="14" cy="3" r="0.7" fill="#000"/>
      <circle cx="19" cy="11" r="0.8" fill="#000"/>
      <circle cx="8" cy="16" r="0.6" fill="#000"/>
      <circle cx="17" cy="19" r="0.75" fill="#000"/>
    </svg>`,
  );

/** Print halftone dot field. */
export const getHalftoneTextureImage = (): string =>
  encodeSvg(
    `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10">
      <circle cx="2" cy="2" r="1.1" fill="#000"/>
    </svg>`,
  );

/** Coarser screen-print noise. */
export const getScreenPrintTextureImage = (): string =>
  encodeSvg(
    `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96">
      <filter id="s"><feTurbulence type="fractalNoise" baseFrequency="0.45" numOctaves="3" stitchTiles="stitch"/></filter>
      <rect width="100%" height="100%" filter="url(#s)"/>
    </svg>`,
  );

export const getTextureBackgroundImage = (
  variant: BrickworkTextureVariant,
): string | undefined => {
  switch (variant) {
    case "grain":
      return getGrainTextureImage();
    case "speckle":
      return getSpeckleTextureImage();
    case "halftone":
      return getHalftoneTextureImage();
    case "screenPrint":
      return getScreenPrintTextureImage();
    default:
      return undefined;
  }
};

export const resolveBrickworkAtmosphere = (
  overrides?: Partial<BrickworkAtmosphereConfig>,
): BrickworkAtmosphereConfig => ({
  ...BRICKWORK_DEFAULT_ATMOSPHERE,
  ...overrides,
});
