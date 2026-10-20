import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { clinic } from "@/lib/clinic";
import { services } from "@/lib/content";
import { PageHero, Shell, CtaBand, d } from "@/components/site";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: `Dental Services — ${clinic.name}` },
      { name: "description", content: "Implants, Invisalign, veneers, whitening, root canal, crowns, orthodontics, pediatric dentistry and more." },
      { property: "og:title", content: `Dental Services at ${clinic.name}` },
      { property: "og:description", content: "Complete dental care under one roof." },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHero title={<>Our <span className="text-ink">Services</span></>} sub="Complete dental care, from prevention to full smile transformations." crumb={[{ l: "Services" }]} />
      <Shell>
        <section className="px-5 py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="reveal group overflow-hidden rounded-2xl bg-card shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-soft" style={d((i % 3) * 100)}>
                <div className="overflow-hidden"><img src={s.img} alt={s.title} width={600} height={400} loading="lazy" className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold">{s.title}</h2>
                  <p className="mt-2 text-muted-foreground">{s.short}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent-strong transition-all group-hover:gap-2">Learn more <ArrowRight size={16} /></span>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <CtaBand />
      </Shell>
    </>
  );
}
