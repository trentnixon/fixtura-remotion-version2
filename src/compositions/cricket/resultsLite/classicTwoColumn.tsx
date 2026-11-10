import React from "react";
import ResultsLiteDisplayClassicTwoColumn from "./controller/display-ClassicTwoColumn";
import { ResultsLiteList } from "./controller/ResultsLiteList";

export const ClassicTwoColumn: React.FC = () => {
  return <ResultsLiteList Display={ResultsLiteDisplayClassicTwoColumn} />;
};

export default ClassicTwoColumn;
