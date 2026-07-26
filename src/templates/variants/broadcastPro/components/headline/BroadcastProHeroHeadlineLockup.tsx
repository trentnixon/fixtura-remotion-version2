import React from "react";
import type {
  AnimationConfig,
  AnimationType,
} from "../../../../../components/typography/config/animations";
import type { BroadcastProHeadlineVariant } from "../../../../../templates/types/broadcast-pro/headline-lockup";
import { BroadcastProHeadlineSecondary } from "./BroadcastProHeadlineSecondary";
import { BroadcastProHeadlineTitle } from "./BroadcastProHeadlineTitle";

export interface BroadcastProHeroHeadlineLockupProps {
  logo: React.ReactNode;
  title: string;
  secondary: string;
  variant: BroadcastProHeadlineVariant;
  titleAnimation?: AnimationType | AnimationConfig;
  titleExitAnimation?: AnimationType | AnimationConfig;
  secondaryAnimation?: AnimationType | AnimationConfig;
  secondaryExitAnimation?: AnimationType | AnimationConfig;
  exitFrame?: number;
  titleLetterAnimation?: "none" | "word";
}

export const BroadcastProHeroHeadlineLockup: React.FC<
  BroadcastProHeroHeadlineLockupProps
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
      <BroadcastProHeadlineTitle
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
    <BroadcastProHeadlineSecondary
      text={secondary}
      variant={variant}
      animation={secondaryAnimation}
      exitAnimation={secondaryExitAnimation}
      exitFrame={exitFrame}
    />
  </>
);
