import type { CSSProperties } from "react";

/**
 * Panel-surface texture opacity.
 * Tuned for Studio visibility on translucent Classic content planes;
 * dial down after keep review if too strong.
 */
export const CLASSIC_PANEL_TEXTURE_OPACITY = 0.1;

/** Prefer normal compositing — soft-light washes out on translucent panels. */
export const CLASSIC_PANEL_TEXTURE_BLEND_MODE: CSSProperties["mixBlendMode"] =
  "normal";

export type ClassicPanelTextureVariant = "fibre" | "paper" | "none";

export interface ClassicPanelTextureConfig {
  enabled: boolean;
  variant: ClassicPanelTextureVariant;
  opacity: number;
  blendMode?: CSSProperties["mixBlendMode"];
}

export const CLASSIC_DEFAULT_PANEL_TEXTURE: ClassicPanelTextureConfig = {
  enabled: true,
  variant: "fibre",
  opacity: CLASSIC_PANEL_TEXTURE_OPACITY,
  blendMode: CLASSIC_PANEL_TEXTURE_BLEND_MODE,
};

const encodeSvg = (svg: string): string =>
  `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;

/**
 * Pulp-direction fibre — short angled strokes (filter-free for Remotion).
 * Reads as paper stock with grain direction, not speckles.
 */
export const getClassicPanelFibreImage = (): string =>
  encodeSvg(
    `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
      <g stroke="#000" stroke-linecap="round" fill="none">
        <path d="M2 6h7" stroke-width="0.7"/>
        <path d="M12 3h5" stroke-width="0.55"/>
        <path d="M20 8h8" stroke-width="0.65"/>
        <path d="M31 4h6" stroke-width="0.5"/>
        <path d="M40 9h7" stroke-width="0.7"/>
        <path d="M4 14h6" stroke-width="0.6"/>
        <path d="M14 17h9" stroke-width="0.75"/>
        <path d="M26 12h5" stroke-width="0.5"/>
        <path d="M34 16h8" stroke-width="0.65"/>
        <path d="M45 13h6" stroke-width="0.55"/>
        <path d="M1 24h8" stroke-width="0.7"/>
        <path d="M12 27h5" stroke-width="0.5"/>
        <path d="M20 22h8" stroke-width="0.65"/>
        <path d="M31 26h6" stroke-width="0.55"/>
        <path d="M40 21h8" stroke-width="0.7"/>
        <path d="M3 34h7" stroke-width="0.6"/>
        <path d="M13 38h8" stroke-width="0.7"/>
        <path d="M24 33h6" stroke-width="0.55"/>
        <path d="M33 37h8" stroke-width="0.65"/>
        <path d="M44 32h6" stroke-width="0.5"/>
        <path d="M2 44h6" stroke-width="0.55"/>
        <path d="M11 41h8" stroke-width="0.65"/>
        <path d="M22 45h6" stroke-width="0.5"/>
        <path d="M31 42h8" stroke-width="0.7"/>
        <path d="M42 46h7" stroke-width="0.55"/>
        <path d="M48 24h5" stroke-width="0.6"/>
        <path d="M49 5h4" stroke-width="0.5"/>
      </g>
      <g stroke="#fff" stroke-opacity="0.8" stroke-linecap="round" fill="none">
        <path d="M8 10h5" stroke-width="0.45"/>
        <path d="M28 19h6" stroke-width="0.4"/>
        <path d="M41 28h5" stroke-width="0.45"/>
        <path d="M17 30h5" stroke-width="0.4"/>
        <path d="M36 11h5" stroke-width="0.45"/>
        <path d="M7 48h6" stroke-width="0.4"/>
      </g>
      <g stroke="#000" stroke-opacity="0.55" stroke-linecap="round" fill="none" transform="rotate(12 28 28)">
        <path d="M5 20h4" stroke-width="0.45"/>
        <path d="M18 29h5" stroke-width="0.4"/>
        <path d="M32 18h4" stroke-width="0.45"/>
        <path d="M9 40h5" stroke-width="0.4"/>
        <path d="M38 40h4" stroke-width="0.45"/>
      </g>
    </svg>`,
  );

/**
 * Speckle paper grain — kept as alternate variant.
 * Chromium often skips SVG filters when used as CSS background-image;
 * plain circles always paint in Remotion.
 */
export const getClassicPanelPaperGrainImage = (): string =>
  encodeSvg(
    `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
      <circle cx="3" cy="5" r="0.7" fill="#000"/>
      <circle cx="11" cy="2" r="0.55" fill="#000"/>
      <circle cx="19" cy="8" r="0.65" fill="#000"/>
      <circle cx="27" cy="3" r="0.5" fill="#000"/>
      <circle cx="35" cy="7" r="0.7" fill="#000"/>
      <circle cx="43" cy="4" r="0.55" fill="#000"/>
      <circle cx="6" cy="14" r="0.6" fill="#000"/>
      <circle cx="15" cy="17" r="0.75" fill="#000"/>
      <circle cx="23" cy="12" r="0.5" fill="#000"/>
      <circle cx="31" cy="16" r="0.65" fill="#000"/>
      <circle cx="40" cy="13" r="0.55" fill="#000"/>
      <circle cx="2" cy="24" r="0.7" fill="#000"/>
      <circle cx="10" cy="27" r="0.5" fill="#000"/>
      <circle cx="18" cy="22" r="0.65" fill="#000"/>
      <circle cx="26" cy="26" r="0.55" fill="#000"/>
      <circle cx="34" cy="21" r="0.7" fill="#000"/>
      <circle cx="42" cy="25" r="0.5" fill="#000"/>
      <circle cx="7" cy="34" r="0.6" fill="#000"/>
      <circle cx="14" cy="38" r="0.7" fill="#000"/>
      <circle cx="22" cy="33" r="0.55" fill="#000"/>
      <circle cx="30" cy="37" r="0.65" fill="#000"/>
      <circle cx="38" cy="32" r="0.5" fill="#000"/>
      <circle cx="45" cy="36" r="0.7" fill="#000"/>
      <circle cx="4" cy="44" r="0.55" fill="#000"/>
      <circle cx="12" cy="41" r="0.65" fill="#000"/>
      <circle cx="21" cy="45" r="0.5" fill="#000"/>
      <circle cx="29" cy="42" r="0.7" fill="#000"/>
      <circle cx="37" cy="46" r="0.55" fill="#000"/>
      <circle cx="46" cy="43" r="0.6" fill="#000"/>
      <circle cx="8" cy="9" r="0.45" fill="#fff" fill-opacity="0.85"/>
      <circle cx="25" cy="19" r="0.4" fill="#fff" fill-opacity="0.8"/>
      <circle cx="39" cy="28" r="0.45" fill="#fff" fill-opacity="0.85"/>
      <circle cx="16" cy="31" r="0.4" fill="#fff" fill-opacity="0.75"/>
      <circle cx="33" cy="10" r="0.45" fill="#fff" fill-opacity="0.8"/>
    </svg>`,
  );

export const getClassicPanelTextureImage = (
  variant: ClassicPanelTextureVariant = "fibre",
): string | undefined => {
  switch (variant) {
    case "fibre":
      return getClassicPanelFibreImage();
    case "paper":
      return getClassicPanelPaperGrainImage();
    default:
      return undefined;
  }
};

export const getClassicPanelTextureStyles = (
  overrides?: Partial<ClassicPanelTextureConfig>,
): CSSProperties | null => {
  const config: ClassicPanelTextureConfig = {
    ...CLASSIC_DEFAULT_PANEL_TEXTURE,
    ...overrides,
  };

  if (!config.enabled || config.variant === "none") {
    return null;
  }

  const backgroundImage = getClassicPanelTextureImage(config.variant);
  if (!backgroundImage) {
    return null;
  }

  const tilePx = config.variant === "fibre" ? 56 : 48;

  return {
    backgroundImage,
    backgroundRepeat: "repeat",
    backgroundSize: `${tilePx}px ${tilePx}px`,
    opacity: config.opacity,
    mixBlendMode: config.blendMode,
  };
};
