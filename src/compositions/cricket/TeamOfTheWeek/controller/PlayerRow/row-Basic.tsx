import React from "react";
import { TeamOfTheWeekPlayer, PLAYER_STAGGER_DELAY } from "../../types";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { Img } from "remotion";
import { TeamOfTheWeekPlayerName } from "../../../utils/primitives/TeamOfTheWeekPlayerName";
import { TeamOfTheWeekTeam } from "../../../utils/primitives/TeamOfTheWeekTeam";
import { TeamOfTheWeekType } from "../../../utils/primitives/TeamOfTheWeekType";
import { TeamOfTheWeekStat } from "../../../utils/primitives/TeamOfTheWeekStat";
import { MetadataSmall } from "../../../utils/primitives/metadataSmall";
import { BattingStats, BowlingStats } from "../../types";

interface PlayerRowProps {
  player: TeamOfTheWeekPlayer;
  index: number;
  rowHeight: number;
}

const PlayerRowBasic: React.FC<PlayerRowProps> = ({
  player,
  index,
  rowHeight,
}) => {
  const { animations } = useAnimationContext();
  const { selectedPalette } = useThemeContext();
  const containerAnimation = animations.container.main.itemContainer;
  const delay = index * PLAYER_STAGGER_DELAY;

  // Text animations
  const largeTextAnimation = animations.text.main.copyIn;
  const smallTextAnimation = animations.text.main.copyIn;

  // Determine background color like Top5
  const isTopPlayer = index === 0;
  const bgColor = isTopPlayer
    ? selectedPalette.container.backgroundTransparent.high
    : selectedPalette.container.backgroundTransparent.medium;

  const logoBG = isTopPlayer
    ? selectedPalette.container.transparentSecondary
    : selectedPalette.container.backgroundTransparent.strong;

  // All-rounders need more height for two rows of stats
  //const isAllRounder = player.batting && player.bowling;
  const adjustedHeight = rowHeight;

  return (
    <AnimatedContainer
      type="full"
      className="relative h-full"
      style={{ height: adjustedHeight }}
      backgroundColor="none"
      animation={containerAnimation.containerIn}
      animationDelay={delay}
      exitAnimation={containerAnimation.containerOut}
    >
      <div
        className="flex items-center h-full overflow-hidden rounded-lg"
        style={{ height: `${adjustedHeight}px`, background: bgColor }}
      >
        {/* Logo Section */}
        <div
          className="w-20 h-full shrink-0 relative overflow-hidden"
          style={{
            background: logoBG,
          }}
        >
          <Img
            src={player.club.logo.url}
            alt={player.club.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Player Info Section: Type, Player, Team */}
        <div className="flex-1 flex flex-col justify-center px-3">
          {/* Position Label */}
          <div className="mb-0">
            <TeamOfTheWeekType
              value={getCategoryPositionLabel(
                player.categoryDetail.position,
              ).toUpperCase()}
              animation={{ ...smallTextAnimation, delay: delay }}
            />
          </div>

          {/* Player Name */}
          <TeamOfTheWeekPlayerName
            value={player.player.toUpperCase()}
            animation={{ ...largeTextAnimation, delay: delay + 2 }}
            className=""
          />

          {/* Team Name */}
          <TeamOfTheWeekTeam
            value={player.primaryTeam.toUpperCase()}
            animation={{ ...smallTextAnimation, delay: delay + 4 }}
            className=""
          />
        </div>

        {/* Stats Section */}
        <div className="flex-shrink-0 px-1">
          {/* Top All-Rounder and Best of Rest show two stat rows when both stats available */}
          {(player.categoryDetail.position === "topallrounder" ||
            player.categoryDetail.position === "bestoftherest") &&
          player.batting &&
          player.bowling ? (
            <div className="flex flex-col gap-2">
              {/* Batting Stats */}
              <BattingStatDisplay batting={player.batting} delay={delay + 6} />

              {/* Bowling Stats */}
              <BowlingStatDisplay bowling={player.bowling} delay={delay + 16} />
            </div>
          ) : (
            /* Single stat row based on position type */
            <>
              {/* Batting positions: topscorer, higheststrikerate */}
              {(player.categoryDetail.position === "topscorer" ||
                player.categoryDetail.position === "higheststrikerate") &&
                player.batting && (
                  <BattingStatDisplay
                    batting={player.batting}
                    delay={delay + 6}
                  />
                )}

              {/* Bowling positions: mostwickets, besteconomy */}
              {(player.categoryDetail.position === "mostwickets" ||
                player.categoryDetail.position === "besteconomy") &&
                player.bowling && (
                  <BowlingStatDisplay
                    bowling={player.bowling}
                    delay={delay + 6}
                  />
                )}

              {/* Best of Rest fallback: show whatever is available if not both stats */}
              {player.categoryDetail.position === "bestoftherest" &&
                (!player.batting || !player.bowling) && (
                  <>
                    {player.batting && (
                      <BattingStatDisplay
                        batting={player.batting}
                        delay={delay + 6}
                      />
                    )}
                    {player.bowling && (
                      <BowlingStatDisplay
                        bowling={player.bowling}
                        delay={delay + 6}
                      />
                    )}
                    {player.allRounder && (
                      <StatItem
                        label="AR SCORE"
                        value={player.allRounder.score}
                        delay={delay + 6}
                        highlight
                      />
                    )}
                  </>
                )}
            </>
          )}
        </div>
      </div>
    </AnimatedContainer>
  );
};

// Component to display formatted batting stats
const BattingStatDisplay: React.FC<{
  batting: BattingStats;
  delay: number;
}> = ({ batting, delay }) => {
  const { animations } = useAnimationContext();
  const largeTextAnimation = animations.text.main.copyIn;
  const smallTextAnimation = animations.text.main.copyIn;

  const scoreDisplay = `${batting.runs}${batting.notOut ? "*" : ""}`;
  const ballsDisplay = `(${batting.balls})`;

  return (
    <div className="flex items-baseline gap-1">
      <TeamOfTheWeekStat
        value={scoreDisplay}
        animation={{ ...largeTextAnimation, delay: delay }}
        variant="onContainerCopy"
        className=""
      />
      <MetadataSmall
        value={ballsDisplay}
        animation={{ ...smallTextAnimation, delay: delay + 1 }}
        variant="onContainerCopy"
        className="text-xs"
      />
    </div>
  );
};

// Component to display formatted bowling stats
const BowlingStatDisplay: React.FC<{
  bowling: BowlingStats;
  delay: number;
}> = ({ bowling, delay }) => {
  const { animations } = useAnimationContext();
  const largeTextAnimation = animations.text.main.copyIn;
  const smallTextAnimation = animations.text.main.copyIn;

  const wicketsRunsDisplay = `${bowling.wickets}/${bowling.runs}`;
  const oversDisplay = `(${bowling.overs})`;

  return (
    <div className="flex items-baseline gap-1">
      <TeamOfTheWeekStat
        value={wicketsRunsDisplay}
        animation={{ ...largeTextAnimation, delay: delay }}
        variant="onContainerCopy"
        className=""
      />
      <MetadataSmall
        value={oversDisplay}
        animation={{ ...smallTextAnimation, delay: delay + 1 }}
        variant="onContainerCopy"
        className="text-xs"
      />
    </div>
  );
};

// Helper component for stat items (still used for bowling stats)
const StatItem: React.FC<{
  label: string;
  value: string | number;
  delay: number;
  highlight?: boolean;
}> = ({ label, value, delay }) => {
  const { animations } = useAnimationContext();
  const smallTextAnimation = animations.text.main.copyIn;
  const largeTextAnimation = animations.text.main.copyIn;

  return (
    <div>
      <TeamOfTheWeekStat
        value={label}
        animation={{ ...smallTextAnimation, delay: delay }}
        variant="onContainerCopy"
        className="mb-0.5"
      />
      {" : "}
      <TeamOfTheWeekStat
        value={String(value)}
        animation={{ ...largeTextAnimation, delay: delay + 1 }}
        variant={"onContainerCopy"}
        className=""
      />
    </div>
  );
};

// Helper function to format category position
const getCategoryPositionLabel = (position: string): string => {
  const labels: Record<string, string> = {
    topscorer: "Top Scorer",
    higheststrikerate: "Highest Strike Rate",
    mostwickets: "Most Wickets",
    besteconomy: "Best Economy",
    topallrounder: "Top All-Rounder",
    bestoftherest: "12th Man",
  };

  return labels[position] || position;
};

export default PlayerRowBasic;
