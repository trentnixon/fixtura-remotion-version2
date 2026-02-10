// ResultMetaData.tsx

import {
  AnimatedText,
  ColorVariant,
} from "../../../../components/typography/AnimatedText";
import { AnimationConfig } from "../../../../components/typography/config/animations";
import { AnimatedTextPrimitivePropsRequiredAnimation } from "./_types/AnimatedTextPrimitiveProps";
import { DEFAULT_VARIANT, DEFAULT_LETTER_ANIMATION } from "./_utils/constants";
import { useFontFamily } from "./_utils/helpers";

export const ResultMetaData = ({
  value,
  animation,
  className,
  variant = DEFAULT_VARIANT,
}: AnimatedTextPrimitivePropsRequiredAnimation) => {
  const fontFamily = useFontFamily();

  return (
    <AnimatedText
      type="ResultMetaData"
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
