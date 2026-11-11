import React from "react";
import { ResultsLiteSequence } from "./upstreamResultsLiteData";
import {
  getResultsLiteVariantConfig,
  type ResultsLiteVariantId,
} from "./resultsLiteVariantMatrix";
import { renderResultsLiteLayoutProfile } from "./profiles/resultsLiteProfileRegistry";

export type ResultsLiteSequenceDisplayProps = {
  sequence: ResultsLiteSequence;
  variantId: ResultsLiteVariantId;
};

export const ResultsLiteSequenceDisplay: React.FC<
  ResultsLiteSequenceDisplayProps
> = ({ sequence, variantId }) => {
  const config = getResultsLiteVariantConfig(variantId);
  return renderResultsLiteLayoutProfile(config.profile, { sequence, config });
};
