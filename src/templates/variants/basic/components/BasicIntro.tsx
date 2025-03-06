import React from "react";
import { AbsoluteFill } from "remotion";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { useFontContext } from "../../../../core/context/FontContext";
import {
  BodySmall,
  SubTitle,
  MainTitle,
} from "../../../../components/typography";

export const BasicIntro: React.FC = () => {
  const { Club } = useVideoDataContext();

  const { fontsLoaded } = useFontContext();

  return (
    <AbsoluteFill className="flex flex-col justify-center items-center">
      {!fontsLoaded ? (
        <div className="text-white text-2xl">Loading fonts...</div>
      ) : (
        <div className="flex flex-col justify-center items-center h-full">
          {/* Logo */}
          {Club?.Logo?.url && (
            <img
              src={Club.Logo.url}
              alt={Club.Name || "Club Logo"}
              className="w-2/5 max-h-2/5 object-contain mb-8"
            />
          )}

          {/* Club Name */}
          <MainTitle variant="gradient">
            {Club?.Name || "Cricket Club"}
          </MainTitle>
          <SubTitle variant="gradient">{Club?.Name || "Cricket Club"}</SubTitle>
          <BodySmall variant="safe-primary">
            {Club?.Name || "Cricket Club"}
          </BodySmall>
        </div>
      )}
    </AbsoluteFill>
  );
};
