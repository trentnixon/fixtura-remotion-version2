import React from "react";
import { AnimatedContainer } from "../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { SponsorFooter } from "../../sponsorFooter";
import { buildResultsFooterSponsors } from "../../results/controller/ResultsDisplay/_utils/calculations";
import { LiteFixtureSeparatorClassicTwoColumn } from "../layout/LiteFixtureSeparator-ClassicTwoColumn";
import { LiteGradeHeaderClassicTwoColumn } from "../layout/LiteGradeHeader-ClassicTwoColumn";
import { LiteMatchCardClassicTwoColumn } from "../layout/LiteMatchCard-ClassicTwoColumn";
import { ResultsLiteSequence } from "./upstreamResultsLiteData";

export { RESULTS_LITE_PER_SCREEN as RESULTS_LITE_CLASSIC_TWO_COLUMN_PER_SCREEN } from "./display-Basic";

const ResultsLiteDisplayClassicTwoColumn: React.FC<{
  sequence: ResultsLiteSequence;
}> = ({ sequence }) => {
  const { layout } = useThemeContext();
  const { animations } = useAnimationContext();
  const containerAnimations = animations.container;
  const showGrade =
    sequence.showGradeHeader && sequence.gradeName.trim().length > 0;

  return (
    <div className="flex h-full w-full flex-col">
      <AnimatedContainer
        type="full"
        className="mx-2 flex flex-1 flex-col overflow-hidden p-4"
        style={{
          minHeight: `${layout.heights.asset}px`,
        }}
        backgroundColor="none"
        animation={containerAnimations.main.parent.containerIn}
        animationDelay={0}
        exitAnimation={containerAnimations.main.parent.containerOut}
      >
        <div className="flex h-full w-full flex-1 flex-col justify-center">
          {showGrade ? (
            <LiteGradeHeaderClassicTwoColumn gradeName={sequence.gradeName} />
          ) : null}
          {sequence.fixtures.map((match, fixtureIndex) => (
            <React.Fragment key={match.gameID}>
              {fixtureIndex > 0 ? (
                <LiteFixtureSeparatorClassicTwoColumn
                  fixtureIndex={fixtureIndex}
                />
              ) : null}
              <LiteMatchCardClassicTwoColumn
                match={match}
                index={fixtureIndex}
              />
            </React.Fragment>
          ))}
        </div>
      </AnimatedContainer>
      <div style={{ height: `${layout.heights.footer}px` }}>
        <SponsorFooter
          sponsors={buildResultsFooterSponsors(sequence.fixtures)}
        />
      </div>
    </div>
  );
};

export default ResultsLiteDisplayClassicTwoColumn;
