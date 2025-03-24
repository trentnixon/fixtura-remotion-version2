import React, { useState, useEffect } from "react";
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
  // Extract values from template variation if provided
  const videoUrl =
    templateVariation?.url ||
    src ||
    "https://fixtura.s3.ap-southeast-2.amazonaws.com/Fixtura_graphic_BG_Test005_512b7c791a.mp4";
  const videoFallbackUrl = templateVariation?.fallbackUrl || fallbackSrc;
  const videoPosition = templateVariation?.position || position;
  const videoSize = templateVariation?.size || size;
  const videoLoop =
    templateVariation?.loop !== undefined ? templateVariation.loop : loop;
  const videoMuted =
    templateVariation?.muted !== undefined ? templateVariation.muted : muted;
  const videoOverlay = templateVariation?.overlay || overlay;
  const useOffthreadVideo = templateVariation?.useOffthreadVideo || false;
  const volume = templateVariation?.volume || 1;
  const playbackRate = templateVariation?.playbackRate || 1;

  const [videoError, setVideoError] = useState(false);

  // Reset error state when video URL changes
  useEffect(() => {
    setVideoError(false);
  }, [videoUrl]);

  // Handle video error
  const handleVideoError = (error: Error) => {
    console.error("Video error:", error);
    setVideoError(true);
  };

  // If no video source or error without fallback, return null
  if ((!videoUrl || videoError) && !videoFallbackUrl) {
    return null;
  }

  // Determine which source to use
  const finalVideoSrc =
    videoError && videoFallbackUrl ? videoFallbackUrl : videoUrl;

  // Combined style for the video
  const videoStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit:
      videoSize === "auto" || videoSize === "stretch"
        ? ("fill" as const)
        : (videoSize as "cover" | "contain" | "fill" | "none" | "scale-down"),
    objectPosition: videoPosition,
    ...style,
  };

  // Get video context
  const { video } = useVideoDataContext();

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
          src={finalVideoSrc}
          style={videoStyle}
          loop={videoLoop}
          muted={videoMuted}
          volume={videoMuted ? 0 : volume}
          playbackRate={playbackRate}
          onError={handleVideoError}
        />
      </div>

      {/* Overlay if specified */}
      {videoOverlay && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: videoOverlay.color,
            opacity: videoOverlay.opacity,
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
  const templateVariation = video?.templateVariation?.Video || {};

  return <VideoBackground {...props} templateVariation={templateVariation} />;
};
