import React from "react";
import { AnimatedImage } from "../../../../components/images/AnimatedImage";
import { useAnimationContext } from "../../../../core/context/AnimationContext";

export interface TeamLogo {
  url: string;
  width?: number;
  height?: number;
  id?: number;
}

interface TeamLogoProps {
  logo: TeamLogo | null;
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

  // Determine the source URL and dimensions based on logo type
  let srcUrl: string | undefined = undefined;
  let imgWidth: number | undefined = undefined;
  let imgHeight: number | undefined = undefined;

  if (logo && typeof logo === "object" && logo.url) {
    // It's the object type { url, width, height }
    srcUrl = logo.url;
    imgWidth = logo.width;
    imgHeight = logo.height;
  } else if (typeof logo === "string" && (logo as string).length > 0) {
    // It's a direct string URL (handle legacy/inconsistent data)
    console.warn(
      `[TeamLogo] Received string URL for ${teamName}. Consider standardizing data to { url, width, height }.`,
    );
    srcUrl = logo as string; // Cast to string
    // We don't have width/height in this case
  }

  // If no valid srcUrl, render placeholder
  if (!srcUrl) {
    return (
      <div
        className={`${sizeClass} bg-gray-300/20 flex items-center justify-center rounded-full`}
      >
        <span className="text-xs text-gray-400">No Logo</span>
      </div>
    );
  }

  // Render the image
  return (
    <AnimatedImage
      src={srcUrl} // Use the determined srcUrl
      alt={teamName}
      width={imgWidth} // Pass dimensions if available
      height={imgHeight}
      className={`object-contain`}
      fit={fit}
      animation={{ ...logoAnimation.logo.itemIn, delay: delay }}
    />
  );
};

export default TeamLogo;
