import type { CSSProperties } from "react";
import { AnimationConfig } from "../../../../../components/typography/config/animations";
import {
  AnimationMode,
  ColorVariant,
} from "../../../../../components/typography/AnimatedText";

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
  fontFamily?: string;
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
  /** Optional style (e.g. fontSize for dynamic sizing) */
  style?: CSSProperties;
  className?: string;
  /** When set, overrides theme copy font (e.g. template heading on ladder) */
  fontFamily?: string;
  /** Per-letter/word stagger; `"none"` renders copy without letter animation */
  letterAnimation?: AnimationMode;
}

/**
 * Props interface for TeamStatText component (supports string or number values)
 */
export interface TeamStatTextProps {
  value: string | number;
  variant?: string;
  textAlign?: TextAlign;
  delay: number;
  className?: string;
  /** When set, overrides theme copy font (e.g. template heading on ladder) */
  fontFamily?: string;
}

/**
 * Props interface for RosterPlayerName component (no animation prop)
 */
export interface RosterPlayerNameProps {
  value: string;
  className?: string;
  variant?: string | ColorVariant;
  /** When set, overrides copy font (e.g. Teko title font on BroadcastPro roster). */
  fontFamily?: string;
  /** e.g. dynamic `fontSize` when roster row height scales with player count */
  style?: CSSProperties;
}
