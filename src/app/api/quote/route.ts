import { NextResponse } from "next/server";
import { services } from "@/lib/site";

const MAX_LENGTH = 2000;

// Delivers quote requests by email through Resend's REST API. Without
// RESEND_API_KEY and QUOTE_TO_EMAIL it returns 503 and the form shows a
// "please call" fallback — it never pretends a lead was sent.
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const field = (key: string) =>
    typeof body[key] === "string" ? (body[key] as string).trim().slice(0, MAX_LENGTH) : "";

  // Honeypot filled in: it's a bot. Report success so it doesn't retry.
  if (field("company")) return NextResponse.json({ ok: true });

  const service = services.find((s) => s.id === field("serviceType"));
  const lead = {
    fullName: field("fullName"),
    phone: field("phone"),
    email: field("email"),
    address: field("address"),
    message: field("message"),
  };

  if (!lead.fullName || !lead.phone || !lead.address || !service) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("Quote form: RESEND_API_KEY or QUOTE_TO_EMAIL is not set; lead was not delivered.");
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.QUOTE_FROM_EMAIL ?? "Performance One <onboarding@resend.dev>",
      to: [to],
      reply_to: lead.email || undefined,
      subject: `New quote request: ${service.title} for ${lead.fullName}`.replace(/\s+/g, " "),
      text: [
        `Name: ${lead.fullName}`,
        `Phone: ${lead.phone}`,
        `Email: ${lead.email || "(not provided)"}`,
        `Service: ${service.title}`,
        `Address: ${lead.address}`,
        "",
        lead.message || "(no message)",
      ].join("\n"),
    }),
  });

  if (!res.ok) {
    console.error(`Quote form: Resend responded ${res.status}`);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
