import React, { ReactNode } from "react";
import { AbsoluteFill } from "remotion";

// This utility component allows combining multiple effects
interface CombinedEffectsProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const CombinedEffects: React.FC<CombinedEffectsProps> = ({
  children,
  className = "",
  style = {},
}) => {
  return (
    <AbsoluteFill className={`combined-effects ${className}`} style={style}>
      {children}
    </AbsoluteFill>
  );
};

// Helper function to create aspect ratio aware image containers
export const aspectRatioFit = (
  imageWidth: number,
  imageHeight: number,
  containerWidth: number,
  containerHeight: number,
) => {
  const imageRatio = imageWidth / imageHeight;
  const containerRatio = containerWidth / containerHeight;

  let width, height, x, y;

  if (imageRatio > containerRatio) {
    // Image is wider than container relative to height
    // Height will fill container, width will overflow
    height = containerHeight;
    width = height * imageRatio;
    y = 0;
    x = (containerWidth - width) / 2;
  } else {
    // Image is taller than container relative to width
    // Width will fill container, height will overflow
    width = containerWidth;
    height = width / imageRatio;
    x = 0;
    y = (containerHeight - height) / 2;
  }

  return { width, height, x, y };
};

// Helper function to optimize container based on image aspect ratio
export const getOptimalBackgroundSize = (
  imageRatio: number, // width / height
): "cover" | "contain" | "100% auto" | "auto 100%" => {
  // Determine optimal background sizing
  if (imageRatio > 1.3) {
    // Landscape
    return "cover";
  } else if (imageRatio < 0.7) {
    // Portrait
    return "auto 100%";
  } else {
    // Square-ish
    return "cover";
  }
};
