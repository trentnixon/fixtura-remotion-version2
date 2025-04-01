import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { MetadataSmall } from "../../../utils/primitives/metadataSmall";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";

interface BottomSectionProps {
  ground: string;
  delay: number;
}

export const Ground: React.FC<BottomSectionProps> = ({ ground, delay }) => {
  const { selectedPalette } = useThemeContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;
  const ContainerAnimations = animations.container;
  const backgroundColor = selectedPalette.container.light;

  return (
    <AnimatedContainer
      type="full"
      className={`w-full p-3 flex justify-between `}
      backgroundColor="none"
      style={{
        backgroundColor: backgroundColor,
      }}
      animation={ContainerAnimations.main.itemContainer.containerIn}
      animationDelay={delay + 10}
    >
      <div
        className={`grid w-full grid-cols-1 items-center justify-center text-center`}
      >
        <MetadataSmall
          value={ground}
          animation={{ ...TextAnimations.copyIn, delay: delay + 10 }}
          className="text-center"
        />
      </div>
    </AnimatedContainer>
  );
};

export default Ground;
