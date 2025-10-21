import React from "react";

import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { MetadataSmall } from "../../../utils/primitives/metadataSmall";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";

interface BottomSectionProps {
  time: string | null;
  delay: number;
  ground: string | null;
  truncateString?: number;
  backgroundColor?: string;
}

export const GroundTime: React.FC<BottomSectionProps> = ({
  time = "",
  delay,
  ground = "",
  truncateString = 35,
  backgroundColor,
}) => {
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;
  const ContainerAnimations = animations.container;

  // truncate string and handle null values
  const truncatedGround =
    ground && ground.length > truncateString
      ? ground.slice(0, truncateString) + "..."
      : ground || "";

  return (
    <AnimatedContainer
      type="full"
      className={`w-full p-0 pt-2 flex justify-between `}
      backgroundColor="none"
      style={{
        backgroundColor: backgroundColor,
      }}
      animation={ContainerAnimations.main.itemContainer.containerIn}
      animationDelay={delay + 10}
    >
      <div
        className={`grid w-full grid-cols-2 items-center justify-between text-center`}
      >
        <MetadataSmall
          value={truncatedGround}
          animation={{ ...TextAnimations.copyIn, delay: delay + 10 }}
          className="text-left"
          variant="onContainerCopyNoBg"
        />

        <MetadataSmall
          value={time || ""}
          animation={{ ...TextAnimations.copyIn, delay: delay + 10 }}
          className="text-right"
          variant="onContainerCopyNoBg"
        />
      </div>
    </AnimatedContainer>
  );
};

export default GroundTime;
