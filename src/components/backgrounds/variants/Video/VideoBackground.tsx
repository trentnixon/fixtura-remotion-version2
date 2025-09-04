import React from "react";
import {
  AbsoluteFill,
  Video,
  OffthreadVideo,
  Sequence,
  useVideoConfig,
} from "remotion";
import { VideoBackgroundProps } from "../../config";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";

// Default video to use when none is provided via props or templateVariation
const DEFAULT_VIDEO_URL =
  "https://fixtura.s3.ap-southeast-2.amazonaws.com/1943483_uhd_3840_2160_25fps_1238f00c5a.mp4";

// Default overlay when none is provided
const DEFAULT_OVERLAY = { color: "rgba(0,0,0,0.5)", opacity: 0.35 } as const;
// Default intro video (using same default for now)
const DEFAULT_INTRO_VIDEO_URL = DEFAULT_VIDEO_URL;

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
  introSrc?: string;
  introFrames?: number;
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
  loop?: boolean | null;
  muted?: boolean | null;
  overlay?: { color: string; opacity: number } | null;
  templateVariation?: VideoTemplateVariation;
}) => {
  // Normalize values with nullish coalescing to handle null/undefined
  const actualSrc =
    src ??
    templateVariation?.url ??
    fallbackSrc ??
    templateVariation?.fallbackUrl ??
    DEFAULT_VIDEO_URL;
  const actualPosition = position ?? templateVariation?.position ?? "center";
  const actualSize = size ?? templateVariation?.size ?? "cover";
  const actualLoop = loop ?? templateVariation?.loop ?? true;
  const actualMuted = muted ?? templateVariation?.muted ?? true;
  const actualOverlay =
    overlay ?? templateVariation?.overlay ?? DEFAULT_OVERLAY;
  const useOffthreadVideo =
    (templateVariation?.useOffthreadVideo ?? false) || false;
  const actualPlaybackRate = (templateVariation?.playbackRate ?? 1) || 1;
  const actualVolume = actualMuted ? 0 : (templateVariation?.volume ?? 1);

  return {
    actualSrc,
    actualPosition,
    actualSize,
    actualLoop,
    actualMuted,
    actualOverlay,
    useOffthreadVideo,
    actualPlaybackRate,
    actualVolume,
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
  introSrc: introSrcProp,
  introFrames: introFramesProp,
}) => {
  const { durationInFrames } = useVideoConfig();
  // Process configuration
  const {
    actualSrc,
    actualPosition,
    actualSize,
    actualLoop,
    actualMuted,
    actualOverlay,
    useOffthreadVideo,
    actualPlaybackRate,
    actualVolume,
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

  // Final source already defaulted in processVideoConfig
  const srcToUse = actualSrc;
  const introSrc = introSrcProp ?? DEFAULT_INTRO_VIDEO_URL;

  // Intro/beginning segment length (frames)
  const INTRO_FRAMES = Math.max(0, introFramesProp ?? 90);
  const backgroundDuration = Math.max(
    0,
    (durationInFrames || 0) - INTRO_FRAMES,
  );

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
        {/* Intro sequence */}
        <Sequence durationInFrames={INTRO_FRAMES}>
          <VideoComponent
            src={introSrc}
            style={videoStyle}
            loop={false}
            muted={actualMuted}
            playbackRate={actualPlaybackRate}
            {...(!actualMuted ? { volume: actualVolume } : {})}
          />
        </Sequence>

        {/* Background sequence */}
        {backgroundDuration > 0 && (
          <Sequence from={INTRO_FRAMES} durationInFrames={backgroundDuration}>
            <VideoComponent
              src={srcToUse}
              style={videoStyle}
              loop={actualLoop}
              muted={actualMuted}
              playbackRate={actualPlaybackRate}
              {...(!actualMuted ? { volume: actualVolume } : {})}
            />
          </Sequence>
        )}
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
