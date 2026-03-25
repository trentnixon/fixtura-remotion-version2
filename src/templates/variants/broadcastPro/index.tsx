import React from "react";
import { BaseTemplate } from "../../base";
import { broadcastProTheme } from "./theme";
import { FixturaDataset } from "../../../core/types/data";

import { BroadcastProIntro } from "./components/BroadcastProIntro";
import { BroadcastProOutro } from "./components/BroadcastProOutro";
import { BroadcastProBackground } from "./components/BroadcastProBackground";
import { BroadcastProMain } from "./components/BroadcastProMain";
import { templateAnimations } from "./animations";
import { UIConfig } from "../../types/settingsConfig";

export const BroadcastPro: React.FC<{ data: FixturaDataset }> = ({ data }) => {
  return (
    <BaseTemplate
      data={data}
      settings={broadcastProTheme as unknown as UIConfig}
      introComponent={BroadcastProIntro}
      outroComponent={BroadcastProOutro}
      backgroundComponent={BroadcastProBackground}
      mainComponentLayout={BroadcastProMain}
      animations={templateAnimations}
    />
  );
};
