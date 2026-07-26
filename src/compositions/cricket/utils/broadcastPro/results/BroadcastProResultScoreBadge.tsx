import React from "react";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { BroadcastProStructuredScore } from "../../../../../templates/variants/broadcastPro/components/score";
import { resolveBroadcastProEdgeMarkerStyle } from "../../../../../templates/types/broadcast-pro/marker-notch";
import { ResultScoreFirstInnings } from "../../primitives/ResultScore";
import { csClass, useBroadcastProTheme } from "../index";

export interface BroadcastProResultScoreBadgeProps {
  score: string;
  firstInnings?: string | null;
  accentColor: string;
  delay: number;
  matchType?: string;
  className?: string;
}

export const BroadcastProResultScoreBadge: React.FC<
  BroadcastProResultScoreBadgeProps
> = ({
  score,
  firstInnings,
  accentColor,
  delay,
  matchType = "",
  className = "",
}) => {
  const { animations } = useAnimationContext();
  const { componentStyles, fontClasses, fonts } = useThemeContext();
  const { glass } = useBroadcastProTheme();
  const badgeClass = csClass(componentStyles, "broadcastProResultsScoreBadge");
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
      className={`${badgeClass} ${className}`.trim()}
      style={{
        ...resolveBroadcastProEdgeMarkerStyle("standard", "primary", {
          accentColor,
          mutedColor: accentColor,
        }),
        background: glass.strong,
      }}
    >
      <BroadcastProStructuredScore
        value={score}
        variant="match"
        animation={{ ...copyIn, delay }}
        colorVariant="onContainerTitle"
        fontFamily={headingFont}
      />
      {showFirstInnings && (
        <ResultScoreFirstInnings
          value={firstInnings}
          animation={{ ...copyIn, delay: delay + 2 }}
          variant="onContainerCopy"
        />
      )}
    </div>
  );
};
