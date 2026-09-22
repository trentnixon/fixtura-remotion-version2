import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import type { ColorVariant } from "../../../../../components/typography/AnimatedText";
import LadderTeamName from "../../../../../compositions/cricket/utils/primitives/ladderTeamName";
import { csClass } from "../../../../../compositions/cricket/utils/broadcastProRounded/componentStyles";
import { useBroadcastProRoundedTheme } from "../../../../../compositions/cricket/utils/broadcastProRounded";
import type { BroadcastProRoundedGlassStyle } from "../../../../../compositions/cricket/utils/broadcastProRounded/glass";
import type { BroadcastProRoundedMatchupSideInput } from "../../../../../templates/types/broadcast-pro-rounded/matchup";
import { BroadcastProRoundedCrestWell } from "../crest/BroadcastProRoundedCrestWell";

export interface BroadcastProRoundedMatchupSideProps {
  side: "home" | "away";
  input: BroadcastProRoundedMatchupSideInput;
  delay?: number;
  glass: BroadcastProRoundedGlassStyle;
  containerHeight?: number;
  compact?: boolean;
  fontFamily?: string;
  labelVariant?: ColorVariant;
}

export const BroadcastProRoundedMatchupSide: React.FC<
  BroadcastProRoundedMatchupSideProps
> = ({
  side,
  input,
  delay = 0,
  glass,
  containerHeight,
  compact = false,
  fontFamily,
  labelVariant = "onContainerCopy",
}) => {
  const { componentStyles } = useThemeContext();
  const { text } = useBroadcastProRoundedTheme();

  const sideClass = csClass(
    componentStyles,
    side === "home"
      ? "broadcastProRoundedMatchupSideFixtureHome"
      : "broadcastProRoundedMatchupSideFixtureAway",
  );
  const teamNameBaseClass = csClass(
    componentStyles,
    "broadcastProRoundedMatchupFixtureTeamName",
  );
  const upcomingTeamNameClass = csClass(componentStyles, "upcomingTeamName");
  const teamNameClass =
    `${upcomingTeamNameClass || teamNameBaseClass} line-clamp-2 !leading-[0.92] ${compact ? "!text-2xl" : "!text-3xl"}`.trim();

  const isHome = side === "home";
  const crestDelay = delay + 6;
  const nameDelay = delay + 10;

  return (
    <div className={sideClass}>
      {isHome && (
        <BroadcastProRoundedCrestWell
          tier="fixture"
          logo={input.logo}
          teamName={input.teamName}
          delay={crestDelay}
          glass={glass}
          containerHeight={containerHeight}
        />
      )}
      <div
        className={`flex min-w-0 flex-col ${isHome ? "items-end" : "items-start"}`.trim()}
      >
        <LadderTeamName
          value={input.teamName}
          variant={labelVariant}
          textAlign={isHome ? "right" : "left"}
          delay={nameDelay}
          letterAnimation="none"
          className={teamNameClass}
          fontFamily={fontFamily}
          style={{ color: text.copy }}
        />
      </div>
      {!isHome && (
        <BroadcastProRoundedCrestWell
          tier="fixture"
          logo={input.logo}
          teamName={input.teamName}
          delay={crestDelay}
          glass={glass}
          containerHeight={containerHeight}
        />
      )}
    </div>
  );
};
