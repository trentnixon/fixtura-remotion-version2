import React from "react";
import TeamLogo from "../../../utils/primitives/TeamLogo";
import AgainstTeam from "../RosterHeader/AgainstTeam";
import { RosterSponsorsProps } from "./_types/RosterSponsorsProps";
import {
  SPONSOR_LOGO_SIZE,
  SPONSOR_LOGO_DELAY_OFFSET,
  DEFAULT_TEAM_HEADER_ANIMATION_DELAY,
} from "./_utils/constants";

const RosterSponsors: React.FC<RosterSponsorsProps> = ({ roster }) => {
  return (
    <div className="flex flex-col gap-8 flex-1 justify-center items-center">
      {roster.sponsors.map(
        (sponsor, index) =>
          sponsor.isPrimary && (
            <TeamLogo
              logo={{
                url: sponsor.logo.url,
                width: SPONSOR_LOGO_SIZE,
                height: SPONSOR_LOGO_SIZE,
              }}
              teamName={sponsor.name}
              key={index}
              delay={DEFAULT_TEAM_HEADER_ANIMATION_DELAY + SPONSOR_LOGO_DELAY_OFFSET}
            />
          ),
      )}
      <AgainstTeam roster={roster} />
    </div>
  );
};

export default RosterSponsors;
