import React from "react";
import type { ColorVariant } from "../../../../../components/typography/AnimatedText";
import type {
  AnimationConfig,
  AnimationType,
} from "../../../../../components/typography/config/animations";
import {
  parseMatchScore,
  parsePlayerStat,
} from "../../../../../compositions/cricket/utils/broadcastProRounded/score/parseCricketScore";
import { BroadcastProRoundedScoreText } from "./BroadcastProRoundedScoreText";

export type BroadcastProRoundedStructuredScoreVariant =
  | "match"
  | "playerStat"
  | "plain";

export interface BroadcastProRoundedStructuredScoreProps {
  value: string;
  variant: BroadcastProRoundedStructuredScoreVariant;
  animation?: AnimationType | AnimationConfig;
  exitAnimation?: AnimationType | AnimationConfig;
  exitFrame?: number;
  colorVariant?: ColorVariant;
  primaryVariant?: ColorVariant;
  suffixVariant?: ColorVariant;
  className?: string;
  suffixClassName?: string;
  fontFamily?: string;
  primaryStyle?: React.CSSProperties;
  suffixStyle?: React.CSSProperties;
}

export const BroadcastProRoundedStructuredScore: React.FC<
  BroadcastProRoundedStructuredScoreProps
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
  primaryStyle,
  suffixStyle,
}) => {
  const resolvedPrimaryVariant = primaryVariant ?? colorVariant;

  if (variant === "plain") {
    return (
      <BroadcastProRoundedScoreText
        value={value}
        role="matchTotal"
        variant={colorVariant}
        animation={animation}
        exitAnimation={exitAnimation}
        exitFrame={exitFrame}
        className={className}
        fontFamily={fontFamily}
        style={primaryStyle}
      />
    );
  }

  if (variant === "match") {
    const parsed = parseMatchScore(value);
    const role = parsed.kind === "yetToBat" ? "matchYetToBat" : "matchTotal";

    return (
      <BroadcastProRoundedScoreText
        value={parsed.display}
        role={role}
        variant={colorVariant}
        animation={animation}
        exitAnimation={exitAnimation}
        exitFrame={exitFrame}
        className={className}
        fontFamily={fontFamily}
        style={primaryStyle}
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
      <BroadcastProRoundedScoreText
        value={parsed.primary}
        role="playerStatPrimary"
        themeType={
          className && !className.includes("!text-")
            ? "TeamOfTheWeekStat"
            : undefined
        }
        variant={resolvedPrimaryVariant}
        animation={animation}
        exitAnimation={exitAnimation}
        exitFrame={exitFrame}
        fontFamily={fontFamily}
        className={[className, "inline"].filter(Boolean).join(" ")}
        style={primaryStyle}
      />
      {suffix ? (
        <>
          {" "}
          <BroadcastProRoundedScoreText
            value={suffix}
            role="playerStatSuffix"
            themeType={
              suffixClassName && !suffixClassName.includes("!text-")
                ? "broadcastProRoundedTeamOfTheWeekStatSuffix"
                : undefined
            }
            variant={suffixVariant}
            animation={animation}
            exitAnimation={exitAnimation}
            exitFrame={exitFrame}
            fontFamily={fontFamily}
            className={[suffixClassName, "inline"].filter(Boolean).join(" ")}
            style={suffixStyle}
          />
        </>
      ) : null}
    </span>
  );
};
