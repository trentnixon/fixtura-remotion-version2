import type { DesignPalette } from "../../../../core/utils/designPalettes/types";

export type LuminanceThemePreset =
  | "brand"
  | "brand-with-accent"
  | "tonal-brand"
  | "protected-brand";

export type LuminanceStop = {
  position: number;
  color: string;
};

/** Inclusive `from`, exclusive `to`. Final segment includes luminance `1`. */
export type LuminanceSegment =
  | {
      kind: "solid";
      from: number;
      to: number;
      color: string;
    }
  | {
      kind: "gradient";
      from: number;
      to: number;
      fromColor: string;
      toColor: string;
    };

export type LuminanceMapConfig =
  | {
      kind: "theme";
      preset: LuminanceThemePreset;
      reverse?: boolean;
      /**
       * Pure black / pure white core width for `protected-brand` (default 0.02).
       */
      protectedEndpointCore?: number;
      /**
       * Anti-alias transition width between each core and its brand solid
       * (default 0.06).
       */
      endpointTransitionWidth?: number;
      /**
       * Solid primary / secondary band width after each transition (default 0.07).
       */
      brandSolidWidth?: number;
    }
  | {
      kind: "stops";
      stops: readonly [LuminanceStop, LuminanceStop, ...LuminanceStop[]];
      reverse?: boolean;
    }
  | {
      kind: "segments";
      segments: readonly [LuminanceSegment, ...LuminanceSegment[]];
    };

export type LuminancePreMapControls = {
  contrast?: number;
  brightness?: number;
};

export type LuminanceProtectionPreset =
  | "none"
  | "bottom-weighted"
  | "center-vignette"
  | "uniform";

export type LuminanceBackgroundConfig = {
  /** Local library key under public/luminance/. */
  asset?: string;
  /** Library / display label (parity with texture.name). */
  name?: string;
  /** Account-assigned master URL (CDN). Preferred for production. */
  url?: string | null;
  map: LuminanceMapConfig;
  contrast?: number;
  brightness?: number;
  protection?: LuminanceProtectionPreset;
  opacity?: number;
  position?: string;
  size?: string;
  /**
   * Internal supersample scale for spatial AA (default 2 for protected-brand).
   * Mapping runs at scale×1080×1350 then area-averages down to final size.
   * Use 4 only for diagnostics.
   */
  supersampleScale?: LuminanceSupersampleScale;
};

export type LuminanceLookupTable = {
  r: readonly number[];
  g: readonly number[];
  b: readonly number[];
};

export type ResolvedLuminanceMap = {
  lut: LuminanceLookupTable;
  usedTonalFallback: boolean;
  /** Present when the map resolved via segments (including protected-brand). */
  segments?: readonly LuminanceSegment[];
};

export type MissingAssetFallback = "gradient" | "solid";

export type ResolveLuminanceMapInput = {
  config: LuminanceMapConfig;
  palette: DesignPalette;
  contrast?: number;
  brightness?: number;
};

export type LuminanceRenderBackend = "svg" | "remotion" | "precompute";

/** Internal working resolution multiplier before downsample to 1080×1350. */
export type LuminanceSupersampleScale = 1 | 2 | 4;

export const LUMINANCE_LUT_SIZE = 256;

/** Pure black / white core under `protected-brand` (default 2%). */
export const DEFAULT_PROTECTED_ENDPOINT_CORE = 0.02;

/** Black→primary and secondary→white anti-alias transitions (default 6%). */
export const DEFAULT_ENDPOINT_TRANSITION_WIDTH = 0.06;

/** Solid primary / secondary bands after each transition (default 7%). */
export const DEFAULT_BRAND_SOLID_WIDTH = 0.07;

export const DEFAULT_PRE_MAP = {
  contrast: 1,
  brightness: 0,
} as const;
