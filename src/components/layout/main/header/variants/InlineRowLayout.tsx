import React from "react";
import { TitleScreenProps, getAlignmentClasses } from "../types";

/**
 * Centered single-row header: [Logo] Title
 * Pass `Colon` only when a separator is required between logo and title.
 */
export const InlineHeaderLogoTitle: React.FC<
  TitleScreenProps & { Colon?: React.ReactNode; rowClassName?: string }
> = ({
  Logo,
  Title,
  Colon,
  alignment = "center",
  height = 100,
  rowClassName = "gap-3",
}) => {
  const alignmentClasses = getAlignmentClasses(alignment);

  return (
    <div
      className={`flex w-full min-h-0 overflow-visible px-2 py-0 ${alignmentClasses}`}
      style={{ height: `${height}px` }}
    >
      <div
        className={`inline-flex max-w-full min-w-0 flex-row items-center ${rowClassName} ${alignmentClasses}`}
      >
        {Logo ? <div className="shrink-0 flex items-center">{Logo}</div> : null}
        {Logo && Title && Colon != null ? Colon : null}
        {Title ? (
          <div className="min-w-0 flex items-center">{Title}</div>
        ) : null}
      </div>
    </div>
  );
};

/** @deprecated Use InlineHeaderLogoTitle with an explicit Colon prop when needed. */
export const InlineHeaderLogoColonTitle = InlineHeaderLogoTitle;
