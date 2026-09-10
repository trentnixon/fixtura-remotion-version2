import React from "react";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { GameCardProps } from "./_types/GameCardProps";
import {
  calculateAnimationDelay,
  calculateAnimationOutFrame,
  FAST_DELAY_MULTIPLIER,
} from "./_utils/calculations";
import { formatGroundLocation } from "../../../utils/utils-text";
import {
  ScorelineFixtureCentre,
  ScorelineFixtureGrade,
  ScorelineFixtureMatchup,
} from "../../../utils/scoreline/fixture/ScorelineFixturePrimitives";
import { teamMatchesClub } from "../../../utils/scoreline/teamMatchesClub";

export const GameCardScoreline: React.FC<GameCardProps> = ({
  game,
  index,
  gameRowHeight,
}) => {
  const { data, club } = useVideoDataContext();
  const { timings } = data;
  const { animations } = useAnimationContext();
  const containerAnimation = animations.container.main.itemContainer;

  const delay = calculateAnimationDelay(index, FAST_DELAY_MULTIPLIER);
  const animationOutFrame = calculateAnimationOutFrame(timings);
  const clubName = club?.name;
  const homeIsClub = teamMatchesClub(game.teamHome, clubName);
  const awayIsClub = teamMatchesClub(game.teamAway, clubName);

  return (
    <section
      className="fixture-card"
      style={
        gameRowHeight == null
          ? undefined
          : { height: gameRowHeight, flex: `0 0 ${gameRowHeight}px` }
      }
    >
      <AnimatedContainer
        type="full"
        size="full"
        className="flex h-full w-full flex-col rounded-none"
        backgroundColor="none"
        animation={containerAnimation.containerIn}
        animationDelay={delay}
        exitAnimation={containerAnimation.containerOut}
        exitFrame={animationOutFrame}
      >
        <ScorelineFixtureGrade
          gradeName={game.gradeName}
          metaChips={[game.type, game.round ?? "", game.ageGroup].filter(Boolean)}
        />
        <ScorelineFixtureMatchup
          home={{
            sideLabel: "Home",
            teamName: game.teamHome,
            logoUrl: game.teamHomeLogo?.url,
            isClubTeam: homeIsClub,
          }}
          away={{
            sideLabel: "Away",
            teamName: game.teamAway,
            logoUrl: game.teamAwayLogo?.url,
            isClubTeam: awayIsClub,
          }}
          centre={
            <ScorelineFixtureCentre
              date={game.date}
              time={game.time}
              ground={formatGroundLocation(game.ground)}
            />
          }
        />
      </AnimatedContainer>
    </section>
  );
};

export default GameCardScoreline;
