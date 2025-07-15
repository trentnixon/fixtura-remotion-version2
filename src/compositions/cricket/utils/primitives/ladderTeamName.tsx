import React from "react";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import {
  AnimatedText,
  ColorVariant,
} from "../../../../components/typography/AnimatedText";
import { useAnimationContext } from "../../../../core/context/AnimationContext";

interface LadderTeamNameProps {
  value: string;
  variant?: string;
  textAlign?: string;
  delay: number;
}

type TextAlign = "left" | "right" | "center";

export const LadderTeamName: React.FC<LadderTeamNameProps> = ({
  value,
  variant = "onContainerCopy",
  textAlign = "left",
  delay,
}) => {
  const { fontClasses } = useThemeContext();
  const { animations } = useAnimationContext();

  return (
    <AnimatedText
      type="ladderTeamName"
      variant={variant as ColorVariant}
      textAlign={textAlign as TextAlign}
      fontFamily={fontClasses.copy?.family}
      animation={{ ...animations.text.main.copyIn, delay: delay }}
    >
      {value}
    </AnimatedText>
  );
};

export default LadderTeamName;
