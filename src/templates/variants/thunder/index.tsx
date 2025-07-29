import React from "react";
import { BaseTemplate } from "../../base";
import { basicTheme } from "./theme";
import { FixturaDataset } from "../../../core/types/data";

// Import basic-specific components
import { ThunderIntro } from "./components/ThunderIntro";
import { ThunderOutro } from "./components/ThunderOutro";
import { ThunderBackground } from "./components/ThunderBackground";
import { ThunderMain } from "./components/ThunderMain";
import { templateAnimations } from "./animations";
import { UIConfig } from "../../types/settingsConfig";
/**
 * Sixers template variant
 */
export const Thunder: React.FC<{ data: FixturaDataset }> = ({ data }) => {
  //console.log("Basic data", data);
  //templateVariation
  return (
    <BaseTemplate
      data={data}
      settings={basicTheme as unknown as UIConfig}
      introComponent={ThunderIntro}
      outroComponent={ThunderOutro}
      backgroundComponent={ThunderBackground}
      mainComponentLayout={ThunderMain}
      animations={templateAnimations}
    />
  );
};
