import React from "react";
import { AbsoluteFill } from "remotion";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { AnimatedText } from "../../../../../components/typography/AnimatedText";

export const NoGamesData: React.FC = () => {
  const { fontClasses } = useThemeContext();

  return (
    <AbsoluteFill className="flex justify-center items-center text-white font-sans">
      <div className="text-center">
        <AnimatedText
          type="mainHeading"
          variant="onBackgroundMain"
          textAlign="center"
          animation={{
            type: "fadeIn",
            duration: 30,
          }}
          fontFamily={fontClasses.heading?.family}
        >
          No Upcoming Games
        </AnimatedText>

        <AnimatedText
          type="subHeading"
          variant="onBackgroundDark"
          textAlign="center"
          animation={{
            type: "fadeIn",
            duration: 30,
            delay: 15,
          }}
          fontFamily={fontClasses.copy?.family}
        >
          There are no scheduled games at this time.
        </AnimatedText>
      </div>
    </AbsoluteFill>
  );
};

export default NoGamesData;
