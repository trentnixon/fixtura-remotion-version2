import React from "react";
import { BaseTemplate } from "../../base";
import { basicTheme } from "./theme";
import { FixturaDataset } from "../../../core/types/data";

// Import basic-specific components
import { ClassicIntro } from "./components/ClassicIntro";
import { ClassicOutro } from "./components/ClassicOutro";
import { ClassicBackground } from "./components/ClassicBackground";
import { ClassicMain } from "./components/ClassicMain";
import { templateAnimations } from "./animations";
import { UIConfig } from "../../types/settingsConfig";
/**
 * Classic template variant
 */
export const Classic: React.FC<{ data: FixturaDataset }> = ({ data }) => {
  //console.log("Basic data", data);
  //templateVariation
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
