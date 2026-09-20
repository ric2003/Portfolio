"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";

/** Start on hover, with an explicit control for keyboard, touch and reduced motion. */
export function ProjectPreview({ src, webm, poster, title, playLabel, pauseLabel, aspectRatio = 16 / 9 }: {
  aspectRatio?: number; src: string; webm?: string; poster: string; title: string; playLabel: string; pauseLabel: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) video.pause();
    });
    const pauseWhenHidden = () => { if (document.hidden) video.pause(); };
    const card = video.closest("article");
    const startOnHover = () => {
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        void video.play().catch(() => setPlaying(false));
      }
    };
    const pause = () => video.pause();
    card?.addEventListener("mouseenter", startOnHover);
    card?.addEventListener("mouseleave", pause);
    observer.observe(video);
    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () => {
      observer.disconnect();
      card?.removeEventListener("mouseenter", startOnHover);
      card?.removeEventListener("mouseleave", pause);
      document.removeEventListener("visibilitychange", pauseWhenHidden);
    };
  }, []);

  const play = () => { void videoRef.current?.play().catch(() => setPlaying(false)); };

  return (
    <div className="relative overflow-hidden bg-zinc-950" style={{ aspectRatio }} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) videoRef.current?.pause(); }}>
      {failed ? <Image src={poster} alt={title} fill sizes="(max-width: 1024px) 100vw, 896px" className="object-contain" /> : <video ref={videoRef} poster={poster} muted loop playsInline preload="none" aria-label={title} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setFailed(true)} className="h-full w-full object-contain">
        {webm && <source src={webm} type='video/webm; codecs="vp9"' />}
        <source src={src} type="video/mp4" />
      </video>}
      {!failed && <button data-card-action type="button" aria-label={playing ? pauseLabel : playLabel} onClick={() => { if (playing) videoRef.current?.pause(); else play(); }} className="absolute bottom-3 right-3 z-20 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 bg-black/75 px-4 text-xs font-medium text-white backdrop-blur-sm hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
        {playing ? <Pause size={14} /> : <Play size={14} />}{playing ? pauseLabel : playLabel}
      </button>}
    </div>
  );
}
