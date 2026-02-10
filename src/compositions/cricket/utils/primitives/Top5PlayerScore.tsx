// Top5PlayerScore.tsx

import {
  AnimatedText,
  ColorVariant,
} from "../../../../components/typography/AnimatedText";
import { AnimationConfig } from "../../../../components/typography/config/animations";
import { AnimatedTextPrimitivePropsRequiredAnimation } from "./_types/AnimatedTextPrimitiveProps";
import { DEFAULT_VARIANT } from "./_utils/constants";
import { useFontFamily } from "./_utils/helpers";

export const Top5PlayerScore = ({
  value,
  animation,
  className,
  variant = DEFAULT_VARIANT,
}: AnimatedTextPrimitivePropsRequiredAnimation) => {
  const fontFamily = useFontFamily();

  return (
    <AnimatedText
      type="Top5PlayerScore"
      variant={variant as ColorVariant}
      fontFamily={fontFamily}
      className={className}
      animation={animation as AnimationConfig}
    >
      {value}
    </AnimatedText>
  );
};
