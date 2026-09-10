import React from "react";
import { ScorelineCreaseRule } from "../../../../templates/variants/scoreline/components/crease/ScorelineCreaseRule";
import { useScorelineTheme } from "./useScorelineTheme";

type ScorelineThemedCreaseRuleProps = {
  emphasis?: boolean;
  className?: string;
};

export const ScorelineThemedCreaseRule: React.FC<
  ScorelineThemedCreaseRuleProps
> = ({ emphasis, className }) => {
  const theme = useScorelineTheme();

  return (
    <ScorelineCreaseRule
      primaryColor={theme.clubPrimary}
      secondaryColor={theme.clubSecondary}
      emphasis={emphasis}
      className={className}
    />
  );
};
