// Helper function to truncate text
export const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text || "";
  return text.substring(0, maxLength - 3) + "...";
};

// format Date to DD/MM/YYYY  eg 06 Sep 25
export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const stripGradeNumberFromTeamName = (teamName: string) => {
  console.log("teamName", teamName);
  const GradeLookUp = [
    "1st",
    "2nd",
    "3rd",
    "4th",
    "5th",
    "6th",
    "7th",
    "8th",
    "9th",
    "10th",
    "W1",
    "W2",
    "W3",
    "Brewer",
    "Brewer Shield",
    "AWG",
    "L/O",
  ];

  // Find grade number (case insensitive)
  const gradeNumber = GradeLookUp.find((grade) =>
    teamName.toUpperCase().includes(grade.toUpperCase()),
  );

  if (gradeNumber) {
    // Remove the grade number and return cleaned team name
    return teamName.toUpperCase().replace(gradeNumber.toUpperCase(), "").trim();
  }

  return teamName.toUpperCase();
};
