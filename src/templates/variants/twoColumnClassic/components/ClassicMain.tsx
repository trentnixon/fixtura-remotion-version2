// BasicMain.tsx

import React from "react";

import { TwoColumn } from "../../../../components/layout/screen/TwoColumn";
import { ClassicMainHeaderRotated } from "./ClassicMainHeaderRotated";
export const ClassicMain: React.FC = () => {
  return (
    <TwoColumn
      Header={ClassicMainHeaderRotated}
      headerWidthPercent={18}
      headerPosition="left"
      gapPx={0}
    />
  );
};
