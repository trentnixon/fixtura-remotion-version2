import React from "react";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import {
  AnimatedText,
  ColorVariant,
} from "../../../../components/typography/AnimatedText";
import { useAnimationContext } from "../../../../core/context/AnimationContext";

interface TeamStatTextProps {
  value: string | number;
  variant?: string;
  textAlign?: string;
  delay: number;
}

type TextAlign = "left" | "right" | "center";

export const LadderTeamPoints: React.FC<TeamStatTextProps> = ({
  value,
  variant = "onContainerCopy",
  textAlign = "center",
  delay,
}) => {
  const { fontClasses } = useThemeContext();
  const { animations } = useAnimationContext();

  return (
    <AnimatedText
      type="ladderTeamPoints"
      variant={variant as ColorVariant}
      textAlign={textAlign as TextAlign}
      fontFamily={fontClasses.copy?.family}
      animation={{ ...animations.text.main.copyIn, delay: delay }}
    >
      {String(value)}
    </AnimatedText>
  );
};

export default LadderTeamPoints;
