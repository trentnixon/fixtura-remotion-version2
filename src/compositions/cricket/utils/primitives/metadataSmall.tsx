// MetadataSmall.tsx

import {
  AnimatedText,
  ColorVariant,
} from "../../../../components/typography/AnimatedText";
import { AnimationConfig } from "../../../../components/typography/config/animations";
import { AnimatedTextPrimitiveProps } from "./_types/AnimatedTextPrimitiveProps";
import { DEFAULT_VARIANT } from "./_utils/constants";
import { useFontFamily } from "./_utils/helpers";

export const MetadataSmall = ({
  value,
  animation,
  className,
  variant = DEFAULT_VARIANT,
}: AnimatedTextPrimitiveProps) => {
  const fontFamily = useFontFamily();

  return (
    <AnimatedText
      type="metadataSmall"
      variant={variant as ColorVariant}
      fontFamily={fontFamily}
      className={className}
      animation={animation as AnimationConfig}
    >
      {value}
    </AnimatedText>
  );
};
