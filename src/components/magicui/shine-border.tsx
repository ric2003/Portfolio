"use client";

import React from "react";
import { cn } from "@/lib/utils"; // You'll need this utility

interface ShineBorderWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * Width of the border in pixels
   * @default 1
   */
  borderWidth?: number;
  /**
   * Duration of the animation in seconds
   * @default 14
   */
  duration?: number;
  /**
   * Color of the border, can be a single color or an array of colors
   * @default "#007AFF"
   */
  shineColor?: string | string[];
  /**
   * Additional className for the wrapper
   */
  className?: string;
}

// Inject the CSS animation once
if (typeof document !== "undefined" && !document.getElementById("shine-border-styles")) {
  const style = document.createElement("style");
  style.id = "shine-border-styles";
  style.textContent = `
    @keyframes shine-border-animation {
      0% {
        background-position: 0% 0%;
      }
      50% {
        background-position: 100% 100%;
      }
      100% {
        background-position: 0% 0%;
      }
    }
    
    .shine-border-animate {
      animation: shine-border-animation var(--duration, 14s) ease-in-out infinite;
      will-change: background-position;
    }
  `;
  document.head.appendChild(style);
}

/**
 * Shine Border Wrapper
 *
 * A wrapper component that applies an animated shine border effect to its children.
 */
export function ShineBorderWrapper({
  children,
  borderWidth = 1,
  duration = 14,
  shineColor = "#007AFF",
  className,
  style,
  ...props
}: ShineBorderWrapperProps) {
  return (
    <div className={cn("relative", className)} style={style} {...props}>
      {/* Animated shine border */}
      <div
        className="pointer-events-none absolute inset-0 size-full rounded-[inherit] shine-border-animate"
        style={
          {
            "--border-width": `${borderWidth}px`,
            "--duration": `${duration}s`,
            backgroundImage: `radial-gradient(transparent, transparent, ${
              Array.isArray(shineColor) ? shineColor.join(", ") : shineColor
            }, transparent, transparent)`,
            backgroundSize: "300% 300%",
            mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
            WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "var(--border-width)",
          } as React.CSSProperties
        }
      />
      {children}
    </div>
  );
}