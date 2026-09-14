"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { site } from "@/lib/site";

// Sticky call/quote bar for phones. Appears after the hero and gets out of the
// way while the quote form is on screen so it never covers the submit button.
export default function MobileCallBar() {
  const [isPastHero, setIsPastHero] = useState(false);
  const [isAtContact, setIsAtContact] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsPastHero(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(([entry]) => setIsAtContact(entry.isIntersecting));
    const contact = document.getElementById("contact");
    if (contact) observer.observe(contact);

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const isVisible = isPastHero && !isAtContact;

  return (
    <div
      inert={!isVisible}
      className={`fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-white/10 bg-carbon pb-[env(safe-area-inset-bottom)] transition-transform duration-300 lg:hidden ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a href={site.phoneHref} className="font-display flex items-center justify-center gap-2 py-4 text-sm text-white">
        <Phone size={16} className="text-signal" />
        Call now
      </a>
      <a href="#contact" className="font-display flex items-center justify-center bg-signal py-4 text-sm text-carbon">
        Free quote
      </a>
    </div>
  );
}
