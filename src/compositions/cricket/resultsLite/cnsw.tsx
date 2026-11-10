import React from "react";
import ResultsLiteDisplayCNSW from "./controller/display-CNSW";
import { ResultsLiteList } from "./controller/ResultsLiteList";

export const CNSW: React.FC = () => {
  return <ResultsLiteList Display={ResultsLiteDisplayCNSW} />;
};

export default CNSW;
