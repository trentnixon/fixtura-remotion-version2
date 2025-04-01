// MetadataSmall.tsx

import { AnimatedText } from "../../../../components/typography/AnimatedText";
import { AnimationConfig } from "../../../../components/typography/config/animations";
import { useThemeContext } from "../../../../core/context/ThemeContext";

export const MetadataSmall = ({
  value,
  animation,
  className,
}: {
  value: string;
  animation: AnimationConfig;
  className?: string;
}) => {
  const { fontClasses } = useThemeContext();

  return (
    <AnimatedText
      type="metadataSmall"
      variant="onBackgroundMain"
      fontFamily={fontClasses.copy?.family}
      className={`font-bold mr-2 ${className}`}
      animation={animation as AnimationConfig}
    >
      {value}
    </AnimatedText>
  );
};
