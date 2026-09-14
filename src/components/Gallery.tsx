"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ReactCompareSlider } from "react-compare-slider";
import SectionHeader from "./SectionHeader";

const comparisons = [
  {
    title: "Driveway Deep Clean",
    category: "Driveway",
    before: "/services/driveway_before.png",
    after: "/services/driveway_after.png",
  },
  {
    title: "House Siding Refresh",
    category: "House Washing",
    before: "/services/house_before.png",
    after: "/services/house_after.png",
  },
  {
    title: "Roof Moss Removal",
    category: "Roof Cleaning",
    before: "/services/roof_before.png",
    after: "/services/roof_after.png",
  },
  {
    title: "Deck & Patio Revival",
    category: "Deck & Patio",
    before: "/services/deck_before.jpg",
    after: "/services/deck_after.jpg",
  },
];

function Photo({ src, alt, label, side }: { src: string; alt: string; label: string; side: "left" | "right" }) {
  return (
    <div className="relative h-full w-full">
      <Image src={src} alt={alt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
      <span
        className={`absolute top-4 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.2em] ${
          side === "left" ? "left-4 bg-carbon/80 text-white" : "right-4 bg-signal text-carbon"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

export default function Gallery() {
  return (
    <section id="gallery" className="relative bg-graphite py-24 sm:py-32">
      <div className="container">
        <SectionHeader
          index="02"
          eyebrow="Before & after"
          title={
            <>
              See the <span className="text-signal">difference.</span>
            </>
          }
          intro="Drag the handle — or focus it and use your arrow keys — to compare each surface before and after."
        />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {comparisons.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: (index % 2) * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative aspect-[4/3] overflow-hidden border border-white/10 bg-carbon">
                <ReactCompareSlider
                  itemOne={<Photo src={item.before} alt={`${item.title} — before`} label="Before" side="left" />}
                  itemTwo={<Photo src={item.after} alt={`${item.title} — after`} label="After" side="right" />}
                  style={{ width: "100%", height: "100%", "--rcs-handle-color": "#FF5A1F" } as React.CSSProperties}
                />
              </div>

              <div className="mt-5 flex items-baseline justify-between gap-4">
                <h3 className="font-display text-xl text-white">{item.title}</h3>
                <span className="shrink-0 font-mono text-xs uppercase tracking-[0.18em] text-white/50">
                  {item.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
