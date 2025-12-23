// src/compositions/cricket/TeamOfTheWeek/index.tsx
import BasicTeamOfTheWeek from "./basic";
import ClassicTeamOfTheWeek from "./classic";
import BrickWorkTeamOfTheWeek from "./brickWork";
import CNSWTeamOfTheWeek from "./cnsw";
import CNSWPrivateTeamOfTheWeek from "./cnswPrivate";
import SixersThunderTeamOfTheWeek from "./sixersThunder";
import ClassicTwoColumnTeamOfTheWeek from "./classicTwoColumn";

// Export all template implementations
export const basic = BasicTeamOfTheWeek;
export const classic = ClassicTeamOfTheWeek;
export const brickwork = BrickWorkTeamOfTheWeek;
export const cnsw = CNSWTeamOfTheWeek;
export const cnswPrivate = CNSWPrivateTeamOfTheWeek;
export const sixersThunder = SixersThunderTeamOfTheWeek;
export const classicTwoColumn = ClassicTwoColumnTeamOfTheWeek;
