// src/compositions/cricket/top5/basic.tsx
import React from "react";
import { AbsoluteFill } from "remotion";
import { FixturaDataset } from "../../../core/types/data/index";

interface Top5Props {
  DATA: FixturaDataset;
}

export const Basic: React.FC<Top5Props> = ({ DATA }) => {
  return <AbsoluteFill>Basic Template - Cricket Top 5</AbsoluteFill>;
};
