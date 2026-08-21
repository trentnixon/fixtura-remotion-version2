import React from "react";
import { AbsoluteFill } from "remotion";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { Sponsor } from "../../../../core/types/data/sponsors";
import {
  buildOutroSponsorSequence,
  chunkSponsors,
  OUTRO_SPONSOR_PAGE_SIZE,
  OUTRO_PAGE_DURATION_FRAMES,
  OUTRO_PAGE_LOGO_EXIT_FRAME,
} from "../../../../core/utils/sponsors";
import { AnimatedImage } from "../../../../components/images";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import { TransitionSeriesWrapper } from "../../../../components/transitions/TransitionSeriesWrapper";
import {
  ImageAnimationType,
  ImageAnimationConfig,
} from "../../../../components/easing/types";

interface CNSWOutroProps {
  doesAccountHaveSponsors: boolean;
}

interface LogoAnimationsType {
  introIn?: ImageAnimationType | ImageAnimationConfig;
  exitAnimation?: ImageAnimationType | ImageAnimationConfig;
  introOut?: ImageAnimationType | ImageAnimationConfig;
}

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
            exitAnimation={
              LogoAnimations.exitAnimation ?? LogoAnimations.introOut
            }
            animationDelay={idx * 5}
            exitFrame={OUTRO_PAGE_LOGO_EXIT_FRAME}
          />
        </div>
      ))}
  </div>
);

export const CNSWOutro: React.FC<CNSWOutroProps> = ({
  doesAccountHaveSponsors,
}) => {
  const { sponsors } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const LogoAnimations = animations.image.sponsor.logo;

  if (!doesAccountHaveSponsors) {
    return <AlternativeOutro />;
  }

  const sponsorsArray: Sponsor[] = buildOutroSponsorSequence({
    primary: sponsors?.primary ?? [],
    general: sponsors?.general ?? [],
  });

  const groups = chunkSponsors(sponsorsArray, OUTRO_SPONSOR_PAGE_SIZE);

  const sequences = groups.map((group) => ({
    content: (
      <AbsoluteFill className="flex flex-col justify-center items-center">
        <SponsorGrid sponsors={group} LogoAnimations={LogoAnimations} />
      </AbsoluteFill>
    ),
    durationInFrames: OUTRO_PAGE_DURATION_FRAMES,
  }));

  return (
    <TransitionSeriesWrapper
      sequences={sequences}
      transitionType="none"
      timing={{ type: "linear", durationInFrames: 1 }}
    />
  );
};

const AlternativeOutro: React.FC = () => (
  <AbsoluteFill className="flex flex-col justify-center items-center">
    <h2 className="text-5xl font-bold text-center">Thank you for watching!</h2>
  </AbsoluteFill>
);
