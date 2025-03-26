import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { HEADER_ANIMATION_DURATION } from "../../types";

interface LadderHeaderProps {
  title: string;
}

export const LadderHeader: React.FC<LadderHeaderProps> = ({ title }) => {
  const frame = useCurrentFrame();

  // Animation for the header
  const opacity = interpolate(
    frame,
    [0, 15, HEADER_ANIMATION_DURATION - 15, HEADER_ANIMATION_DURATION],
    [0, 1, 1, 1],
    { extrapolateRight: "clamp" },
  );

  const translateY = interpolate(
    frame,
    [0, HEADER_ANIMATION_DURATION],
    [-20, 0],
    { extrapolateRight: "clamp" },
  );

  return (
    <div
      className="p-5 w-full text-center"
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <h1 className="m-0 text-4xl font-bold text-white drop-shadow-lg">
        {title}
      </h1>
    </div>
  );
};

export default LadderHeader;
