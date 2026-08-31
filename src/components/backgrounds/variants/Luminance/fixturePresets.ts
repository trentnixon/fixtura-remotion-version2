import type {
  LuminanceBackgroundConfig,
  LuminanceProtectionPreset,
  LuminanceRenderBackend,
} from "./types";

export type LuminanceFixtureId =
  | "F01"
  | "F02"
  | "F03"
  | "F04"
  | "F05"
  | "F06"
  | "F07"
  | "F08"
  | "F09";

export type LuminanceFixturePreset = LuminanceBackgroundConfig & {
  fixtureId: LuminanceFixtureId;
  backend?: LuminanceRenderBackend;
  paletteOverride?: "default" | "problematic";
};

const baseMap = {
  kind: "theme" as const,
  preset: "brand" as const,
};

export const LUMINANCE_FIXTURE_PRESETS: Record<
  LuminanceFixtureId,
  LuminanceFixturePreset
> = {
  F01: {
    fixtureId: "F01",
    name: "Test 001",
    asset: "_verify/test001.png",
    url: null,
    map: baseMap,
    protection: "none",
  },
  F02: {
    fixtureId: "F02",
    name: "Test 001",
    asset: "_verify/test001.png",
    url: null,
    map: baseMap,
    protection: "bottom-weighted",
  },
  F03: {
    fixtureId: "F03",
    name: "high-contrast",
    asset: "high-contrast.png",
    url: null,
    map: { kind: "theme", preset: "brand-with-accent" },
    protection: "none",
  },
  F04: {
    fixtureId: "F04",
    name: "smooth-ramp",
    asset: "smooth-ramp.png",
    url: null,
    map: { kind: "theme", preset: "brand" },
    protection: "none",
    paletteOverride: "problematic",
  },
  F05: {
    fixtureId: "F05",
    name: "smooth-ramp",
    asset: "smooth-ramp.png",
    url: null,
    map: {
      kind: "stops",
      stops: [
        { position: 0, color: "#020408" },
        { position: 0.25, color: "#224466" },
        { position: 0.7, color: "#8899aa" },
        { position: 1, color: "#ddeeff" },
      ],
    },
    protection: "none",
  },
  F06: {
    fixtureId: "F06",
    name: "high-contrast",
    asset: "high-contrast.png",
    url: null,
    map: {
      kind: "stops",
      stops: [
        { position: 0, color: "#020408" },
        { position: 0.25, color: "#224466" },
        { position: 0.7, color: "#8899aa" },
        { position: 1, color: "#ddeeff" },
      ],
    },
    protection: "center-vignette",
  },
  F07: {
    fixtureId: "F07",
    name: "Test 007",
    asset: "_verify/test007.png",
    url: null,
    map: { kind: "theme", preset: "protected-brand" },
    protection: "none",
  },
  F08: {
    fixtureId: "F08",
    name: "smooth-ramp",
    asset: "smooth-ramp.png",
    url: null,
    map: { ...baseMap, reverse: true },
    protection: "none",
  },
  F09: {
    fixtureId: "F09",
    name: "missing",
    asset: "missing-asset-key.png",
    url: null,
    map: baseMap,
    protection: "none",
  },
};

export const getLuminanceFixturePreset = (
  fixtureId: LuminanceFixtureId,
): LuminanceFixturePreset => LUMINANCE_FIXTURE_PRESETS[fixtureId];

export const isLuminanceProtectionPreset = (
  value: string | undefined,
): value is LuminanceProtectionPreset =>
  value === "none" ||
  value === "bottom-weighted" ||
  value === "center-vignette" ||
  value === "uniform";
