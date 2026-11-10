import React from "react";
import ResultsLiteDisplayScoreline from "./controller/display-Scoreline";
import { ResultsLiteList } from "./controller/ResultsLiteList";

export const Scoreline: React.FC = () => {
  return <ResultsLiteList Display={ResultsLiteDisplayScoreline} />;
};

export default Scoreline;
