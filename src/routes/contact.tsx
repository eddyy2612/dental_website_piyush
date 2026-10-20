import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { clinic } from "@/lib/clinic";
import { services } from "@/lib/content";
import { PageHero, Shell, BookingForm, d } from "@/components/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact & Book — ${clinic.name}` },
      { name: "description", content: `Book an appointment at ${clinic.name}. Address, phone, WhatsApp, email and clinic timings.` },
      { property: "og:title", content: `Contact ${clinic.name}` },
      { property: "og:description", content: "Get in touch and book your dental appointment." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const rows: [string, ReactNode][] = [
    ["Clinic Name", clinic.name],
    ["Address", clinic.address],
    ["Phone / WhatsApp", <a key="p" href={`tel:${clinic.phoneRaw}`} className="text-accent-strong">{clinic.phone}</a>],
    ["Email", <a key="e" href={`mailto:${clinic.email}`} className="text-accent-strong">{clinic.email}</a>],
    ["Clinic Timings", clinic.hours],
  ];
  return (
    <>
      <PageHero title={<>Contact <span className="text-ink">Us</span></>} sub="We are here to assist you with all your dental concerns and help you achieve your best smile." crumb={[{ l: "Contact Us" }]} />
      <Shell>
        <section className="px-5 py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[2fr_3fr]">
            <div className="reveal space-y-6">
              <div className="rounded-2xl bg-ink p-8 text-ink-foreground shadow-soft">
                <h2 className="text-2xl font-semibold">Contact <span className="text-gold">Information</span></h2>
                <dl className="mt-6 space-y-4 text-sm">
                  {rows.map(([k, v]) => <div key={k}><dt className="font-semibold text-primary">{k}</dt><dd className="mt-1 text-ink-foreground/85">{v}</dd></div>)}
                </dl>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-semibold">Our Services Include</h3>
                <ul className="mt-3 grid grid-cols-2 gap-1">
                  {services.map((s) => (
                    <li key={s.slug}><Link to="/services/$slug" params={{ slug: s.slug }} className="flex items-center gap-1 py-1 text-sm text-muted-foreground hover:text-accent-strong"><ChevronRight size={12} />{s.title}</Link></li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="reveal space-y-6" style={d(120)}>
              <BookingForm />
              <iframe title="Clinic location" loading="lazy" className="h-72 w-full rounded-2xl border-0 shadow-card" src={`https://www.google.com/maps?q=${encodeURIComponent(clinic.address)}&output=embed`} />
            </div>
          </div>
        </section>
      </Shell>
    </>
  );
}
