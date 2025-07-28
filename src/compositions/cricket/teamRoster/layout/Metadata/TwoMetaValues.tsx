import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import {
  AnimatedText,
  ColorVariant,
} from "../../../../../components/typography/AnimatedText";

interface RosterHeaderProps {
  values: [string, string];
  variant?: ColorVariant;
}

export const TwoMetaValuesSubtleWrapper: React.FC<RosterHeaderProps> = ({
  values,
}) => {
  const { selectedPalette } = useThemeContext();
  const { animations } = useAnimationContext();

  // Background color from theme
  const backgroundColor =
    selectedPalette.container.backgroundTransparent.subtle;
  // Format result status color
  // Truncate the result

  return (
    <AnimatedContainer
      type="full"
      className="w-full flex justify-between items-center p-3"
      backgroundColor="none"
      style={{
        background: backgroundColor,
      }}
      animation={animations.container.main.itemContainer.containerIn}
      animationDelay={0}
    >
      <TwoMetaValuesValues values={values} variant="onContainerCopy" />
    </AnimatedContainer>
  );
};

export const TwoMetaValuesNoWrapper: React.FC<RosterHeaderProps> = ({
  values,
}) => {
  const { animations } = useAnimationContext();

  return (
    <AnimatedContainer
      type="full"
      className="w-full flex justify-between items-center p-3"
      backgroundColor="none"
      animation={animations.container.main.itemContainer.containerIn}
      animationDelay={0}
    >
      <TwoMetaValuesValues values={values} variant="onContainerTitle" />
    </AnimatedContainer>
  );
};

const TwoMetaValuesValues = ({
  values,
  variant = "onContainerCopy",
}: RosterHeaderProps & { variant: ColorVariant }) => {
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;
  // Truncate the result
  //const truncatedGround = truncateText(roster.ground, 50);

  return (
    <>
      <AnimatedText
        type="metadataSmall"
        animation={{ ...TextAnimations.copyIn, delay: 0 }}
        className={`text-md `}
        variant={variant}
      >
        {values[0]}
      </AnimatedText>

      <AnimatedText
        type="metadataSmall"
        animation={{ ...TextAnimations.copyIn, delay: 0 }}
        className="text-md text-right"
        variant={variant}
      >
        {values[1]}
      </AnimatedText>
    </>
  );
};
