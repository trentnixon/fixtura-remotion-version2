import React from "react";
import { TeamOfTheWeekPlayer, PLAYER_STAGGER_DELAY } from "../../types";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { TeamOfTheWeekPlayerName } from "../../../utils/primitives/TeamOfTheWeekPlayerName";
//import { TeamOfTheWeekTeam } from "../../../utils/primitives/TeamOfTheWeekTeam";
import { TeamOfTheWeekType } from "../../../utils/primitives/TeamOfTheWeekType";
import { TeamOfTheWeekStat } from "../../../utils/primitives/TeamOfTheWeekStat";
import { MetadataSmall } from "../../../utils/primitives/metadataSmall";
import { TeamLogo } from "../../../utils/primitives/TeamLogo";
import { truncateText } from "../../../utils/utils-text";

interface PlayerRowProps {
  player: TeamOfTheWeekPlayer;
  index: number;
  rowHeight: number;
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

// Helper function to get score values for Sixers/Thunder format
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

const PlayerRowSixersThunder: React.FC<PlayerRowProps> = ({
  player,
  index,
  rowHeight,
}) => {
  const { animations } = useAnimationContext();
  const { selectedPalette, layout } = useThemeContext();
  const containerAnimation = animations.container.main.itemContainer;
  const delay = index * PLAYER_STAGGER_DELAY;

  // Text animations
  const largeTextAnimation = animations.text.main.copyIn;
  const smallTextAnimation = animations.text.main.copyIn;

  // Background colors like Top5 Sixers/Thunder
  const bgColor = selectedPalette.container.backgroundTransparent.strong;
  const logoBG = selectedPalette.container.primary;
  const contrastBG = selectedPalette.container.backgroundTransparent.strong;

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
    <div className="overflow-hidden">
      <AnimatedContainer
        type="full"
        className={`${layout.borderRadius.container}`}
        backgroundColor="none"
        animation={containerAnimation.containerIn}
        animationDelay={delay}
        exitAnimation={containerAnimation.containerOut}
      >
        <div
          className={`grid grid-cols-12 p-0 pl-2 items-center h-full overflow-hidden ${layout.borderRadius.container}`}
          style={{
            height: `${rowHeight}px`,
            background: bgColor,
          }}
        >
          {/* Player Info (col-span-7) */}
          <div className="col-span-7 flex flex-col justify-center px-2 h-full overflow-hidden gap-0">
            {/* Position Label */}
            <TeamOfTheWeekType
              value={positionLabel}
              animation={{ ...smallTextAnimation, delay: delay + 2 }}
              className="leading-none"
            />
            {/* Player Name */}
            <TeamOfTheWeekPlayerName
              value={playerName}
              animation={{ ...largeTextAnimation, delay: delay + 2 }}
              className="leading-none"
            />
            {/* Team Name */}
            {/*  <TeamOfTheWeekTeam
              value={teamName}
              animation={{ ...smallTextAnimation, delay: delay + 4 }}
              className=""
            /> */}
          </div>

          {/* Logo (col-span-2) */}
          <div
            className="col-span-2 flex items-center justify-center h-full overflow-hidden"
            style={{ background: contrastBG }}
          >
            <div className="w-20 h-20 overflow-hidden flex items-center justify-center">
              <TeamLogo
                logo={player.club.logo}
                teamName={player.club.name}
                delay={delay + 20}
                size={20}
              />
            </div>
          </div>

          {/* Stats (col-span-3) */}
          <div
            className="col-span-3 flex items-center justify-center whitespace-nowrap leading-none px-0 h-full gap-1"
            style={{ background: logoBG }}
          >
            <TeamOfTheWeekStat
              value={mainValue}
              animation={{ ...largeTextAnimation, delay: delay + 20 }}
              className=""
              variant="onContainerTitle"
            />
            {suffix && (
              <MetadataSmall
                value={suffix}
                animation={{ ...smallTextAnimation, delay: delay + 30 }}
                className="text-md"
                variant="onContainerTitle"
              />
            )}
          </div>
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default PlayerRowSixersThunder;
