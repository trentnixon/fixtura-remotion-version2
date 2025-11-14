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

interface BrickworkOutroProps {
  doesAccountHaveSponsors: boolean;
}

const GRID_SETTINGS = {
  columns: 2,
  rows: 3,
  gap: "0.25rem",
  containerMaxWidth: 1600,
  containerMaxHeight: 900,
  cellMaxSize: 600,
  cellPadding: 16,
  cellAspectRatio: "1 / 1",
  chunkSize: 6,
  sequenceDurationInFrames: 90,
  logoExitFrame: 300,
  logoDelayIncrement: 5,
} as const;

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

// Grid component for 2x3 layout (6 equal boxes)
const SponsorGrid: React.FC<{
  sponsors: Sponsor[];
  LogoAnimations: LogoAnimationsType;
}> = ({ sponsors, LogoAnimations }) => (
  <div
    className="grid justify-center items-center w-full h-full"
    style={{
      gridTemplateColumns: `repeat(${GRID_SETTINGS.columns}, minmax(0, 1fr))`,
      gridTemplateRows: `repeat(${GRID_SETTINGS.rows}, minmax(0, 1fr))`,
      gap: GRID_SETTINGS.gap,
      maxWidth: GRID_SETTINGS.containerMaxWidth,
      maxHeight: GRID_SETTINGS.containerMaxHeight,
      gridAutoRows: "1fr",
    }}
  >
    {sponsors
      .filter((sponsor) => sponsor.logo && sponsor.logo.url)
      .map((sponsor, idx) => (
        <div
          key={`${sponsor.id}_${idx}`}
          className="flex items-center justify-center w-full h-full"
          style={{
            aspectRatio: GRID_SETTINGS.cellAspectRatio,
            maxWidth: GRID_SETTINGS.cellMaxSize,
            maxHeight: GRID_SETTINGS.cellMaxSize,
            padding: GRID_SETTINGS.cellPadding,
          }}
        >
          <AnimatedImage
            src={sponsor.logo.url}
            alt={sponsor.name || ""}
            width={"100%"}
            height={"100%"}
            fit="contain"
            animation={LogoAnimations.introIn}
            exitAnimation={LogoAnimations.exitAnimation}
            animationDelay={idx * GRID_SETTINGS.logoDelayIncrement}
            exitFrame={GRID_SETTINGS.logoExitFrame}
          />
        </div>
      ))}
  </div>
);

export const BrickworkOutro: React.FC<BrickworkOutroProps> = ({
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

  const groups = chunkArray(sponsorsArray, GRID_SETTINGS.chunkSize);

  // Each group is a sequence for 180 frames
  const sequences = groups.map((group) => ({
    content: (
      <AbsoluteFill className="flex flex-col justify-center items-center">
        <SponsorGrid sponsors={group} LogoAnimations={LogoAnimations} />
      </AbsoluteFill>
    ),
    durationInFrames: GRID_SETTINGS.sequenceDurationInFrames,
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
    <h2 className="text-5xl font-bold text-center"></h2>
  </AbsoluteFill>
);

const convertToArray = (sponsors: Record<string, Sponsor[]>): Sponsor[] =>
  Object.values(sponsors).flat();
