import React from "react";
import { BaseTemplate } from "../../base";
import { cnswTheme } from "./theme";
import { FixturaDataset } from "../../../core/types/data";

import { CNSWIntro } from "./components/CNSWIntro";
import { CNSWOutro } from "./components/CNSWOutro";
import { CNSWBackground } from "./components/CNSWBackground";
import { CNSWMain } from "./components/CNSWMain";
import { templateAnimations } from "./animations";
import { UIConfig } from "../../types/settingsConfig";

export const CNSWPrivate: React.FC<{ data: FixturaDataset }> = ({ data }) => {
  return (
    <BaseTemplate
      data={data}
      settings={cnswTheme as unknown as UIConfig}
      introComponent={CNSWIntro}
      outroComponent={CNSWOutro}
      backgroundComponent={CNSWBackground}
      mainComponentLayout={CNSWMain}
      animations={templateAnimations}
    />
  );
};
