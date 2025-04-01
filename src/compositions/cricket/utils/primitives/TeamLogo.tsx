import React from "react";
import { TeamLogo as TeamLogoType } from "../../upcoming/types";
import { AnimatedImage } from "../../../../components/images/AnimatedImage";
import { useAnimationContext } from "../../../../core/context/AnimationContext";

interface TeamLogoProps {
  logo: TeamLogoType | null;
  teamName: string;
  delay: number;
  size?: number;
  fit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  bgColor?: string;
}

export const TeamLogo: React.FC<TeamLogoProps> = ({
  logo,
  teamName,
  delay,
  size = 20,
  fit = "contain",
}) => {
  const sizeClass = `w-${size} h-${size}`;
  const { animations } = useAnimationContext();
  const logoAnimation = animations.image.main.item;
  if (!logo) {
    return (
      <div
        className={`${sizeClass} bg-gray-300/20 flex items-center justify-center rounded-full`}
      >
        <span className="text-xs text-gray-400">No Logo</span>
      </div>
    );
  }

  return (
    <AnimatedImage
      src={logo.url}
      alt={teamName}
      width={logo.width}
      height={logo.height}
      className={`object-contain rounded-full`}
      fit={fit}
      animation={{ ...logoAnimation.logo.itemIn, delay: delay }}
    />
  );
};

export default TeamLogo;
