import React from "react";
import { ResultsLiteList } from "./ResultsLiteList";
import { getResultsLiteDisplayComponent } from "./createResultsLiteDisplay";
import {
  getResultsLiteFixturesPerScreen,
  resolveResultsLiteVariantId,
  type ResultsLiteCompositionVariantKey,
} from "./resultsLiteVariantMatrix";

export const createResultsLiteComposition = (
  compositionKey: ResultsLiteCompositionVariantKey,
): React.FC => {
  const variantId = resolveResultsLiteVariantId(compositionKey);
  const Display = getResultsLiteDisplayComponent(variantId);
  const fixturesPerScreen = getResultsLiteFixturesPerScreen(variantId);

  const Composition: React.FC = () => (
    <ResultsLiteList Display={Display} fixturesPerScreen={fixturesPerScreen} />
  );
  Composition.displayName = `ResultsLite(${compositionKey})`;
  return Composition;
};
