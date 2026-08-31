import React, { useEffect, useState } from "react";
import {
  AbsoluteFill,
  Img,
  continueRender,
  delayRender,
  useVideoConfig,
} from "remotion";
import type { LuminanceLookupTable, LuminanceSupersampleScale } from "./types";
import type { ProtectedBrandMatteRanges } from "./protectedBrandMattes";
import {
  applyLuminanceLutToRgba,
  downsampleRgbaAreaAverage,
} from "./supersample/supersampleLuminance";
import { renderProtectedBrandMatteSupersample } from "./supersample/protectedBrandMattePipeline";
import { applyPreMapToLut } from "./backends/svgFilter";

type Props = {
  src: string;
  lut: LuminanceLookupTable;
  scale: LuminanceSupersampleScale;
  contrast?: number;
  brightness?: number;
  opacity?: number;
  objectFit?: React.CSSProperties["objectFit"];
  objectPosition?: string;
  /**
   * When set, use independent matte/luminance downsample + final composite
   * (protected-brand). `lut` must be the brand-only LUT.
   */
  protectedMattes?: ProtectedBrandMatteRanges;
};

const loadImageElement = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = "sync";
    image.onload = () => resolve(image);
    image.onerror = () =>
      reject(new Error(`Failed to load luminance master: ${src}`));
    image.src = src;
  });

const drawCoverFit = (
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  destWidth: number,
  destHeight: number,
) => {
  const scale = Math.max(
    destWidth / image.naturalWidth,
    destHeight / image.naturalHeight,
  );
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  const offsetX = (destWidth - drawWidth) / 2;
  const offsetY = (destHeight - drawHeight) / 2;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.clearRect(0, 0, destWidth, destHeight);
  ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
};

/**
 * Spatial AA path: either RGB LUT+downsample, or protected matte pipeline.
 */
export const SupersampledLuminanceMappedImage: React.FC<Props> = ({
  src,
  lut,
  scale,
  contrast = 1,
  brightness = 0,
  opacity = 1,
  objectFit = "cover",
  objectPosition = "center",
  protectedMattes,
}) => {
  const { width: outputWidth, height: outputHeight } = useVideoConfig();
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [handle] = useState(() =>
    delayRender(`luminance-supersample-${scale}x`, {
      timeoutInMilliseconds: scale >= 4 ? 180_000 : 90_000,
    }),
  );

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        const image = await loadImageElement(src);
        let mapped: {
          data: Uint8ClampedArray;
          width: number;
          height: number;
        };

        if (protectedMattes) {
          const sourceCanvas = document.createElement("canvas");
          sourceCanvas.width = image.naturalWidth;
          sourceCanvas.height = image.naturalHeight;
          const sourceCtx = sourceCanvas.getContext("2d", {
            willReadFrequently: true,
          });
          if (!sourceCtx) {
            throw new Error("Could not create source canvas context");
          }
          sourceCtx.drawImage(image, 0, 0);
          const source = sourceCtx.getImageData(
            0,
            0,
            image.naturalWidth,
            image.naturalHeight,
          );

          mapped = renderProtectedBrandMatteSupersample({
            sourceRgba: source.data,
            sourceWidth: image.naturalWidth,
            sourceHeight: image.naturalHeight,
            brandLut: lut,
            matteRanges: protectedMattes,
            scale,
            contrast,
            brightness,
            outputWidth,
            outputHeight,
          });
        } else {
          const workingWidth = outputWidth * scale;
          const workingHeight = outputHeight * scale;
          const workingCanvas = document.createElement("canvas");
          workingCanvas.width = workingWidth;
          workingCanvas.height = workingHeight;
          const workingCtx = workingCanvas.getContext("2d", {
            willReadFrequently: true,
          });
          if (!workingCtx) {
            throw new Error("Could not create working canvas context");
          }

          drawCoverFit(workingCtx, image, workingWidth, workingHeight);
          const working = workingCtx.getImageData(
            0,
            0,
            workingWidth,
            workingHeight,
          );

          const effectiveLut = applyPreMapToLut(lut, contrast, brightness);
          applyLuminanceLutToRgba(working.data, effectiveLut);

          mapped =
            scale === 1
              ? {
                  data: working.data,
                  width: workingWidth,
                  height: workingHeight,
                }
              : downsampleRgbaAreaAverage(
                  working.data,
                  workingWidth,
                  workingHeight,
                  scale,
                );
        }

        const outCanvas = document.createElement("canvas");
        outCanvas.width = mapped.width;
        outCanvas.height = mapped.height;
        const outCtx = outCanvas.getContext("2d");
        if (!outCtx) {
          throw new Error("Could not create output canvas context");
        }
        outCtx.putImageData(
          new ImageData(
            new Uint8ClampedArray(mapped.data),
            mapped.width,
            mapped.height,
          ),
          0,
          0,
        );

        const nextDataUrl = outCanvas.toDataURL("image/png");
        if (!cancelled) {
          setDataUrl(nextDataUrl);
          continueRender(handle);
        }
      } catch (error) {
        continueRender(handle);
        throw error;
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [
    brightness,
    contrast,
    handle,
    lut,
    outputHeight,
    outputWidth,
    protectedMattes,
    scale,
    src,
  ]);

  if (!dataUrl) {
    return <AbsoluteFill style={{ backgroundColor: "#000" }} />;
  }

  return (
    <Img
      src={dataUrl}
      style={{
        width: "100%",
        height: "100%",
        objectFit,
        objectPosition,
        opacity,
      }}
    />
  );
};
