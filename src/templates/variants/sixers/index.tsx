import React from "react";
import { BaseTemplate } from "../../base";
import { basicTheme } from "./theme";
import { FixturaDataset } from "../../../core/types/data";

// Import basic-specific components
import { SixersIntro } from "./components/SixersIntro";
import { SixersOutro } from "./components/SixersOutro";
import { SixersBackground } from "./components/SixersBackground";
import { SixersMain } from "./components/SixersMain";
import { templateAnimations } from "./animations";
import { UIConfig } from "../../types/settingsConfig";
/**
 * Sixers template variant
 */
export const Sixers: React.FC<{ data: FixturaDataset }> = ({ data }) => {
  //console.log("Basic data", data);
  //templateVariation
  return (
    <BaseTemplate
      data={data}
      settings={basicTheme as unknown as UIConfig}
      introComponent={SixersIntro}
      outroComponent={SixersOutro}
      backgroundComponent={SixersBackground}
      mainComponentLayout={SixersMain}
      animations={templateAnimations}
    />
  );
};
