// BasicMain.tsx

import React from "react";
import { OneColumn } from "../../../../components/layout/screen/OneColumn";
import { BasicMainHeader } from "./BasicMainHeader";
export const BasicMain: React.FC = () => {
  return <OneColumn Header={BasicMainHeader} />;
};
