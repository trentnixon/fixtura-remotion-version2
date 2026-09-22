import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import type { ColorVariant } from "../../../../../components/typography/AnimatedText";
import LadderTeamName from "../../../../../compositions/cricket/utils/primitives/ladderTeamName";
import { csClass } from "../../../../../compositions/cricket/utils/broadcastPro/componentStyles";
import { useBroadcastProTheme } from "../../../../../compositions/cricket/utils/broadcastPro";
import type { BroadcastProGlassStyle } from "../../../../../compositions/cricket/utils/broadcastPro/glass";
import type { BroadcastProFixtureDensity } from "../../../../types/broadcast-pro/fixture-density";
import type { BroadcastProMatchupSideInput } from "../../../../../templates/types/broadcast-pro/matchup";
import { BroadcastProCrestWell } from "../crest/BroadcastProCrestWell";

export interface BroadcastProMatchupSideProps {
  side: "home" | "away";
  input: BroadcastProMatchupSideInput;
  delay?: number;
  glass: BroadcastProGlassStyle;
  containerHeight?: number;
  compact?: boolean;
  fixtureDensity?: BroadcastProFixtureDensity;
  fontFamily?: string;
  labelVariant?: ColorVariant;
  animateContent?: boolean;
}

export const BroadcastProMatchupSide: React.FC<
  BroadcastProMatchupSideProps
> = ({
  side,
  input,
  delay = 0,
  glass,
  containerHeight,
  compact = false,
  fixtureDensity = "standard",
  fontFamily,
  labelVariant = "onContainerCopy",
  animateContent = true,
}) => {
  const { componentStyles } = useThemeContext();
  const { text } = useBroadcastProTheme();

  const sideClass = csClass(
    componentStyles,
    side === "home"
      ? "broadcastProMatchupSideFixtureHome"
      : "broadcastProMatchupSideFixtureAway",
  );
  const teamNameBaseClass = csClass(
    componentStyles,
    "broadcastProMatchupFixtureTeamName",
  );
  const upcomingTeamNameClass = csClass(componentStyles, "upcomingTeamName");
  const densityClass =
    fixtureDensity === "featured"
      ? "!text-4xl"
      : fixtureDensity === "compact" || compact
        ? "!text-2xl"
        : "!text-3xl";
  const teamNameClass =
    `${upcomingTeamNameClass || teamNameBaseClass} line-clamp-2 !leading-[0.92] ${densityClass}`.trim();

  const isHome = side === "home";
  const crestDelay = delay + 6;
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
          animate={animateContent}
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
          animate={animateContent}
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
          animate={animateContent}
        />
      )}
    </div>
  );
};
