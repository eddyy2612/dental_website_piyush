import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useId, useState, type FormEvent } from "react";
import { Sparkles, AlertTriangle, ArrowRight, BookOpen, Loader2 } from "lucide-react";
import { clinic } from "@/lib/clinic";
import { askAdvisor } from "@/lib/advisor.functions";
import type { AdvisorResult } from "@/lib/advisor.server";
import { PageHero, Shell, d } from "@/components/site";

export const Route = createFileRoute("/smile-advisor")({
  head: () => ({
    meta: [
      { title: `Smile Advisor — Ask about your dental concern | ${clinic.name}` },
      { name: "description", content: "Describe your dental concern and get AI-powered guidance on relevant treatments and helpful articles." },
      { property: "og:title", content: `Smile Advisor — ${clinic.name}` },
      { property: "og:description", content: "AI-powered guidance on which treatments may suit your concern." },
    ],
  }),
  component: Advisor,
});

const examples = [
  "My gums bleed when I brush",
  "I have a gap between my front teeth",
  "Sharp pain when I drink something cold",
  "I'm missing a back tooth",
  "I want whiter teeth",
  "My wisdom tooth is painful",
  "My child has a cavity",
  "I want Invisalign",
];

function Advisor() {
  const ask = useServerFn(askAdvisor);
  const id = useId();
  const [concern, setConcern] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AdvisorResult | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (concern.trim().length < 5) { setError("Please describe your concern in a few words."); return; }
    setLoading(true); setError(null); setResult(null);
    try {
      const res = await ask({ data: { concern } });
      if (res.ok) setResult(res.result); else setError(res.error);
    } catch {
      setError("Something went wrong. Please try again or contact the clinic.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageHero title={<>Smile <span className="text-ink">Advisor</span></>} sub="Describe your dental concern and get instant guidance on relevant treatments and helpful articles — or we'll recommend a consultation." crumb={[{ l: "Smile Advisor" }]} />
      <Shell>
        <section className="px-5 py-20 md:py-28">
          <div className="mx-auto max-w-3xl">
            <form onSubmit={submit} className="reveal rounded-2xl bg-card p-6 shadow-card md:p-8" aria-busy={loading}>
              <label htmlFor={id} className="text-xl font-semibold">What's your dental concern or question?</label>
              <p id={`${id}-hint`} className="mt-1 text-sm text-muted-foreground">Please don't include personal details. This is guidance, not a diagnosis.</p>
              <textarea
                id={id}
                aria-describedby={`${id}-hint`}
                value={concern}
                onChange={(e) => setConcern(e.target.value)}
                maxLength={800}
                rows={4}
                placeholder="e.g. My tooth hurts when I bite down…"
                className="mt-4 w-full rounded-lg border border-input bg-background px-4 py-3 placeholder:text-muted-foreground focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
              />
              <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Example questions">
                {examples.map((ex) => (
                  <button key={ex} type="button" onClick={() => setConcern(ex)} className="rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-accent hover:text-foreground">{ex}</button>
                ))}
              </div>
              <button disabled={loading} className="btn-shine mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-70">
                {loading ? <Loader2 size={18} className="animate-spin" aria-hidden="true" /> : <Sparkles size={18} aria-hidden="true" />}
                {loading ? "Thinking…" : "Get guidance"}
              </button>
            </form>

            <div aria-live="polite" className="mt-8 space-y-6">
              {error && <p role="alert" className="rounded-xl border border-destructive/40 bg-card p-4 text-destructive">{error}</p>}
              {result && (
                <>
                  {result.urgent && (
                    <div role="alert" className="rise flex gap-3 rounded-2xl border border-destructive/40 bg-card p-5">
                      <AlertTriangle className="shrink-0 text-destructive" aria-hidden="true" />
                      <p>This may need prompt attention. Please call us at <a className="font-semibold underline" href={`tel:${clinic.phoneRaw}`}>{clinic.phone}</a>.</p>
                    </div>
                  )}
                  <div className="rise rounded-2xl bg-ink p-6 text-ink-foreground">
                    <h2 className="text-lg font-semibold text-primary">Our guidance</h2>
                    <p className="mt-2 leading-relaxed">{result.summary}</p>
                  </div>
                  {result.treatments.length > 0 && (
                    <div>
                      <h2 className="text-xl font-semibold">Treatments that may help</h2>
                      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                        {result.treatments.map((t, i) => (
                          <li key={t.slug} className="rise" style={d(i * 100)}>
                            <Link to="/services/$slug" params={{ slug: t.slug }} className="group block h-full rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:shadow-card">
                              <h3 className="font-semibold">{t.title}</h3>
                              <p className="mt-1 text-sm text-muted-foreground">{t.reason}</p>
                              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent-strong">Learn more <ArrowRight size={14} aria-hidden="true" /></span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {result.articles.length > 0 && (
                    <div>
                      <h2 className="text-xl font-semibold">Helpful articles</h2>
                      <ul className="mt-4 space-y-3">
                        {result.articles.map((a) => (
                          <li key={a.slug}>
                            <Link to="/blog/$slug" params={{ slug: a.slug }} className="flex gap-3 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-accent">
                              <BookOpen className="shrink-0 text-accent-strong" aria-hidden="true" />
                              <span><span className="block font-semibold">{a.title}</span><span className="text-sm text-muted-foreground">{a.why}</span></span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-3">
                    <Link to="/contact" hash="book" className="btn-shine rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground">Book a consultation</Link>
                  </div>
                  <p className="text-xs text-muted-foreground">Guidance only — not a diagnosis. Always consult a dentist for personalised advice.</p>
                </>
              )}
            </div>
          </div>
        </section>
      </Shell>
    </>
  );
}
