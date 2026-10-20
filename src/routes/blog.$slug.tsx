import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { clinic } from "@/lib/clinic";
import { posts } from "@/lib/content";
import { PageHero, Shell, ContactCard, CtaBand } from "@/components/site";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.post;
    return {
      meta: [
        { title: p ? `${p.title} — ${clinic.name}` : "Article not found" },
        { name: "description", content: p?.excerpt ?? "" },
        { property: "og:title", content: p?.title ?? "Article" },
        { property: "og:description", content: p?.excerpt ?? "" },
        { property: "og:type", content: "article" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="bg-background px-5 py-40 text-center">
      <h1 className="text-3xl font-semibold">Article not found</h1>
      <Link to="/blog" className="mt-4 inline-block text-accent-strong">Back to blog</Link>
    </div>
  ),
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();
  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 4);
  return (
    <>
      <PageHero title={post.title} crumb={[{ l: "Blogs", to: "/blog" }, { l: "Article" }]} />
      <Shell>
        <section className="px-5 py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[3fr_1.3fr]">
            <article className="reveal">
              <img src={post.img} alt={post.title} width={900} height={500} className="aspect-[16/9] w-full rounded-2xl object-cover shadow-card" />
              <time className="mt-6 block text-sm uppercase tracking-widest text-accent-strong">{new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</time>
              <div className="prose-clinic mt-4">
                {post.body.map((b, i) => (
                  <div key={i}>
                    {b.h && <h2>{b.h}</h2>}
                    {b.p && <p>{b.p}</p>}
                    {b.list && <ul>{b.list.map((l) => <li key={l}>{l}</li>)}</ul>}
                  </div>
                ))}
              </div>
            </article>
            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <h3 className="text-lg font-semibold">Recent Posts</h3>
                <ul className="mt-4 space-y-4">
                  {others.map((o) => (
                    <li key={o.slug}>
                      <Link to="/blog/$slug" params={{ slug: o.slug }} className="flex gap-3 transition-colors hover:text-accent-strong">
                        <img src={o.img} alt="" width={64} height={64} loading="lazy" className="h-16 w-16 shrink-0 rounded-lg object-cover" />
                        <span className="text-sm font-medium">{o.title}</span>
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
