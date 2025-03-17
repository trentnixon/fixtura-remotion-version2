import React, { useState, useEffect, useRef } from "react";
import { AbsoluteFill } from "remotion";
import {
  VideoBackgroundProps,
  BACKGROUND_POSITIONS,
  BACKGROUND_SIZES,
} from "../../config";

interface Props extends Partial<VideoBackgroundProps> {
  className?: string;
  style?: React.CSSProperties;
}

export const VideoBackground: React.FC<Props> = ({
  src,
  fallbackSrc,
  position = "center",
  size = "cover",
  loop = true,
  muted = true,
  overlay,
  animation,
  animationDuration,
  animationDelay,
  exitAnimation,
  exitAnimationDuration,
  exitFrame,
  className = "",
  style = {},
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    // Reset error state when src changes
    setVideoError(false);
  }, [src]);

  // Handle video error
  const handleVideoError = () => {
    setVideoError(true);
  };

  // If no video source or error without fallback, return null
  if ((!src || videoError) && !fallbackSrc) {
    return null;
  }

  // Determine which source to use
  const videoSrc = videoError && fallbackSrc ? fallbackSrc : src;

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
        }}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          loop={loop}
          muted={muted}
          playsInline
          onError={handleVideoError}
          style={{
            width: "100%",
            height: "100%",
            objectFit: size === "auto" || size === "stretch" ? "fill" : size,
            objectPosition: position,
            ...style,
          }}
        />
      </div>

      {/* Overlay if specified */}
      {overlay && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: overlay.color,
            opacity: overlay.opacity,
            zIndex: -1,
          }}
        />
      )}
    </AbsoluteFill>
  );
};
