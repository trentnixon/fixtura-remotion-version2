import React from "react";
import ResultsLiteDisplayBroadcastPro from "./controller/display-BroadcastPro";
import { ResultsLiteList } from "./controller/ResultsLiteList";

export const BroadcastPro: React.FC = () => {
  return <ResultsLiteList Display={ResultsLiteDisplayBroadcastPro} />;
};

export default BroadcastPro;
