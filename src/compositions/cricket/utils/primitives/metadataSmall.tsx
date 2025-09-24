// MetadataSmall.tsx

import {
  AnimatedText,
  ColorVariant,
} from "../../../../components/typography/AnimatedText";
import { AnimationConfig } from "../../../../components/typography/config/animations";
import { useThemeContext } from "../../../../core/context/ThemeContext";

export const MetadataSmall = ({
  value,
  animation,
  className,
  variant = "onContainerCopy",
}: {
  value: string;
  animation: AnimationConfig | null;
  className?: string;
  variant?: ColorVariant;
}) => {
  const { fontClasses } = useThemeContext();

  return (
    <AnimatedText
      type="metadataSmall"
      variant={variant}
      fontFamily={fontClasses.copy?.family}
      className={className}
      animation={animation as AnimationConfig}
    >
      {value}
    </AnimatedText>
  );
};
