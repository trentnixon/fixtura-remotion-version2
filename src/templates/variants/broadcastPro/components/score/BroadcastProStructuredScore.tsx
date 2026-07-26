import React from "react";
import type { ColorVariant } from "../../../../../components/typography/AnimatedText";
import type {
  AnimationConfig,
  AnimationType,
} from "../../../../../components/typography/config/animations";
import {
  parseMatchScore,
  parsePlayerStat,
} from "../../../../../compositions/cricket/utils/broadcastPro/score/parseCricketScore";
import { BroadcastProScoreText } from "./BroadcastProScoreText";

export type BroadcastProStructuredScoreVariant = "match" | "playerStat" | "plain";

export interface BroadcastProStructuredScoreProps {
  value: string;
  variant: BroadcastProStructuredScoreVariant;
  animation?: AnimationType | AnimationConfig;
  exitAnimation?: AnimationType | AnimationConfig;
  exitFrame?: number;
  colorVariant?: ColorVariant;
  primaryVariant?: ColorVariant;
  suffixVariant?: ColorVariant;
  className?: string;
  suffixClassName?: string;
  fontFamily?: string;
}

export const BroadcastProStructuredScore: React.FC<
  BroadcastProStructuredScoreProps
> = ({
  value,
  variant,
  animation,
  exitAnimation,
  exitFrame,
  colorVariant = "onContainerTitle",
  primaryVariant,
  suffixVariant = "onContainerCopy",
  className = "",
  suffixClassName = "",
  fontFamily,
}) => {
  const resolvedPrimaryVariant = primaryVariant ?? colorVariant;

  if (variant === "plain") {
    return (
      <BroadcastProScoreText
        value={value}
        role="matchTotal"
        variant={colorVariant}
        animation={animation}
        exitAnimation={exitAnimation}
        exitFrame={exitFrame}
        className={className}
        fontFamily={fontFamily}
      />
    );
  }

  if (variant === "match") {
    const parsed = parseMatchScore(value);
    const role =
      parsed.kind === "yetToBat" ? "matchYetToBat" : "matchTotal";

    return (
      <BroadcastProScoreText
        value={parsed.display}
        role={role}
        variant={colorVariant}
        animation={animation}
        exitAnimation={exitAnimation}
        exitFrame={exitFrame}
        className={className}
        fontFamily={fontFamily}
      />
    );
  }

  const parsed = parsePlayerStat(value);
  const suffix =
    parsed.kind === "batting" || parsed.kind === "bowling"
      ? parsed.suffix
      : undefined;

  return (
    <span className="inline-flex items-baseline whitespace-nowrap">
      <BroadcastProScoreText
        value={parsed.primary}
        role="playerStatPrimary"
        themeType={className ? "TeamOfTheWeekStat" : undefined}
        variant={resolvedPrimaryVariant}
        animation={animation}
        exitAnimation={exitAnimation}
        exitFrame={exitFrame}
        fontFamily={fontFamily}
        className="inline"
      />
      {suffix ? (
        <>
          {" "}
          <BroadcastProScoreText
            value={suffix}
            role="playerStatSuffix"
            themeType={
              suffixClassName ? "broadcastProTeamOfTheWeekStatSuffix" : undefined
            }
            variant={suffixVariant}
            animation={animation}
            exitAnimation={exitAnimation}
            exitFrame={exitFrame}
            fontFamily={fontFamily}
            className="inline"
          />
        </>
      ) : null}
    </span>
  );
};
