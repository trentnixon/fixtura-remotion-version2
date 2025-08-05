import React from "react";
import { AbsoluteFill } from "remotion";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { Sponsor } from "../../../../core/types/data/sponsors";
import { AnimatedImage } from "../../../../components/images";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import { TransitionSeriesWrapper } from "../../../../components/transitions/TransitionSeriesWrapper";
import {
  ImageAnimationType,
  ImageAnimationConfig,
} from "../../../../components/easing/types";

interface BasicOutroProps {
  doesAccountHaveSponsors: boolean;
}

// Helper to chunk array into groups of n
const chunkArray = <T,>(arr: T[], size: number): T[][] => {
  // Normalize: if element is an object with a single numeric key '0', extract the value
  const normalized = arr.map((item: unknown) => {
    if (
      typeof item === "object" &&
      item !== null &&
      Object.keys(item).length === 1 &&
      Object.keys(item)[0] === "0" &&
      Object.prototype.hasOwnProperty.call(item, "0")
    ) {
      // Type assertion: item is Record<string, T>
      return (item as Record<string, T>)["0"];
    }
    return item as T;
  });
  const result: T[][] = [];
  for (let i = 0; i < normalized.length; i += size) {
    result.push(normalized.slice(i, i + size));
  }
  return result;
};

interface LogoAnimationsType {
  introIn?: ImageAnimationType | ImageAnimationConfig;
  exitAnimation?: ImageAnimationType | ImageAnimationConfig;
}

// Grid component for 2x3 layout
const SponsorGrid: React.FC<{
  sponsors: Sponsor[];
  LogoAnimations: LogoAnimationsType;
}> = ({ sponsors, LogoAnimations }) => (
  <div className="grid grid-cols-2 grid-rows-3 gap-10  justify-center items-center">
    {sponsors
      .filter((sponsor) => sponsor.logo && sponsor.logo.url)
      .map((sponsor, idx) => (
        <div
          key={`${sponsor.id}_${idx}`}
          className="flex items-center justify-center p-4 max-h-[300px] max-w-[300px]"
        >
          <AnimatedImage
            src={sponsor.logo.url}
            alt={sponsor.name || ""}
            width={"auto"}
            height={"auto"}
            fit="contain"
            animation={LogoAnimations.introIn}
            exitAnimation={LogoAnimations.exitAnimation}
            animationDelay={idx * 5}
            exitFrame={300}
          />
        </div>
      ))}
  </div>
);

export const BasicOutro: React.FC<BasicOutroProps> = ({
  doesAccountHaveSponsors,
}) => {
  const { sponsors } = useVideoDataContext();
  const { default: defaultSponsors = {} } = sponsors || {};
  const { animations } = useAnimationContext();
  const LogoAnimations = animations.image.sponsor.logo;

  if (!doesAccountHaveSponsors) {
    return <AlternativeOutro />;
  }

  const defaultArray: Sponsor[] = convertToArray(defaultSponsors);
  const sponsorsArray: Sponsor[] = [...defaultArray];

  const groups = chunkArray(sponsorsArray, 6);

  // Each group is a sequence for 180 frames
  const sequences = groups.map((group) => ({
    content: (
      <AbsoluteFill className="flex flex-col justify-center items-center">
        <SponsorGrid sponsors={group} LogoAnimations={LogoAnimations} />
      </AbsoluteFill>
    ),
    durationInFrames: 90,
  }));

  return (
    <TransitionSeriesWrapper
      sequences={sequences}
      transitionType="none"
      timing={{ type: "linear", durationInFrames: 1 }}
    />
  );
};

// Alternative outro for when there are no sponsors
const AlternativeOutro: React.FC = () => (
  <AbsoluteFill className="flex flex-col justify-center items-center">
    <h2 className="text-5xl font-bold text-center">Thank you for watching!</h2>
  </AbsoluteFill>
);

const convertToArray = (sponsors: Record<string, Sponsor[]>): Sponsor[] =>
  Object.values(sponsors).flat();
