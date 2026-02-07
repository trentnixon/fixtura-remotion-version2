import React from "react";
import { FixturaDataset } from "../../../core/types/data";
import { UIConfig } from "../../types/settingsConfig";
import { AnimationConfig } from "../../types/AnimationConfig ";

export interface BaseTemplateProps {
  data: FixturaDataset;
  settings: UIConfig;
  introComponent?: React.FC;
  outroComponent?: React.FC<{ doesAccountHaveSponsors: boolean }>;
  backgroundComponent?: React.FC;
  customAudioComponent?: React.FC;
  mainComponentLayout?: React.FC;
  animations: AnimationConfig;
}
