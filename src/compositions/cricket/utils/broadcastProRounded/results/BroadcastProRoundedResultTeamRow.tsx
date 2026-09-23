import React from "react";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { BroadcastProRoundedCrestWell } from "../../../../../templates/variants/broadcastProRounded/components/crest";
import { ResultTeamName } from "../../primitives/ResultTeamName";
import { BroadcastProRoundedGlassPanel } from "./BroadcastProRoundedGlassPanel";
import { BroadcastProRoundedResultScoreBadge } from "./BroadcastProRoundedResultScoreBadge";
import { csClass, useBroadcastProRoundedTheme } from "../index";
import type {
  BroadcastProRoundedGlassStyle,
  BroadcastProRoundedSurfaceConnection,
} from "../glass";
import type {
  AnimationConfig,
  AnimationType,
} from "../../../../../components/typography/config/animations";

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
  className?: string;
  connection?: BroadcastProRoundedSurfaceConnection;
  scoreEmphasis?: "winner" | "standard";
  crestSize?: BroadcastProRoundedResultTeamCrestSize;
  exitAnimation?: AnimationType | AnimationConfig;
  exitFrame?: number;
}

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
  connection = "standalone",
  scoreEmphasis = "standard",
  crestSize = "standard",
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
  const nameClass = `${csClass(componentStyles, "broadcastProRoundedResultsTeamName")} line-clamp-2`;
  const crest = CREST_BY_SIZE[crestSize];

  const resolvedGlass = glass ?? themeGlass;

  const displayName = teamName.toUpperCase();

  return (
    <BroadcastProRoundedGlassPanel
      glass={resolvedGlass}
      className={`${rowClass} relative overflow-hidden !gap-0 !p-0 ${className}`.trim()}
      connection={connection}
      exitFrame={exitFrame}
      style={{ minHeight: crest.minHeightPx }}
    >
      <BroadcastProRoundedCrestWell
        tier="grid"
        logo={logo ?? null}
        teamName={teamName}
        delay={delay + 2}
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
        className="flex min-w-0 flex-1 items-center justify-between"
        style={{
          paddingLeft: crest.widthPx + CREST_CONTENT_GAP_PX,
          paddingRight: 12,
          paddingTop: 12,
          paddingBottom: 12,
          minHeight: crest.minHeightPx,
        }}
      >
        <ResultTeamName
          value={displayName}
          animation={{ ...copyIn, delay: delay + 4 }}
          exitAnimation={exitAnimation}
          exitFrame={exitFrame}
          variant="onContainerTitle"
          className={nameClass}
          style={{ color: text.copy }}
        />
        <BroadcastProRoundedResultScoreBadge
          score={score}
          firstInnings={firstInnings}
          accentColor={accentColor}
          delay={delay + 6}
          matchType={matchType}
          emphasis={scoreEmphasis}
          exitAnimation={exitAnimation}
          exitFrame={exitFrame}
        />
      </div>
    </BroadcastProRoundedGlassPanel>
  );
};
