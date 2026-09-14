"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";
import SectionHeader from "./SectionHeader";

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    name: "Sarah M.",
    city: "Riverside, CA",
    text: "They did an incredible job on our driveway. It looks brand new! They were professional, on time, and very reasonably priced.",
  },
  {
    name: "Jason R.",
    city: "Corona, CA",
    text: "The soft wash they did on my roof removed all those ugly black streaks. I was worried about my plants, but everything was perfectly safe.",
  },
  {
    name: "Michelle K.",
    city: "Moreno Valley, CA",
    text: "Fast quote, friendly service, and amazing results. My house siding has never looked this clean. Highly recommend these guys!",
  },
];

function Stars({ size }: { size: number }) {
  return (
    <div className="flex gap-1" aria-hidden="true">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={size} className="fill-signal text-signal" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-card", {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        clearProps: "all",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="testimonials" className="relative bg-graphite py-24 sm:py-32">
      <div className="container">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeader
            index="04"
            eyebrow="Reviews"
            title={
              <>
                Word travels <span className="text-signal">fast.</span>
              </>
            }
          />
          <div className="mb-12 flex items-center gap-3 sm:mb-16">
            <Stars size={22} />
            <span className="font-mono text-sm text-white/60">5.0 · 200+ reviews</span>
          </div>
        </div>

        {/* Mobile: horizontal snap scroll | Desktop: 3-up grid */}
        <div
          ref={cardsRef}
          className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 no-scrollbar sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0"
        >
          {reviews.map((review) => (
            <figure
              key={review.name}
              className="testimonial-card flex w-[82vw] shrink-0 snap-center flex-col border border-white/10 bg-carbon p-8 transition-colors hover:border-signal/40 md:w-auto"
            >
              <Stars size={16} />
              <blockquote className="mt-6 flex-1 text-lg leading-relaxed text-white/80">
                &ldquo;{review.text}&rdquo;
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-signal font-display text-lg text-carbon">
                  {review.name[0]}
                </span>
                <span>
                  <span className="block font-semibold text-white">{review.name}</span>
                  <span className="mt-0.5 block font-mono text-xs uppercase tracking-[0.14em] text-white/50">
                    {review.city}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
