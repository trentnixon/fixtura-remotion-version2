import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { MetadataSmall } from "../../../utils/primitives/metadataSmall";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { BottomSectionProps } from "./_types/GroundProps";

export const Ground: React.FC<BottomSectionProps> = ({ ground, delay, backgroundColor }) => {
  const { selectedPalette } = useThemeContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;
  const ContainerAnimations = animations.container;
  const bgColor = backgroundColor ?? selectedPalette.container.light;

  return (
    <AnimatedContainer
      type="full"
      className={`w-full p-1 flex justify-between `}
      backgroundColor="none"
      style={{
        backgroundColor: bgColor,
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
          variant="onContainerCopyNoBg"
        />
      </div>
    </AnimatedContainer>
  );
};

export default Ground;
