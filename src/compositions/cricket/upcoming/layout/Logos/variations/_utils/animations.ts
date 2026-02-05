import { AnimationConfig } from "../../../../../../../components/typography/config/animations/types";
import { ContainerAnimationConfig } from "../../../../../../../components/containers/animations";
import { useAnimationContext } from "../../../../../../../core/context/AnimationContext";

/**
 * Common animation configurations for logo layout components
 * @param delay - Base animation delay in frames
 * @returns Object containing metaDataAnimation and containerAnimation configurations
 */
export const useLayoutAnimations = (delay: number) => {
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;
  const ContainerAnimations = animations.container;

  const metaDataAnimation: AnimationConfig = {
    ...TextAnimations.copyIn,
    delay: delay + 10,
  };

  const containerAnimation: ContainerAnimationConfig =
    ContainerAnimations.main.itemContainerSecondary.containerIn;

  return {
    metaDataAnimation,
    containerAnimation,
  };
};
