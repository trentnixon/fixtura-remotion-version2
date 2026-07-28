import React, { useCallback, useState } from "react";
import { AnimatedImage } from "../../../../components/images/AnimatedImage";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import {
  TeamLogo as TeamLogoType,
  TeamLogoProps,
} from "./_types/TeamLogoProps";
import {
  DEFAULT_TEAM_LOGO_SIZE,
  DEFAULT_TEAM_LOGO_FIT,
} from "./_utils/constants";

export type { TeamLogoType };

const resolveTeamLogoSrc = (
  logo: TeamLogoProps["logo"],
): { srcUrl?: string; width?: number; height?: number } => {
  if (logo && typeof logo === "object" && logo.url) {
    return { srcUrl: logo.url, width: logo.width, height: logo.height };
  }
  if (typeof logo === "string" && logo.length > 0) {
    return { srcUrl: logo };
  }
  return {};
};

export const TeamLogo: React.FC<TeamLogoProps> = ({
  logo,
  teamName,
  delay,
  size = DEFAULT_TEAM_LOGO_SIZE,
  fit = DEFAULT_TEAM_LOGO_FIT,
  imgStyle,
}) => {
  const { animations } = useAnimationContext();
  const logoAnimation = animations.image.main.item;
  const [loadFailed, setLoadFailed] = useState(false);

  const {
    srcUrl,
    width: imgWidth,
    height: imgHeight,
  } = resolveTeamLogoSrc(logo);
  const width = imgWidth ?? size;
  const height = imgHeight ?? size;

  const handleError = useCallback(() => {
    setLoadFailed(true);
  }, []);

  if (!srcUrl || loadFailed) {
    return null;
  }

  if (typeof logo === "string") {
    console.warn(
      `[TeamLogo] Received string URL for ${teamName}. Consider standardizing data to { url, width, height }.`,
    );
  }

  return (
    <AnimatedImage
      src={srcUrl}
      alt={teamName}
      width={width}
      height={height}
      className="object-contain"
      fit={fit}
      style={imgStyle}
      animation={{ ...logoAnimation.logo.itemIn, delay: delay }}
      onError={handleError}
    />
  );
};

export default TeamLogo;
