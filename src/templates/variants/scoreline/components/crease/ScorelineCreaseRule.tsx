import React from "react";

type ScorelineCreaseRuleProps = {
  primaryColor: string;
  secondaryColor: string;
  emphasis?: boolean;
  className?: string;
};

export const ScorelineCreaseRule: React.FC<ScorelineCreaseRuleProps> = ({
  primaryColor,
  secondaryColor,
  emphasis = false,
  className = "",
}) => {
  const ruleHeight = emphasis ? 12 : 10;
  const postHeight = emphasis ? 10 : 8;
  const railHeight = emphasis ? 3 : 2;

  return (
    <div
      className={`flex w-full items-end ${className}`}
      style={{ height: ruleHeight }}
      aria-hidden
    >
      <span
        className="flex-shrink-0"
        style={{
          width: 2,
          height: postHeight,
          backgroundColor: primaryColor,
        }}
      />
      <span
        className="flex min-w-0 flex-1 items-end"
        style={{ height: railHeight, gap: 0 }}
      >
        <span
          className="block h-full flex-1"
          style={{ backgroundColor: primaryColor }}
        />
        <span
          className="block h-full flex-1"
          style={{ backgroundColor: secondaryColor }}
        />
      </span>
      <span
        className="flex-shrink-0"
        style={{
          width: 2,
          height: postHeight,
          backgroundColor: secondaryColor,
        }}
      />
    </div>
  );
};
