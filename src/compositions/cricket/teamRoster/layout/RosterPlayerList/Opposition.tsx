import React from "react";
import { RosterDataItem } from "../../types"; // Adjust path as needed
import TeamLogo from "../../../utils/primitives/TeamLogo";
import AgainstTeam from "../RosterHeader/AgainstTeam";

interface RosterSponsorsProps {
  roster: RosterDataItem;
}

const RosterSponsors: React.FC<RosterSponsorsProps> = ({ roster }) => {
  return (
    <div className="flex flex-col gap-8 flex-1 justify-center items-center">
      {roster.sponsors.map(
        (sponsor, index) =>
          sponsor.isPrimary && (
            <TeamLogo
              logo={{ url: sponsor.logo.url, width: 220, height: 220 }}
              teamName={sponsor.name}
              key={index}
              delay={0 + 5}
            />
          ),
      )}
      <AgainstTeam roster={roster} />
    </div>
  );
};

export default RosterSponsors;
