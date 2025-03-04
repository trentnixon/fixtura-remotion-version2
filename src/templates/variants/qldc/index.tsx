import React from "react";
import { AbsoluteFill } from "remotion";
import { FixturaDataset } from "../../../core/types/data/index";
import { routeToComposition } from "../../../core/utils/routing";

interface QLDCProps {
  DATA: FixturaDataset;
}

/**
 * QLDC Template
 * This template is used for Queensland Local District Cricket
 */
export const QLDC: React.FC<QLDCProps> = ({ DATA }) => {
  // Apply any QLDC-specific styling or processing here
  const processedData = {
    ...DATA,
    VIDEOMETA: {
      ...DATA.VIDEOMETA,
      Video: {
        ...DATA.VIDEOMETA.Video,
        // Ensure the template is set correctly
        Template: "QLDC",
      },
    },
  };

  // Route to the appropriate composition based on the CompositionID
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {routeToComposition(processedData)}
    </AbsoluteFill>
  );
};
