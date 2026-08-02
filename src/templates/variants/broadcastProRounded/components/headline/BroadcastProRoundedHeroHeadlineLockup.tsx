import React from "react";
import type {
  AnimationConfig,
  AnimationType,
} from "../../../../../components/typography/config/animations";
import type { BroadcastProRoundedHeadlineVariant } from "../../../../../templates/types/broadcast-pro-rounded/headline-lockup";
import { BroadcastProRoundedHeadlineSecondary } from "./BroadcastProRoundedHeadlineSecondary";
import { BroadcastProRoundedHeadlineTitle } from "./BroadcastProRoundedHeadlineTitle";

export interface BroadcastProRoundedHeroHeadlineLockupProps {
  logo: React.ReactNode;
  title: string;
  secondary: string;
  variant: BroadcastProRoundedHeadlineVariant;
  titleAnimation?: AnimationType | AnimationConfig;
  titleExitAnimation?: AnimationType | AnimationConfig;
  secondaryAnimation?: AnimationType | AnimationConfig;
  secondaryExitAnimation?: AnimationType | AnimationConfig;
  exitFrame?: number;
  titleLetterAnimation?: "none" | "word";
}

export const BroadcastProRoundedHeroHeadlineLockup: React.FC<
  BroadcastProRoundedHeroHeadlineLockupProps
> = ({
  logo,
  title,
  secondary,
  variant,
  titleAnimation,
  titleExitAnimation,
  secondaryAnimation,
  secondaryExitAnimation,
  exitFrame,
  titleLetterAnimation,
}) => (
  <>
    {logo}
    <div className={variant === "intro" ? "mb-4 overflow-hidden" : undefined}>
      <BroadcastProRoundedHeadlineTitle
        text={title}
        variant={variant}
        letterAnimation={
          titleLetterAnimation ?? (variant === "intro" ? "word" : "none")
        }
        animation={titleAnimation}
        exitAnimation={titleExitAnimation}
        exitFrame={exitFrame}
      />
    </div>
    <BroadcastProRoundedHeadlineSecondary
      text={secondary}
      variant={variant}
      animation={secondaryAnimation}
      exitAnimation={secondaryExitAnimation}
      exitFrame={exitFrame}
    />
  </>
);
