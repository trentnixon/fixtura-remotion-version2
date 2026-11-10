import React from "react";
import ResultsLiteDisplayCNSW from "./controller/display-CNSW";
import { ResultsLiteList } from "./controller/ResultsLiteList";

/** Same layout/styling as CNSW Results Lite; shell uses CNSWPrivate template theme. */
export const CNSWPrivate: React.FC = () => {
  return <ResultsLiteList Display={ResultsLiteDisplayCNSW} />;
};

export default CNSWPrivate;
