import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { MetadataMedium } from "../../../utils/primitives/metadataMedium";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { MetadataLarge } from "../../../utils/primitives/metadataLarge";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";

interface TopSectionProps {
  ageGroup: string;
  gradeName: string;
  date: string;
  delay: number;
}

export const GradeDate: React.FC<TopSectionProps> = ({
  gradeName,
  date,
  delay,
}) => {
  const { selectedPalette } = useThemeContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;
  const ContainerAnimations = animations.container;

  const backgroundColor = selectedPalette.container.main;

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
      <div className="flex justify-between">
        <MetadataLarge
          value={`${gradeName}`}
          animation={{ ...TextAnimations.copyIn, delay: delay + 10 }}
          className="text-center"
        />
        <MetadataMedium
          value={date}
          animation={{ ...TextAnimations.copyIn, delay: delay + 10 }}
          className="text-center"
        />
      </div>
    </AnimatedContainer>
  );
};

export default GradeDate;
