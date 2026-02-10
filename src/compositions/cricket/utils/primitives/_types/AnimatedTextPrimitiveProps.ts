import { AnimationConfig } from "../../../../../components/typography/config/animations";
import { AnimationMode, ColorVariant } from "../../../../../components/typography/AnimatedText";

/**
 * Base props interface for AnimatedText primitive components
 */
export interface AnimatedTextPrimitiveProps {
  value: string;
  animation: AnimationConfig | null;
  className?: string;
  variant?: string | ColorVariant;
}

/**
 * Props interface for AnimatedText primitives with required animation
 */
export interface AnimatedTextPrimitivePropsRequiredAnimation {
  value: string;
  animation: AnimationConfig;
  className?: string;
  variant?: string | ColorVariant;
}

/**
 * Props interface for AnimatedText primitives with letter animation
 */
export interface AnimatedTextPrimitivePropsWithLetterAnimation
  extends AnimatedTextPrimitivePropsRequiredAnimation {
  letterAnimation?: AnimationMode;
}

/**
 * Text alignment options for AnimatedText components
 */
export type TextAlign = "left" | "right" | "center";

/**
 * Props interface for AnimatedText primitives with text alignment and delay
 */
export interface AnimatedTextPrimitivePropsWithDelay {
  value: string;
  variant?: string;
  textAlign?: TextAlign;
  delay: number;
}

/**
 * Props interface for TeamStatText component (supports string or number values)
 */
export interface TeamStatTextProps {
  value: string | number;
  variant?: string;
  textAlign?: TextAlign;
  delay: number;
}

/**
 * Props interface for RosterPlayerName component (no animation prop)
 */
export interface RosterPlayerNameProps {
  value: string;
  className?: string;
  variant?: string | ColorVariant;
}
