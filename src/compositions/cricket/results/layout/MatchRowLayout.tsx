import React from "react";
import { MatchResult, TeamLogo as ResultTeamLogoType } from "../types";
import { TeamLogo } from "../../utils/primitives/TeamLogo";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { AnimatedText } from "../../../../components/typography/AnimatedText";

interface MatchRowLayoutProps {
  match: MatchResult;
  index: number;
  rowHeight: number;
  delay: number;
}

// Helper function to truncate text
const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + "...";
};

// Match Row Layout
export const StandardMatchRow: React.FC<MatchRowLayoutProps> = ({
  match,
  index,
  rowHeight,
  delay,
}) => {
  const { animations } = useAnimationContext();
  const { selectedPalette } = useThemeContext();

  const textAnimation = animations.text.main.copyIn;
  const logoSize = 24; // Logo size

  // Determine background color for alternating rows
  const isEvenRow = index % 2 === 0;
  const bgColor = isEvenRow
    ? selectedPalette.container.main
    : selectedPalette.container.transparentMain;

  // Truncate team names
  const homeTeamName = truncateText(match.homeTeam.name, 25).toUpperCase();
  const awayTeamName = truncateText(match.awayTeam.name, 25).toUpperCase();

  // Format result status
  const getStatusColor = () => {
    switch (match.status.toLowerCase()) {
      case "completed":
        return "text-green-500";
      case "in progress":
        return "text-yellow-500";
      case "abandoned":
      case "cancelled":
        return "text-red-500";
      default:
        return "text-white";
    }
  };

  return (
    <div
      className="flex items-stretch h-full overflow-hidden rounded-lg"
      style={{ height: `${rowHeight}px` }}
    >
      {/* Match Info Section */}
      <div
        className="w-1/4 flex flex-col justify-center p-2 px-3"
        style={{ background: selectedPalette.container.transparentAccent }}
      >
        <AnimatedText
          type="metadataSmall"
          animation={{ ...textAnimation, delay: delay + 2 }}
          className="text-sm font-medium"
          variant="onBackgroundMain"
        >
          {match.date}
        </AnimatedText>
        <AnimatedText
          type="metadataSmall"
          animation={{ ...textAnimation, delay: delay + 3 }}
          className="text-xs"
          variant="onBackgroundMain"
        >
          {match.round}
        </AnimatedText>
        <AnimatedText
          type="metadataSmall"
          animation={{ ...textAnimation, delay: delay + 4 }}
          className="text-xs opacity-75"
          variant="onBackgroundMain"
        >
          {truncateText(match.ground, 25)}
        </AnimatedText>
      </div>

      {/* Teams and Scores Section */}
      <div
        className="flex-grow flex items-center justify-between px-4"
        style={{ background: bgColor }}
      >
        <div className="flex-1 flex">
          {/* Home Team */}
          <div className="flex items-center w-2/5">
            <div className="mr-2">
              <TeamLogo
                logo={match.teamHomeLogo as ResultTeamLogoType}
                teamName={match.homeTeam.name}
                delay={delay}
                size={logoSize}
              />
            </div>
            <AnimatedText
              type="teamName"
              animation={{ ...textAnimation, delay: delay + 5 }}
              className="text-sm font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap"
              variant="onBackgroundMain"
            >
              {homeTeamName}
            </AnimatedText>
          </div>

          {/* Scores */}
          <div className="flex items-center justify-center w-1/5">
            <AnimatedText
              type="score"
              animation={{ ...textAnimation, delay: delay + 6 }}
              className="text-sm font-bold text-center"
              variant="onBackgroundMain"
            >
              {`${match.homeTeam.score} vs ${match.awayTeam.score}`}
            </AnimatedText>
          </div>

          {/* Away Team */}
          <div className="flex items-center justify-end w-2/5">
            <AnimatedText
              type="teamName"
              animation={{ ...textAnimation, delay: delay + 5 }}
              className="text-sm font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap text-right mr-2"
              variant="onBackgroundMain"
            >
              {awayTeamName}
            </AnimatedText>
            <TeamLogo
              logo={match.teamAwayLogo as ResultTeamLogoType}
              teamName={match.awayTeam.name}
              delay={delay}
              size={logoSize}
            />
          </div>
        </div>
      </div>

      {/* Match Status */}
      <div
        className="w-1/6 flex items-center justify-center"
        style={{ background: selectedPalette.container.transparentAccent }}
      >
        <AnimatedText
          type="metadataSmall"
          animation={{ ...textAnimation, delay: delay + 7 }}
          className={`text-sm font-semibold ${getStatusColor()}`}
          variant="onBackgroundMain"
        >
          {match.status}
        </AnimatedText>
      </div>
    </div>
  );
};

export default StandardMatchRow;
