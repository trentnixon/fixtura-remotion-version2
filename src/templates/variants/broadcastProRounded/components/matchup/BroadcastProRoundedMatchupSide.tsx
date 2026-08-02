import React from "react";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import type { ColorVariant } from "../../../../../components/typography/AnimatedText";
import LadderTeamName from "../../../../../compositions/cricket/utils/primitives/ladderTeamName";
import { MetadataMedium } from "../../../../../compositions/cricket/utils/primitives/metadataMedium";
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
  const { animations } = useAnimationContext();
  const { componentStyles } = useThemeContext();
  const { text } = useBroadcastProRoundedTheme();
  const copyIn = animations.text.main.copyIn;

  const sideClass = csClass(
    componentStyles,
    side === "home"
      ? "broadcastProRoundedMatchupSideFixtureHome"
      : "broadcastProRoundedMatchupSideFixtureAway",
  );
  const roleLabelClass = csClass(
    componentStyles,
    "broadcastProRoundedMatchupRoleLabel",
  );
  const teamNameBaseClass = csClass(
    componentStyles,
    "broadcastProRoundedMatchupFixtureTeamName",
  );
  const upcomingTeamNameClass = csClass(componentStyles, "upcomingTeamName");
  const teamNameClass =
    `${upcomingTeamNameClass || teamNameBaseClass} line-clamp-2 !leading-[0.92] ${compact ? "!text-5xl" : "!text-6xl"}`.trim();

  const isHome = side === "home";
  const crestDelay = delay + 6;
  const labelDelay = delay + 8;
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
        className={`flex min-w-0 flex-col gap-1 ${isHome ? "items-start" : "items-end"}`.trim()}
      >
        {input.roleLabel != null && input.roleLabel !== "" && (
          <MetadataMedium
            value={input.roleLabel}
            animation={{ ...copyIn, delay: labelDelay }}
            className={roleLabelClass}
            variant={labelVariant}
            style={{ color: text.secondary }}
          />
        )}
        <LadderTeamName
          value={input.teamName}
          variant={labelVariant}
          textAlign={isHome ? "left" : "right"}
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
