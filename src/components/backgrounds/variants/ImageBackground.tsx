import React, { useState, useEffect } from "react";
import { AbsoluteFill } from "remotion";
import {
  ImageBackgroundProps,
  BACKGROUND_POSITIONS,
  BACKGROUND_SIZES,
} from "../config";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";

interface Props extends Partial<ImageBackgroundProps> {
  className?: string;
  style?: React.CSSProperties;
}

export const ImageBackground: React.FC<Props> = ({
  src,
  fallbackSrc,
  position = "center",
  size = "cover",
  repeat = "no-repeat",
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
  const { Video } = useVideoDataContext();
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const [imageError, setImageError] = useState(false);

  // Use provided src or from Video context
  const imagePath = src || Video.TemplateVariation?.useBackground;

  useEffect(() => {
    // Reset error state when src changes
    setImageError(false);

    if (imagePath) {
      setImageSrc(imagePath);
    }
  }, [imagePath]);

  // Handle image error
  const handleImageError = () => {
    setImageError(true);
    if (fallbackSrc) {
      setImageSrc(fallbackSrc);
    }
  };

  // If no image source or error without fallback, return null
  if ((!imageSrc || imageError) && !fallbackSrc) {
    return null;
  }

  return (
    <AbsoluteFill className={`bg-image ${className}`}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: size,
          backgroundPosition: position,
          backgroundRepeat: repeat,
          zIndex: -2,
          ...style,
        }}
      />

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

      {/* Hidden image for preloading and error handling */}
      <img
        src={imageSrc}
        alt=""
        onError={handleImageError}
        style={{ display: "none" }}
      />
    </AbsoluteFill>
  );
};
