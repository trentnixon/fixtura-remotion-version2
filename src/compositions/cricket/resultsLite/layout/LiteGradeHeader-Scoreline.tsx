import React from "react";

export const LiteGradeHeaderScoreline: React.FC<{
  gradeName: string;
}> = ({ gradeName }) => {
  const label = gradeName.trim();
  if (!label) {
    return null;
  }

  return (
    <div className="match-grade shrink-0">
      <p className="match-grade-name">{label}</p>
    </div>
  );
};
