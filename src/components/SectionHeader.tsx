"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionHeaderProps {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  align?: "left" | "center";
}

// Animates whole blocks rather than splitting the title into per-character
// spans — the old split broke words mid-line, made gradient titles render
// invisible, and made screen readers spell titles letter by letter.
export default function SectionHeader({ index, eyebrow, title, intro, align = "left" }: SectionHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".reveal", {
        y: 32,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`mb-12 flex flex-col sm:mb-16 ${align === "center" ? "items-center text-center" : "items-start"}`}
    >
      <p className="reveal eyebrow flex items-center gap-3">
        <span className="text-white/50">{index}</span>
        <span className="bg-checker h-2 w-8 text-signal" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className="reveal font-display mt-5 max-w-4xl text-[clamp(2rem,5vw,4rem)] leading-[0.95] text-white">
        {title}
      </h2>
      {intro && (
        <p className="reveal mt-5 max-w-2xl text-lg leading-relaxed text-white/65">{intro}</p>
      )}
    </div>
  );
}
