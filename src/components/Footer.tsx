import Image from "next/image";
import { Phone, MapPin } from "lucide-react";
import { services, site } from "@/lib/site";

const quickLinks = [
  { name: "Services", href: "#services" },
  { name: "Before & After", href: "#gallery" },
  { name: "Why Performance One", href: "#why-us" },
  { name: "Reviews", href: "#testimonials" },
  { name: "Service Area", href: "#service-area" },
  { name: "Free Quote", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-carbon pb-28 pt-20 lg:pb-10">
      <div className="container grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-6">
          <Image
            src="/brand/logo-lockup.png"
            alt={site.name}
            width={1400}
            height={201}
            sizes="240px"
            className="h-8 w-auto self-start"
          />
          <p className="max-w-xs leading-relaxed text-white/60">
            Professional pressure washing and soft washing for Riverside and the Inland Empire.
          </p>
        </div>

        <div>
          <h2 className="eyebrow mb-6">Explore</h2>
          <ul className="flex flex-col gap-3 text-white/60">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-white">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="eyebrow mb-6">Services</h2>
          <ul className="flex flex-col gap-3 text-white/60">
            {services.map((service) => (
              <li key={service.id}>
                <a href="#services" className="transition-colors hover:text-white">
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="eyebrow mb-6">Contact</h2>
          <ul className="flex flex-col gap-4 text-white/60">
            <li>
              <a href={site.phoneHref} className="flex gap-3 transition-colors hover:text-white">
                <Phone className="shrink-0 text-signal" size={20} />
                {site.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin className="shrink-0 text-signal" size={20} />
              {site.locality}, {site.region} {site.postalCode}
            </li>
          </ul>
          <a href="#contact" className="btn btn-primary mt-8 px-6 py-3 text-xs">
            Get a free quote
          </a>
        </div>
      </div>

      <div className="container mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-sm text-white/40 md:flex-row">
        <p>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <p className="font-mono text-xs uppercase tracking-[0.2em]">The P1 Finish.</p>
      </div>
    </footer>
  );
}
