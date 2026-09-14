"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

// In-page links are plain <a> so Lenis's anchor handling owns the scroll.
const navLinks = [
  { name: "Services", href: "#services" },
  { name: "Results", href: "#gallery" },
  { name: "Why P1", href: "#why-us" },
  { name: "Reviews", href: "#testimonials" },
  { name: "Service Area", href: "#service-area" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isMobileMenuOpen]);

  const isSolid = isScrolled || isMobileMenuOpen;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b py-4 transition-[background-color,border-color] duration-500",
        isSolid ? "border-white/10 bg-carbon/90 backdrop-blur-md" : "border-transparent bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between gap-6">
        <Link href="/" className="shrink-0" aria-label={`${site.name} — home`}>
          <Image
            src="/brand/logo-lockup.png"
            alt={site.name}
            width={1400}
            height={201}
            loading="eager"
            sizes="260px"
            className="h-7 w-auto sm:h-8 xl:h-9"
          />
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/70 transition-colors hover:text-white"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-6 lg:flex">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2 font-mono text-sm text-white/80 transition-colors hover:text-signal xl:flex"
          >
            <Phone size={15} className="text-signal" />
            {site.phone}
          </a>
          <a href="#contact" className="btn btn-primary px-6 py-3 text-xs">
            Get quote
          </a>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-1 lg:hidden">
          <a
            href={site.phoneHref}
            className="rounded-lg p-2.5 text-signal transition-colors hover:bg-white/10"
            aria-label={`Call ${site.phone}`}
          >
            <Phone size={22} />
          </a>
          <button
            className="rounded-lg p-2.5 text-white transition-colors hover:bg-white/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden lg:hidden"
          >
            <div className="container flex flex-col pb-6 pt-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="border-b border-white/5 py-4 font-display text-lg text-white/80 transition-colors hover:text-signal"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                className="btn btn-primary mt-6"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get a free quote
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
