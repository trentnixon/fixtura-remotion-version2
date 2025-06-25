import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { MetadataMedium } from "../../../utils/primitives/metadataMedium";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
interface TopSectionProps {
  teamName: string;
  delay: number;
  backgroundColor: string;
}

export const TeamName: React.FC<TopSectionProps> = ({
  teamName,
  delay,
  backgroundColor,
}) => {
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;
  const ContainerAnimations = animations.container;

  return (
    <AnimatedContainer
      type="full"
      className="w-full  p-3"
      backgroundColor="none"
      style={{
        background: backgroundColor,
        textAlign: "center",
      }}
      animation={ContainerAnimations.main.itemContainer.containerIn}
      animationDelay={delay}
    >
      <MetadataMedium
        value={`${teamName}`}
        animation={{ ...TextAnimations.copyIn, delay: delay + 10 }}
        className="text-center"
      />
    </AnimatedContainer>
  );
};

export default TeamName;
