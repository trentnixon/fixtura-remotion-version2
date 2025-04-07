import React from "react";
import { RosterDataItem } from "../../types"; // Adjust path as needed
import { Img, staticFile } from "remotion";

interface RosterDetailsProps {
  roster: RosterDataItem;
}

const RosterDetails: React.FC<RosterDetailsProps> = ({ roster }) => {
  return (
    <div>
      <p>Date: {roster.date}</p>
      <p>Ground: {roster.ground}</p>
      {roster.isHomeTeam ? (
        <Img
          src={
            roster.teamHomeLogo ||
            staticFile("assets/images/logos/DefaultLogo.png")
          }
          style={{ height: 50, width: "auto", margin: "10px" }}
        />
      ) : (
        <Img
          src={
            roster.teamAwayLogo ||
            staticFile("assets/images/logos/DefaultLogo.png")
          }
          style={{ height: 50, width: "auto", margin: "10px" }}
        />
      )}
    </div>
  );
};

export default RosterDetails;
