import React from "react";
import { interpolate, useCurrentFrame, Img } from "remotion";
import { TeamData, TABLE_ANIMATION_DURATION } from "../../types";
import { useThemeContext } from "../../../../../core/context/ThemeContext";

interface TeamRowProps {
  team: TeamData;
  index: number;
  totalTeams: number;
  isBiasTeam: boolean;
  LadderRowHeight: number;
}

export const TeamRow: React.FC<TeamRowProps> = ({
  team,
  index,
  totalTeams,
  isBiasTeam,
  LadderRowHeight,
}) => {
  const frame = useCurrentFrame();

  // Stagger the animation of each row
  const delay = index * 5;
  const animationDuration = Math.min(60, TABLE_ANIMATION_DURATION / totalTeams);

  const opacity = interpolate(
    frame,
    [delay, delay + animationDuration],
    [0, 1],
    { extrapolateRight: "clamp" },
  );

  const translateX = interpolate(
    frame,
    [delay, delay + animationDuration],
    [-50, 0],
    { extrapolateRight: "clamp" },
  );

  // Determine background color based on position and bias team
  let bgColorClass = "";
  const position = parseInt(team.position);

  if (isBiasTeam) {
    bgColorClass = "bg-blue-800/30";
  } else if (position <= 3) {
    bgColorClass = "bg-green-500/20";
  } else if (position > totalTeams - 3) {
    bgColorClass = "bg-red-500/10";
  } else {
    bgColorClass = index % 2 === 0 ? "bg-white/5" : "bg-white/[0.03]";
  }

  return (
    <div
      className={`flex items-center p-2 rounded mb-1 ${bgColorClass}`}
      style={{
        opacity,
        transform: `translateX(${translateX}px)`,
        height: `${LadderRowHeight}px`,
      }}
    >
      <div className="w-10 text-center font-bold">{team.position}</div>

      <div className="w-10 mr-3">
        {team.teamLogo ? (
          <Img
            src={team.teamLogo.url}
            className="w-8 h-8 object-contain rounded-full"
          />
        ) : (
          <div className="w-8 h-8 bg-gray-300 rounded-full" />
        )}
      </div>

      <div className="flex-1 font-medium">{team.teamName}</div>

      <div className="w-8 text-center">{team.P}</div>
      <div className="w-8 text-center">{team.W}</div>
      <div className="w-8 text-center">{team.L}</div>
      <div className="w-8 text-center">{team.BYE}</div>
      <div className="w-16 text-center font-bold">{team.PTS}</div>
    </div>
  );
};

export default TeamRow;
