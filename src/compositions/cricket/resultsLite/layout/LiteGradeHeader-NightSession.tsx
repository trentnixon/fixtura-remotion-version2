import React from "react";

export const LiteGradeHeaderNightSession: React.FC<{
  gradeName: string;
}> = ({ gradeName }) => {
  const label = gradeName.trim();
  if (!label) {
    return null;
  }

  return (
    <div className="mb-2 flex w-full shrink-0 justify-center">
      <span className="header-shared-grade">{label.toUpperCase()}</span>
    </div>
  );
};
