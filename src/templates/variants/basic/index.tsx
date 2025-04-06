import React from "react";
import { BaseTemplate } from "../../base";
import { basicTheme } from "./theme";

// Import basic-specific components
import { BasicIntro } from "./components/BasicIntro";
import { BasicOutro } from "./components/BasicOutro";
import { BasicBackground } from "./components/BasicBackground";
import { BasicMain } from "./components/BasicMain";
import { templateAnimations } from "./animations";
/**
 * Basic template variant
 */
export const Basic: React.FC<{ data: any }> = ({ data }) => {
  return (
    <BaseTemplate
      data={data}
      settings={basicTheme}
      introComponent={BasicIntro}
      outroComponent={BasicOutro}
      backgroundComponent={BasicBackground}
      mainComponentLayout={BasicMain}
      animations={templateAnimations}
    />
  );
};
