import React from "react";
import { ResultsLiteSequenceDisplay } from "./ResultsLiteSequenceDisplay";
import type { ResultsLiteDisplayProps } from "./ResultsLiteList";
import type { ResultsLiteVariantId } from "./resultsLiteVariantMatrix";

const displayByVariant = new Map<
  ResultsLiteVariantId,
  React.FC<ResultsLiteDisplayProps>
>();

export const getResultsLiteDisplayComponent = (
  variantId: ResultsLiteVariantId,
): React.FC<ResultsLiteDisplayProps> => {
  const cached = displayByVariant.get(variantId);
  if (cached) {
    return cached;
  }

  const Display: React.FC<ResultsLiteDisplayProps> = (props) => (
    <ResultsLiteSequenceDisplay {...props} variantId={variantId} />
  );
  Display.displayName = `ResultsLiteDisplay(${variantId})`;
  displayByVariant.set(variantId, Display);
  return Display;
};
