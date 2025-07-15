import React from "react";
import { BaseTemplate } from "../../base";
import { basicTheme } from "./theme";
import { FixturaDataset } from "../../../core/types/data";

// Import basic-specific components
import { BasicIntro } from "./components/BasicIntro";
import { BasicOutro } from "./components/BasicOutro";
import { BasicBackground } from "./components/BasicBackground";
import { BasicMain } from "./components/BasicMain";
import { templateAnimations } from "./animations";
import { UIConfig } from "../../types/settingsConfig";
/**
 * Basic template variant
 */
export const Basic: React.FC<{ data: FixturaDataset }> = ({ data }) => {
  //console.log("Basic data", data);
  //templateVariation
  return (
    <BaseTemplate
      data={data}
      settings={basicTheme as unknown as UIConfig}
      introComponent={BasicIntro}
      outroComponent={BasicOutro}
      backgroundComponent={BasicBackground}
      mainComponentLayout={BasicMain}
      animations={templateAnimations}
    />
  );
};
