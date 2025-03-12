import React from "react";
import { AbsoluteFill } from "remotion";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { AnimatedText } from "../../../../components/typography/AnimatedText";
//import { useThemeContext } from "../../../../core/context/ThemeContext";
import { AnimatedImage } from "../../../../components/images";

/**
 * BasicIntro Component
 *
 * A basic introduction template that showcases enhanced container styling options.
 * This template demonstrates how to style containers with various layout, text, and positioning options.
 */
export const BasicIntro: React.FC = () => {
  const { Video, Club } = useVideoDataContext();

  /*   const { selectedPalette, componentStyles } = useThemeContext();

  console.log("[selectedPalette]", selectedPalette);
  console.log("[DATA]", DATA);
  console.log("[Club]", Club);
  console.log("[componentStyles]", componentStyles); */

  return (
    <AbsoluteFill>
      <div className="flex flex-col justify-center items-center h-full w-full px-12 py-8 overflow-auto">
        <div className="w-full h-full flex justify-center items-center max-h-[500px] max-w-[500px]">
          <AnimatedImage
            src={Club.Logo.url}
            alt={Club.Name}
            width={Club.Logo.width}
            height={Club.Logo.height}
            animation={{
              type: "zoomIn",
              duration: 20,
              delay: 0,
              easing: "easeInOut",
              custom: { distance: 200 },
            }}
            exitAnimation={{
              type: "fadeOut",
              duration: 15,
              easing: "easeInOut",
            }}
            exitFrame={60}
          />
        </div>
        <AnimatedText
          type="title"
          variant="onBackgroundMain"
          letterAnimation="none"
          animation="fadeInDown"
          animationDelay={0}
          animationDuration={15}
          animationEasing="easeInOut"
          exitAnimation={{
            type: "fadeOut",
            duration: 15,
            easing: "easeInOut",
            custom: { distance: 200 },
          }}
          exitFrame={60}
        >
          {Video.Title}
        </AnimatedText>

        <AnimatedText
          type="subtitle"
          variant="onBackgroundDark"
          letterAnimation="word"
          animation="fadeInUp"
          animationDelay={0}
          animationDuration={30}
          animationEasing="easeInOut"
          exitAnimation={{
            type: "fadeOut",
            duration: 15,
            easing: "easeInOut",
            custom: { distance: 200 },
          }}
          exitFrame={60}
        >
          {Club.Name}
        </AnimatedText>
      </div>
    </AbsoluteFill>
  );
};
