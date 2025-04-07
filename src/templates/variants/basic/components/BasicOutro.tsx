import React from "react";
import { AbsoluteFill, AnimatedImage } from "remotion";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../../core/context/ThemeContext";

interface BasicOutroProps {
  doesAccountHaveSponsors: boolean;
}

export const BasicOutro: React.FC<BasicOutroProps> = ({
  doesAccountHaveSponsors,
}) => {
  const theme = useThemeContext();

  // Get font classes from theme
  const fontClasses = theme.fontClasses || {};

  // Combine Tailwind classes for heading
  const headingClasses = [
    fontClasses.heading?.size || "text-5xl",
    fontClasses.heading?.weight || "font-bold",
    fontClasses.heading?.spacing || "tracking-tight",
    fontClasses.heading?.leading || "leading-tight",
    "text-center",
    "mb-8",
  ].join(" ");

  // Get colors from theme
  const primaryColor = theme.colors.primary;
  const secondaryColor = theme.colors.secondary;

  // Get the heading font family from theme
  const headingFontFamily = theme.headingFontFamily;

  // If no sponsors, show alternative outro
  if (!doesAccountHaveSponsors) {
    return <AlternativeOutro />;
  }

  return (
    <AbsoluteFill
      className="flex flex-col justify-center items-center"
      style={{
        backgroundColor: primaryColor,
      }}
    >
      <h2
        className={headingClasses}
        style={{
          color: secondaryColor,
          fontFamily: headingFontFamily,
        }}
      >
        Our Sponsors
      </h2>

      {/* Render sponsors - simplified for development */}
      <div className="flex flex-wrap justify-center max-w-4/5">
        {/* Sample sponsor for development */}
        <div className="m-4 bg-white p-4">
          <div className="w-[150px] h-[100px] flex items-center justify-center text-black font-bold">
            Sponsor 1
          </div>
        </div>
        <div className="m-4 bg-white p-4">
          <div className="w-[150px] h-[100px] flex items-center justify-center text-black font-bold">
            Sponsor 2
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Alternative outro for when there are no sponsors
const AlternativeOutro: React.FC = () => {
  const { club } = useVideoDataContext();
  const theme = useThemeContext();

  // Get font classes from theme
  const fontClasses = theme.fontClasses || {};

  // Combine Tailwind classes for subheading
  const subheadingClasses = [
    fontClasses.subheading?.size || "text-3xl",
    fontClasses.subheading?.weight || "font-semibold",
    fontClasses.subheading?.spacing || "tracking-normal",
    fontClasses.subheading?.leading || "leading-snug",
    "text-center",
  ].join(" ");

  // Get colors from theme
  const primaryColor = theme.colors.primary;
  const secondaryColor = theme.colors.secondary;

  // Get the subheading font family from theme
  const subheadingFontFamily = theme.subheadingFontFamily;

  return (
    <AbsoluteFill
      className="flex flex-col justify-center items-center"
      style={{
        backgroundColor: primaryColor,
      }}
    >
      {/* Logo */}
      {club?.Logo?.url && (
        <AnimatedImage
          src={club.Logo.url}
          alt={club.Name || "Club Logo"}
          className="w-1/3 max-h-1/3 object-contain mb-4"
          width={100}
          height={100}
        />
      )}

      <h3
        className={subheadingClasses}
        style={{
          color: secondaryColor,
          fontFamily: subheadingFontFamily,
        }}
      >
        Visit our website
      </h3>
    </AbsoluteFill>
  );
};
