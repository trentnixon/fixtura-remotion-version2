import React from "react";
import { Composition, getInputProps } from "remotion";
import {
  templateRegistry,
  isValidTemplate,
  TemplateId,
} from "./templates/registry";
import { FixturaDataset } from "./core/types/data/index";

/**
 * Production environment for rendering
 */
export const ProductionRoot: React.FC = () => {
  // Get input props passed to the render
  const { data } = getInputProps() as { data: FixturaDataset };

  // If no data, use a fallback for testing
  if (!data) {
    throw new Error("No data provided for production render");
  }

  // Extract template information from the data
  const templateId = data.videoMeta.video.appearance.template || "Basic";
  const compositionId = data.videoMeta.video.metadata.compositionId || "Ladder";
  const templateVariation = data.videoMeta.video.templateVariation || {};

  // Make sure the template exists, fallback to Basic if not found
  let actualTemplateId = templateId;
  if (!isValidTemplate(templateId)) {
    console.warn(
      `Template '${templateId}' not found in registry, using Basic instead`,
    );
    actualTemplateId = "Basic";
  }

  // Get the template component
  const TemplateComponent =
    templateRegistry[actualTemplateId as TemplateId].component;

  // Calculate duration from the data
  const durationInFrames =
    data.timings.FPS_INTRO +
    data.timings.FPS_MAIN +
    (data.videoMeta.video.metadata.includeSponsors
      ? data.timings.FPS_OUTRO
      : 30);

  console.log("[compositionId]", compositionId);
  return (
    <Composition
      id={compositionId}
      component={TemplateComponent as any}
      durationInFrames={durationInFrames}
      fps={30}
      width={1080}
      height={1350}
      defaultProps={{
        data,
        templateVariation,
      }}
    />
  );
};
