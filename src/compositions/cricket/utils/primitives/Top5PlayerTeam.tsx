// MetadataSmall.tsx

import {
  AnimatedText,
  ColorVariant,
} from "../../../../components/typography/AnimatedText";
import { AnimationConfig } from "../../../../components/typography/config/animations";
import { useThemeContext } from "../../../../core/context/ThemeContext";

export const Top5PlayerTeam = ({
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

  return (
    <AnimatedText
      type="Top5PlayerTeam"
      variant={variant as ColorVariant}
      fontFamily={fontClasses.copy?.family}
      className={className}
      animation={animation as AnimationConfig}
    >
      {value}
    </AnimatedText>
  );
};
