import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import HeroVideo from "./HeroVideo";
import { site } from "@/lib/site";

const proof = ["Free quotes within 24 hrs", "Eco-safe detergents", "Satisfaction guaranteed"];

// Server component: headline and CTAs are in the initial HTML and paint
// immediately. The still image is the LCP element; the video fades in over it
// on desktop only.
export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-carbon pb-14 pt-32 sm:items-center sm:pb-24">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero/hero.jpg"
          alt=""
          fill
          preload
          sizes="100vw"
          className="object-cover object-[72%_center]"
        />
        <HeroVideo src="/hero/hero-loop.mp4" />
        {/* Legibility: carbon wash from the bottom on phones, from the left on desktop */}
        <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/75 to-carbon/10 sm:bg-gradient-to-r sm:from-carbon sm:via-carbon/70 sm:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-carbon to-transparent" />
      </div>

      <div className="container">
        <div className="max-w-5xl">
          <p className="eyebrow animate-rise">
            <span className="text-white/60">P1 //</span> Riverside · Inland Empire
          </p>

          <h1
            className="font-display animate-rise mt-5 text-[clamp(2.4rem,5.6vw,5.25rem)] leading-[0.92] text-white"
            style={{ animationDelay: "80ms" }}
          >
            Pressure washing
            <br />
            that finishes <span className="text-signal">first.</span>
          </h1>

          <p
            className="animate-rise mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            Premium exterior cleaning for driveways, homes, roofs and storefronts across
            Riverside and the Inland Empire. Free, detailed quotes — back to you within 24 hours.
          </p>

          <div
            className="animate-rise mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
            style={{ animationDelay: "240ms" }}
          >
            <a href="#contact" className="btn btn-primary group">
              Get a free quote
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href={site.phoneHref} className="btn btn-ghost">
              <Phone size={17} className="text-signal" />
              {site.phone}
            </a>
          </div>

          <ul
            className="animate-rise mt-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white/60"
            style={{ animationDelay: "320ms" }}
          >
            {proof.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-signal" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
