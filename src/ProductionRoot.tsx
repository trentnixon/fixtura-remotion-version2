import React from "react";
import { Composition, getInputProps } from "remotion";
import { getProductionCompositionFromData } from "./core/preview/getProductionCompositionFromData";
import { FixturaDataset } from "./core/types/data/index";
import { LuminanceTestRoot } from "./components/backgrounds/variants/Luminance/test/LuminanceTestRoot";
import { GeneratedPhase0Root } from "./components/backgrounds/variants/Generated/test/GeneratedPhase0Root";

/**
 * Production environment for rendering
 */
export const ProductionRoot: React.FC = () => {
  const inputProps = getInputProps() as { data?: FixturaDataset };
  const { data } = inputProps;

  return (
    <>
      <LuminanceTestRoot />
      {/* Phase 0 audit comps: remotion still uses ProductionRoot when NODE_ENV=production */}
      <GeneratedPhase0Root />
      {data ? (
        <ProductionCompositionFromDataset data={data} />
      ) : null}
    </>
  );
};

const ProductionCompositionFromDataset: React.FC<{ data: FixturaDataset }> = ({
  data,
}) => {
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
