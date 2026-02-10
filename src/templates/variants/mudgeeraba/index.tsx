import React from "react";
import { BaseTemplate } from "../../base";
import { mudgeerabaTheme } from "./theme";
import { FixturaDataset } from "../../../core/types/data";

// Import mudgeeraba-specific components
import { MudgeerabaIntro } from "./components/MudgeerabaIntro";
import { MudgeerabaOutro } from "./components/MudgeerabaOutro";
import { MudgeerabaBackground } from "./components/MudgeerabaBackground";
import { MudgeerabaMain } from "./components/MudgeerabaMain";
import { templateAnimations } from "./animations";
import { UIConfig } from "../../types/settingsConfig";

/**
 * Mudgeeraba template variant
 */
export const Mudgeeraba: React.FC<{ data: FixturaDataset }> = ({ data }) => {
  return (
    <BaseTemplate
      data={data}
      settings={mudgeerabaTheme as unknown as UIConfig}
      introComponent={MudgeerabaIntro}
      outroComponent={MudgeerabaOutro}
      backgroundComponent={MudgeerabaBackground}
      mainComponentLayout={MudgeerabaMain}
      animations={templateAnimations}
    />
  );
};
