// BrickworkMain.tsx

import React from "react";
import { OneColumn } from "../../../../components/layout/screen/OneColumn";
import { BrickworkAssetAtmosphere } from "../design";
import { BrickworkMainHeader } from "./brickworkMainHeader";

export const BrickworkMain: React.FC = () => {
  return (
    <BrickworkAssetAtmosphere className="h-full w-full">
      <OneColumn Header={BrickworkMainHeader} />
    </BrickworkAssetAtmosphere>
  );
};
