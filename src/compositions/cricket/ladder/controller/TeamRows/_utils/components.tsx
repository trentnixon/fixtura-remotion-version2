import React from "react";

/**
 * Simple wrapper component for overflow hidden styling
 */
export const OverflowHiddenWrapper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <div className="overflow-hidden">{children}</div>;
};
