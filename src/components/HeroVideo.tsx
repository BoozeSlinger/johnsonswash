"use client";

import { useEffect, useRef, useState } from "react";

type NavigatorWithConnection = Navigator & { connection?: { saveData?: boolean } };

// Desktop-only background loop. The source is attached only when we intend to
// play, so phones, reduced-motion users and data-saver users never download it.
export default function HeroVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const canPlay =
      window.matchMedia("(min-width: 768px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      !(navigator as NavigatorWithConnection).connection?.saveData;
    if (!canPlay) return;

    video.src = src;
    // Safety net: if a programmatic play() is deferred (e.g. the page loaded
    // in a background tab), muted autoplay still starts once it can.
    video.autoplay = true;

    // Pause while the hero is off screen
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      onPlaying={() => setIsPlaying(true)}
      className={`absolute inset-0 h-full w-full object-cover object-[72%_center] transition-opacity duration-1000 ${
        isPlaying ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
