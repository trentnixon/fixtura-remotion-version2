import React from "react";

export type SupportedShape = "circle" | "square" | "triangle" | "line";

interface ShapeNoiseProps {
  shape: SupportedShape;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
}

export const ShapeNoise: React.FC<ShapeNoiseProps> = ({
  shape,
  x,
  y,
  size,
  color,
  opacity,
}) => {
  const style = {
    fill: color,
    opacity: opacity,
  };

  switch (shape) {
    case "square":
      return (
        <rect
          x={x - size / 2}
          y={y - size / 2}
          width={size}
          height={size}
          style={style}
        />
      );
    case "triangle": {
      const path = `M ${x} ${y - size / 2} L ${x - size / 2} ${y + size / 2} L ${
        x + size / 2
      } ${y + size / 2} Z`;
      return <path d={path} style={style} />;
    }
    case "line":
      return (
        <rect
          x={x - size / 2}
          y={y}
          width={size}
          height={size / 10 > 1 ? size / 10 : 1} // Ensure line has at least 1px height
          style={style}
        />
      );
    case "circle":
    default:
      return <circle cx={x} cy={y} r={size / 2} style={style} />;
  }
};
