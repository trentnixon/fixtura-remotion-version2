import React from "react";
import ResultsLiteDisplayBasic from "./controller/display-Basic";
import { ResultsLiteList } from "./controller/ResultsLiteList";

export const Basic: React.FC = () => {
  return <ResultsLiteList Display={ResultsLiteDisplayBasic} />;
};

export default Basic;
