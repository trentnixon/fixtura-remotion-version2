// BasicMain.tsx

import React from "react";
import { OneColumn } from "../../../../components/layout/screen/OneColumn";

import { BasicMainHeader } from "./BasicMainHeader";
import { BasicMainSponsor } from "./BasicMainSponsor";
export const BasicMain: React.FC = () => {
  return <OneColumn Header={BasicMainHeader} Sponsor={BasicMainSponsor} />;
};
