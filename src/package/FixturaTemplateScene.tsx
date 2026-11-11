import React, { useEffect } from "react";
import { getProductionCompositionFromData } from "./getProductionCompositionFromData";
import { loadPreviewTemplateComponent } from "./loadPreviewTemplate";
import { FixturaDataset } from "../core/types/data/index";
import { isTemplateId } from "../templates/templateIds";
import { NightSessionBundledStyles } from "./NightSessionBundledStyles";
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

  useEffect(() => {
    if (isTemplateId(templateId)) {
      void loadPreviewTemplateComponent(templateId);
    }
  }, [templateId]);

  return (
    <>
      {templateId === "Scoreline" ? <ScorelineBundledStyles /> : null}
      {templateId === "NightSession" ? <NightSessionBundledStyles /> : null}
      <TemplateComponent data={data} />
    </>
  );
};
