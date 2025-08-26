// MetadataSmall.tsx

import {
  AnimatedText,
  ColorVariant,
} from "../../../../components/typography/AnimatedText";
import { AnimationConfig } from "../../../../components/typography/config/animations";
import { useThemeContext } from "../../../../core/context/ThemeContext";

export const ResultScore = ({
  value,
  animation,
  className,
  variant = "onContainerCopy",
}: {
  value: string;
  animation: AnimationConfig;
  className?: string;
  variant?: string;
}) => {
  const { fontClasses } = useThemeContext();
  return (
    <AnimatedText
      type={"ResultScore"}
      variant={variant as ColorVariant}
      fontFamily={fontClasses.copy?.family}
      className={className}
      animation={animation as AnimationConfig}
      letterAnimation="none"
    >
      {value}
    </AnimatedText>
  );
};

export const ResultScoreFirstInnings = ({
  value,
  animation,
  className,
  variant = "onContainerCopy",
}: {
  value: string;
  animation: AnimationConfig;
  className?: string;
  variant?: string;
}) => {
  const { fontClasses } = useThemeContext();

  if (value === "1") return null;

  return (
    <AnimatedText
      type="ResultScoreFirstInnings"
      variant={variant as ColorVariant}
      fontFamily={fontClasses.copy?.family}
      className={className}
      animation={animation as AnimationConfig}
      letterAnimation="none"
    >
      {value}
    </AnimatedText>
  );
};
