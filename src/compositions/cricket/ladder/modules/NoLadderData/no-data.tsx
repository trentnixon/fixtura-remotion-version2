import React from "react";
import { AbsoluteFill } from "remotion";

export const NoLadderData: React.FC = () => {
  return (
    <AbsoluteFill className="flex justify-center items-center text-white font-sans">
      <h1 className="text-3xl">No ladder data available</h1>
    </AbsoluteFill>
  );
};

export default NoLadderData;
