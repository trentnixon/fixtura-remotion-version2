// MetadataSmall.tsx

import {
  AnimatedText,
  ColorVariant,
} from "../../../../components/typography/AnimatedText";
import { AnimationConfig } from "../../../../components/typography/config/animations";
import { useThemeContext } from "../../../../core/context/ThemeContext";

export const MetadataMedium = ({
  value,
  animation,
  className,
  variant = "onContainerCopy",
}: {
  value: string;
  animation: AnimationConfig | null;
  className?: string;
  variant?: string;
}) => {
  const { fontClasses } = useThemeContext();

  return (
    <AnimatedText
      type="metadataMedium"
      variant={variant as ColorVariant}
      fontFamily={fontClasses.copy?.family}
      className={className}
      animation={animation as AnimationConfig}
    >
      {value}
    </AnimatedText>
  );
};
