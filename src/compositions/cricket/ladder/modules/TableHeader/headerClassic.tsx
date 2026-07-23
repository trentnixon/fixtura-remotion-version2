import React from "react";
import { AnimatedText } from "../../../../../components/typography/AnimatedText";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { TableHeaderProps } from "./_types/TableHeaderProps";
import { ClassicStatWell } from "../../../../../templates/variants/classic/design";

const LADDER_HEADER_COLUMNS = [
  { label: "P", width: "ladderColumn" as const },
  { label: "W", width: "ladderColumn" as const },
  { label: "L", width: "ladderColumn" as const },
  { label: "B", width: "ladderColumn" as const },
  { label: "PTS", width: "ladderPoints" as const },
] as const;

export const TableHeaderClassic: React.FC<TableHeaderProps> = ({
  title,
  headerHeight,
}) => {
  const { fontClasses } = useThemeContext();

  return (
    <div
      className="flex items-center p-2"
      style={{ height: `${headerHeight}px` }}
    >
      <div className="flex items-center mr-3 px-2" style={{ width: "65%" }}>
        <AnimatedText
          type="ladderGradeLabel"
          variant="onContainerTitle"
          textAlign="left"
          letterAnimation="word"
          animationDelay={5}
          animation={{
            type: "typewriter",
            duration: 15,
            easing: "linear",
            delay: 10,
            custom: { distance: 500 },
          }}
          fontFamily={fontClasses.copy?.family}
        >
          {title}
        </AnimatedText>
      </div>

      <div className="flex flex-1 justify-evenly items-center gap-px">
        {LADDER_HEADER_COLUMNS.map(({ label, width }) => (
          <ClassicStatWell
            key={label}
            variant="recessed"
            width={width}
            className="mx-px py-2"
          >
            <AnimatedText
              type="classicMicroLabel"
              variant="onContainerTitle"
              fontFamily={fontClasses.copy?.family}
            >
              {label}
            </AnimatedText>
          </ClassicStatWell>
        ))}
      </div>
    </div>
  );
};

export default TableHeaderClassic;
