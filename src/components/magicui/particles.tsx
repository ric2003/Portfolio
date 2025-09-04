"use client";

import { cn } from "@/lib/utils";
import React, {
  ComponentPropsWithoutRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface MousePosition {
  x: number;
  y: number;
}

// Hook to detect presence of a mouse cursor (fine pointer + hover)
function useHasMouseCursor() {
  const [hasCursor, setHasCursor] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) {
      setHasCursor(false);
      return;
    }

    const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setHasCursor(!!mql.matches);

    update();
    mql.addEventListener?.("change", update);
    return () => mql.removeEventListener?.("change", update);
  }, []);

  return hasCursor;
}

function MousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
  });

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if ((event as PointerEvent).pointerType === "mouse") {
        setMousePosition({ x: event.clientX, y: event.clientY });
      }
    };

    window.addEventListener("pointermove", handlePointerMove as any);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove as any);
    };
  }, []);

  return mousePosition;
}

// Removed old scroll position normalization hook in favor of impulse-based flow

interface ParticlesProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  size?: number;
  refresh?: boolean;
  color?: string;
  vx?: number;
  vy?: number;
}

function hexToRgb(hex: string): number[] {
  hex = hex.replace("#", "");

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  const hexInt = parseInt(hex, 16);
  const red = (hexInt >> 16) & 255;
  const green = (hexInt >> 8) & 255;
  const blue = hexInt & 255;
  return [red, green, blue];
}

type Circle = {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
};

export const Particles: React.FC<ParticlesProps> = ({
  className = "",
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = "#ffffff",
  vx = 0,
  vy = 0,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<Circle[]>([]);
  const mousePosition = MousePosition();
  const hasCursor = useHasMouseCursor();
  const hasCursorRef = useRef<boolean>(false);
  const flow = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastScroll = useRef<{ left: number; top: number }>({ left: 0, top: 0 });
  const lastScrollTimeRef = useRef<number>(0);
  const scrollPush = 0.35; // how strongly scroll pushes particles per pixel
  const scrollFriction = 0.9; // how quickly the push decays per frame
  const mouse = useRef<{ x: number; y: number; lastMouseTime?: number }>({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
    lastMouseTime: 0,
  });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;
  const rafID = useRef<number | null>(null);
  const resizeTimeout = useRef<NodeJS.Timeout | null>(null);

  const onMouseMove = useCallback(() => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const { w, h } = canvasSize.current;
      const x = mousePosition.x - rect.left - w / 2;
      const y = mousePosition.y - rect.top - h / 2;
      const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
      if (inside) {
        mouse.current.x = x;
        mouse.current.y = y;
        mouse.current.lastMouseTime = Date.now();
      }
    }
  }, [mousePosition.x, mousePosition.y]);

  // Keep a stable reference to onMouseMove for use in animate without causing re-subscription
  const onMouseMoveRef = useRef<() => void>(() => {});
  useEffect(() => {
    onMouseMoveRef.current = onMouseMove;
  }, [onMouseMove]);

  // Initialize last scroll; delta will be computed each animation frame
  useEffect(() => {
    const scroller =
      document.scrollingElement || document.documentElement || document.body;
    const left = scroller ? scroller.scrollLeft : window.scrollX || 0;
    const top = scroller ? scroller.scrollTop : window.pageYOffset || 0;
    lastScroll.current = { left, top };
  }, []);

  const resizeCanvas = useCallback(() => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;

      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dpr]);

  const circleParams = useCallback((): Circle => {
    const x = Math.floor(Math.random() * canvasSize.current.w);
    const y = Math.floor(Math.random() * canvasSize.current.h);
    const translateX = 0;
    const translateY = 0;
    const pSize = Math.floor(Math.random() * 2) + size;
    const alpha = 0;
    const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
    const dx = (Math.random() - 0.5) * 0.1;
    const dy = (Math.random() - 0.5) * 0.1;
    const magnetism = 0.1 + Math.random() * 4;
    return {
      x,
      y,
      translateX,
      translateY,
      size: pSize,
      alpha,
      targetAlpha,
      dx,
      dy,
      magnetism,
    };
  }, [size]);

  const rgb = hexToRgb(color);

  const drawCircle = useCallback(
    (circle: Circle, update = false) => {
      if (context.current) {
        const { x, y, translateX, translateY, size, alpha } = circle;
        context.current.translate(translateX, translateY);
        context.current.beginPath();
        context.current.arc(x, y, size, 0, 2 * Math.PI);
        context.current.fillStyle = `rgba(${rgb.join(", ")}, ${alpha})`;
        context.current.fill();
        context.current.setTransform(dpr, 0, 0, dpr, 0, 0);

        if (!update) {
          circles.current.push(circle);
        }
      }
    },
    [rgb, dpr]
  );

  const clearContext = useCallback(() => {
    if (context.current) {
      context.current.clearRect(
        0,
        0,
        canvasSize.current.w,
        canvasSize.current.h
      );
    }
  }, []);

  const drawParticles = useCallback(() => {
    clearContext();
    const particleCount = quantity;
    for (let i = 0; i < particleCount; i++) {
      const circle = circleParams();
      drawCircle(circle);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity, clearContext]);

  const animate = useCallback(() => {
    clearContext();
    // Per-frame scroll delta detection (also covers momentum scrolling)
    const scroller =
      document.scrollingElement || document.documentElement || document.body;
    const left = scroller ? scroller.scrollLeft : window.scrollX || 0;
    const top = scroller ? scroller.scrollTop : window.pageYOffset || 0;
    const deltaX = left - lastScroll.current.left;
    const deltaY = top - lastScroll.current.top;
    if (deltaX !== 0 || deltaY !== 0) {
      const clamp = (v: number, min: number, max: number) =>
        v < min ? min : v > max ? max : v;
      const maxPerFrame = 20; // limit impulse per frame
      const adjX = clamp(deltaX, -maxPerFrame, maxPerFrame);
      const adjY = clamp(deltaY, -maxPerFrame, maxPerFrame);
      flow.current.x += adjX * scrollPush;
      flow.current.y += -adjY * scrollPush; // invert Y: scroll down pushes up
      lastScroll.current = { left, top };
      // Recalibrate mouse baseline immediately on scroll to avoid jumps
      lastScrollTimeRef.current = Date.now();
      onMouseMoveRef.current();
    }
    // Decay scroll flow each frame
    flow.current.x *= scrollFriction;
    flow.current.y *= scrollFriction;

    // Temporarily dampen mouse influence right after scrolling
    const now = Date.now();
    const timeSinceScroll = now - lastScrollTimeRef.current;
    const pointerDamp = Math.min(Math.max(timeSinceScroll / 300, 0), 1);
    circles.current.forEach((circle: Circle, i: number) => {
      // Smoothly approach target alpha, independent of edges
      circle.alpha += (circle.targetAlpha - circle.alpha) * 0.05;
      circle.x += circle.dx + vx;
      circle.y += circle.dy + vy;
      const pointerX = hasCursorRef.current ? mouse.current.x : 0;
      const pointerY = hasCursorRef.current ? mouse.current.y : 0;
      if (!hasCursorRef.current) {
        // On touch-primary: no pull-back to origin; only scroll flow influences translation
        const flowWeightMobile = 0.04 * (0.5 + circle.magnetism * 0.1);
        circle.translateX += flow.current.x * flowWeightMobile;
        circle.translateY += flow.current.y * flowWeightMobile;
      } else {
        // With a mouse cursor: blend pointer follow with a smaller scroll flow
        const baseX = pointerX / (staticity / circle.magnetism);
        const baseY = pointerY / (staticity / circle.magnetism);
        const flowWeightDesktop = 0.03 * (0.5 + circle.magnetism * 0.1);
        const pointerInfluenceX =
          ((baseX - circle.translateX) / ease) * pointerDamp;
        const pointerInfluenceY =
          ((baseY - circle.translateY) / ease) * pointerDamp;
        circle.translateX +=
          pointerInfluenceX + flow.current.x * flowWeightDesktop;
        circle.translateY +=
          pointerInfluenceY + flow.current.y * flowWeightDesktop;
      }

      drawCircle(circle, true);

      // Wrap around edges smoothly based on translated position
      const sx = circle.x + circle.translateX;
      const sy = circle.y + circle.translateY;
      const w = canvasSize.current.w;
      const h = canvasSize.current.h;
      if (sx < -circle.size) {
        circle.x = w + circle.size - circle.translateX;
      } else if (sx > w + circle.size) {
        circle.x = -circle.size - circle.translateX;
      }
      if (sy < -circle.size) {
        circle.y = h + circle.size - circle.translateY;
      } else if (sy > h + circle.size) {
        circle.y = -circle.size - circle.translateY;
      }
    });
    rafID.current = window.requestAnimationFrame(animate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vx, vy, staticity, ease, clearContext]);

  const initCanvas = useCallback(() => {
    resizeCanvas();
    // Reset particles to avoid duplication on resize/init
    circles.current = [];
    drawParticles();
  }, [drawParticles, resizeCanvas]);

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }
    initCanvas();
    animate();

    const handleResize = () => {
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }
      resizeTimeout.current = setTimeout(() => {
        // Smoothly handle canvas resize without full reinitialization to prevent flicker
        const prevW = canvasSize.current.w;
        const prevH = canvasSize.current.h;
        resizeCanvas();
        const newW = canvasSize.current.w;
        const newH = canvasSize.current.h;
        if (prevW > 0 && prevH > 0 && circles.current.length) {
          const scaleX = newW / prevW;
          const scaleY = newH / prevH;
          circles.current.forEach((c) => {
            c.x *= scaleX;
            c.y *= scaleY;
            // Clamp inside bounds to avoid long off-screen waits
            if (c.x < c.size) c.x = c.size;
            if (c.y < c.size) c.y = c.size;
            if (c.x > newW - c.size) c.x = newW - c.size;
            if (c.y > newH - c.size) c.y = newH - c.size;
          });
        }
      }, 200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (rafID.current != null) {
        window.cancelAnimationFrame(rafID.current);
      }
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [color, quantity, staticity, ease, size, vx, vy, initCanvas, animate]);

  useEffect(() => {
    // With a mouse cursor, also factor in mouse position relative to scroll
    if (hasCursor) {
      onMouseMove();
    }
  }, [mousePosition.x, mousePosition.y, hasCursor, onMouseMove]);

  useEffect(() => {
    hasCursorRef.current = hasCursor;
  }, [hasCursor]);

  useEffect(() => {
    initCanvas();
  }, [refresh, initCanvas]);

  return (
    <div
      className={cn("pointer-events-none", className)}
      ref={canvasContainerRef}
      aria-hidden="true"
      {...props}
    >
      <canvas ref={canvasRef} className="size-full" />
    </div>
  );
};
