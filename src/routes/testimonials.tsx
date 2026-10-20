import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { clinic } from "@/lib/clinic";
import { videoTestimonials } from "@/lib/content";
import { PageHero, Shell, Title, VideoCard, CtaBand, d } from "@/components/site";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: `Patient Testimonials — ${clinic.name}` },
      { name: "description", content: `Watch video stories and read reviews from patients of ${clinic.name}.` },
      { property: "og:title", content: `Patient Testimonials — ${clinic.name}` },
      { property: "og:description", content: "Real smiles, real stories — video testimonials and patient reviews." },
    ],
  }),
  component: Testimonials,
});

const reviews = [["Patient A", "Invisalign"], ["Patient B", "Implants"], ["Patient C", "Whitening"], ["Patient D", "Veneers"], ["Patient E", "Root Canal"], ["Patient F", "Kids Dentistry"]];

function Testimonials() {
  return (
    <>
      <PageHero title={<>Patient <span className="text-ink">Testimonials</span></>} sub="Real smiles, real stories from the people we care for." crumb={[{ l: "Testimonials" }]} />
      <Shell>
        <section className="px-5 py-20 md:py-28">
          <Title sub="Watch" a="Video" b="Stories" />
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {videoTestimonials.map((v, i) => <VideoCard key={v.id} v={v} delay={(i % 4) * 80} />)}
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground">Sample videos shown for layout — to be replaced with our own patients' stories.</p>
        </section>
        <section className="bg-secondary px-5 py-20 md:py-28">
          <Title sub="Read" a="Patient" b="Reviews" />
          <ul className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map(([n, c], i) => (
              <li key={n} className="reveal rounded-2xl border border-border bg-card p-6 shadow-card" style={d((i % 3) * 100)}>
                <div className="flex gap-0.5 text-accent-strong" role="img" aria-label="5 out of 5 stars">{Array.from({ length: 5 }).map((_, k) => <Star key={k} size={16} fill="currentColor" aria-hidden="true" />)}</div>
                <blockquote className="mt-3 text-muted-foreground">“Sample review — replace with a genuine patient review.”</blockquote>
                <p className="mt-4 font-semibold">{n} <span className="text-sm font-normal text-accent-strong">· {c}</span></p>
              </li>
            ))}
          </ul>
        </section>
        <CtaBand />
      </Shell>
    </>
  );
}
