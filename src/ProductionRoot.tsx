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
  const { DATA } = getInputProps() as { DATA: FixturaDataset };

  // If no data, use a fallback for testing
  if (!DATA) {
    throw new Error("No data provided for production render");
  }

  // Extract template information from the data
  const templateId = DATA.VIDEOMETA.Video.Template || "Basic";
  const compositionId = DATA.VIDEOMETA.Video.CompositionID || "Ladder";
  const templateVariation = DATA.VIDEOMETA.Video.TemplateVariation || {};

  console.log(`Production render for template: ${templateId}`);
  console.log(`CompositionID: ${compositionId}`);
  console.log(`Template Variation:`, templateVariation);

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
    DATA.TIMINGS.FPS_INTRO +
    DATA.TIMINGS.FPS_MAIN +
    (DATA.VIDEOMETA.Video.includeSponsors ? DATA.TIMINGS.FPS_OUTRO : 30);

  return (
    <Composition
      id={compositionId}
      component={TemplateComponent as any}
      durationInFrames={durationInFrames}
      fps={30}
      width={1080}
      height={1350}
      defaultProps={{
        DATA,
        templateVariation,
      }}
    />
  );
};
