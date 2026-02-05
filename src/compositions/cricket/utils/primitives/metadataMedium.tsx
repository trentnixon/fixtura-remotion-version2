// MetadataSmall.tsx

import {
  AnimatedText,
  ColorVariant,
  AnimationMode,
} from "../../../../components/typography/AnimatedText";
import { AnimationConfig } from "../../../../components/typography/config/animations";
import { useThemeContext } from "../../../../core/context/ThemeContext";

export const MetadataMedium = ({
  value,
  animation,
  className,
  variant = "onContainerCopy",
  letterAnimation = "none",
}: {
  value: string;
  animation: AnimationConfig | null;
  className?: string;
  variant?: string;
  letterAnimation?: AnimationMode;
}) => {
  const { fontClasses } = useThemeContext();

  return (
    <AnimatedText
      type="metadataMedium"
      variant={variant as ColorVariant}
      fontFamily={fontClasses.copy?.family}
      className={className}
      animation={animation as AnimationConfig}
      letterAnimation={letterAnimation}
    >
      {value}
    </AnimatedText>
  );
};
