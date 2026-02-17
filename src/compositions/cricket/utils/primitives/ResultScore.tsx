// ResultScore.tsx

import {
  AnimatedText,
  ColorVariant,
} from "../../../../components/typography/AnimatedText";
import { AnimationConfig } from "../../../../components/typography/config/animations";
import { AnimatedTextPrimitivePropsRequiredAnimation } from "./_types/AnimatedTextPrimitiveProps";
import { DEFAULT_VARIANT, DEFAULT_LETTER_ANIMATION } from "./_utils/constants";
import { useFontFamily } from "./_utils/helpers";

export const ResultScore = ({
  value,
  animation,
  className,
  variant = DEFAULT_VARIANT,
  fontFamily: fontFamilyOverride,
}: AnimatedTextPrimitivePropsRequiredAnimation) => {
  const fontFamilyFromTheme = useFontFamily();
  const fontFamily = fontFamilyOverride ?? fontFamilyFromTheme;

  if (value === "Yet to Bat") {
    return (
      <AnimatedText
        type="ResultScoreYetToBat"
        variant={variant as ColorVariant}
        fontFamily={fontFamily}
        className={className}
        animation={animation as AnimationConfig}
        letterAnimation={DEFAULT_LETTER_ANIMATION}
      >
        {value}
      </AnimatedText>
    );
  }

  return (
    <AnimatedText
      type="ResultScore"
      variant={variant as ColorVariant}
      fontFamily={fontFamily}
      className={className}
      animation={animation as AnimationConfig}
      letterAnimation={DEFAULT_LETTER_ANIMATION}
    >
      {value}
    </AnimatedText>
  );
};

export const ResultScoreFirstInnings = ({
  value,
  animation,
  className,
  variant = DEFAULT_VARIANT,
  fontFamily: fontFamilyOverride,
}: AnimatedTextPrimitivePropsRequiredAnimation) => {
  const fontFamilyFromTheme = useFontFamily();
  const fontFamily = fontFamilyOverride ?? fontFamilyFromTheme;

  if (value === "1") return null;

  return (
    <AnimatedText
      type="ResultScoreFirstInnings"
      variant={variant as ColorVariant}
      fontFamily={fontFamily}
      className={className}
      animation={animation as AnimationConfig}
      letterAnimation={DEFAULT_LETTER_ANIMATION}
    >
      {value}
    </AnimatedText>
  );
};
