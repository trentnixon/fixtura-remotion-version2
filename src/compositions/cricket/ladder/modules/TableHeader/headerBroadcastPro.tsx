import React from "react";
import { AnimatedText } from "../../../../../components/typography/AnimatedText";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import {
  BroadcastProMetadataChip,
  useBroadcastProTheme,
} from "../../../utils/broadcastPro";
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
  const { fontClasses, componentStyles } = useThemeContext();
  const { text } = useBroadcastProTheme();
  const labelSize = compact ? "text-base" : "text-lg";
  const headerClass = `${labelSize} ${COLUMN_LABEL_CLASS}`;
  const subheading = fontClasses.subheading?.family;
  const gradeTitleClass =
    componentStyles.ladderGradeLabel?.className ??
    "text-2xl font-bold uppercase tracking-[0.2em] leading-snug";

  return (
    <div
      className="mb-3 flex w-full flex-col"
      style={{ minHeight: headerHeight }}
    >
      {title ? (
        <div className="mb-3 mt-2 flex w-full justify-center px-1">
          <BroadcastProMetadataChip className="max-w-[95%] px-6 py-2">
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
              style={{ color: text.copy }}
            >
              {title}
            </AnimatedText>
          </BroadcastProMetadataChip>
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
