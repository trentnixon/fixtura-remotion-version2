import type {
  LuminanceSegment,
  LuminanceStop,
  ResolveLuminanceMapInput,
  ResolvedLuminanceMap,
} from "./types";
import { applyPreMapTone, lookupChannel, toneToHex } from "./applyPreMapTone";
import {
  paletteNeedsTonalFallback,
  resolveThemePresetStops,
} from "./resolveThemePresetStops";
import {
  resolveProtectedBrandSegments,
  reverseSegments,
} from "./resolveProtectedBrandSegments";
import { sampleLutFromStops } from "./sampleLutFromStops";
import { sampleLutFromSegments } from "./sampleLutFromSegments";

const resolveStopsFromTheme = (
  input: ResolveLuminanceMapInput & {
    config: Extract<ResolveLuminanceMapInput["config"], { kind: "theme" }>;
  },
): { stops: LuminanceStop[]; usedTonalFallback: boolean } => {
  const { config, palette } = input;

  if (config.preset === "tonal-brand") {
    return {
      stops: resolveThemePresetStops(palette, "tonal-brand"),
      usedTonalFallback: true,
    };
  }

  if (paletteNeedsTonalFallback(palette)) {
    return {
      stops: resolveThemePresetStops(palette, "tonal-brand", {
        forceTonal: true,
      }),
      usedTonalFallback: true,
    };
  }

  return {
    stops: resolveThemePresetStops(palette, config.preset),
    usedTonalFallback: false,
  };
};

const reverseStopPositions = (stops: LuminanceStop[]): LuminanceStop[] =>
  [...stops]
    .map((stop) => ({
      position: 1 - stop.position,
      color: stop.color,
    }))
    .sort((left, right) => left.position - right.position);

export const resolveLuminanceMap = (
  input: ResolveLuminanceMapInput,
): ResolvedLuminanceMap => {
  const { config, palette } = input;

  if (config.kind === "segments") {
    return {
      lut: sampleLutFromSegments(config.segments),
      usedTonalFallback: false,
      segments: config.segments,
    };
  }

  if (config.kind === "theme" && config.preset === "protected-brand") {
    let segments: LuminanceSegment[] = resolveProtectedBrandSegments(palette, {
      coreWidth: config.protectedEndpointCore,
      transitionWidth: config.endpointTransitionWidth,
      brandSolidWidth: config.brandSolidWidth,
    });
    if (config.reverse === true) {
      segments = reverseSegments(segments);
    }
    return {
      lut: sampleLutFromSegments(segments),
      usedTonalFallback: false,
      segments,
    };
  }

  if (config.kind === "stops") {
    const stops =
      config.reverse === true
        ? reverseStopPositions([...config.stops])
        : [...config.stops];
    return {
      lut: sampleLutFromStops(stops),
      usedTonalFallback: false,
    };
  }

  const { stops, usedTonalFallback } = resolveStopsFromTheme({
    ...input,
    config,
  });
  const resolvedStops =
    config.reverse === true ? reverseStopPositions(stops) : stops;

  return {
    lut: sampleLutFromStops(resolvedStops),
    usedTonalFallback,
  };
};

export const resolveMappedColorAtTone = (
  input: ResolveLuminanceMapInput,
  tone: number,
): string => {
  const { lut } = resolveLuminanceMap(input);
  const mappedTone = applyPreMapTone(tone, {
    contrast: input.contrast,
    brightness: input.brightness,
  });
  return toneToHex(lut, mappedTone);
};

export const resolveMappedChannelsAtTone = (
  input: ResolveLuminanceMapInput,
  tone: number,
) => {
  const { lut } = resolveLuminanceMap(input);
  const mappedTone = applyPreMapTone(tone, {
    contrast: input.contrast,
    brightness: input.brightness,
  });

  return {
    r: lookupChannel(lut.r, mappedTone),
    g: lookupChannel(lut.g, mappedTone),
    b: lookupChannel(lut.b, mappedTone),
  };
};
