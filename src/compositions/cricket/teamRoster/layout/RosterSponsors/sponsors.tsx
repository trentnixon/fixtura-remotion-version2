import React from "react";
import { RosterDataItem } from "../../types"; // Adjust path as needed
import { Img } from "remotion";

interface RosterSponsorsProps {
  roster: RosterDataItem;
}

const RosterSponsors: React.FC<RosterSponsorsProps> = ({ roster }) => {
  return (
    <div>
      {roster.sponsors.map(
        (sponsor, index) =>
          sponsor.isPrimary && (
            <Img
              key={index}
              src={sponsor.Logo}
              style={{ height: 30, width: "auto", margin: "5px" }}
            />
          ),
      )}
    </div>
  );
};

export default RosterSponsors;
