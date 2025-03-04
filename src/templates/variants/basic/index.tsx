import React from "react";
import { BaseTemplate } from "../../base";
import { basicTheme } from "./theme";

// Import basic-specific components
import { BasicIntro } from "./components/BasicIntro";
import { BasicOutro } from "./components/BasicOutro";
import { BasicBackground } from "./components/BasicBackground";

/**
 * Basic template variant
 */
export const Basic: React.FC<{ DATA: any }> = ({ DATA }) => {
  console.log("Basic template variant");
  console.log("DATA", DATA);
  return (
    <BaseTemplate
      DATA={DATA}
      settings={basicTheme}
      introComponent={BasicIntro}
      outroComponent={BasicOutro}
      backgroundComponent={BasicBackground}
    />
  );
};
