import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { MetadataMedium } from "../../../utils/primitives/metadataMedium";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
interface TopSectionProps {
  ageGroup: string;
  gradeName: string;
  delay: number;
}

export const Grade: React.FC<TopSectionProps> = ({
  ageGroup,
  gradeName,
  delay,
}) => {
  const { selectedPalette } = useThemeContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;
  const ContainerAnimations = animations.container;
  const backgroundColor = selectedPalette.container.transparentMain;

  return (
    <AnimatedContainer
      type="full"
      className="w-full  p-3"
      backgroundColor="none"
      style={{
        background: backgroundColor,
      }}
      animation={ContainerAnimations.main.itemContainer.containerIn}
      animationDelay={delay}
    >
      <MetadataMedium
        value={`${ageGroup} ${gradeName}`}
        animation={{ ...TextAnimations.copyIn, delay: delay + 10 }}
        className="text-center"
      />
    </AnimatedContainer>
  );
};

export default Grade;
