import React from "react";
import { AnimatedImage } from "../../images";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import { getIntroPrimarySponsors } from "../../../core/utils/sponsors";
import {
  ImageAnimationConfig,
  ImageAnimationType,
} from "../../easing/types";

type LogoAnimation = ImageAnimationType | ImageAnimationConfig | undefined;

export type IntroPrimarySponsorsProps = {
  introIn?: LogoAnimation;
  introOut?: LogoAnimation;
  introExitFrame?: number;
  /** Outer row alignment / spacing */
  className?: string;
  /** Per-logo cell sizing */
  itemClassName?: string;
};

/**
 * Renders up to four account primary sponsor logos for intro screens.
 */
export const IntroPrimarySponsors: React.FC<IntroPrimarySponsorsProps> = ({
  introIn,
  introOut,
  introExitFrame,
  className = "w-full flex flex-row flex-wrap justify-center items-center gap-4",
  itemClassName = "flex-shrink-0 max-h-[120px] max-w-[120px]",
}) => {
  const { sponsors } = useVideoDataContext();
  const primaries = getIntroPrimarySponsors(sponsors);

  if (primaries.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      {primaries.map((sponsor, index) => (
        <div key={`${sponsor.id}_${index}`} className={itemClassName}>
          <AnimatedImage
            src={sponsor.logo.url}
            alt={sponsor.name || ""}
            width="auto"
            height="auto"
            fit="contain"
            animation={introIn}
            exitAnimation={introOut}
            exitFrame={introExitFrame}
            animationDelay={index * 5}
          />
        </div>
      ))}
    </div>
  );
};
