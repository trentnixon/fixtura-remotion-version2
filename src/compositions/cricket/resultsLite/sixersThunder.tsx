import React from "react";
import ResultsLiteDisplaySixersThunder from "./controller/display-SixersThunder";
import { ResultsLiteList } from "./controller/ResultsLiteList";

export const SixersThunder: React.FC = () => {
  return <ResultsLiteList Display={ResultsLiteDisplaySixersThunder} />;
};

export default SixersThunder;
