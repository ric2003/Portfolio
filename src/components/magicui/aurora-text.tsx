"use client";

import React, { memo } from "react";

interface AuroraTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  speed?: number;
}

export const AuroraText = memo(
  ({
    children,
    className = "",
    colors = ["#305BC2", "#68d391", "#f2b54a", "#AB2B7C"],
    speed = 1,
  }: AuroraTextProps) => {
    // Create truly seamless gradient by duplicating the first color at the end
    const seamlessColors = [...colors, colors[0]];
    const backgroundSize = (colors.length + 1) * 100; // e.g., 500% for 4 colors
    const endPosition = colors.length * 100; // e.g., 400% to complete the cycle
    
    const gradientStyle = {
      background: `linear-gradient(90deg, ${seamlessColors.join(", ")})`,
      backgroundSize: `${backgroundSize}% 100%`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      animation: `aurora-cycle ${100 / speed}s linear infinite`,
    };

    return (
      <>
        <style jsx>{`
          @keyframes aurora-cycle {
            0% {
              background-position: 0% 0%;
            }
            100% {
              background-position: ${endPosition}% 0%;
            }
          }
        `}</style>
        <span className={`relative inline-block ${className}`}>
          <span className="sr-only">{children}</span>
          <span className="relative" style={gradientStyle} aria-hidden="true">
            {children}
          </span>
        </span>
      </>
    );
  },
);

AuroraText.displayName = "AuroraText";