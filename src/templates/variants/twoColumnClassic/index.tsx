import React from "react";
import { BaseTemplate } from "../../base";
import { basicTheme } from "./theme";
import { FixturaDataset } from "../../../core/types/data";

// Import variant-specific components
import { ClassicIntro } from "./components/ClassicIntro";
import { ClassicOutro } from "./components/ClassicOutro";
import { ClassicBackground } from "./components/ClassicBackground";
import { ClassicMain } from "./components/ClassicMain";
import { templateAnimations } from "./animations";
import { UIConfig } from "../../types/settingsConfig";

/**
 * TwoColumnClassic template variant
 */
export const TwoColumnClassic: React.FC<{ data: FixturaDataset }> = ({
  data,
}) => {
  return (
    <BaseTemplate
      data={data}
      settings={basicTheme as unknown as UIConfig}
      introComponent={ClassicIntro}
      outroComponent={ClassicOutro}
      backgroundComponent={ClassicBackground}
      mainComponentLayout={ClassicMain}
      animations={templateAnimations}
    />
  );
};
