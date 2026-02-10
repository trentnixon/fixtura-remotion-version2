import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import {
  AnimatedText,
  ColorVariant,
} from "../../../../../components/typography/AnimatedText";
import { TwoMetaValuesProps } from "./_types/TwoMetaValuesProps";
import {
  DEFAULT_METADATA_VARIANT,
  DEFAULT_METADATA_ANIMATION_DELAY,
} from "./_utils/constants";
import { getSubtleBackgroundColor } from "./_utils/helpers";

export const TwoMetaValuesSubtleWrapper: React.FC<TwoMetaValuesProps> = ({
  values,
}) => {
  const { selectedPalette } = useThemeContext();
  const { animations } = useAnimationContext();

  const backgroundColor = getSubtleBackgroundColor(selectedPalette);

  return (
    <AnimatedContainer
      type="full"
      className="w-full flex justify-between items-center p-3"
      backgroundColor="none"
      style={{
        background: backgroundColor,
      }}
      animation={animations.container.main.itemContainer.containerIn}
      animationDelay={DEFAULT_METADATA_ANIMATION_DELAY}
    >
      <TwoMetaValuesValues values={values} variant={DEFAULT_METADATA_VARIANT} />
    </AnimatedContainer>
  );
};

export const TwoMetaValuesNoWrapper: React.FC<TwoMetaValuesProps> = ({
  values,
}) => {
  const { animations } = useAnimationContext();

  return (
    <AnimatedContainer
      type="full"
      className="w-full flex justify-between items-center p-3"
      backgroundColor="none"
      animation={animations.container.main.itemContainer.containerIn}
      animationDelay={DEFAULT_METADATA_ANIMATION_DELAY}
    >
      <TwoMetaValuesValues values={values} variant="onContainerTitle" />
    </AnimatedContainer>
  );
};

const TwoMetaValuesValues = ({
  values,
  variant = DEFAULT_METADATA_VARIANT,
}: TwoMetaValuesProps & { variant: ColorVariant }) => {
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;

  return (
    <>
      <AnimatedText
        type="metadataSmall"
        animation={{
          ...TextAnimations.copyIn,
          delay: DEFAULT_METADATA_ANIMATION_DELAY,
        }}
        className={`text-md `}
        variant={variant}
      >
        {values[0]}
      </AnimatedText>

      <AnimatedText
        type="metadataSmall"
        animation={{
          ...TextAnimations.copyIn,
          delay: DEFAULT_METADATA_ANIMATION_DELAY,
        }}
        className="text-md text-right"
        variant={variant}
      >
        {values[1]}
      </AnimatedText>
    </>
  );
};
