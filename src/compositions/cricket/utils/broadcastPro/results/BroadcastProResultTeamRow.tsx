import React from "react";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { BroadcastProCrestWell } from "../../../../../templates/variants/broadcastPro/components/crest";
import { ResultTeamName } from "../../primitives/ResultTeamName";
import { BroadcastProGlassPanel } from "./BroadcastProGlassPanel";
import { BroadcastProResultScoreBadge } from "./BroadcastProResultScoreBadge";
import { csClass, useBroadcastProTheme } from "../index";
import type {
  BroadcastProGlassStyle,
  BroadcastProSurfaceConnection,
} from "../glass";

/** Full-height crest column on the left (score badge stays on the right). */
const CREST_CONTENT_GAP_PX = 12;
const CREST_BY_SIZE = {
  standard: { widthPx: 96, minHeightPx: 88 },
  /** Result Single / hero rows — taller cover column. */
  hero: { widthPx: 120, minHeightPx: 112 },
} as const;

export type BroadcastProResultTeamCrestSize = keyof typeof CREST_BY_SIZE;

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
  connection?: BroadcastProSurfaceConnection;
  scoreEmphasis?: "winner" | "standard";
  crestSize?: BroadcastProResultTeamCrestSize;
}

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
  connection = "standalone",
  scoreEmphasis = "standard",
  crestSize = "standard",
}) => {
  const { animations } = useAnimationContext();
  const { componentStyles } = useThemeContext();
  const { glass: themeGlass, text } = useBroadcastProTheme();
  const copyIn = animations.text.main.copyIn;
  const rowClass = csClass(componentStyles, "broadcastProResultsTeamRow");
  const nameClass = `${csClass(componentStyles, "broadcastProResultsTeamName")} line-clamp-2`;
  const crest = CREST_BY_SIZE[crestSize];

  const resolvedGlass = glass ?? themeGlass;

  const displayName = teamName.toUpperCase();

  return (
    <BroadcastProGlassPanel
      glass={resolvedGlass}
      className={`${rowClass} relative overflow-hidden !gap-0 !p-0 ${className}`.trim()}
      connection={connection}
      style={{ minHeight: crest.minHeightPx }}
    >
      <BroadcastProCrestWell
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
          variant="onContainerTitle"
          className={nameClass}
          style={{ color: text.copy }}
        />
        <BroadcastProResultScoreBadge
          score={score}
          firstInnings={firstInnings}
          accentColor={accentColor}
          delay={delay + 6}
          matchType={matchType}
          emphasis={scoreEmphasis}
        />
      </div>
    </BroadcastProGlassPanel>
  );
};
