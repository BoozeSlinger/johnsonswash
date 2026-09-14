"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { site } from "@/lib/site";

export default function ServiceArea() {
  return (
    <section id="service-area" className="relative bg-carbon py-24 sm:py-32">
      <div className="container grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeader
            index="05"
            eyebrow="Service area"
            title={
              <>
                Proudly serving the <span className="text-signal">Inland Empire.</span>
              </>
            }
            intro="We provide top-tier pressure washing services to residential and commercial clients across these local communities. Don't see your city? Give us a call!"
          />

          <ul className="grid grid-cols-2 gap-3">
            {site.areas.map((city, index) => (
              <motion.li
                key={city}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3 border border-white/10 bg-graphite px-4 py-3 font-semibold text-white"
              >
                <MapPin size={16} className="shrink-0 text-signal" aria-hidden="true" />
                {city}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden border border-white/10 lg:aspect-auto lg:h-[560px]">
          <iframe
            title="Map of the Riverside, California service area"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105777.636657904!2d-117.4721458!3d33.9438062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dca6df7ebb493d%3A0x35ef009dfd778d05!2sRiverside%2C%20CA!5e0!3m2!1sen!2sus!4v1714421626000!5m2!1sen!2sus"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0 [filter:invert(0.92)_hue-rotate(180deg)_saturate(0.55)]"
          />
        </div>
      </div>
    </section>
  );
}
