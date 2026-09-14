"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function LenisScrollSync() {
  // Keep GSAP ScrollTrigger in sync with Lenis scroll events
  useLenis(ScrollTrigger.update);

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);
  }, []);

  return null;
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        smoothWheel: true,
        // Smooth in-page #anchor links, landing just below the fixed navbar.
        // (Touch keeps native momentum scrolling — syncTouch caused iOS jank.)
        anchors: { offset: -80 },
      }}
    >
      <LenisScrollSync />
      {children}
    </ReactLenis>
  );
}
