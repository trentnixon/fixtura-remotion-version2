import React from "react";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { BroadcastProRoundedCrestWell } from "../../../../../templates/variants/broadcastProRounded/components/crest";
import { ResultTeamName } from "../../primitives/ResultTeamName";
import { useFittedTextBoxFontSize } from "../../../../../components/typography/utils/useFittedTextBoxFontSize";
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

/** Full-height crest column on the left (score badge stays on the right). */
const CREST_CONTENT_GAP_PX = 12;
const CREST_BY_SIZE = {
  standard: { widthPx: 96, minHeightPx: 88 },
  /** Result Single / hero rows — taller cover column. */
  hero: { widthPx: 120, minHeightPx: 112 },
} as const;

export type BroadcastProRoundedResultTeamCrestSize = keyof typeof CREST_BY_SIZE;

export interface BroadcastProRoundedResultTeamRowProps {
  teamName: string;
  score: string;
  logo?: { url: string; width: number; height: number } | string | null;
  firstInnings?: string | null;
  accentColor: string;
  delay: number;
  matchType?: string;
  glass?: BroadcastProRoundedGlassStyle;
  performanceContent?: React.ReactNode;
  className?: string;
  exitAnimation?: AnimationType | AnimationConfig;
  exitFrame?: number;
  crestSize?: BroadcastProRoundedResultTeamCrestSize;
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
  performanceContent,
  className = "",
  exitAnimation,
  exitFrame,
  crestSize = "standard",
}) => {
  const { animations } = useAnimationContext();
  const { componentStyles, fontClasses } = useThemeContext();
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
  const crest = CREST_BY_SIZE[crestSize];
  const bodyFont =
    fontClasses?.body?.family ?? fontClasses?.subheading?.family ?? "Rajdhani";

  const resolvedGlass = glass ?? themeGlass;

  const displayName = truncateText(teamName, MAX_TEAM_NAME).toUpperCase();
  const combinedTeamNameFontSize = useFittedTextBoxFontSize({
    text: displayName,
    fontFamily: bodyFont,
    withinWidth: 720 - crest.widthPx - CREST_CONTENT_GAP_PX,
    maxLines: 1,
    minFontSize: 24,
    maxFontSize: 36,
  });

  return (
    <BroadcastProRoundedGlassPanel
      glass={resolvedGlass}
      className={`${rowClass} relative overflow-hidden !gap-0 !p-0 ${
        performanceContent == null ? "" : "!flex-col !items-stretch"
      } ${className}`.trim()}
      animationDelay={resultContainerDelay(delay)}
      exitFrame={exitFrame}
      style={{ minHeight: crest.minHeightPx }}
    >
      <BroadcastProRoundedCrestWell
        tier="grid"
        logo={logo ?? null}
        teamName={teamName}
        delay={delay + RESULT_TEAM_ROW_NESTED.crest}
        glass={resolvedGlass}
        containerHeight={crest.minHeightPx}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: crest.widthPx,
          minWidth: crest.widthPx,
          height: "100%",
          minHeight: "100%",
        }}
      />
      <div
        className={`flex min-w-0 flex-1 ${
          performanceContent == null
            ? "items-center justify-between"
            : "flex-col items-stretch gap-2"
        }`}
        style={{
          paddingLeft: crest.widthPx + CREST_CONTENT_GAP_PX,
          paddingRight: 12,
          paddingTop: 8,
          paddingBottom: 8,
          minHeight: crest.minHeightPx,
        }}
      >
        <div className="flex w-full items-center justify-between gap-3">
          <ResultTeamName
            value={displayName}
            animation={{
              ...copyIn,
              delay: delay + RESULT_TEAM_ROW_NESTED.name,
            }}
            exitAnimation={exitAnimation}
            exitFrame={exitFrame}
            variant="onContainerTitle"
            className={nameClass}
            style={{
              color: text.copy,
              fontSize:
                performanceContent == null
                  ? undefined
                  : combinedTeamNameFontSize,
            }}
          />
          <BroadcastProRoundedResultScoreBadge
            score={score}
            firstInnings={firstInnings}
            accentColor={accentColor}
            delay={delay + RESULT_TEAM_ROW_NESTED.score}
            matchType={matchType}
            exitAnimation={exitAnimation}
            exitFrame={exitFrame}
          />
        </div>
        {performanceContent}
      </div>
    </BroadcastProRoundedGlassPanel>
  );
};
