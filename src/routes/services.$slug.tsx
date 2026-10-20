import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CheckCircle2, Cpu, ChevronRight } from "lucide-react";
import { clinic } from "@/lib/clinic";
import { services } from "@/lib/content";
import { PageHero, Shell, ContactCard, BookingForm, Faq, CtaBand, Title, d } from "@/components/site";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = services.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.service;
    const title = s ? `${s.title} in ${clinic.city} — ${clinic.name}` : "Service not found";
    return {
      meta: [
        { title },
        { name: "description", content: s?.short ?? "" },
        { property: "og:title", content: title },
        { property: "og:description", content: s?.short ?? "" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="bg-background px-5 py-40 text-center">
      <h1 className="text-3xl font-semibold">Service not found</h1>
      <Link to="/services" className="mt-4 inline-block text-accent-strong">See all services</Link>
    </div>
  ),
  component: ServicePage,
});

function ServicePage() {
  const { service: s } = Route.useLoaderData();
  return (
    <>
      <PageHero title={<>{s.title} in <span className="text-ink">{clinic.city}</span></>} crumb={[{ l: "Services", to: "/services" }, { l: s.title }]} />
      <Shell>
        <section className="px-5 py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[3fr_1.3fr]">
            <article className="space-y-12">
              <div className="reveal">
                <img src={s.img} alt={s.title} width={900} height={500} className="aspect-[16/9] w-full rounded-2xl object-cover shadow-card" />
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                  <h2 className="text-3xl font-semibold">{s.title} <span className="text-gold">at {clinic.name}</span></h2>
                  <a href="#book" className="btn-shine rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground">Book Your Appointment</a>
                </div>
                <div className="mt-4 space-y-4 text-muted-foreground">{s.intro.map((p) => <p key={p}>{p}</p>)}</div>
              </div>

              <div className="reveal rounded-2xl bg-secondary p-8">
                <h3 className="text-2xl font-semibold">Why Choose {s.title}</h3>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {s.benefits.map((b) => <li key={b} className="flex gap-2"><CheckCircle2 size={20} className="shrink-0 text-accent-strong" />{b}</li>)}
                </ul>
              </div>

              <div>
                <h3 className="reveal text-2xl font-semibold">Advanced Technology We Use</h3>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {s.tech.map((t, i) => (
                    <div key={t.t} className="reveal rounded-2xl border border-border bg-card p-6 transition-transform duration-500 hover:-translate-y-1" style={d(i * 80)}>
                      <Cpu className="text-accent-strong" />
                      <h4 className="mt-3 font-semibold">{t.t}</h4>
                      <p className="mt-1 text-sm text-muted-foreground">{t.d}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="reveal rounded-2xl bg-ink p-8 text-ink-foreground">
                <h3 className="text-2xl font-semibold">Why Choose <span className="text-gold">{clinic.name}</span>?</h3>
                <p className="mt-3 text-ink-foreground/80">Success depends on experience, precision and technology. Every {s.title.toLowerCase()} treatment is carefully planned and performed by skilled clinicians using trusted systems, in a fully sterilised, patient-friendly environment.</p>
              </div>

              <div>
                <Title a="Frequently Asked" b="Questions" />
                <Faq items={s.faqs} />
              </div>

              <div className="reveal"><BookingForm defaultService={s.title} /></div>
            </article>

            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <h3 className="text-lg font-semibold">Our Services</h3>
                <ul className="mt-4 space-y-1">
                  {services.map((o) => (
                    <li key={o.slug}>
                      <Link to="/services/$slug" params={{ slug: o.slug }} className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-secondary hover:text-accent-strong ${o.slug === s.slug ? "bg-secondary font-semibold text-accent-strong" : ""}`}>
                        {o.title}<ChevronRight size={14} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <ContactCard />
            </aside>
          </div>
        </section>
        <CtaBand />
      </Shell>
    </>
  );
}
