import React, { useMemo } from "react";
import { Img } from "remotion";
import type {
  LuminanceLookupTable,
  LuminanceRenderBackend,
  LuminanceSupersampleScale,
} from "./types";
import {
  applyPreMapToLut,
  buildSvgLuminanceFilterDef,
} from "./backends/svgFilter";
import { SupersampledLuminanceMappedImage } from "./SupersampledLuminanceMappedImage";
import type { ProtectedBrandMatteRanges } from "./protectedBrandMattes";

const sanitizeFilterId = (rawId: string) =>
  rawId.replace(/[^a-zA-Z0-9_-]/g, "");

type Props = {
  src: string;
  lut: LuminanceLookupTable;
  filterInstanceId: string;
  backend?: LuminanceRenderBackend;
  contrast?: number;
  brightness?: number;
  opacity?: number;
  objectFit?: React.CSSProperties["objectFit"];
  objectPosition?: string;
  precomputedSrc?: string;
  /** Spatial AA supersample; >1 uses canvas map+downsample path. */
  supersampleScale?: LuminanceSupersampleScale;
  /** Protected-brand matte ranges; enables independent coverage downsample. */
  protectedMattes?: ProtectedBrandMatteRanges;
};

export const LuminanceMappedImage: React.FC<Props> = ({
  src,
  lut,
  filterInstanceId,
  backend = "svg",
  contrast = 1,
  brightness = 0,
  opacity = 1,
  objectFit = "cover",
  objectPosition = "center",
  precomputedSrc,
  supersampleScale = 1,
  protectedMattes,
}) => {
  const effectiveLut = useMemo(
    () => applyPreMapToLut(lut, contrast, brightness),
    [lut, contrast, brightness],
  );

  const filterId = sanitizeFilterId(`luminance-filter-${filterInstanceId}`);
  const svgFilter = useMemo(
    () => buildSvgLuminanceFilterDef(filterId, effectiveLut),
    [effectiveLut, filterId],
  );

  if (supersampleScale > 1) {
    return (
      <SupersampledLuminanceMappedImage
        src={src}
        lut={lut}
        scale={supersampleScale}
        contrast={contrast}
        brightness={brightness}
        opacity={opacity}
        objectFit={objectFit}
        objectPosition={objectPosition}
        protectedMattes={protectedMattes}
      />
    );
  }

  if (backend === "precompute" && precomputedSrc) {
    return (
      <Img
        src={precomputedSrc}
        style={{
          width: "100%",
          height: "100%",
          objectFit,
          objectPosition,
          opacity,
        }}
      />
    );
  }

  return (
    <>
      <svg
        aria-hidden="true"
        style={{ position: "absolute", width: 0, height: 0 }}
      >
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0 0 0 1 0"
              result="neutral"
            />
            <feComponentTransfer in="neutral" result="mapped">
              <feFuncR type="table" tableValues={svgFilter.rTable} />
              <feFuncG type="table" tableValues={svgFilter.gTable} />
              <feFuncB type="table" tableValues={svgFilter.bTable} />
              <feFuncA type="table" tableValues="0 1" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>
      <Img
        src={src}
        style={{
          width: "100%",
          height: "100%",
          objectFit,
          objectPosition,
          opacity,
          filter: svgFilter.filterCss,
        }}
      />
    </>
  );
};
