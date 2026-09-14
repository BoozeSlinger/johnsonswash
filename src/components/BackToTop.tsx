"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useLenis } from "lenis/react";

// Desktop only — on phones the MobileCallBar owns the bottom of the screen.
export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Native smooth scrolling fights Lenis; let Lenis drive when it's active
  const scrollToTop = () => {
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: "backOut" }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-8 right-6 z-50 hidden h-12 w-12 items-center justify-center border border-white/15 bg-steel text-white transition-colors hover:border-signal hover:bg-signal hover:text-carbon lg:flex"
        >
          <ArrowUp size={20} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
