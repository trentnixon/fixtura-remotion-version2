import React from "react";
import { TeamOfTheWeekPlayer } from "../../types";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { TeamOfTheWeekPlayerName } from "../../../utils/primitives/TeamOfTheWeekPlayerName";
//import { TeamOfTheWeekTeam } from "../../../utils/primitives/TeamOfTheWeekTeam";
import { TeamOfTheWeekType } from "../../../utils/primitives/TeamOfTheWeekType";
//import { MetadataLarge } from "../../../utils/primitives/metadataLarge";
import { Top5PlayerScore } from "../../../utils/primitives/Top5PlayerScore";
import { Top5PlayerScoreSuffix } from "../../../utils/primitives/Top5PlayerScoreSuffix";
//import { stripGradeNumberFromTeamName } from "../../../utils/utils-text";
import { truncateText } from "../../../utils/utils-text";

interface PlayerRowProps {
  player: TeamOfTheWeekPlayer;
  index: number;
  rowHeight: number;
  delay: number;
}

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

// Helper function to get score values for CNSW format
const getScoreValues = (
  player: TeamOfTheWeekPlayer,
): { mainValue: string; suffix: string } => {
  // For all-rounders and 12th man with both stats, show batting first
  if (
    (player.categoryDetail.position === "topallrounder" ||
      player.categoryDetail.position === "bestoftherest") &&
    player.batting &&
    player.bowling
  ) {
    // Show batting stats as main
    const mainValue = player.batting.notOut
      ? `${player.batting.runs}*`
      : `${player.batting.runs}`;
    const suffix = player.batting.balls > 0 ? `(${player.batting.balls})` : "";
    return { mainValue, suffix };
  }

  // Batting positions
  if (
    (player.categoryDetail.position === "topscorer" ||
      player.categoryDetail.position === "higheststrikerate") &&
    player.batting
  ) {
    const mainValue = player.batting.notOut
      ? `${player.batting.runs}*`
      : `${player.batting.runs}`;
    const suffix = player.batting.balls > 0 ? `(${player.batting.balls})` : "";
    return { mainValue, suffix };
  }

  // Bowling positions
  if (
    (player.categoryDetail.position === "mostwickets" ||
      player.categoryDetail.position === "besteconomy") &&
    player.bowling
  ) {
    const mainValue = `${player.bowling.wickets}/${player.bowling.runs}`;
    const suffix = `(${player.bowling.overs})`;
    return { mainValue, suffix };
  }

  // Fallback
  return { mainValue: "--", suffix: "" };
};

const PlayerRowCNSW: React.FC<PlayerRowProps> = ({
  player,
  index,
  rowHeight,
  delay,
}) => {
  const { animations } = useAnimationContext();
  const { selectedPalette, layout } = useThemeContext();

  // Text animations
  const largeTextAnimation = animations.text.main.copyIn;
  const smallTextAnimation = animations.text.main.copyIn;

  // Background colors like Top5 CNSW
  const dynamicBackground = selectedPalette.container.backgroundTransparent;
  const bgColor = dynamicBackground.high;
  const scoreBgColor = dynamicBackground.strong;

  // Get truncated player name and team name
  const playerName = truncateText(player.player, 50).toUpperCase();
  //const teamName = truncateText(player.primaryTeam, 35).toUpperCase();

  // Get score display values
  const { mainValue, suffix } = getScoreValues(player);

  // Get position label
  const positionLabel = getCategoryPositionLabel(
    player.categoryDetail.position,
  ).toUpperCase();

  return (
    <div className="overflow-hidden mb-1">
      <AnimatedContainer
        type="full"
        className={`${layout.borderRadius.container} ${index !== 0 ? "px-8" : ""}`}
        backgroundColor="none"
        animation={animations.container.main.itemContainer.containerIn}
        animationDelay={delay}
        exitAnimation={animations.container.main.itemContainer.containerOut}
      >
        <div
          className={`grid grid-cols-12 items-center h-full overflow-hidden ${layout.borderRadius.container}`}
          style={{
            height: `${rowHeight}px`,
            background: bgColor,
          }}
        >
          {/* Rank/Position (col-span-1) */}
          {/* <div className="col-span-1 flex items-center justify-center h-full">
            <MetadataLarge
              value={`${index + 1}`}
              animation={{ ...largeTextAnimation, delay: delay + 2 }}
              className=""
            />
          </div>
 */}
          {/* Player Info (col-span-8) */}
          <div className="col-span-9 flex flex-col justify-center ml-6 p-0 m-0 h-full">
            {/* Player Name */}
            <TeamOfTheWeekPlayerName
              value={playerName}
              animation={{ ...largeTextAnimation, delay: delay + 2 }}
              className=""
            />
            {/* Position Label */}
            <TeamOfTheWeekType
              value={positionLabel}
              animation={{ ...smallTextAnimation, delay: delay + 2 }}
            />
            {/* Team Name */}
            {/*  <TeamOfTheWeekTeam
              value={stripGradeNumberFromTeamName(teamName)}
              animation={{ ...smallTextAnimation, delay: delay + 4 }}
              className=""
            /> */}
          </div>

          {/* Stats (col-span-3) */}
          <div
            className="col-span-3 p-1 m-1 mr-2 flex items-center justify-center whitespace-nowrap leading-none px-0 h-auto"
            style={{ background: scoreBgColor }}
          >
            <Top5PlayerScore
              value={mainValue}
              animation={{ ...largeTextAnimation, delay: delay + 20 }}
              className="font-bold"
            />
            {suffix && (
              <Top5PlayerScoreSuffix
                value={suffix}
                animation={{ ...smallTextAnimation, delay: delay + 30 }}
                className="font-bold"
              />
            )}
          </div>
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default PlayerRowCNSW;
