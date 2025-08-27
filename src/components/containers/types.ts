// Container type options
export type ContainerType =
  | "basic"
  | "full"
  | "border"
  | "borderBottom"
  | "borderTop"
  | "borderLeft"
  | "borderRight"
  | "card"
  | "glass"
  | "gradient";

// Container size options
export type ContainerSize = "xs" | "sm" | "md" | "lg" | "xl" | "full" | "auto";

// Container rounded options
export type ContainerRounded = "none" | "sm" | "md" | "lg" | "xl" | "full";

// Container shadow options
export type ContainerShadow = "none" | "sm" | "md" | "lg" | "xl" | "inner";

// Container background color options (from theme)
export type ContainerBackgroundColor =
  | "primary"
  | "secondary"
  | "main"
  | "light"
  | "dark"
  | "accent"
  | "highlight"
  | "transparent"
  | "transparentMain"
  | "transparentSecondary"
  | "saturated"
  | "gradientPrimaryToSecondaryVertical"
  | "gradientSecondaryToPrimaryVertical"
  | "gradientPrimaryToSecondaryHorizontal"
  | "gradientSecondaryToPrimaryHorizontal"
  | "muted"
  | "none";

// Container props
export interface ContainerProps {
  // Content
  children: React.ReactNode;

  // Container styling
  type?: ContainerType;
  size?: ContainerSize;
  rounded?: ContainerRounded;
  shadow?: ContainerShadow;
  backgroundColor?: ContainerBackgroundColor;

  // Additional styling
  className?: string;
  style?: React.CSSProperties;

  // Event handling
  onClick?: () => void;

  // Accessibility
  role?: string;
  ariaLabel?: string;
  tabIndex?: number;
}
