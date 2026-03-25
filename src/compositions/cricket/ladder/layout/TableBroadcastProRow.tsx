import React from "react";
import tinycolor from "tinycolor2";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import TeamLogo from "../../utils/primitives/TeamLogo";
import LadderTeamName from "../../utils/primitives/ladderTeamName";
import LadderTeamPoints from "../../utils/primitives/ladderTeamPoints";
import { TeamData } from "../types";
import type { ColorVariant } from "../../../../components/typography/AnimatedText";

export interface BroadcastProRowLayoutProps {
  team: TeamData;
  delay: number;
  place: number;
  index: number;
  totalTeams: number;
  LadderRowHeight: number;
  isBiasTeam: boolean;
  compact?: boolean;
}

const GAP = "gap-2";

const rowOpacity = (index: number, total: number): number => {
  if (total < 2) return 1;
  if (index === total - 1) return 0.6;
  if (index === total - 2) return 0.8;
  return 1;
};

/**
 * Broadcast Pro ladder row — glass panels, rank accent, P/W/L/Pts (no BYE).
 * All row copy uses onContainerCopy; last two rows are de-emphasised via row opacity only.
 */
export const BroadcastProLadderRow: React.FC<BroadcastProRowLayoutProps> = ({
  team,
  delay,
  place,
  index,
  totalTeams,
  LadderRowHeight,
  isBiasTeam,
  compact,
}) => {
  const { fontClasses, selectedPalette, colors } = useThemeContext();
  const accent = colors?.primary ?? selectedPalette.container.accent;
  const glass = selectedPalette.container.backgroundTransparent;
  const isLeader = place <= 1;
  const opacity = rowOpacity(index, totalTeams);
  const nameSize = compact ? "text-3xl" : "text-4xl";
  const statSize = compact ? "text-2xl" : "text-4xl";
  const rankSize = compact ? "text-4xl" : "text-5xl";
  const ptsSize = compact ? "text-3xl" : "text-5xl";
  const logoBox = Math.min(Math.max(LadderRowHeight - 16, 36), 56);

  const statVariant: ColorVariant = "onContainerCopy";
  const nameVariant: ColorVariant = "onContainerCopy";

  const headingFont = fontClasses.heading?.family;

  const defaultRankBorder = tinycolor(selectedPalette.text.onBackground.main)
    .setAlpha(0.22)
    .toRgbString();

  const rankBorderStyle =
    isLeader || isBiasTeam
      ? { borderLeftColor: accent, borderLeftWidth: 8 }
      : { borderLeftColor: defaultRankBorder, borderLeftWidth: 8 };

  const cellBlur = { backdropFilter: "blur(12px)" as const };

  const rowFixedHeight = {
    height: LadderRowHeight,
    minHeight: LadderRowHeight,
    maxHeight: LadderRowHeight,
  };

  return (
    <div
      className={`flex min-h-0 w-full items-stretch overflow-hidden ${GAP}`}
      style={{ opacity, ...rowFixedHeight }}
    >
      <div
        className={`flex w-20 flex-shrink-0 items-center justify-center ${rankSize} font-bold uppercase tracking-tight`}
        style={{
          ...rowFixedHeight,
          background: glass.medium,
          ...cellBlur,
          ...rankBorderStyle,
          fontFamily: headingFont,
        }}
      >
        <LadderTeamPoints
          value={place}
          variant={statVariant}
          delay={delay}
          className={`${rankSize} leading-none !font-bold uppercase tracking-tight`}
          fontFamily={headingFont}
        />
      </div>

      <div
        className="flex min-w-0 flex-1 items-center gap-4 px-4 py-2"
        style={{
          ...rowFixedHeight,
          background: glass.medium,
          ...cellBlur,
        }}
      >
        <div
          className="flex flex-shrink-0 items-center justify-center"
          style={{
            width: logoBox,
            height: logoBox,
            background: glass.high,
          }}
        >
          {team.clubLogo || team.playHQLogo ? (
            <TeamLogo
              logo={team.clubLogo || team.playHQLogo}
              teamName={team.teamName}
              delay={delay}
              imgStyle={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          ) : (
            <div
              style={{
                width: logoBox * 0.65,
                height: logoBox * 0.65,
                background: glass.low,
              }}
            />
          )}
        </div>
        <div className="min-w-0 flex-1 truncate">
          <LadderTeamName
            value={team.teamName}
            variant={nameVariant}
            textAlign="left"
            delay={delay}
            className={`${nameSize} font-normal uppercase tracking-wide leading-none`}
            fontFamily={headingFont}
          />
        </div>
      </div>

      {[team.P, team.W, team.L].map((val, i) => (
        <div
          key={i}
          className={`flex w-[90px] flex-shrink-0 items-center justify-center ${statSize} font-normal`}
          style={{
            ...rowFixedHeight,
            background: glass.medium,
            ...cellBlur,
            fontFamily: headingFont,
          }}
        >
          <LadderTeamPoints
            value={val ?? 0}
            variant={statVariant}
            delay={delay}
            className={`${statSize} leading-none !font-normal`}
            fontFamily={headingFont}
          />
        </div>
      ))}

      <div
        className={`flex w-[100px] flex-shrink-0 items-center justify-center ${statSize} font-bold`}
        style={{
          ...rowFixedHeight,
          background: glass.strong,
          ...cellBlur,
          fontFamily: headingFont,
        }}
      >
        <LadderTeamPoints
          value={team.PTS ?? 0}
          variant={statVariant}
          delay={delay}
          className={`${ptsSize} leading-none !font-bold`}
          fontFamily={headingFont}
        />
      </div>
    </div>
  );
};

export default BroadcastProLadderRow;
