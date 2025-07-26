"use client";

import { cn } from "@/lib/utils";
import React, { ElementType, ReactNode, useEffect, useState } from "react";

export interface VideoTextProps {
  /**
   * The video source URL
   */
  src: string;
  /**
   * Additional className for the container
   */
  className?: string;
  /**
   * Whether to autoplay the video
   */
  autoPlay?: boolean;
  /**
   * Whether to mute the video
   */
  muted?: boolean;
  /**
   * Whether to loop the video
   */
  loop?: boolean;
  /**
   * Whether to preload the video
   */
  preload?: "auto" | "metadata" | "none";
  /**
   * The content to display (will have the video "inside" it)
   */
  children: ReactNode;
  /**
   * Font size for the text mask (in viewport width units)
   * @default 10
   */
  fontSize?: string | number;
  /**
   * Font weight for the text mask
   * @default "bold"
   */
  fontWeight?: string | number;
  /**
   * Text anchor for the text mask
   * @default "middle"
   */
  textAnchor?: string;
  /**
   * Dominant baseline for the text mask
   * @default "middle"
   */
  dominantBaseline?: string;
  /**
   * Font family for the text mask
   * @default "sans-serif"
   */
  fontFamily?: string;
  /**
   * The element type to render for the text
   * @default "div"
   */
  as?: ElementType;
  /**
   * Stroke width for the outline (in pixels)
   * @default 2
   */
  strokeWidth?: number;
  /**
   * Stroke color for the outline
   * @default "white"
   */
  strokeColor?: string;
}

export function VideoText({
  src,
  children,
  className = "",
  autoPlay = true,
  muted = true,
  loop = true,
  preload = "auto",
  fontSize = 20,
  fontWeight = "bold",
  textAnchor = "middle",
  dominantBaseline = "middle",
  fontFamily = "sans-serif",
  as: Component = "div",
  strokeWidth = 3,
  strokeColor = "white",
}: VideoTextProps) {
  const [svgMask, setSvgMask] = useState("");
  const [svgOutline, setSvgOutline] = useState("");
  const content = React.Children.toArray(children).join("");

  useEffect(() => {
    const updateSvgs = () => {
      const responsiveFontSize =
        typeof fontSize === "number" ? `${fontSize}vw` : fontSize;
      // Adjust x position based on text anchor
      const xPosition =
        textAnchor === "start" ? "0%" : textAnchor === "end" ? "100%" : "50%";
      
      // SVG for masking the video (just the text fill)
      const newSvgMask = `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
        <text x='${xPosition}' y='50%' font-size='${responsiveFontSize}' font-weight='${fontWeight}' text-anchor='${textAnchor}' dominant-baseline='${dominantBaseline}' font-family='${fontFamily}' fill='white'>${content}</text>
      </svg>`;

      // SVG for the white outline (stroke only, no fill)
      const newSvgOutline = `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
        <text x='${xPosition}' y='50%' font-size='${responsiveFontSize}' font-weight='${fontWeight}' text-anchor='${textAnchor}' dominant-baseline='${dominantBaseline}' font-family='${fontFamily}' fill='none' stroke='${strokeColor}' stroke-width='${strokeWidth}'>${content}</text>
      </svg>`;

      setSvgMask(newSvgMask);
      setSvgOutline(newSvgOutline);
    };

    updateSvgs();
    window.addEventListener("resize", updateSvgs);
    return () => window.removeEventListener("resize", updateSvgs);
  }, [
    content,
    fontSize,
    fontWeight,
    textAnchor,
    dominantBaseline,
    fontFamily,
    strokeWidth,
    strokeColor,
  ]);

  const dataUrlMask = `url("data:image/svg+xml,${encodeURIComponent(svgMask)}")`;
  const dataUrlOutline = `url("data:image/svg+xml,${encodeURIComponent(svgOutline)}")`;

  return (
    <Component className={cn(`relative size-full`, className)}>
      {/* White outline layer (behind the video) */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          backgroundImage: dataUrlOutline,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />

      {/* Video masked to text shape (on top of outline) */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          maskImage: dataUrlMask,
          WebkitMaskImage: dataUrlMask,
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
      >
        <video
          className="w-full h-full object-cover"
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          preload={preload}
          playsInline
        >
          <source src={src} />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Add a backup text element for SEO/accessibility */}
      <span className="sr-only">{content}</span>
    </Component>
  );
}