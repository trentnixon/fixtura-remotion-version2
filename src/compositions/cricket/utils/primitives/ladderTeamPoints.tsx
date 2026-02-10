import React from "react";
import {
  AnimatedText,
  ColorVariant,
} from "../../../../components/typography/AnimatedText";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import { TeamStatTextProps, TextAlign } from "./_types/AnimatedTextPrimitiveProps";
import { DEFAULT_VARIANT } from "./_utils/constants";
import { useFontFamily } from "./_utils/helpers";

export const LadderTeamPoints: React.FC<TeamStatTextProps> = ({
  value,
  variant = DEFAULT_VARIANT,
  textAlign = "center",
  delay,
}) => {
  const fontFamily = useFontFamily();
  const { animations } = useAnimationContext();

  return (
    <AnimatedText
      type="ladderTeamPoints"
      variant={variant as ColorVariant}
      textAlign={textAlign as TextAlign}
      fontFamily={fontFamily}
      animation={{ ...animations.text.main.copyIn, delay: delay }}
    >
      {String(value)}
    </AnimatedText>
  );
};

export default LadderTeamPoints;
