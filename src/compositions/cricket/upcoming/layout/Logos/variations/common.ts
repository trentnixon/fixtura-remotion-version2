import { TeamLogo as TeamLogoType } from "../../../types";
import { AnimationConfig } from "../../../../../../components/typography/config/animations/types";
import { ContainerAnimationConfig } from "../../../../../../components/containers/animations";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";

// Base props interface for all layout variants
export interface TeamLayoutProps {
  teamHome: string;
  teamAway: string;
  teamHomeLogo: TeamLogoType | null;
  teamAwayLogo: TeamLogoType | null;
  delay: number;
  vsAdditionalInfo?: string; // Optional string to display under VS
  backgroundColor?: string;
  logoPosition?: "center" | "split" | "together";
}

// Define logo sizes as constants for maintainability
export const LOGO_SIZES = {
  large: { container: "w-35 h-35", size: 35 },
  medium: { container: "w-20 h-20", size: 20 },
  small: { container: "w-16 h-16", size: 16 },
};

// Common animation configurations
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
