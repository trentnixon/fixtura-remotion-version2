// ResultPlayerName.tsx

import {
  AnimatedText,
  ColorVariant,
} from "../../../../components/typography/AnimatedText";
import { AnimationConfig } from "../../../../components/typography/config/animations";
import { AnimatedTextPrimitivePropsRequiredAnimation } from "./_types/AnimatedTextPrimitiveProps";
import { DEFAULT_VARIANT, DEFAULT_LETTER_ANIMATION } from "./_utils/constants";
import { useFontFamily } from "./_utils/helpers";

export const ResultPlayerName = ({
  value,
  animation,
  className,
  variant = DEFAULT_VARIANT,
  style,
  exitAnimation,
  exitFrame,
}: AnimatedTextPrimitivePropsRequiredAnimation) => {
  const fontFamily = useFontFamily();

  return (
    <AnimatedText
      type="ResultPlayerName"
      variant={variant as ColorVariant}
      fontFamily={fontFamily}
      className={className}
      style={style}
      animation={animation as AnimationConfig}
      letterAnimation={DEFAULT_LETTER_ANIMATION}
      exitAnimation={exitAnimation}
      exitFrame={exitFrame}
    >
      {value}
    </AnimatedText>
  );
};
