// MetadataMedium.tsx

import {
  AnimatedText,
  ColorVariant,
} from "../../../../components/typography/AnimatedText";
import { AnimationConfig } from "../../../../components/typography/config/animations";
import { AnimatedTextPrimitivePropsWithLetterAnimation } from "./_types/AnimatedTextPrimitiveProps";
import { DEFAULT_VARIANT, DEFAULT_LETTER_ANIMATION } from "./_utils/constants";
import { useFontFamily } from "./_utils/helpers";

export const MetadataMedium = ({
  value,
  animation,
  className,
  variant = DEFAULT_VARIANT,
  letterAnimation = DEFAULT_LETTER_ANIMATION,
}: AnimatedTextPrimitivePropsWithLetterAnimation) => {
  const fontFamily = useFontFamily();

  return (
    <AnimatedText
      type="metadataMedium"
      variant={variant as ColorVariant}
      fontFamily={fontFamily}
      className={className}
      animation={animation as AnimationConfig}
      letterAnimation={letterAnimation}
    >
      {value}
    </AnimatedText>
  );
};
