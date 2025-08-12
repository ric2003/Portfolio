import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
}

export const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ children, className, size = "md", ...props }, ref) => {
  const sizeVariants = {
    sm: "p-1.5 px-4 text-sm",
    md: "p-2 px-6 text-base",
    lg: "p-3 px-8 text-lg",
  };

  const dotSizes = {
    sm: "h-1.5 w-1.5",
    md: "h-2 w-2",
    lg: "h-2.5 w-2.5",
  };

  const expandingDotPositions = {
    sm: "left-3",
    md: "left-4",
    lg: "left-5",
  };

  return (
    <button
      ref={ref}
      className={cn(
        "group relative w-auto cursor-pointer overflow-hidden rounded-md border bg-background text-center font-semibold transition-colors duration-300",
        sizeVariants[size],
        className
      )}
      {...props}
    >
      {/* Expanding white dot background */}
      <div
        className={cn(
          "absolute top-1/2 -translate-y-1/2 rounded-full bg-white transition-all duration-500 ease-out group-hover:scale-[40] group-hover:bg-white",
          dotSizes[size],
          expandingDotPositions[size]
        )}
      ></div>

      <div className="flex items-center gap-2 relative z-10">
        <div
          className={cn(
            "rounded-full bg-primary transition-all duration-300 group-hover:scale-[1.2] group-hover:bg-transparent",
            dotSizes[size]
          )}
        ></div>
        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
          {children}
        </span>
      </div>
      <div className="absolute top-0 left-0 z-20 flex h-full w-full items-center justify-center gap-2 text-black opacity-0 transition-all duration-300 group-hover:opacity-100 pointer-events-none">
        <span>{children}</span>
        <ArrowRight
          className={
            size === "sm" ? "h-3 w-3" : size === "lg" ? "h-5 w-5" : "h-4 w-4"
          }
        />
      </div>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";
