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
  VerticalHeaderTitleOnly,
  VerticalHeaderNameOnly,
  VerticalHeaderLogoOnly,
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
  // Vertical narrow side-pane variants
  TwoColumnVerticalHeaderTitleOnly,
  TwoColumnVerticalHeaderLogoTitle,
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
  VerticalHeaderTitleOnly,
  VerticalHeaderNameOnly,
  VerticalHeaderLogoOnly,

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

  // Vertical narrow side-pane variants
  TwoColumnVerticalHeaderTitleOnly,
  TwoColumnVerticalHeaderLogoTitle,
};
