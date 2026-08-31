import React from "react";
import { AbsoluteFill } from "remotion";
import { GlobalProvider } from "../../../../../../../core/context/GlobalContext";
import { VideoDataProvider } from "../../../../../../../core/context/VideoDataContext";
import { ThemeProvider } from "../../../../../../../core/context/ThemeContext";
import { basicTheme } from "../../../../../../../templates/variants/basic/theme";
import { AnimatedBackground } from "../../../../AnimatedBackground";
import {
  createEffectsSolidTestDataset,
  type EffectsSolidTestDatasetOptions,
} from "./createEffectsSolidTestDataset";

export type EffectsSolidTestProps = EffectsSolidTestDatasetOptions;

/**
 * Isolated effects-solid fixture — palette and preset wire come from the data object.
 */
export const EffectsSolidTestComposition: React.FC<EffectsSolidTestProps> = (
  props,
) => {
  const dataset = createEffectsSolidTestDataset(props);

  return (
    <GlobalProvider settings={basicTheme} data={dataset}>
      <VideoDataProvider>
        <ThemeProvider>
          <AbsoluteFill>
            <AnimatedBackground type={props.presetId ?? "light-leak"} />
          </AbsoluteFill>
        </ThemeProvider>
      </VideoDataProvider>
    </GlobalProvider>
  );
};
