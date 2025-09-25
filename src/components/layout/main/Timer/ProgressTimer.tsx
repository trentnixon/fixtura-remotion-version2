import { useCurrentFrame } from "remotion";
import { useThemeContext } from "../../../../core/context/ThemeContext";

export const ProgressTimer = ({ FRAMES }: { FRAMES: number }) => {
  const frame = useCurrentFrame(); // current frame (0-indexed)
  const total = FRAMES; // total duration in frames
  const percentProgress = total ? Math.min(100, (frame / total) * 100) : 0;
  const { selectedPalette } = useThemeContext();
  return (
    <div
      className="absolute top-0 left-0 w-full"
      style={{ background: selectedPalette.background.contrast, opacity: 0.8 }}
    >
      <div
        className="h-full"
        style={{
          width: `${percentProgress}%`,
          height: 8,
          background: selectedPalette.background.userPrimary,
        }} // no CSS transition
      />
    </div>
  );
};

export const VerticalProgressTimer = ({ FRAMES }: { FRAMES: number }) => {
  const frame = useCurrentFrame(); // current frame (0-indexed)
  const total = FRAMES; // total duration in frames
  const percentProgress = total ? Math.min(100, (frame / total) * 100) : 0;
  const { selectedPalette } = useThemeContext();
  return (
    <div
      className="absolute bottom-0 right-0 h-full"
      style={{
        background: selectedPalette.background.contrast,
        opacity: 0.8,
        width: 5,
      }}
    >
      <div
        className="w-full"
        style={{
          height: `${percentProgress}%`,
          width: 5,
          background: selectedPalette.background.userPrimary,
        }} // no CSS transition
      />
    </div>
  );
};
