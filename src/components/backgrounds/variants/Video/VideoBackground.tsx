import React from "react";
import { AbsoluteFill, Video, OffthreadVideo } from "remotion";
import { VideoBackgroundProps } from "../../config";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";

interface VideoTemplateVariation {
  url?: string;
  position?: string;
  size?: string;
  loop?: boolean;
  muted?: boolean;
  overlay?: {
    color: string;
    opacity: number;
  };
  useOffthreadVideo?: boolean;
  volume?: number;
  playbackRate?: number;
  fallbackUrl?: string;
}

interface Props extends Partial<VideoBackgroundProps> {
  className?: string;
  style?: React.CSSProperties;
  templateVariation?: VideoTemplateVariation;
}

// Process and merge video configuration from props and template variation
const processVideoConfig = ({
  src,
  fallbackSrc,
  position,
  size,
  loop,
  muted,
  overlay,
  templateVariation,
}: {
  src?: string;
  fallbackSrc?: string;
  position?: string;
  size?: string;
  loop?: boolean;
  muted?: boolean;
  overlay?: { color: string; opacity: number };
  templateVariation?: VideoTemplateVariation;
}) => {
  // Use template variation values as fallbacks
  const actualSrc =
    src ||
    templateVariation?.url ||
    fallbackSrc ||
    templateVariation?.fallbackUrl ||
    "";
  const actualPosition = position || templateVariation?.position || "center";
  const actualSize = size || templateVariation?.size || "cover";
  const actualLoop =
    loop !== undefined
      ? loop
      : templateVariation?.loop !== undefined
        ? templateVariation.loop
        : true;
  const actualMuted =
    muted !== undefined
      ? muted
      : templateVariation?.muted !== undefined
        ? templateVariation.muted
        : true;
  const actualOverlay = overlay || templateVariation?.overlay;
  const useOffthreadVideo = templateVariation?.useOffthreadVideo || false;

  return {
    actualSrc,
    actualPosition,
    actualSize,
    actualLoop,
    actualMuted,
    actualOverlay,
    useOffthreadVideo,
  };
};

export const VideoBackground: React.FC<Props> = ({
  src,
  fallbackSrc,
  position = "center",
  size = "cover",
  loop = true,
  muted = true,
  overlay,
  className = "",
  style = {},
  templateVariation,
}) => {
  // Process configuration
  const {
    actualSrc,
    actualPosition,
    actualSize,
    actualLoop,
    actualMuted,
    actualOverlay,
    useOffthreadVideo,
  } = processVideoConfig({
    src,
    fallbackSrc,
    position,
    size,
    loop,
    muted,
    overlay,
    templateVariation,
  });

  // Combined style for the video
  const videoStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit:
      actualSize === "auto" || actualSize === "stretch"
        ? ("fill" as const)
        : (actualSize as "cover" | "contain" | "fill" | "none" | "scale-down"),
    objectPosition: actualPosition,
    ...style,
  };

  // Choose between Video and OffthreadVideo components
  const VideoComponent = useOffthreadVideo ? OffthreadVideo : Video;

  return (
    <AbsoluteFill className={`bg-video ${className}`}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          zIndex: -2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <VideoComponent
          src={actualSrc}
          style={videoStyle}
          loop={actualLoop}
          muted={actualMuted}
          volume={actualMuted ? 0 : 1}
          playbackRate={1}
        />
      </div>

      {/* Overlay if specified */}
      {actualOverlay && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: actualOverlay.color,
            opacity: actualOverlay.opacity,
            zIndex: -1,
          }}
        />
      )}
    </AbsoluteFill>
  );
};

// Example usage with context
export const VideoBackgroundWithContext: React.FC<
  Omit<Props, "templateVariation">
> = (props) => {
  // Import and use the context
  const { video } = useVideoDataContext();
  const templateVariation = video?.templateVariation?.video || {};

  return <VideoBackground {...props} templateVariation={templateVariation} />;
};
