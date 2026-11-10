import React from "react";
import ResultsLiteDisplayBrickWork from "./controller/display-BrickWork";
import { ResultsLiteList } from "./controller/ResultsLiteList";

export const BrickWork: React.FC = () => {
  return <ResultsLiteList Display={ResultsLiteDisplayBrickWork} />;
};

export default BrickWork;
