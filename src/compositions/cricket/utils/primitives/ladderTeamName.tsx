import React from "react";
import {
  AnimatedText,
  ColorVariant,
} from "../../../../components/typography/AnimatedText";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import {
  AnimatedTextPrimitivePropsWithDelay,
  TextAlign,
} from "./_types/AnimatedTextPrimitiveProps";
import { DEFAULT_VARIANT, DEFAULT_TEXT_ALIGN } from "./_utils/constants";
import { useFontFamily } from "./_utils/helpers";

export const LadderTeamName: React.FC<AnimatedTextPrimitivePropsWithDelay> = ({
  value,
  variant = DEFAULT_VARIANT,
  textAlign = DEFAULT_TEXT_ALIGN,
  delay,
}) => {
  const fontFamily = useFontFamily();
  const { animations } = useAnimationContext();

  return (
    <AnimatedText
      type="ladderTeamName"
      variant={variant as ColorVariant}
      textAlign={textAlign as TextAlign}
      fontFamily={fontFamily}
      animation={{ ...animations.text.main.copyIn, delay: delay }}
    >
      {value}
    </AnimatedText>
  );
};

export default LadderTeamName;
