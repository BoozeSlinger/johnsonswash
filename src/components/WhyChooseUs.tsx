import Image from "next/image";
import { Zap, Leaf, ShieldCheck, FileText } from "lucide-react";
import SectionHeader from "./SectionHeader";

const highlights = [
  {
    title: "Fast Response Times",
    body: "We understand your time is valuable. Expect a quote and schedule date within 24 hours.",
    icon: Zap,
  },
  {
    title: "Eco-Friendly Products",
    body: "We use biodegradable, pet-safe, and plant-safe detergents for all our soft washing.",
    icon: Leaf,
  },
  {
    title: "Satisfaction Guaranteed",
    body: "If you aren't 100% happy with the result, we'll make it right. No questions asked.",
    icon: ShieldCheck,
  },
  {
    title: "Free Detailed Estimates",
    body: "No hidden fees. Every quote includes a complete breakdown of services and costs.",
    icon: FileText,
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="relative bg-carbon py-24 sm:py-32">
      <div className="container grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeader
            index="03"
            eyebrow="Why Performance One"
            title={
              <>
                Built for the <span className="text-signal">finish line.</span>
              </>
            }
            intro="Anyone can rent a pressure washer. We bring the right pressure, the right detergents and the follow-through to leave every surface looking its best."
          />

          <ul className="divide-y divide-white/10 border-y border-white/10">
            {highlights.map((item, i) => (
              <li key={item.title} className="flex gap-5 py-6">
                <span className="pt-1 font-mono text-xs text-signal">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="flex items-center gap-3 font-display text-lg text-white">
                    <item.icon size={18} className="shrink-0 text-signal" aria-hidden="true" />
                    {item.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-white/65">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative min-h-[420px] overflow-hidden border border-white/10 lg:min-h-0">
          <Image
            src="/images/crew-driveway.jpg"
            alt="Technician pressure washing a driveway at sunset"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-[75%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <p className="eyebrow">Satisfaction guaranteed</p>
            <p className="font-display mt-3 text-2xl leading-tight text-white sm:text-3xl">
              If it isn&apos;t right, we make it right.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
