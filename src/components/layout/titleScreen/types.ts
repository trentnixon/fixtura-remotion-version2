import React from "react";

// Define common props for all title screen layouts
export type TitleScreenProps = {
  Logo: React.ReactNode;
  Title: React.ReactNode;
  Name: React.ReactNode;
  PrimarySponsor: React.ReactNode;
  alignment?: "start" | "center" | "end";
  exitFrame?: number;
};

// Helper function to get flex alignment classes based on alignment prop
export const getAlignmentClasses = (
  alignment: "start" | "center" | "end" = "center",
): string => {
  switch (alignment) {
    case "start":
      return "items-start justify-start text-left";
    case "end":
      return "items-end justify-end text-right";
    case "center":
    default:
      return "items-center justify-center text-center";
  }
};
