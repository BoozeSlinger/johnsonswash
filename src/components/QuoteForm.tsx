"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Loader2, Phone } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "./SectionHeader";
import { cn } from "@/lib/utils";
import { services, site } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

type FormData = {
  fullName: string;
  phone: string;
  email: string;
  serviceType: string;
  address: string;
  message: string;
  company: string; // honeypot — real users never see it
};

const steps = [
  { title: "Send your details", body: "Takes about a minute." },
  { title: "Get your free quote", body: "A detailed estimate within 24 hours." },
  { title: "We schedule & wash", body: "On a day that works for you." },
];

const inputClass =
  "w-full border border-white/10 bg-carbon/60 px-4 py-3 text-white placeholder-white/30 outline-none transition-colors focus:border-signal aria-[invalid=true]:border-red-400/70";

function Field({
  id,
  label,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/60">
        {label}
      </label>
      {children}
      {error && (
        <span id={`${id}-error`} role="alert" className="text-xs font-medium text-red-400">
          {error}
        </span>
      )}
    </div>
  );
}

export default function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  const sectionRef = useRef<HTMLElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formCardRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const onSubmit = async (data: FormData) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`Quote request failed: ${res.status}`);
      reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const describedBy = (field: keyof FormData) => (errors[field] ? `${field}-error` : undefined);

  return (
    <section ref={sectionRef} id="contact" className="relative bg-graphite py-24 sm:py-32">
      <div className="container max-w-6xl">
        <SectionHeader
          index="06"
          eyebrow="Free estimate"
          title={
            <>
              Ready for a <span className="text-signal">clean start?</span>
            </>
          }
        />

        <div
          ref={formCardRef}
          className="grid overflow-hidden border border-white/10 bg-carbon lg:grid-cols-[2fr_3fr]"
        >
          {/* Left panel */}
          <div className="relative flex flex-col justify-between gap-10 overflow-hidden border-b border-white/10 p-8 sm:p-10 lg:border-b-0 lg:border-r">
            <span className="bg-checker absolute right-0 top-0 h-full w-10 text-white/[0.04]" aria-hidden="true" />
            <div className="relative">
              <h3 className="font-display text-3xl leading-tight text-white">Get your free quote</h3>
              <ol className="mt-8 space-y-6">
                {steps.map((step, i) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="font-mono text-xs text-signal">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="font-semibold text-white">{step.title}</p>
                      <p className="mt-1 text-sm text-white/60">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="relative">
              <p className="eyebrow">Prefer to talk?</p>
              <a
                href={site.phoneHref}
                className="font-display mt-3 inline-flex items-center gap-3 text-2xl text-white transition-colors hover:text-signal"
              >
                <Phone size={22} className="text-signal" />
                {site.phone}
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="p-8 sm:p-10">
            <AnimatePresence mode="wait">
              {status !== "sent" ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="relative grid grid-cols-1 gap-6 md:grid-cols-2"
                >
                  <Field id="fullName" label="Full name" error={errors.fullName?.message}>
                    <input
                      id="fullName"
                      autoComplete="name"
                      aria-invalid={!!errors.fullName}
                      aria-describedby={describedBy("fullName")}
                      {...register("fullName", { required: "Name is required" })}
                      className={inputClass}
                      placeholder="Jane Smith"
                    />
                  </Field>

                  <Field id="phone" label="Phone" error={errors.phone?.message}>
                    <input
                      id="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      aria-invalid={!!errors.phone}
                      aria-describedby={describedBy("phone")}
                      {...register("phone", {
                        required: "Phone is required",
                        validate: (v) => v.replace(/\D/g, "").length >= 10 || "Enter a 10-digit phone number",
                      })}
                      className={inputClass}
                      placeholder="(951) 555-0123"
                    />
                  </Field>

                  <Field id="email" label="Email (optional)" error={errors.email?.message} className="md:col-span-2">
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      aria-invalid={!!errors.email}
                      aria-describedby={describedBy("email")}
                      {...register("email", {
                        pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
                      })}
                      className={inputClass}
                      placeholder="jane@example.com"
                    />
                  </Field>

                  <Field id="serviceType" label="Service" error={errors.serviceType?.message} className="md:col-span-2">
                    <div className="relative">
                      <select
                        id="serviceType"
                        aria-invalid={!!errors.serviceType}
                        aria-describedby={describedBy("serviceType")}
                        {...register("serviceType", { required: "Please select a service" })}
                        className={cn(inputClass, "appearance-none pr-10")}
                      >
                        <option value="" className="bg-carbon">Select a service…</option>
                        {services.map((s) => (
                          <option key={s.id} value={s.id} className="bg-carbon">
                            {s.title}
                          </option>
                        ))}
                      </select>
                      <svg
                        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 fill-current text-white/60"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </Field>

                  <Field id="address" label="Property address" error={errors.address?.message} className="md:col-span-2">
                    <input
                      id="address"
                      autoComplete="street-address"
                      aria-invalid={!!errors.address}
                      aria-describedby={describedBy("address")}
                      {...register("address", { required: "Address is required" })}
                      className={inputClass}
                      placeholder="123 Main St, Riverside, CA"
                    />
                  </Field>

                  <Field id="message" label="Anything we should know? (optional)" className="md:col-span-2">
                    <textarea
                      id="message"
                      rows={4}
                      {...register("message")}
                      className={cn(inputClass, "resize-none")}
                      placeholder="Surfaces, square footage, stains, gate codes…"
                    />
                  </Field>

                  {/* Honeypot */}
                  <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                    <label htmlFor="company">Company</label>
                    <input id="company" tabIndex={-1} autoComplete="off" {...register("company")} />
                  </div>

                  {status === "error" && (
                    <p role="alert" className="border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200 md:col-span-2">
                      We couldn&apos;t send your request. Please call us at{" "}
                      <a href={site.phoneHref} className="font-semibold text-white underline">
                        {site.phone}
                      </a>{" "}
                      and we&apos;ll get you a quote right away.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary mt-2 w-full disabled:opacity-70 md:col-span-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send my request
                        <Send size={17} />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex h-full flex-col items-center justify-center py-12 text-center"
                  role="status"
                >
                  <div className="mb-6 flex h-20 w-20 items-center justify-center border border-signal/40 bg-signal/10 text-signal">
                    <CheckCircle size={40} />
                  </div>
                  <h3 className="font-display text-3xl text-white">Request received</h3>
                  <p className="mx-auto mt-4 max-w-sm text-white/70">
                    Thanks for reaching out to {site.shortName}. We&apos;ll be in touch within 24 hours
                    with your free quote.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-signal transition-colors hover:text-signal-hot"
                  >
                    Send another request
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
