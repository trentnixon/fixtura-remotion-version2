import React from "react";

type ScorelineCreaseMarkupProps = {
  className?: string;
};

export const ScorelineCreaseMarkup: React.FC<ScorelineCreaseMarkupProps> = ({
  className = "",
}) => (
  <div className={`crease-rule ${className}`.trim()} aria-hidden>
    <span className="crease-post crease-post--primary" />
    <span className="crease-rail">
      <span className="crease-rail__primary" />
      <span className="crease-rail__secondary" />
    </span>
    <span className="crease-post crease-post--secondary" />
  </div>
);
