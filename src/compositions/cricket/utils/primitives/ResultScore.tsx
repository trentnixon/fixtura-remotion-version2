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
  variant = "onBackgroundMain",
}: {
  value: string;
  animation: AnimationConfig;
  className?: string;
  variant?: string;
}) => {
  const { fontClasses } = useThemeContext();

  const type = value === "Yet to Bat" ? "ResultScoreYetToBat" : "ResultScore";

  return (
    <AnimatedText
      type={type}
      variant={variant as ColorVariant}
      fontFamily={fontClasses.copy?.family}
      className={className}
      animation={animation as AnimationConfig}
    >
      {value}
    </AnimatedText>
  );
};
