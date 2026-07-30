import React from "react";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { BroadcastProCrestWell } from "../../../../../templates/variants/broadcastPro/components/crest";
import { ResultTeamName } from "../../primitives/ResultTeamName";
import { truncateText } from "../../../results/layout/Sections/PlayerStats/_utils/helpers";
import { BroadcastProGlassPanel } from "./BroadcastProGlassPanel";
import { BroadcastProResultScoreBadge } from "./BroadcastProResultScoreBadge";
import { csClass, useBroadcastProTheme } from "../index";
import type { BroadcastProGlassStyle } from "../glass";

export interface BroadcastProResultTeamRowProps {
  teamName: string;
  score: string;
  logo?: { url: string; width: number; height: number } | string | null;
  firstInnings?: string | null;
  accentColor: string;
  delay: number;
  matchType?: string;
  glass?: BroadcastProGlassStyle;
  className?: string;
}

const MAX_TEAM_NAME = 32;

export const BroadcastProResultTeamRow: React.FC<
  BroadcastProResultTeamRowProps
> = ({
  teamName,
  score,
  logo,
  firstInnings,
  accentColor,
  delay,
  matchType,
  glass,
  className = "",
}) => {
  const { animations } = useAnimationContext();
  const { componentStyles } = useThemeContext();
  const { glass: themeGlass, text } = useBroadcastProTheme();
  const copyIn = animations.text.main.copyIn;
  const rowClass = csClass(componentStyles, "broadcastProResultsTeamRow");
  const nameClass = csClass(componentStyles, "broadcastProResultsTeamName");

  const resolvedGlass =
    glass ??
    themeGlass;

  const displayName = truncateText(teamName, MAX_TEAM_NAME).toUpperCase();

  return (
    <BroadcastProGlassPanel
      glass={resolvedGlass}
      className={`${rowClass} ${className}`.trim()}
    >
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <BroadcastProCrestWell
          tier="compact"
          logo={logo ?? null}
          teamName={teamName}
          delay={delay + 2}
          glass={resolvedGlass}
        />
        <ResultTeamName
          value={displayName}
          animation={{ ...copyIn, delay: delay + 4 }}
          variant="onContainerTitle"
          className={nameClass}
          style={{ color: text.copy }}
        />
      </div>
      <BroadcastProResultScoreBadge
        score={score}
        firstInnings={firstInnings}
        accentColor={accentColor}
        delay={delay + 6}
        matchType={matchType}
      />
    </BroadcastProGlassPanel>
  );
};
