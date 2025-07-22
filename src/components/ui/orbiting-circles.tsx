import { cn } from "@/lib/utils";

export interface OrbitingCirclesProps {
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
  iconSize?: number;
  speed?: number;
}

export default function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  delay = 10,
  radius = 160,
  path = true,
  iconSize = 30,
  speed = 1,
}: OrbitingCirclesProps) {
  const orbit = Array.isArray(children) ? children : [children];
  const angle = 360 / orbit.length;

  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <circle
            className="stroke-zinc-300/50 dark:stroke-zinc-700/50 stroke-1 fill-none"
            cx="50%"
            cy="50%"
            r={radius}
          />
        </svg>
      )}

      {orbit.map((child, index) => (
        <div
          key={index}
          className={cn(
            "absolute flex size-full transform-gpu animate-orbit items-center justify-center rounded-full border bg-zinc-50/50 dark:bg-zinc-950/50 backdrop-blur-sm",
            className,
          )}
          style={
            {
              "--duration": duration / speed,
              "--radius": radius,
              "--delay": -delay * (index / orbit.length),
              "--rotation": reverse ? "reverse" : "normal",
              animationDelay: `${-delay * (index / orbit.length)}s`,
              animationDirection: reverse ? "reverse" : "normal",
              width: iconSize,
              height: iconSize,
            } as React.CSSProperties
          }
        >
          {child}
        </div>
      ))}
    </>
  );
} 