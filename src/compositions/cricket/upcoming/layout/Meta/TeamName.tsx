import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { MetadataMedium } from "../../../utils/primitives/metadataMedium";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
interface TopSectionProps {
  teamName: string;
  delay: number;
  delayName?: number;
  style?: React.CSSProperties;
  variant?: string;
  className?: string;
}

export const TeamName: React.FC<TopSectionProps> = ({
  teamName,
  delay,
  delayName = 10,
  style,
  variant = "onContainerCopy",
  className = "text-center",
}) => {
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;
  const ContainerAnimations = animations.container;
  const { layout } = useThemeContext();

  return (
    <AnimatedContainer
      type="full"
      className={`w-full  p-3 ${layout.borderRadius.container}`}
      backgroundColor="none"
      style={style}
      animation={ContainerAnimations.main.itemContainer.containerIn}
      animationDelay={delay}
    >
      <MetadataMedium
        value={`${teamName}`}
        animation={{ ...TextAnimations.copyIn, delay: delayName }}
        className={className}
        variant={variant}
      />
    </AnimatedContainer>
  );
};

export default TeamName;

interface TeamNameWrappedProps {
  teamName: string;
  delay: number;
  outerStyles: object;
  innerStyles: object;
}
export const TeamNameWrapped: React.FC<TeamNameWrappedProps> = ({
  teamName,
  delay,
  outerStyles,
  innerStyles,
}) => {
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;
  const ContainerAnimations = animations.container;

  return (
    <AnimatedContainer
      type="full"
      className="w-full p-2 flex justify-start items-center"
      backgroundColor="none"
      style={outerStyles}
      animation={ContainerAnimations.main.itemContainer.containerIn}
      animationDelay={delay}
    >
      <AnimatedContainer
        type="full"
        className="w-full py-2 px-8 flex justify-center items-center flex-1 text-center"
        style={innerStyles}
        animation={ContainerAnimations.main.itemContainer.containerIn}
        animationDelay={delay + 10}
      >
        <MetadataMedium
          value={`${teamName}`}
          animation={{ ...TextAnimations.copyIn, delay: delay + 10 }}
          className="text-center"
        />
      </AnimatedContainer>
    </AnimatedContainer>
  );
};
