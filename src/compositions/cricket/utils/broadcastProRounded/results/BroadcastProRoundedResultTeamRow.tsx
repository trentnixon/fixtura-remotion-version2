import React from "react";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { BroadcastProRoundedCrestWell } from "../../../../../templates/variants/broadcastProRounded/components/crest";
import { ResultTeamName } from "../../primitives/ResultTeamName";
import { truncateText } from "../../../results/layout/Sections/PlayerStats/_utils/helpers";
import { BroadcastProRoundedGlassPanel } from "./BroadcastProRoundedGlassPanel";
import { BroadcastProRoundedResultScoreBadge } from "./BroadcastProRoundedResultScoreBadge";
import { csClass, useBroadcastProRoundedTheme } from "../index";
import type { BroadcastProRoundedGlassStyle } from "../glass";
import type {
  AnimationConfig,
  AnimationType,
} from "../../../../../components/typography/config/animations";
import {
  RESULT_TEAM_ROW_NESTED,
  resultContainerDelay,
} from "./matchContentHelpers";

export interface BroadcastProRoundedResultTeamRowProps {
  teamName: string;
  score: string;
  logo?: { url: string; width: number; height: number } | string | null;
  firstInnings?: string | null;
  accentColor: string;
  delay: number;
  matchType?: string;
  glass?: BroadcastProRoundedGlassStyle;
  className?: string;
  exitAnimation?: AnimationType | AnimationConfig;
  exitFrame?: number;
}

const MAX_TEAM_NAME = 32;

export const BroadcastProRoundedResultTeamRow: React.FC<
  BroadcastProRoundedResultTeamRowProps
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
  exitAnimation,
  exitFrame,
}) => {
  const { animations } = useAnimationContext();
  const { componentStyles } = useThemeContext();
  const { glass: themeGlass, text } = useBroadcastProRoundedTheme();
  const copyIn = animations.text.main.copyIn;
  const rowClass = csClass(
    componentStyles,
    "broadcastProRoundedResultsTeamRow",
  );
  const nameClass = csClass(
    componentStyles,
    "broadcastProRoundedResultsTeamName",
  );

  const resolvedGlass = glass ?? themeGlass;

  const displayName = truncateText(teamName, MAX_TEAM_NAME).toUpperCase();

  return (
    <BroadcastProRoundedGlassPanel
      glass={resolvedGlass}
      className={`${rowClass} ${className}`.trim()}
      animationDelay={resultContainerDelay(delay)}
      exitFrame={exitFrame}
    >
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <BroadcastProRoundedCrestWell
          tier="compact"
          logo={logo ?? null}
          teamName={teamName}
          delay={delay + RESULT_TEAM_ROW_NESTED.crest}
          glass={resolvedGlass}
        />
        <ResultTeamName
          value={displayName}
          animation={{ ...copyIn, delay: delay + RESULT_TEAM_ROW_NESTED.name }}
          exitAnimation={exitAnimation}
          exitFrame={exitFrame}
          variant="onContainerTitle"
          className={nameClass}
          style={{ color: text.copy }}
        />
      </div>
      <BroadcastProRoundedResultScoreBadge
        score={score}
        firstInnings={firstInnings}
        accentColor={accentColor}
        delay={delay + RESULT_TEAM_ROW_NESTED.score}
        matchType={matchType}
        exitAnimation={exitAnimation}
        exitFrame={exitFrame}
      />
    </BroadcastProRoundedGlassPanel>
  );
};
