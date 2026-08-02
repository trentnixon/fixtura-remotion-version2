import React from "react";
import { AnimatedText } from "../../../../../components/typography/AnimatedText";
import type {
  AnimationConfig,
  AnimationType,
} from "../../../../../components/typography/config/animations";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import {
  DEFAULT_BROADCAST_PRO_HEADLINE_SIZING,
  type BroadcastProRoundedHeadlineVariant,
} from "../../../../../templates/types/broadcast-pro-rounded/headline-lockup";
import { useBroadcastProRoundedHeadlineFit } from "./useBroadcastProRoundedHeadlineFit";

export interface BroadcastProRoundedHeadlineTitleProps {
  text: string;
  variant: BroadcastProRoundedHeadlineVariant;
  letterAnimation?: "none" | "word";
  animation?: AnimationType | AnimationConfig;
  exitAnimation?: AnimationType | AnimationConfig;
  exitFrame?: number;
  fontFamily?: string;
}

export const BroadcastProRoundedHeadlineTitle: React.FC<
  BroadcastProRoundedHeadlineTitleProps
> = ({
  text,
  variant,
  letterAnimation = variant === "intro" ? "word" : "none",
  animation,
  exitAnimation,
  exitFrame,
  fontFamily: fontFamilyOverride,
}) => {
  const {
    componentStyles,
    fontClasses,
    fonts,
    broadcastProRoundedHeadlineSizing,
  } = useThemeContext();

  const sizing =
    broadcastProRoundedHeadlineSizing ?? DEFAULT_BROADCAST_PRO_HEADLINE_SIZING;
  const fittedSize = useBroadcastProRoundedHeadlineFit(text, variant);
  const fontFamily =
    fontFamilyOverride ??
    fontClasses?.heading?.family ??
    fonts?.title?.family ??
    "Teko";

  const heroClass =
    componentStyles.broadcastProRoundedHeadlineHero?.className ??
    "font-teko font-normal uppercase tracking-tight drop-shadow-2xl text-center m-0 w-full max-w-full";

  const maxFontSize =
    variant === "intro" ? sizing.introMaxPx : sizing.mainHeaderMaxPx;
  const fontSize = fittedSize ?? maxFontSize;

  return (
    <AnimatedText
      textAlign="center"
      type="title"
      variant="onContainerTitle"
      letterAnimation={letterAnimation}
      animation={animation}
      exitAnimation={exitAnimation}
      exitFrame={exitFrame}
      fontFamily={fontFamily}
      className={heroClass}
      style={{
        fontFamily: `${fontFamily}, sans-serif`,
        fontWeight: sizing.fontWeight,
        fontSize,
        lineHeight: sizing.lineHeight,
      }}
    >
      {text}
    </AnimatedText>
  );
};
