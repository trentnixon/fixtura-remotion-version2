import React from "react";

/**
 * Placeholder component shown when no team of the week data is available
 */
export const NoDataPlaceholder: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">No Team of the Week Data</h2>
        <p className="text-xl">Check back later for updates</p>
      </div>
    </div>
  );
};
