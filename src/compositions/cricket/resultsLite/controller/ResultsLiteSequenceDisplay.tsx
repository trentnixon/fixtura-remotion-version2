import React, { useMemo } from "react";
import { AnimatedContainer } from "../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { CricketSponsorFooter } from "../../sponsorFooter/CricketSponsorFooter";
import { SponsorFooter } from "../../sponsorFooter";
import { NightSessionAnimatedShell } from "../../utils/nightSession/NightSessionAnimatedShell";
import { useNightSessionEnterTiming } from "../../utils/nightSession/useNightSessionEnterTiming";
import { NightSessionEnterTimingProvider } from "../../utils/nightSession/NightSessionEnterTimingContext";
import { NIGHT_SESSION_FIXTURE_ROW_STAGGER_FRAMES } from "../../utils/nightSession/nightSessionAnimationTiming";
import { csClass as scorelineCsClass } from "../../utils/scoreline/componentStyles";
import { csClass as overlayCsClass } from "../../utils/overlayFamily";
import {
  BROADCAST_PRO_RESULTS_GAP_PX,
  buildResultsFooterSponsors,
} from "../../results/controller/ResultsDisplay/_utils/calculations";
import {
  calculateCNSWLiteRowHeight,
  calculateCNSWLiteTeamsBlockHeight,
} from "./_utils/cnswLiteLayout";
import { ResultsLiteSequence } from "./upstreamResultsLiteData";
import { LiteMatchRowCNSW } from "../layout/LiteMatchRow-CNSW";
import {
  getResultsLiteVariantConfig,
  type ResultsLiteVariantId,
} from "./resultsLiteVariantMatrix";

export type ResultsLiteSequenceDisplayProps = {
  sequence: ResultsLiteSequence;
  variantId: ResultsLiteVariantId;
};

const ResultsLitePlainFooter: React.FC<{
  fixtures: ResultsLiteSequence["fixtures"];
  footerHeightPx: number;
}> = ({ fixtures, footerHeightPx }) => (
  <div style={{ height: `${footerHeightPx}px` }}>
    <SponsorFooter sponsors={buildResultsFooterSponsors(fixtures)} />
  </div>
);

const ResultsLiteCricketFooter: React.FC<{
  fixtures: ResultsLiteSequence["fixtures"];
  sponsorStripKey: string;
}> = ({ fixtures, sponsorStripKey }) => (
  <CricketSponsorFooter
    sponsors={buildResultsFooterSponsors(fixtures)}
    sponsorStripKey={sponsorStripKey}
  />
);

export const ResultsLiteSequenceDisplay: React.FC<
  ResultsLiteSequenceDisplayProps
> = ({ sequence, variantId }) => {
  const config = getResultsLiteVariantConfig(variantId);
  const { layout, componentStyles } = useThemeContext();
  const { animations } = useAnimationContext();
  const { isAccountClub } = useVideoDataContext();
  const { heights } = layout;
  const assetHeight = heights.asset;
  const showGrade =
    sequence.showGradeHeader && sequence.gradeName.trim().length > 0;
  const footerSponsors = buildResultsFooterSponsors(sequence.fixtures);
  const {
    MatchCard,
    GradeHeader,
    FixtureSeparator,
  } = config.components;

  const gradeName = sequence.gradeName;
  const isNightSession = config.profile === "nightSessionLedger";
  const resultsEnterTimingOptions = useMemo(
    () =>
      isNightSession
        ? { rowStaggerFrames: NIGHT_SESSION_FIXTURE_ROW_STAGGER_FRAMES }
        : undefined,
    [isNightSession],
  );
  const enterTiming = useNightSessionEnterTiming(
    isNightSession ? sequence.fixtures.length : 0,
    "FPS_SCORECARD",
    undefined,
    resultsEnterTimingOptions,
  );

  const renderFooter = () => {
    if (config.footer === "cricketSponsor" && config.sponsorStripKey) {
      return (
        <ResultsLiteCricketFooter
          fixtures={sequence.fixtures}
          sponsorStripKey={config.sponsorStripKey}
        />
      );
    }
    return (
      <ResultsLitePlainFooter
        fixtures={sequence.fixtures}
        footerHeightPx={heights.footer}
      />
    );
  };

  const inlineGradeForIndex = (fixtureIndex: number) =>
    config.gradePlacement === "inlineFirstCard" &&
    showGrade &&
    fixtureIndex === 0
      ? gradeName
      : undefined;

  switch (config.profile) {
    case "stackedGap": {
      return (
        <div className="flex h-full w-full flex-col">
          <div
            className={`flex w-full flex-col items-stretch px-8 ${config.assetJustifyCenter ? "justify-center" : ""}`}
            style={{
              height: `${assetHeight}px`,
              gap: `${config.stackedGapPx ?? 30}px`,
            }}
          >
            {config.gradePlacement === "header" && showGrade && GradeHeader ? (
              <GradeHeader gradeName={gradeName} />
            ) : null}
            {sequence.fixtures.map((match, fixtureIndex) => (
              <div key={match.gameID} className="w-full">
                <MatchCard
                  match={match}
                  index={fixtureIndex}
                  gradeHeader={inlineGradeForIndex(fixtureIndex)}
                />
              </div>
            ))}
          </div>
          {renderFooter()}
        </div>
      );
    }

    case "classicSeparated":
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
          {renderFooter()}
        </div>
      );

    case "classicTwoColumnAnimated": {
      const containerAnimations = animations.container;
      return (
        <div className="flex h-full w-full flex-col">
          <AnimatedContainer
            type="full"
            className="mx-2 flex flex-1 flex-col overflow-hidden p-4"
            style={{
              minHeight: `${assetHeight}px`,
            }}
            backgroundColor="none"
            animation={containerAnimations.main.parent.containerIn}
            animationDelay={0}
            exitAnimation={containerAnimations.main.parent.containerOut}
          >
            <div className="flex h-full w-full flex-1 flex-col justify-center">
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
          </AnimatedContainer>
          {renderFooter()}
        </div>
      );
    }

    case "mudgeerabaSeparated":
      return (
        <div className="flex h-full w-full flex-col">
          <div
            className="flex w-full flex-col justify-center"
            style={{ height: `${assetHeight}px` }}
          >
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
          {renderFooter()}
        </div>
      );

    case "broadcastProGap":
      return (
        <div className="flex h-full w-full flex-col">
          <div
            className="flex w-full flex-col justify-center overflow-hidden"
            style={{ height: `${assetHeight}px` }}
          >
            {showGrade && GradeHeader ? (
              <GradeHeader gradeName={gradeName} />
            ) : null}
            <div
              className="flex w-full flex-col"
              style={{ gap: `${BROADCAST_PRO_RESULTS_GAP_PX}px` }}
            >
              {sequence.fixtures.map((match, fixtureIndex) => (
                <MatchCard key={match.gameID} match={match} index={fixtureIndex} />
              ))}
            </div>
          </div>
          {renderFooter()}
        </div>
      );

    case "cnswRows": {
      const teamsBlockHeight = calculateCNSWLiteTeamsBlockHeight(assetHeight);
      return (
        <div className="flex h-full w-full flex-col">
          <div
            className="flex w-full flex-col justify-center"
            style={{ height: `${assetHeight}px` }}
          >
            {showGrade && GradeHeader ? (
              <GradeHeader gradeName={gradeName} />
            ) : null}
            {sequence.fixtures.map((match, index) => (
              <div
                key={match.gameID}
                className="w-full"
                style={{
                  height: `${calculateCNSWLiteRowHeight(assetHeight, match, isAccountClub)}px`,
                  marginBottom: index < sequence.fixtures.length - 1 ? 10 : 0,
                }}
              >
                <LiteMatchRowCNSW
                  match={match}
                  index={index}
                  teamsBlockHeight={teamsBlockHeight}
                />
              </div>
            ))}
          </div>
          {renderFooter()}
        </div>
      );
    }

    case "scorelineLedger": {
      const panelAnimation = animations.container.main.itemContainerOuter;
      return (
        <div
          className={scorelineCsClass(componentStyles, "scorelineDisplayColumn")}
          style={{ height: `${assetHeight + heights.footer}px` }}
        >
          <AnimatedContainer
            type="full"
            className={scorelineCsClass(
              componentStyles,
              "scorelineAnimatedShell",
            )}
            backgroundColor="none"
            animation={panelAnimation.containerIn}
            exitAnimation={panelAnimation.containerOut}
          >
            <main
              className={`results-ledger results-lite-scoreline-ledger ${scorelineCsClass(componentStyles, "scorelineResultsLedger")}`}
              style={{
                height: `${assetHeight}px`,
                maxHeight: `${assetHeight}px`,
              }}
            >
              {showGrade && GradeHeader ? (
                <GradeHeader gradeName={gradeName} />
              ) : null}
              {sequence.fixtures.map((match, fixtureIndex) => (
                <MatchCard
                  key={match.gameID}
                  match={match}
                  index={fixtureIndex}
                />
              ))}
            </main>
          </AnimatedContainer>
          <CricketSponsorFooter
            sponsors={footerSponsors}
            sponsorStripKey={config.sponsorStripKey ?? "scorelineResultsSponsorStrip"}
          />
        </div>
      );
    }

    case "nightSessionLedger":
      return (
        <div
          className={overlayCsClass(
            componentStyles,
            "nightSessionDisplayColumn",
          )}
          style={{ height: `${assetHeight + heights.footer}px` }}
        >
          <NightSessionAnimatedShell
            className={overlayCsClass(
              componentStyles,
              "nightSessionAnimatedShell",
            )}
            animateShell={false}
          >
            <main
              className={`results-ledger flex min-h-0 flex-1 flex-col overflow-hidden ${overlayCsClass(componentStyles, "nightSessionResultsLedger")}`}
              style={{
                height: `${assetHeight}px`,
                maxHeight: `${assetHeight}px`,
              }}
            >
              {showGrade && GradeHeader ? (
                <GradeHeader gradeName={gradeName} />
              ) : null}
              <NightSessionEnterTimingProvider value={enterTiming}>
                {sequence.fixtures.map((match, fixtureIndex) => (
                  <MatchCard
                    key={match.gameID}
                    match={match}
                    index={fixtureIndex}
                  />
                ))}
              </NightSessionEnterTimingProvider>
            </main>
          </NightSessionAnimatedShell>
          <CricketSponsorFooter
            sponsors={footerSponsors}
            sponsorStripKey={
              config.sponsorStripKey ?? "nightSessionResultsSponsorStrip"
            }
          />
        </div>
      );

    default: {
      const _exhaustive: never = config.profile;
      return _exhaustive;
    }
  }
};
