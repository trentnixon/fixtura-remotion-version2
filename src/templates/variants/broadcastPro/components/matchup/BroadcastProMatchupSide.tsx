import React from "react";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import type { ColorVariant } from "../../../../../components/typography/AnimatedText";
import LadderTeamName from "../../../../../compositions/cricket/utils/primitives/ladderTeamName";
import { MetadataMedium } from "../../../../../compositions/cricket/utils/primitives/metadataMedium";
import { csClass } from "../../../../../compositions/cricket/utils/broadcastPro/componentStyles";
import type { BroadcastProGlassStyle } from "../../../../../compositions/cricket/utils/broadcastPro/glass";
import type { BroadcastProMatchupSideInput } from "../../../../../templates/types/broadcast-pro/matchup";
import { BroadcastProCrestWell } from "../crest/BroadcastProCrestWell";

export interface BroadcastProMatchupSideProps {
  side: "home" | "away";
  input: BroadcastProMatchupSideInput;
  delay?: number;
  glass: BroadcastProGlassStyle;
  containerHeight?: number;
  compact?: boolean;
  fontFamily?: string;
  labelVariant?: ColorVariant;
}

export const BroadcastProMatchupSide: React.FC<BroadcastProMatchupSideProps> = ({
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
  const copyIn = animations.text.main.copyIn;

  const sideClass = csClass(
    componentStyles,
    side === "home"
      ? "broadcastProMatchupSideFixtureHome"
      : "broadcastProMatchupSideFixtureAway",
  );
  const roleLabelClass = csClass(componentStyles, "broadcastProMatchupRoleLabel");
  const teamNameBaseClass = csClass(
    componentStyles,
    "broadcastProMatchupFixtureTeamName",
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
        <BroadcastProCrestWell
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
        />
      </div>
      {!isHome && (
        <BroadcastProCrestWell
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
