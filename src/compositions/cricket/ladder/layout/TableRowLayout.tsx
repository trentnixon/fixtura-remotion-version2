import React from "react";

import TeamLogo from "../../utils/primitives/TeamLogo";
import LadderTeamName from "../../utils/primitives/ladderTeamName";
import LadderTeamPoints from "../../utils/primitives/ladderTeamPoints";
import { TeamData } from "../types";
import { useThemeContext } from "../../../../core/context/ThemeContext";

// Base props interface for all layouts
interface BaseLayoutProps {
  team: TeamData;
  delay: number;
  bgColorClass: string;
  LadderRowHeight: number;
  place: number;
}

// Standard layout - exactly as you had it
export const StandardLadderRow: React.FC<BaseLayoutProps> = ({
  team,
  delay,
  bgColorClass,
  LadderRowHeight,
}) => {
  return (
    <div
      className={`flex items-center p-2 rounded mb-1 ${bgColorClass} overflow-hidden`}
      style={{
        height: `${LadderRowHeight}px`,
        maxHeight: `120px`,
      }}
    >
      {/* Place column */}

      {/* Team info section */}
      <div className="flex items-center mr-3 p-1" style={{ width: "70%" }}>
        <div className="w-16 flex-shrink-0 mr-4 overflow-hidden">
          {team.clubLogo ? (
            <div className="rounded-full">
              <TeamLogo
                logo={team.clubLogo || team.playHQLogo}
                teamName={team.teamName}
                delay={delay}
              />
            </div>
          ) : (
            <div className="w-16 h-16 bg-gray-300/10 rounded-full" />
          )}
        </div>
        <div className="flex-1 truncate">
          <LadderTeamName value={team.teamName} delay={delay} />
        </div>
      </div>

      {/* Stats using primitive components */}
      <div className="flex flex-1 justify-evenly">
        <div className="w-10 text-center whitespace-nowrap">
          <LadderTeamPoints value={team?.P || 0} delay={delay} />
        </div>
        <div className="w-10 text-center whitespace-nowrap">
          <LadderTeamPoints value={team?.W || 0} delay={delay} />
        </div>
        <div className="w-10 text-center whitespace-nowrap">
          <LadderTeamPoints value={team?.L || 0} delay={delay} />
        </div>
        <div className="w-10 text-center whitespace-nowrap">
          <LadderTeamPoints value={team?.BYE || 0} delay={delay} />
        </div>
        <div className="w-16 text-center whitespace-nowrap">
          <LadderTeamPoints value={team?.PTS || 0} delay={delay} />
        </div>
      </div>
    </div>
  );
};

// Modern layout - logo and name in a branded box
export const ModernLadderRow: React.FC<BaseLayoutProps> = ({
  team,
  delay,
  bgColorClass,
  LadderRowHeight,
}) => {
  return (
    <div
      className={`flex items-center p-2 rounded mb-1 ${bgColorClass}`}
      style={{
        height: `${LadderRowHeight}px`,
      }}
    >
      {/* Team info in a branded box */}
      <div
        className="flex items-center bg-black/40 rounded-lg mr-3 p-1"
        style={{ width: "70%" }}
      >
        <div className="w-10 flex-shrink-0 mr-2 overflow-hidden">
          {team.clubLogo || team.playHQLogo ? (
            <div className="rounded-full  border-white/20">
              <TeamLogo
                logo={team.clubLogo || team.playHQLogo}
                teamName={team.teamName}
                delay={delay}
              />
            </div>
          ) : (
            <div className="w-8 h-8 bg-gray-300 rounded-full" />
          )}
        </div>
        <div className="flex-1 truncate">
          <LadderTeamName value={team.teamName} delay={delay} />
        </div>
      </div>

      {/* Stats in separated boxes */}
      <div className="flex flex-1 justify-evenly">
        <div className="w-10 text-center">
          <LadderTeamPoints value={team?.P || 0} delay={delay} />
        </div>
        <div className="w-10 text-center">
          <LadderTeamPoints value={team?.W || 0} delay={delay} />
        </div>
        <div className="w-10 text-center">
          <LadderTeamPoints value={team?.L || 0} delay={delay} />
        </div>
        <div className="w-10 text-center">
          <LadderTeamPoints value={team?.BYE || 0} delay={delay} />
        </div>
        <div className="w-16 bg-gray-700/50 rounded-md text-center">
          <LadderTeamPoints value={team?.PTS || 0} delay={delay} />
        </div>
      </div>
    </div>
  );
};

// Balanced layout - logo on right, alternating backgrounds for stats
export const BalancedLadderRow: React.FC<BaseLayoutProps> = ({
  team,
  delay,
  bgColorClass,
  LadderRowHeight,
}) => {
  const { selectedPalette } = useThemeContext();
  const borderColor = selectedPalette.container.primary;
  return (
    <div
      className={`flex items-center p-2 rounded mb-1 ${bgColorClass} border-b-2  `}
      style={{
        height: `${LadderRowHeight}px`,
        background: bgColorClass,
        borderColor: borderColor,
      }}
    >
      {/* Team name and logo container with fixed width */}
      <div
        className="flex items-center justify-between mr-2"
        style={{ width: "70%" }}
      >
        <LadderTeamName value={team.teamName} delay={delay} />
        <div className="w-20 mr-4 overflow-hidden flex flex-shrink-0 items-center justify-center">
          {team.clubLogo || team.playHQLogo ? (
            <div className="rounded-full">
              <TeamLogo
                logo={team.clubLogo || team.playHQLogo}
                teamName={team.teamName}
                delay={delay}
              />
            </div>
          ) : (
            <div className="w-8 h-8 bg-gray-300 rounded-full" />
          )}
        </div>
      </div>

      {/* Stats in alternating backgrounds, matching StandardLadderRow widths */}
      <div
        className="flex flex-1 justify-evenly"
        style={{
          background: selectedPalette.container.backgroundTransparent.medium,
        }}
      >
        <div className="w-10 mx-px text-center whitespace-nowrap">
          <LadderTeamPoints value={team?.P || 0} delay={delay} />
        </div>
        <div className="w-10 mx-px text-center whitespace-nowrap">
          <LadderTeamPoints value={team?.W || 0} delay={delay} />
        </div>
        <div className="w-10 mx-px text-center whitespace-nowrap">
          <LadderTeamPoints value={team?.L || 0} delay={delay} />
        </div>
        <div className="w-10 mx-px text-center whitespace-nowrap">
          <LadderTeamPoints value={team?.BYE || 0} delay={delay} />
        </div>
        <div className="w-20 mx-px text-center whitespace-nowrap">
          <LadderTeamPoints value={team?.PTS || 0} delay={delay} />
        </div>
      </div>
    </div>
  );
};

// Card layout - looks like a trading card with inner borders
export const CardLadderRow: React.FC<BaseLayoutProps> = ({
  team,
  delay,
  bgColorClass,
  LadderRowHeight,
}) => {
  const { selectedPalette } = useThemeContext();
  return (
    <div
      className={`flex items-center p-1 rounded mb-1 ${bgColorClass}`}
      style={{
        height: `${LadderRowHeight}px`,
      }}
    >
      <div className="flex w-full h-full border border-white/20 rounded overflow-hidden">
        {/* Logo and team section */}
        <div
          className="flex items-center p-1"
          style={{
            background: selectedPalette.container.backgroundTransparent.strong,
            width: "50%",
          }}
        >
          <div className="w-10 flex-shrink-0 mr-2 overflow-hidden">
            {team.clubLogo || team.playHQLogo ? (
              <div className="rounded-full p-1 bg-white/10">
                <TeamLogo
                  logo={team.clubLogo || team.playHQLogo}
                  teamName={team.teamName}
                  delay={delay}
                />
              </div>
            ) : (
              <div className="w-8 h-8 bg-gray-300 rounded-full" />
            )}
          </div>

          <div className="flex-1 truncate">
            <LadderTeamName value={team.teamName} delay={delay} />
          </div>
        </div>

        {/* Stats section */}
        <div className="flex flex-1 items-center justify-end border-l border-white/10 pr-2">
          <div className="flex space-x-1">
            <div className="w-8 text-center">
              <LadderTeamPoints value={team?.P || 0} delay={delay} />
            </div>
            <div className="w-8 text-center">
              <LadderTeamPoints value={team?.W || 0} delay={delay} />
            </div>
            <div className="w-8 text-center">
              <LadderTeamPoints value={team?.L || 0} delay={delay} />
            </div>
            <div className="w-8 text-center">
              <LadderTeamPoints value={team?.BYE || 0} delay={delay} />
            </div>
            <div className="w-16 text-center border-l border-white/10 pl-1">
              <LadderTeamPoints value={team?.PTS || 0} delay={delay} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Centered logo layout
export const CenteredLogoLadderRow: React.FC<BaseLayoutProps> = ({
  team,
  delay,
  bgColorClass,
  LadderRowHeight,
}) => {
  return (
    <div
      className={`grid grid-cols-12 gap-1 items-center p-2 rounded mb-1 ${bgColorClass}`}
      style={{
        height: `${LadderRowHeight}px`,
      }}
    >
      {/* Team name on left */}
      <div className="col-span-3 text-right pr-2">
        <LadderTeamName value={team.teamName} delay={delay} />
      </div>

      {/* Logo in center */}
      <div className="col-span-2 flex justify-center">
        {team.clubLogo || team.playHQLogo ? (
          <div className="rounded-full bg-white/10 p-1 w-10 h-10 flex items-center justify-center">
            <TeamLogo
              logo={team.clubLogo || team.playHQLogo}
              teamName={team.teamName}
              delay={delay}
            />
          </div>
        ) : (
          <div className="w-8 h-8 bg-gray-300 rounded-full" />
        )}
      </div>

      {/* Stats on right */}
      <div className="col-span-7 grid grid-cols-5 gap-1">
        <div className="text-center">
          <LadderTeamPoints value={team?.P || 0} delay={delay} />
        </div>
        <div className="text-center">
          <LadderTeamPoints value={team?.W || 0} delay={delay} />
        </div>
        <div className="text-center">
          <LadderTeamPoints value={team?.L || 0} delay={delay} />
        </div>
        <div className="text-center">
          <LadderTeamPoints value={team?.BYE || 0} delay={delay} />
        </div>
        <div className="text-center bg-blue-900/40 rounded">
          <LadderTeamPoints value={team?.PTS || 0} delay={delay} />
        </div>
      </div>
    </div>
  );
};

// Export all layouts and default to StandardLadderRow
export default StandardLadderRow;
