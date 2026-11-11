import React from "react";

/** Header-motif divider: centred wedge + diagonal accent lines (see asset `ns-header`). */
export const NightSessionAccentDivider: React.FC<{ className?: string }> = ({
  className = "fixture-close",
}) => (
  <div className={className} aria-hidden>
    <div className="ns-accent-divider">
      <span className="ns-accent-wedge" />
      <span className="ns-accent-lines" />
    </div>
  </div>
);
