import React from "react";
import { getProductionCompositionFromData } from "../core/preview/getProductionCompositionFromData";
import { FixturaDataset } from "../core/types/data/index";
import { ScorelineBundledStyles } from "./ScorelineBundledStyles";

export type FixturaTemplateSceneProps = {
  data: FixturaDataset;
};

/**
 * Scene component for @remotion/player in the Fixtura app. Pass via inputProps={{ data }}.
 */
export const FixturaTemplateScene: React.FC<FixturaTemplateSceneProps> = ({
  data,
}) => {
  const { TemplateComponent } = getProductionCompositionFromData(data);
  const templateId = data.videoMeta.video.appearance.template;

  return (
    <>
      {templateId === "Scoreline" ? <ScorelineBundledStyles /> : null}
      <TemplateComponent data={data} />
    </>
  );
};
