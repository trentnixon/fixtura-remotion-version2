import React from "react";
import { Composition, getInputProps } from "remotion";
import { getProductionCompositionFromData } from "./core/preview/getProductionCompositionFromData";
import { FixturaDataset } from "./core/types/data/index";

/**
 * Production environment for rendering
 */
export const ProductionRoot: React.FC = () => {
  const { data } = getInputProps() as { data: FixturaDataset };

  if (!data) {
    throw new Error("No data provided for production render");
  }

  const { TemplateComponent, remoteCompositionId, durationInFrames } =
    getProductionCompositionFromData(data);

  return (
    <Composition
      id={remoteCompositionId}
      component={TemplateComponent}
      durationInFrames={durationInFrames}
      fps={30}
      width={1080}
      height={1350}
      defaultProps={{
        data,
      }}
    />
  );
};
