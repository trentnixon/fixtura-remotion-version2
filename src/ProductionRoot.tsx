import React from "react";
import { Composition, getInputProps } from "remotion";
import { templateRegistry, TemplateId } from "./templates/registry";
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
  const appearance = data.videoMeta.video.appearance;
  const templateId = appearance.template || null;
  const type = appearance.type || null;
  const compositionId = data.videoMeta.video.metadata.compositionId || null;

  if (!templateId) {
    throw new Error("No template ID provided for production render");
  }

  if (!type) {
    throw new Error("No type provided for production render");
  }

  if (!compositionId) {
    throw new Error("No composition ID provided for production render");
  }

  // Get the template component
  const TemplateComponent =
    templateRegistry[templateId as TemplateId].component;

  // Calculate duration from the data
  const durationInFrames =
    data.timings.FPS_INTRO +
    data.timings.FPS_MAIN +
    (data.videoMeta.video.metadata.includeSponsors
      ? data.timings.FPS_OUTRO
      : 30);

  console.log("[compositionId]", compositionId);
  const remoteCompositionId = `${templateId}-${type}-${compositionId}`;
  return (
    <Composition
      id={remoteCompositionId}
      component={TemplateComponent as any}
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
