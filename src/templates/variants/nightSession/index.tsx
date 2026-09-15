import React from "react";
import { BaseTemplate } from "../../base";
import { nightSessionTheme } from "./theme";
import { FixturaDataset } from "../../../core/types/data";
import { NightSessionIntro } from "./components/NightSessionIntro";
import { BroadcastProOutro } from "../broadcastPro/components/BroadcastProOutro";
import { NightSessionBackground } from "./components/NightSessionBackground";
import { NightSessionMain } from "./components/NightSessionMain";
import { nightSessionAnimations } from "./animations";
import { UIConfig } from "../../types/settingsConfig";

export const NightSession: React.FC<{ data: FixturaDataset }> = ({ data }) => {
  return (
    <BaseTemplate
      data={data}
      settings={nightSessionTheme as unknown as UIConfig}
      introComponent={NightSessionIntro}
      outroComponent={BroadcastProOutro}
      backgroundComponent={NightSessionBackground}
      mainComponentLayout={NightSessionMain}
      animations={nightSessionAnimations}
    />
  );
};
