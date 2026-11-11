import React from "react";
import { getResultsLiteGradeState } from "./resultsLiteGrade";
import { ResultsLiteSequenceFooter } from "./ResultsLiteSequenceFooter";
import type { ResultsLiteProfileProps } from "./resultsLiteProfileTypes";

export const ClassicSeparatedResultsLiteProfile: React.FC<
  ResultsLiteProfileProps
> = ({ sequence, config }) => {
  const { gradeName, showGrade } = getResultsLiteGradeState(sequence, config);
  const { MatchCard, GradeHeader, FixtureSeparator } = config.components;

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex w-full flex-col items-stretch justify-center px-8">
        {showGrade && GradeHeader ? (
          <GradeHeader gradeName={gradeName} />
        ) : null}
        {sequence.fixtures.map((match, fixtureIndex) => (
          <React.Fragment key={match.gameID}>
            {fixtureIndex > 0 && FixtureSeparator ? (
              <FixtureSeparator fixtureIndex={fixtureIndex} />
            ) : null}
            <MatchCard match={match} index={fixtureIndex} />
          </React.Fragment>
        ))}
      </div>
      <ResultsLiteSequenceFooter sequence={sequence} config={config} />
    </div>
  );
};
