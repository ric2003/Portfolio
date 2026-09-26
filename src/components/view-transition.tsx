"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, type ComponentProps } from "react";

// Resolves the pending view transition once the new route has rendered.
let finishTransition: (() => void) | null = null;

/** Project whose grid card title should morph when returning to the homepage. */
export const titleMorph = { slug: null as string | null };

export function useTransitionRouter() {
  const router = useRouter();
  return useCallback((href: string) => {
    const samePage = new URL(href, location.href).pathname === location.pathname;
    if (samePage || !document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      router.push(href);
      return;
    }
    const root = document.documentElement;
    root.dataset.viewTransition = "";
    const transition = document.startViewTransition(() => new Promise<void>((resolve) => {
      finishTransition = resolve;
      // Never leave the page frozen if the navigation stalls.
      setTimeout(resolve, 1000);
      router.push(href);
    }));
    transition.finished.finally(() => { delete root.dataset.viewTransition; });
  }, [router]);
}

export function ViewTransitionResolver() {
  const pathname = usePathname();
  useEffect(() => {
    finishTransition?.();
    finishTransition = null;
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
