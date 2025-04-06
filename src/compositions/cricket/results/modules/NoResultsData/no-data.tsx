import React from "react";
import { AbsoluteFill } from "remotion";

const NoResultsData: React.FC = () => {
  return (
    <AbsoluteFill className="flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">No Results Data Available</h2>
        <p className="text-gray-400">
          Please check your data source and try again.
        </p>
      </div>
    </AbsoluteFill>
  );
};

export default NoResultsData;
