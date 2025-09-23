// MetadataSmall.tsx

import {
  AnimatedText,
  ColorVariant,
} from "../../../../components/typography/AnimatedText";
import { useThemeContext } from "../../../../core/context/ThemeContext";

export const RosterPlayerName = ({
  value,

  className,
  variant = "onContainerCopy",
}: {
  value: string;
  className?: string;
  variant?: string;
}) => {
  const { fontClasses } = useThemeContext();

  return (
    <AnimatedText
      type="RosterPlayerName"
      variant={variant as ColorVariant}
      fontFamily={fontClasses.copy?.family}
      className={className}
      animation={undefined}
      letterAnimation="none"
    >
      {value}
    </AnimatedText>
  );
};
