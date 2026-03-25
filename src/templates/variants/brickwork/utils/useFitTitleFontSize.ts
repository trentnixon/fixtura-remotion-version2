import { useCallback, useLayoutEffect, useRef, useState } from "react";

const SAFETY_MARGIN = 0.95;
const MIN_FONT_SIZE_PX = 24;

/**
 * Hook that measures title text and returns a fontSize style override when the text overflows.
 * Dynamically reduces font size to fit within the container.
 *
 * @param text - The title text to measure
 * @param enabled - Whether to run the fitting logic (default true)
 * @returns Object with containerRef, textRef, and fontSizeStyle to apply to the text element
 */
export function useFitTitleFontSize(text: string, enabled = true) {
  const [fontSizeStyle, setFontSizeStyle] = useState<
    React.CSSProperties["fontSize"] | null
  >(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  const setContainerRef = useCallback((el: HTMLDivElement | null) => {
    containerRef.current = el;
  }, []);
  const setTextRef = useCallback((el: HTMLDivElement | null) => {
    textRef.current = el;
  }, []);

  useLayoutEffect(() => {
    if (!enabled || !containerRef.current || !textRef.current || !text) return;

    const container = containerRef.current;
    const textEl = textRef.current;
    const containerWidth = container.clientWidth;
    const textWidth = textEl.scrollWidth;

    if (containerWidth <= 0 || textWidth <= 0) return;

    if (textWidth <= containerWidth) return;

    // Text overflows; reduce font size to fit (never revert to avoid resize loop)
    // Read fontSize from the actual text element (AnimatedText's div), not the wrapper
    const styledEl = (textEl.firstElementChild as HTMLElement) || textEl;
    const computedStyle = window.getComputedStyle(styledEl);
    const currentFontSize = parseFloat(computedStyle.fontSize);
    if (Number.isNaN(currentFontSize)) return;

    const scale = (containerWidth / textWidth) * SAFETY_MARGIN;
    const newFontSizePx = Math.max(MIN_FONT_SIZE_PX, currentFontSize * scale);

    setFontSizeStyle(`${newFontSizePx}px`);
  }, [text, enabled]);

  return {
    containerRef: setContainerRef,
    textRef: setTextRef,
    fontSizeStyle: fontSizeStyle ? { fontSize: fontSizeStyle } : undefined,
  };
}
