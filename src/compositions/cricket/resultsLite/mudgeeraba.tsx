import React from "react";
import ResultsLiteDisplayMudgeeraba from "./controller/display-Mudgeeraba";
import { ResultsLiteList } from "./controller/ResultsLiteList";

export const Mudgeeraba: React.FC = () => {
  return <ResultsLiteList Display={ResultsLiteDisplayMudgeeraba} />;
};

export default Mudgeeraba;
