import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { clinic } from "@/lib/clinic";
import { posts } from "@/lib/content";
import { PageHero, Shell, d } from "@/components/site";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: `Dental Blog — ${clinic.name}` },
      { name: "description", content: "Dental knowledge and tips: gum health, root canals, aligners, kids' teeth, implants and whitening." },
      { property: "og:title", content: `Dental Knowledge & Tips — ${clinic.name}` },
      { property: "og:description", content: "Practical, patient-friendly advice from our dental team." },
    ],
  }),
  component: Blog,
});

function Blog() {
  return (
    <>
      <PageHero title={<>Our <span className="text-ink">Blogs</span></>} sub="Dental knowledge & tips" crumb={[{ l: "Blogs" }]} />
      <Shell>
        <section className="px-5 py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="reveal group overflow-hidden rounded-2xl bg-card shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-soft" style={d((i % 3) * 100)}>
                <div className="overflow-hidden"><img src={p.img} alt={p.title} width={600} height={360} loading="lazy" className="aspect-[5/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
                <div className="p-6">
                  <time className="text-xs uppercase tracking-widest text-accent-strong">{new Date(p.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</time>
                  <h2 className="mt-2 text-lg font-semibold">{p.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent-strong transition-all group-hover:gap-2">Read More <ArrowRight size={14} /></span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </Shell>
    </>
  );
}
