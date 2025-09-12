import React from "react";
import { AbsoluteFill, staticFile, Img } from "remotion";
import { TextureBackgroundProps } from "../../config/types";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import type { VideoTemplateVariation } from "../../../../core/types/data/videoData";

interface Props extends Partial<TextureBackgroundProps> {
  className?: string;
  style?: React.CSSProperties;
}

const isUrlLike = (val?: string) => !!val && /^(https?:)?\/\//i.test(val);

const resolveTextureSrc = ({
  src,
  name,
  url,
}: {
  src?: string;
  name?: string;
  url?: string;
}) => {
  // Priority: url > src > name
  if (url && url.length > 0) return url;
  if (src && src.length > 0) return src;
  if (!name || name.length === 0) return "";
  // If name looks like a URL or absolute path, use as-is
  if (isUrlLike(name) || name.startsWith("/")) return name;
  // Otherwise resolve from public/textures via staticFile
  return staticFile(`/textures/${name}`);
};

const mapDirection = (dir?: string): string => {
  if (!dir) return "to right";
  switch (dir.toUpperCase()) {
    case "HORIZONTAL":
      return "to right";
    case "VERTICAL":
      return "to bottom";
    case "DIAGONAL_TL_BR":
      return "to bottom right";
    case "DIAGONAL_TR_BL":
      return "to bottom left";
    default:
      return dir; // allow custom like '45deg'
  }
};

const buildGradientFromTemplate = (
  gradient: VideoTemplateVariation["gradient"] | undefined,
  primary: string,
  accent: string,
): string => {
  const type = (gradient?.type || "linear") as
    | "linear"
    | "radial"
    | "conic"
    | string;
  const dir = mapDirection(gradient?.direction);
  const colors = `${primary}, ${accent}`;
  if (type === "radial") return `radial-gradient(${colors})`;
  if (type === "conic") return `conic-gradient(${colors})`;
  return `linear-gradient(${dir}, ${colors})`;
};

export const TextureBackground: React.FC<Props> = ({
  src,
  name,
  url,
  position = "center",
  size = "auto",
  repeat = "repeat",
  scale,
  overlay,
  className = "",
  style = {},
}) => {
  const { selectedPalette } = useThemeContext();
  const { video } = useVideoDataContext();

  // Pull templateVariation overrides if present
  const tv: NonNullable<VideoTemplateVariation["texture"]> =
    (video?.templateVariation?.texture as VideoTemplateVariation["texture"]) ||
    {};

  const resolvedSrc = resolveTextureSrc({
    src: tv?.url ?? src,
    name: tv?.name ?? name,
    url: tv?.url ?? url,
  });
  const actualPosition = tv?.position ?? position;
  const actualRepeat = tv?.repeat ?? repeat;
  const actualSize = tv?.size ?? size;
  const actualScale = tv?.scale ?? scale;

  const overlayColor =
    (overlay?.color as string | undefined) ??
    (tv?.overlay?.color as string | undefined) ??
    selectedPalette.background.main;
  const overlayOpacity =
    (overlay?.opacity as number | undefined) ??
    (tv?.overlay?.opacity as number | undefined) ??
    0.35;
  const overlayBlend =
    ((overlay?.blendMode as React.CSSProperties["mixBlendMode"]) ??
      (tv?.overlay?.blendMode as React.CSSProperties["mixBlendMode"]) ??
      "multiply") as React.CSSProperties["mixBlendMode"];

  const computedBackgroundSize: React.CSSProperties["backgroundSize"] =
    actualScale !== undefined && actualScale !== null
      ? typeof actualScale === "number"
        ? `${actualScale}%`
        : (actualScale as string)
      : (actualSize as React.CSSProperties["backgroundSize"]);

  // Handle "cover" repeat value - it should be no-repeat with cover background-size
  const computedRepeat = actualRepeat === "cover" ? "no-repeat" : actualRepeat;
  const computedSize =
    actualRepeat === "cover" ? "cover" : computedBackgroundSize;

  // If gradient JSON exists, use it to build gradient overlay. Else, use solid color.
  const gradientConfig = video?.templateVariation?.gradient;
  const overlayStyle: React.CSSProperties = gradientConfig
    ? {
        background: buildGradientFromTemplate(
          gradientConfig,
          selectedPalette.background.main,
          selectedPalette.background.accent,
        ),
        opacity: overlayOpacity,
        mixBlendMode: overlayBlend,
      }
    : {
        backgroundColor: overlayColor,
        opacity: overlayOpacity,
        mixBlendMode: overlayBlend,
      };

  return (
    <AbsoluteFill className={`bg-texture ${className}`}>
      {/* Preload the texture image so Remotion waits before rendering */}
      {resolvedSrc ? (
        <AbsoluteFill style={{ opacity: 0, pointerEvents: "none" }}>
          <Img src={resolvedSrc} style={{ width: "100%", height: "100%" }} />
        </AbsoluteFill>
      ) : null}

      {/* Texture layer using CSS background for tiling */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: resolvedSrc ? `url(${resolvedSrc})` : undefined,
          backgroundRepeat: computedRepeat,
          backgroundSize: computedSize,
          backgroundPosition: actualPosition,
          ...style,
        }}
      />

      {/* Overlay layer with gradient (if configured) or solid color */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          ...overlayStyle,
        }}
      />
    </AbsoluteFill>
  );
};

export default TextureBackground;
