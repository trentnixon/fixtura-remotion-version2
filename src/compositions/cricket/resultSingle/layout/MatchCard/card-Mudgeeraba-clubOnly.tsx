import React from "react";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useThemeContext } from "../../../../../core/context/ThemeContext";

import { Type_Round_Ground_stacked } from "../Sections/MatchHeader/index";
import { ResultStatementShort, ResultStatementText } from "../Sections/ResultStatement/index";
import { MatchCardProps } from "./_types/MatchCardProps";
import { calculateSectionHeights, calculateDelays } from "./_utils/calculations";

import MudgeerabaSingleTeamHeader from "../Sections/MatchHeader/MudgeerabaSingleTeamHeader";
import { PlayerStatsMudgeeraba } from "../Sections/PlayerStats/index";

const MatchCardMudgeerabaClubOnly: React.FC<MatchCardProps> = ({ match }) => {
  const { animations } = useAnimationContext();
  const { layout } = useThemeContext();
  const { heights } = layout;

  const containerAnimation = animations.container.main.itemContainer;
  const baseDelay = 0;
  const clubHeaderDelay = baseDelay + 5;
  const clubBattingDelay = baseDelay + 10;
  const oppositionHeaderDelay = baseDelay + 20;
  const clubBowlingDelay = baseDelay + 30;
  const headerDelay = baseDelay + 40;

  const teamHeaderHeight = 60;
  const statsHeight = 520;
  const matchHeaderHeight = 80;
  const rowHeight = heights.asset;
  const { headerHeight } = calculateSectionHeights(rowHeight);
  const { headerDelay: statementDelay } = calculateDelays(baseDelay);

  // Club-first layout (like classic): club header → club batting → opposition header → club bowling
  const isHomeClub = match.homeTeam.isClubTeam;
  const clubTeam = isHomeClub ? match.homeTeam : match.awayTeam;
  const oppositionTeam = isHomeClub ? match.awayTeam : match.homeTeam;
  const clubTeamLogo = isHomeClub ? match.teamHomeLogo : match.teamAwayLogo;
  const oppositionTeamLogo = isHomeClub ? match.teamAwayLogo : match.teamHomeLogo;

  const { resultShort, resultSummary } = match;

  return (
    <AnimatedContainer
      type="full"
      className="rounded-none w-auto mx-6 overflow-hidden h-full flex flex-col"
      backgroundColor="none"
      animation={containerAnimation.containerIn}
      animationDelay={baseDelay}
      exitAnimation={containerAnimation.containerOut}
      exitFrame={250}
    >
      {/* Optional club-only result statement at top */}
      {resultSummary && (
        <div className="w-full flex justify-center items-center mb-4">
          <ResultStatementText
            resultSummary={resultSummary}
            delay={statementDelay}
            outerContainer={{ height: headerHeight }}
          />
        </div>
      )}
      {resultShort && !resultSummary && (
        <div className="w-full flex justify-center items-center mb-4">
          <ResultStatementShort
            resultShort={resultShort}
            delay={statementDelay}
            outerContainer={{ height: headerHeight }}
          />
        </div>
      )}

      {/* Three sections grouped closer: 1st inn, 2nd inn, metadata */}
      <div className="flex flex-col gap-1">
        {/* Metadata footer */}
        <Type_Round_Ground_stacked
          type={match.type}
          round={match.round}
          ground={match.ground}
          height={matchHeaderHeight}
          delay={headerDelay}
          className={layout.borderRadius.container}
          backgroundColor="transparent"
          CopyVariant="onContainerCopyNoBg"
        />

        {/* 1st inn: club header + batting */}
        <div className="flex flex-col gap-0">
          <MudgeerabaSingleTeamHeader
            team={clubTeam}
            teamLogo={clubTeamLogo}
            delay={clubHeaderDelay}
            outerContainer={{ height: teamHeaderHeight }}
          />
          <div className="-mb-2" style={{ height: `${statsHeight / 2}px` }}>
            <PlayerStatsMudgeeraba
              Team={clubTeam}
              delay={clubBattingDelay}
              maxPlayersPerStat={3}
              showBatting={true}
              showBowling={false}
            />
          </div>
        </div>

        {/* 2nd inn: opposition header + club bowling */}
        <div className="flex flex-col gap-0">
          <MudgeerabaSingleTeamHeader
            team={oppositionTeam}
            teamLogo={oppositionTeamLogo}
            delay={oppositionHeaderDelay}
            outerContainer={{ height: teamHeaderHeight }}
          />
          <div className="-mb-2" style={{ height: `${statsHeight / 2}px` }}>
            <PlayerStatsMudgeeraba
              Team={clubTeam}
              delay={clubBowlingDelay}
              maxPlayersPerStat={3}
              showBatting={false}
              showBowling={true}
            />
          </div>
        </div>


      </div>
    </AnimatedContainer>
  );
};

export default MatchCardMudgeerabaClubOnly;
