import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { MetadataMedium } from "../../../utils/primitives/metadataMedium";
import { TableHeaderProps } from "./_types/TableHeaderProps";
import { calculateActualHeight } from "./_utils/calculations";

export const TableHeaderCNSWPrivate: React.FC<TableHeaderProps> = ({
  title,
  headerHeight,
}) => {
  const { layout } = useThemeContext();

  // Calculate the actual height with max constraint (same as rows)
  const actualHeight = calculateActualHeight(headerHeight);

  return (
    <div
      className={`flex items-center overflow-hidden ${layout.borderRadius.container} mb-1`}
      style={{
        height: `${actualHeight}px`,
      }}
    >
      {" "}
      {/* Title (team info) - Flexible middle cell */}
      <div
        className="flex items-center h-full px-4"
        style={{
          flex: 1,
          textAlign: "left",
        }}
      >
        <MetadataMedium
          value={title}
          animation={null}
          variant="onBackgroundMain"
        ></MetadataMedium>
      </div>
      {/* Points header - Fixed width last cell */}
      <div
        className="flex items-center justify-center h-full px-0"
        style={{
          width: "200px",
          minWidth: "200px",
        }}
      >
        <div
          className={`${layout.borderRadius.container} text-center py-2 px-4`}
        >
          <MetadataMedium
            value={`POINTS`}
            animation={null}
            variant="onBackgroundMain"
          ></MetadataMedium>
        </div>
      </div>
    </div>
  );
};

export default TableHeaderCNSWPrivate;
