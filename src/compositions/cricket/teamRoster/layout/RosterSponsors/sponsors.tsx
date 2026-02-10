import React from "react";
import { AnimatedImage } from "../../../../../components/images";
import { RosterSponsorsProps } from "./_types/RosterSponsorsProps";
import {
  DEFAULT_SPONSOR_LIST_GAP,
  MAX_SPONSOR_CONTAINER_HEIGHT,
  DEFAULT_SPONSOR_IMAGE_WIDTH,
  DEFAULT_SPONSOR_IMAGE_HEIGHT,
  DEFAULT_SPONSOR_IMAGE_ALT,
  SPONSOR_LOGO_EXIT_FRAME,
} from "./_utils/constants";

const RosterSponsors: React.FC<RosterSponsorsProps> = ({ roster }) => {
  return (
    <div
      className={`flex flex-col ${DEFAULT_SPONSOR_LIST_GAP} flex-1 justify-center items-center ${MAX_SPONSOR_CONTAINER_HEIGHT}`}
    >
      {roster.sponsors.map((sponsor) => (
        <AnimatedImage
          key={sponsor.id}
          src={sponsor?.logo?.url || ""}
          alt={DEFAULT_SPONSOR_IMAGE_ALT}
          width={DEFAULT_SPONSOR_IMAGE_WIDTH}
          height={DEFAULT_SPONSOR_IMAGE_HEIGHT}
          fit="contain"
          exitFrame={SPONSOR_LOGO_EXIT_FRAME}
        />
      ))}
    </div>
  );
};

export default RosterSponsors;
