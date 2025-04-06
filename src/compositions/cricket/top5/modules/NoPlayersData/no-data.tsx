import React from "react";
import { AbsoluteFill } from "remotion";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { getTitle } from "../../utils/dataTransformer";

const NoPlayersData: React.FC = () => {
  // Get composition ID to determine the title
  const { data } = useVideoDataContext();
  const { videoMeta } = data;
  const compositionId = videoMeta?.video?.metadata?.compositionId || "";

  // Get title based on composition type
  const title = getTitle(compositionId);

  return (
    <AbsoluteFill className="flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">No {title} Data Available</h2>
        <p className="text-gray-400">
          Please check your data source and try again.
        </p>
      </div>
    </AbsoluteFill>
  );
};

export default NoPlayersData;
