import React from "react";
import ResultsLiteDisplayNightSession from "./controller/display-NightSession";
import { ResultsLiteList } from "./controller/ResultsLiteList";

export const NightSession: React.FC = () => {
  return <ResultsLiteList Display={ResultsLiteDisplayNightSession} />;
};

export default NightSession;
