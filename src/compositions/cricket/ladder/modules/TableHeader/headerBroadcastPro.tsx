import React from "react";
import { AnimatedText } from "../../../../../components/typography/AnimatedText";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { TableHeaderProps } from "./_types/TableHeaderProps";

const GAP = "gap-2";

const COLUMN_LABEL_CLASS =
  "font-bold uppercase tracking-widest text-center leading-none";

/**
 * Broadcast Pro ladder header — Pos | Team | Pld | W | L | Pts (no BYE).
 * All column labels use the same type+variant per role; Pts uses accent variant only.
 */
export const TableHeaderBroadcastPro: React.FC<TableHeaderProps> = ({
  title,
  headerHeight,
  compact,
}) => {
  const { fontClasses } = useThemeContext();
  const labelSize = compact ? "text-base" : "text-lg";
  const headerClass = `${labelSize} ${COLUMN_LABEL_CLASS}`;
  const subheading = fontClasses.subheading?.family;
  const gradeTitleClass = compact
    ? "text-xl font-bold uppercase tracking-[0.2em] leading-tight"
    : "text-2xl font-bold uppercase tracking-[0.2em] leading-tight";

  return (
    <div
      className="mb-3 flex w-full flex-col"
      style={{ minHeight: headerHeight }}
    >
      {title ? (
        <div className="mb-3 mt-2 flex w-full justify-center px-1">
          <div className="inline-flex max-w-[95%] bg-white/10 px-6 py-2 backdrop-blur-md">
            <AnimatedText
              type="ladderGradeLabel"
              variant="onContainerTitle"
              textAlign="center"
              letterAnimation="word"
              animationDelay={5}
              animation={{
                type: "typewriter",
                duration: 15,
                easing: "linear",
                delay: 10,
                custom: { distance: 400 },
              }}
              fontFamily={subheading}
              className={`${gradeTitleClass} text-center`}
            >
              {title}
            </AnimatedText>
          </div>
        </div>
      ) : null}

      <div className={`flex w-full items-center ${GAP} px-1`}>
        <div className="flex w-20 flex-shrink-0 justify-center">
          <AnimatedText
            type="ladderGradeLabel"
            variant="onBackgroundMuted"
            textAlign="center"
            letterAnimation="none"
            fontFamily={subheading}
            className={headerClass}
          >
            Pos
          </AnimatedText>
        </div>
        <div className="min-w-0 flex-1 px-4">
          <AnimatedText
            type="ladderGradeLabel"
            variant="onBackgroundMuted"
            textAlign="left"
            letterAnimation="none"
            fontFamily={subheading}
            className={headerClass}
          >
            Team
          </AnimatedText>
        </div>
        {(["Pld", "W", "L"] as const).map((label) => (
          <div
            key={label}
            className="flex w-[90px] flex-shrink-0 justify-center"
          >
            <AnimatedText
              type="ladderGradeLabel"
              variant="onBackgroundMuted"
              textAlign="center"
              letterAnimation="none"
              fontFamily={subheading}
              className={headerClass}
            >
              {label}
            </AnimatedText>
          </div>
        ))}
        <div className="flex w-[100px] flex-shrink-0 justify-center">
          <AnimatedText
            type="ladderGradeLabel"
            variant="onBackgroundAccent"
            textAlign="center"
            letterAnimation="none"
            fontFamily={subheading}
            className={headerClass}
          >
            Pts
          </AnimatedText>
        </div>
      </div>
    </div>
  );
};

export default TableHeaderBroadcastPro;
