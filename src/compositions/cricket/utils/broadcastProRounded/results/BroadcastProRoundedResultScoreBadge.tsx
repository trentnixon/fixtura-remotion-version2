import React from "react";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { BroadcastProRoundedStructuredScore } from "../../../../../templates/variants/broadcastProRounded/components/score";
import { resolveBroadcastProRoundedEdgeMarkerStyle } from "../../../../../templates/types/broadcast-pro-rounded/marker-notch";
import { ResultScoreFirstInnings } from "../../primitives/ResultScore";
import { csClass, useBroadcastProRoundedTheme } from "../index";

export interface BroadcastProRoundedResultScoreBadgeProps {
  score: string;
  firstInnings?: string | null;
  accentColor: string;
  delay: number;
  matchType?: string;
  className?: string;
}

export const BroadcastProRoundedResultScoreBadge: React.FC<
  BroadcastProRoundedResultScoreBadgeProps
> = ({
  score,
  firstInnings,
  accentColor,
  delay,
  matchType = "",
  className = "",
}) => {
  const { animations } = useAnimationContext();
  const { componentStyles, fontClasses, fonts, layout } = useThemeContext();
  const { glass, text } = useBroadcastProRoundedTheme();
  const cellRadius = layout.borderRadius.container;
  const badgeClass = csClass(componentStyles, "broadcastProRoundedResultsScoreBadge");
  const copyIn = animations.text.main.copyIn;
  const headingFont =
    fontClasses?.heading?.family ?? fonts?.title?.family ?? "Teko";

  const showFirstInnings =
    matchType === "Two Day+" &&
    firstInnings &&
    firstInnings.trim().length > 0 &&
    firstInnings.trim() !== "1";

  return (
    <div
      className={`overflow-hidden ${cellRadius} ${badgeClass} ${className}`.trim()}
      style={{
        ...resolveBroadcastProRoundedEdgeMarkerStyle("standard", "primary", {
          accentColor,
          mutedColor: accentColor,
        }),
        background: glass.strong,
      }}
    >
      <BroadcastProRoundedStructuredScore
        value={score}
        variant="match"
        animation={{ ...copyIn, delay }}
        colorVariant="onContainerTitle"
        fontFamily={headingFont}
        primaryStyle={{ color: text.copy }}
      />
      {showFirstInnings && (
        <ResultScoreFirstInnings
          value={firstInnings}
          animation={{ ...copyIn, delay: delay + 2 }}
          variant="onContainerCopy"
          style={{ color: text.muted }}
        />
      )}
    </div>
  );
};
