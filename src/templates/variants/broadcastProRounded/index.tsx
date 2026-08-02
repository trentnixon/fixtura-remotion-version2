import React from "react";
import { BaseTemplate } from "../../base";
import { broadcastProRoundedTheme } from "./theme";
import { FixturaDataset } from "../../../core/types/data";

import { BroadcastProRoundedIntro } from "./components/BroadcastProRoundedIntro";
import { BroadcastProRoundedOutro } from "./components/BroadcastProRoundedOutro";
import { BroadcastProRoundedBackground } from "./components/BroadcastProRoundedBackground";
import { BroadcastProRoundedMain } from "./components/BroadcastProRoundedMain";
import { templateAnimations } from "./animations";
import { UIConfig } from "../../types/settingsConfig";

export const BroadcastProRounded: React.FC<{ data: FixturaDataset }> = ({ data }) => {
  return (
    <BaseTemplate
      data={data}
      settings={broadcastProRoundedTheme as unknown as UIConfig}
      introComponent={BroadcastProRoundedIntro}
      outroComponent={BroadcastProRoundedOutro}
      backgroundComponent={BroadcastProRoundedBackground}
      mainComponentLayout={BroadcastProRoundedMain}
      animations={templateAnimations}
    />
  );
};
