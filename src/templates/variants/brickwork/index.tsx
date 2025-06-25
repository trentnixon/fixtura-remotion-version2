import React from "react";
import { BaseTemplate } from "../../base";
import { brickworkTheme } from "./theme";
import { FixturaDataset } from "../../../core/types/data";

// Import brickwork-specific components
import { BrickworkIntro } from "./components/brickworkIntro";
import { BrickworkOutro } from "./components/brickworkOutro";
import { BrickworkBackground } from "./components/brickworkBackground";
import { BrickworkMain } from "./components/brickworkMain";
import { templateAnimations } from "./animations";
import { UIConfig } from "../../types/settingsConfig";
/**
 * Brickwork template variant
 */
export const Brickwork: React.FC<{ data: FixturaDataset }> = ({ data }) => {
  //console.log("Brickwork data", data);
  return (
    <BaseTemplate
      data={data}
      settings={brickworkTheme as unknown as UIConfig}
      introComponent={BrickworkIntro}
      outroComponent={BrickworkOutro}
      backgroundComponent={BrickworkBackground}
      mainComponentLayout={BrickworkMain}
      animations={templateAnimations}
    />
  );
};
