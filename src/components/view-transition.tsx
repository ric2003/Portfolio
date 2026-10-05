"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, type ComponentProps } from "react";

// Resolves the pending view transition once the new route has rendered.
let finishTransition: (() => void) | null = null;

// Scroll position per page, restored after back/forward: the browser's own restoration runs
// while the previous (possibly shorter) page is still on screen and gets clamped.
const scrollByPath = new Map<string, number>();
let restoringScroll = false;

/** Project whose grid card title should morph when returning to the homepage. */
export const titleMorph = { slug: null as string | null };

const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Runs a route change inside a view transition; `navigate` must trigger the change. */
function transitionTo(navigate: () => void) {
  const root = document.documentElement;
  root.dataset.viewTransition = "";
  const transition = document.startViewTransition(() => new Promise<void>((resolve) => {
    finishTransition = resolve;
    // Never leave the page frozen if the navigation stalls.
    setTimeout(resolve, 1000);
    navigate();
  }));
  // Safari can retain finished snapshot animations between navigations.
  // Restart only the incoming content, preserving the CSS delays and title morph.
  void transition.ready.then(() => {
    const entrances = new Set([
      "::view-transition-new(project-intro)",
      "::view-transition-new(project-media)",
      "::view-transition-new(project-body)",
    ]);
    for (const animation of document.getAnimations()) {
      const effect = animation.effect;
      if (effect instanceof KeyframeEffect && effect.target === root &&
          entrances.has(effect.pseudoElement ?? "")) {
        animation.currentTime = 0;
        animation.play();
      }
    }
  }, () => {}); // A skipped transition may reject ready.
  transition.finished.finally(() => { delete root.dataset.viewTransition; });
}

export function useTransitionRouter() {
  const router = useRouter();
  return useCallback((href: string) => {
    const samePage = new URL(href, location.href).pathname === location.pathname;
    if (samePage || !document.startViewTransition || reducedMotion()) {
      router.push(href);
      return;
    }
    transitionTo(() => router.push(href));
  }, [router]);
}

// Marks the card title that should morph for a back/forward navigation between the grid and a case study.
function prepareTitleMorph(from: string, to: string) {
  const leaving = from.match(/^\/projects\/([^/]+)/)?.[1];
  const entering = to.match(/^\/projects\/([^/]+)/)?.[1];
  if (leaving && to === "/") titleMorph.slug = leaving;
  if (entering && from === "/") {
    titleMorph.slug = null;
    document.querySelectorAll<HTMLElement>("[data-project-title]").forEach((heading) => { heading.style.viewTransitionName = ""; });
    const heading = document.querySelector<HTMLElement>(`#project-${entering} [data-project-title]`);
    if (heading) heading.style.viewTransitionName = "project-title";
  }
}

export function ViewTransitionResolver() {
  const pathname = usePathname();
  const renderedPath = useRef(pathname);

  // Browser back/forward: hold the router's popstate handling until the old page is captured,
  // then replay the event so Next.js restores the route as usual inside the transition.
  useEffect(() => {
    let replaying = false;
    const onScroll = () => {
      // Ignore the jump to the top that happens while the URL has already moved on to the next page.
      if (!restoringScroll && location.pathname === renderedPath.current) scrollByPath.set(renderedPath.current, scrollY);
    };
    const onPopState = (event: PopStateEvent) => {
      const from = renderedPath.current;
      if (replaying || from === location.pathname) return;
      restoringScroll = true;
      if (!document.startViewTransition || reducedMotion()) return;
      // Skip when the browser already animates the navigation, e.g. the iOS swipe-back gesture.
      if ((event as PopStateEvent & { hasUAVisualTransition?: boolean }).hasUAVisualTransition) return;
      event.stopImmediatePropagation();
      prepareTitleMorph(from, location.pathname);
      transitionTo(() => {
        replaying = true;
        window.dispatchEvent(new PopStateEvent("popstate", { state: event.state }));
        replaying = false;
      });
    };
    const previousRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";
    window.addEventListener("popstate", onPopState, { capture: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      history.scrollRestoration = previousRestoration;
      window.removeEventListener("popstate", onPopState, { capture: true });
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    renderedPath.current = pathname;
    const finish = finishTransition;
    finishTransition = null;
    if (restoringScroll) {
      restoringScroll = false;
      window.scrollTo({ top: scrollByPath.get(pathname) ?? 0, behavior: "instant" });
    }
    if (!finish) return;
    // Wait for on-screen images to decode so the new page isn't captured with empty frames.
    const visible = [...document.images].filter((image) => {
      const rect = image.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < innerHeight && rect.width > 0;
    });
    const timeout = new Promise((resolve) => setTimeout(resolve, 400));
    void Promise.race([Promise.all(visible.map((image) => image.decode().catch(() => {}))), timeout]).then(finish);
  }, [pathname]);
  return null;
}

export function TransitionLink({ href, onClick, ...props }: ComponentProps<typeof Link> & { href: string }) {
  const navigate = useTransitionRouter();
  return (
    <Link
      href={href}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        navigate(href);
      }}
    />
  );
}
