import React from "react";
import { Composition, getInputProps } from "remotion";
import { getProductionCompositionFromData } from "./core/preview/getProductionCompositionFromData";
import { FixturaDataset } from "./core/types/data/index";
import {
  EffectsSolidTestComposition,
  type EffectsSolidTestProps,
} from "./components/backgrounds/variants/Generated/renderers/effects-solid/test/EffectsSolidTestComposition";

const VIDEO = {
  fps: 30,
  width: 1080,
  height: 1350,
} as const;

export const EFFECTS_SOLID_BACKGROUND_TEST_ID = "EffectsSolid-Background-Test";

const defaultEffectsSolidTestProps: Required<EffectsSolidTestProps> = {
  presetId: "light-leak",
  primary: "#FF0000",
  secondary: "#004DE2",
  compositionId: "EffectsSolidTest",
};

const renderEffectsSolidBackgroundTest = (
  defaultProps: EffectsSolidTestProps = defaultEffectsSolidTestProps,
) => (
  <Composition
    id={EFFECTS_SOLID_BACKGROUND_TEST_ID}
    component={EffectsSolidTestComposition}
    durationInFrames={360}
    fps={VIDEO.fps}
    width={VIDEO.width}
    height={VIDEO.height}
    defaultProps={defaultProps}
  />
);

/**
 * Production environment for rendering
 */
export const ProductionRoot: React.FC = () => {
  const inputProps = getInputProps() as {
    data?: FixturaDataset;
  } & EffectsSolidTestProps;

  if (!inputProps.data) {
    return renderEffectsSolidBackgroundTest({
      presetId: inputProps.presetId ?? defaultEffectsSolidTestProps.presetId,
      primary: inputProps.primary ?? defaultEffectsSolidTestProps.primary,
      secondary: inputProps.secondary ?? defaultEffectsSolidTestProps.secondary,
      compositionId:
        inputProps.compositionId ?? defaultEffectsSolidTestProps.compositionId,
    });
  }

  const { data } = inputProps;
  const { TemplateComponent, remoteCompositionId, durationInFrames } =
    getProductionCompositionFromData(data);

  return (
    <>
      {renderEffectsSolidBackgroundTest()}
      <Composition
        id={remoteCompositionId}
        component={TemplateComponent}
        durationInFrames={durationInFrames}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{
          data,
        }}
      />
    </>
  );
};
