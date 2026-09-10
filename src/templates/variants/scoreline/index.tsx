import React from "react";
import { BaseTemplate } from "../../base";
import { scorelineTheme } from "./theme";
import { FixturaDataset } from "../../../core/types/data";
import { ScorelineIntro } from "./components/ScorelineIntro";
import { ScorelineOutro } from "./components/ScorelineOutro";
import { ScorelineBackground } from "./components/ScorelineBackground";
import { ScorelineMain } from "./components/ScorelineMain";
import { templateAnimations } from "./animations";
import { UIConfig } from "../../types/settingsConfig";

export const Scoreline: React.FC<{ data: FixturaDataset }> = ({ data }) => {
  return (
    <BaseTemplate
      data={data}
      settings={scorelineTheme as unknown as UIConfig}
      introComponent={ScorelineIntro}
      outroComponent={ScorelineOutro}
      backgroundComponent={ScorelineBackground}
      mainComponentLayout={ScorelineMain}
      animations={templateAnimations}
    />
  );
};
