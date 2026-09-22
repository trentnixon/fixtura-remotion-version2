import React from "react";
import type { ColorVariant } from "../../../components/typography/AnimatedText";
import type { AnimationConfig } from "../../../components/typography/config/animations";
import { ResultScore, ResultScoreFirstInnings } from "./primitives/ResultScore";
import type { ResolvedTeamMatchScore } from "./teamMatchScore";

export type TeamScoreStackTextAnimations = {
  copyIn: AnimationConfig;
};

export const TeamScoreStack: React.FC<{
  scores: ResolvedTeamMatchScore;
  delay: number;
  align: "start" | "end" | "center";
  textAnimations: TeamScoreStackTextAnimations;
  variant?: ColorVariant;
  fontFamily?: string;
  scoreClassName?: string;
}> = ({
  scores,
  delay,
  align,
  textAnimations,
  variant = "onContainerCopyNoBg",
  fontFamily,
  scoreClassName = "leading-none",
}) => {
  const alignClass =
    align === "end"
      ? "items-end"
      : align === "center"
        ? "items-center"
        : "items-start";

  return (
    <div className={`flex flex-col leading-none ${alignClass}`}>
      {scores.prior ? (
        <ResultScoreFirstInnings
          value={scores.prior}
          animation={{ ...textAnimations.copyIn, delay: delay + 30 }}
          variant={variant}
          fontFamily={fontFamily}
          className={scoreClassName}
        />
      ) : null}
      <ResultScore
        value={scores.current}
        animation={{ ...textAnimations.copyIn, delay: delay + 1 }}
        variant={variant}
        fontFamily={fontFamily}
        className={scoreClassName}
      />
    </div>
  );
};
