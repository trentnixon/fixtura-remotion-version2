// TeamOfTheWeekPlayerName.tsx

import {
  AnimatedText,
  ColorVariant,
} from "../../../../components/typography/AnimatedText";
import { AnimationConfig } from "../../../../components/typography/config/animations";
import { AnimatedTextPrimitivePropsRequiredAnimation } from "./_types/AnimatedTextPrimitiveProps";
import { DEFAULT_VARIANT } from "./_utils/constants";
import { useFontFamily } from "./_utils/helpers";

export const TeamOfTheWeekPlayerName = ({
  value,
  animation,
  className,
  variant = DEFAULT_VARIANT,
}: AnimatedTextPrimitivePropsRequiredAnimation) => {
  const fontFamily = useFontFamily();

  return (
    <AnimatedText
      type="TeamOfTheWeekPlayerName"
      variant={variant as ColorVariant}
      fontFamily={fontFamily}
      className={className}
      animation={animation as AnimationConfig}
      letterAnimation="word"
    >
      {value}
    </AnimatedText>
  );
};
