import React from "react";
import { AnimatedText } from "../../../../../components/typography/AnimatedText";
import {
  BroadcastProRoundedMetadataChip,
  useBroadcastProRoundedTheme,
} from "../../../../../compositions/cricket/utils/broadcastProRounded";
import type {
  AnimationConfig,
  AnimationType,
} from "../../../../../components/typography/config/animations";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import type { BroadcastProRoundedHeadlineVariant } from "../../../../../templates/types/broadcast-pro-rounded/headline-lockup";

export interface BroadcastProRoundedHeadlineSecondaryProps {
  text: string;
  variant: BroadcastProRoundedHeadlineVariant;
  animation?: AnimationType | AnimationConfig;
  exitAnimation?: AnimationType | AnimationConfig;
  exitFrame?: number;
  fontFamily?: string;
}

export const BroadcastProRoundedHeadlineSecondary: React.FC<
  BroadcastProRoundedHeadlineSecondaryProps
> = ({
  text,
  variant,
  animation,
  exitAnimation,
  exitFrame,
  fontFamily: fontFamilyOverride,
}) => {
  const { componentStyles, fontClasses, fonts } = useThemeContext();
  const { text: textOnGlass } = useBroadcastProRoundedTheme();

  const secondaryClass =
    componentStyles.broadcastProRoundedHeadlineSecondary?.className ??
    "font-rajdhani uppercase tracking-[0.2em] font-semibold whitespace-nowrap";

  const subtitleFontFamily =
    fontFamilyOverride ??
    fontClasses?.subheading?.family ??
    fonts?.subtitle?.family ??
    fonts?.copy?.family ??
    "Rajdhani";

  const textNode =
    variant === "intro" ? (
      <AnimatedText
        textAlign="center"
        type="subtitle"
        variant="onContainerTitle"
        letterAnimation="word"
        animation={animation}
        exitAnimation={exitAnimation}
        exitFrame={exitFrame}
        fontFamily={subtitleFontFamily}
        className={secondaryClass}
        style={{
          fontFamily: `${subtitleFontFamily}, sans-serif`,
          fontWeight: 600,
        }}
      >
        {text}
      </AnimatedText>
    ) : (
      <AnimatedText
        textAlign="center"
        fontFamily={subtitleFontFamily}
        type="metadataMedium"
        variant="onContainerCopy"
        letterAnimation="none"
        animation={animation}
        exitAnimation={exitAnimation}
        exitFrame={exitFrame}
        className={secondaryClass}
        style={{
          fontFamily: `${subtitleFontFamily}, sans-serif`,
          fontWeight: 600,
          color: textOnGlass.copy,
        }}
      >
        {text}
      </AnimatedText>
    );

  if (variant === "mainHeader") {
    return (
      <div className="mt-4 flex w-full justify-center">
        <BroadcastProRoundedMetadataChip className="max-w-[95%] px-6 py-2">
          {textNode}
        </BroadcastProRoundedMetadataChip>
      </div>
    );
  }

  return <div className="overflow-hidden">{textNode}</div>;
};
