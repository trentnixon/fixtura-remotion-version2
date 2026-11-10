import React from "react";
import ResultsLiteDisplayBroadcastProRounded from "./controller/display-BroadcastProRounded";
import { ResultsLiteList } from "./controller/ResultsLiteList";

export const BroadcastProRounded: React.FC = () => {
  return <ResultsLiteList Display={ResultsLiteDisplayBroadcastProRounded} />;
};

export default BroadcastProRounded;
