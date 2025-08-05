import React from "react";
import { RosterDataItem } from "../../types"; // Adjust path as needed

import { AnimatedImage } from "../../../../../components/images";

interface RosterSponsorsProps {
  roster: RosterDataItem;
}

const RosterSponsors: React.FC<RosterSponsorsProps> = ({ roster }) => {
  return (
    <div className="flex flex-col gap-8 flex-1 justify-center items-center max-h-[120px]">
      {roster.sponsors.map((sponsor) => (
        <AnimatedImage
          key={sponsor.id}
          src={sponsor?.logo?.url || ""}
          alt={""}
          width={"auto"}
          height={"auto"}
          fit="contain"
          exitFrame={300}
        />
      ))}
    </div>
  );
};

export default RosterSponsors;
