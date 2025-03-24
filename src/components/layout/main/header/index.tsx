import {
  VerticalHeader,
  VerticalHeaderTitleLogoName,
  VerticalHeaderTitleNameLogo,
  VerticalHeaderLogoNameTitle,
  VerticalHeaderNameLogoTitle,
  VerticalHeaderNameTitleLogo,
  VerticalHeaderLogoTitle,
  VerticalHeaderTitleLogo,
  VerticalHeaderLogoName,
  VerticalHeaderNameLogo,
  VerticalHeaderTitleName,
  VerticalHeaderNameTitle,
} from "./variants/VerticalStack";
import {
  TwoColumnHeaderTitleName,
  TwoColumnHeaderNameTitle,

  // Single-element standard permutations
  TwoColumnHeaderTitle,
  TwoColumnHeaderName,

  // Two-element reversed permutations
  ReverseTwoColumnHeaderTitleName,
  ReverseTwoColumnHeaderNameTitle,

  // Single-element reversed permutations
  ReverseTwoColumnHeaderTitle,
  ReverseTwoColumnHeaderName,
} from "./variants/TwoColumnLayout";

// Re-export the types
export * from "./types";

// Export all layout components
export {
  // Vertical Stack variants
  VerticalHeader,
  VerticalHeaderTitleLogoName,
  VerticalHeaderTitleNameLogo,
  VerticalHeaderLogoNameTitle,
  VerticalHeaderNameLogoTitle,
  VerticalHeaderNameTitleLogo,
  VerticalHeaderLogoTitle,
  VerticalHeaderTitleLogo,
  VerticalHeaderLogoName,
  VerticalHeaderNameLogo,
  VerticalHeaderTitleName,
  VerticalHeaderNameTitle,

  // Two Column Layout variants
  TwoColumnHeaderTitleName,
  TwoColumnHeaderNameTitle,

  // Single-element standard permutations
  TwoColumnHeaderTitle,
  TwoColumnHeaderName,

  // Two-element reversed permutations
  ReverseTwoColumnHeaderTitleName,
  ReverseTwoColumnHeaderNameTitle,

  // Single-element reversed permutations
  ReverseTwoColumnHeaderTitle,
  ReverseTwoColumnHeaderName,
};
