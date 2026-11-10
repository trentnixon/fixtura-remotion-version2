import React from "react";
import ResultsLiteDisplayClassic from "./controller/display-Classic";
import { ResultsLiteList } from "./controller/ResultsLiteList";

export const Classic: React.FC = () => {
  return <ResultsLiteList Display={ResultsLiteDisplayClassic} />;
};

export default Classic;
