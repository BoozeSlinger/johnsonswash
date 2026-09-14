import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { services } from "@/lib/site";

// Cards show the finished result; the before/after comparison lives in one
// place (Gallery) instead of being duplicated here behind a hover that touch
// devices can't trigger.
export default function Services() {
  return (
    <section id="services" className="relative bg-carbon py-24 sm:py-32">
      <div className="container">
        <SectionHeader
          index="01"
          eyebrow="What we clean"
          title={
            <>
              Every surface. <span className="text-signal">One standard.</span>
            </>
          }
          intro="Soft washing for siding and roofs, high-pressure power for concrete — matched to the surface, never one-size-fits-all."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <article
              key={service.id}
              className="group relative flex flex-col overflow-hidden border border-white/10 bg-graphite transition-colors hover:border-white/20"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={service.image}
                  alt={`${service.title} — cleaned result`}
                  fill
                  sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite/80 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 bg-carbon/75 px-2 py-1 font-mono text-xs text-white/80 backdrop-blur">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-xl text-white">{service.title}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-white/65">{service.description}</p>
                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-signal transition-colors hover:text-signal-hot"
                >
                  Get a quote
                  <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>

              <span
                className="absolute bottom-0 left-0 h-0.5 w-0 bg-signal transition-[width] duration-500 group-hover:w-full"
                aria-hidden="true"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
