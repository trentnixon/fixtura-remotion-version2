// RosterPlayerName.tsx

import {
  AnimatedText,
  ColorVariant,
} from "../../../../components/typography/AnimatedText";
import { RosterPlayerNameProps } from "./_types/AnimatedTextPrimitiveProps";
import { DEFAULT_VARIANT, DEFAULT_LETTER_ANIMATION } from "./_utils/constants";
import { useFontFamily } from "./_utils/helpers";

export const RosterPlayerName = ({
  value,
  className,
  variant = DEFAULT_VARIANT,
}: RosterPlayerNameProps) => {
  const fontFamily = useFontFamily();

  return (
    <AnimatedText
      type="RosterPlayerName"
      variant={variant as ColorVariant}
      fontFamily={fontFamily}
      className={className}
      animation={undefined}
      letterAnimation={DEFAULT_LETTER_ANIMATION}
    >
      {value}
    </AnimatedText>
  );
};
