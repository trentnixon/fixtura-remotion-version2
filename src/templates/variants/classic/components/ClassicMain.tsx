// BasicMain.tsx

import React from "react";
import { OneColumn } from "../../../../components/layout/screen/OneColumn";
import { ClassicMainHeader } from "./ClassicMainHeader";
export const ClassicMain: React.FC = () => {
  return <OneColumn Header={ClassicMainHeader} />;
};
