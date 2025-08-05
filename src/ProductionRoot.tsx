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
  const videoType = data.videoMeta.video;
  const { appearance, templateVariation, metadata } = videoType;

  const templateId = appearance.template || null;
  const useBackground = templateVariation.useBackground || "Solid";
  const compositionId = metadata.compositionId || null;

  if (!templateId) {
    throw new Error("No template ID provided for production render");
  }

  if (!useBackground) {
    throw new Error("No useBackground provided for production render");
  }

  if (!compositionId) {
    throw new Error("No composition ID provided for production render");
  }

  // Get the template component
  const TemplateComponent =
    templateRegistry[templateId as TemplateId].component;
  const remoteCompositionId = `${templateId}-${useBackground}-${compositionId}`;
  // Calculate duration from the data
  const durationInFrames =
    (data.timings.FPS_INTRO ?? 0) +
    (data.timings.FPS_MAIN ?? 0) +
    (data.videoMeta.video.metadata.includeSponsors
      ? (data.timings.FPS_OUTRO ?? 0)
      : 30);

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
