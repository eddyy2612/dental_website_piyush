import { createFileRoute, Link, ClientOnly } from "@tanstack/react-router";
import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { toothInfo, type ToothType } from "@/lib/teeth";

function TiltTooth() {
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = { x: 0, y: 0 }, c = { x: 0, y: 0 };
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      t.y = (e.clientX / window.innerWidth - 0.5) * 40;
      t.x = -(e.clientY / window.innerHeight - 0.5) * 30;
    };
    const tick = () => {
      c.x += (t.x - c.x) * 0.08; c.y += (t.y - c.y) * 0.08;
      if (ref.current) ref.current.style.transform = `perspective(900px) rotateX(${c.x}deg) rotateY(${c.y}deg) translate(${c.y * 0.4}px, ${-c.x * 0.4}px)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("pointermove", onMove); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div className="floaty relative w-56 sm:w-64 md:w-72 lg:w-80">
      <img ref={ref} src={toothImg} alt="Glossy 3D model of a healthy tooth" width={912} height={912} loading="lazy" className="w-full drop-shadow-2xl will-change-transform" />
    </div>
  );
}
const JawExplorer = lazy(() => import("@/components/teeth3d").then((m) => ({ default: m.JawExplorer })));

function TeethMap() {
  const [active, setActive] = useState<ToothType | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const info = active ? toothInfo[active] : null;
  return (
    <section className="bg-ink px-5 py-20 text-ink-foreground md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-gold">Explore Your Smile</p>
          <h2 className="mt-3 text-3xl font-semibold md:text-5xl">Meet Your <span className="text-gold">32 Teeth</span></h2>
          <p className="mt-4 text-ink-foreground/80">Hover over the 3D jaw — or pick a group below — to learn what each type of tooth does. Drag to turn it around.</p>
        </div>
        <div className="relative mt-10 h-[22rem] overflow-hidden rounded-3xl border border-ink-foreground/10 md:h-[32rem]" aria-hidden="true">
          <ClientOnly fallback={null}>
            <Suspense fallback={<div className="grid h-full place-items-center text-ink-foreground/60">Loading 3D model…</div>}>
              <JawExplorer active={active} setActive={setActive} onMove={(x, y) => setPos({ x, y })} />
            </Suspense>
          </ClientOnly>
          {info && (
            <div className="pointer-events-none absolute z-10 w-64 rounded-2xl bg-background p-4 text-foreground shadow-card" style={pos.x ? { left: pos.x + 16, top: pos.y + 16, transform: pos.x > 600 ? "translateX(-115%)" : undefined } : { left: 16, bottom: 16 }}>
              <p className="font-semibold text-accent-strong">{info.name} <span className="text-xs font-normal text-muted-foreground">· {info.count}</span></p>
              <p className="mt-1 text-sm text-muted-foreground">{info.text}</p>
            </div>
          )}
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {(Object.keys(toothInfo) as ToothType[]).map((k) => (
            <button key={k} type="button" aria-pressed={active === k} onMouseEnter={() => { setPos({ x: 0, y: 0 }); setActive(k); }} onMouseLeave={() => setActive(null)} onFocus={() => setActive(k)} onBlur={() => setActive(null)} onClick={() => setActive(active === k ? null : k)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${active === k ? "border-primary bg-primary text-primary-foreground" : "border-ink-foreground/25 hover:border-primary"}`}>
              {toothInfo[k].name}
            </button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">{info ? `${info.name}, ${info.count}: ${info.text}` : ""}</p>
      </div>
    </section>
  );
}
import { Phone, ArrowRight, Sparkles, ShieldCheck, HeartHandshake, Users, Star } from "lucide-react";
import dentistImg from "@/assets/dentist.jpg";
import toothImg from "@/assets/tooth-3d.png";
import { clinic } from "@/lib/clinic";
import { images, services, posts, videoTestimonials } from "@/lib/content";
import { Shell, Title, BookingForm, ContactCard, Faq, VideoCard, d } from "@/components/site";

const { clinicImg, careImg, smileImg, techImg, alignersImg, loungeImg } = images;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${clinic.name} — Premium Dental Clinic in ${clinic.city}` },
      { name: "description", content: "Advanced technology meets compassionate care. Implants, aligners, veneers, whitening and smile makeovers." },
      { property: "og:title", content: `${clinic.name} — Premium Dental Clinic` },
      { property: "og:description", content: "Advanced technology meets compassionate care for a comfortable dental experience." },
    ],
  }),
  component: Index,
});

const why = [
  { i: Sparkles, t: "Advanced Dental Technology", d: "Modern equipment for precise, comfortable treatments." },
  { i: ShieldCheck, t: "Strict Sterilization Protocols", d: "High hygiene standards to keep you safe every visit." },
  { i: HeartHandshake, t: "Patient Centered Approach", d: "Treatments tailored to your comfort and individual needs." },
  { i: Users, t: "Team of Dental Specialists", d: "Dentists and specialists working together for your care." },
];

const faqs: [string, string][] = [
  ["How can I book an appointment?", "Use the booking form, call us, or message us on WhatsApp. Our team will confirm your slot."],
  ["Are treatments painful?", "We focus on gentle techniques and comfort. Your dentist will explain every step and anaesthesia options."],
  ["Do you treat children?", "Yes, we offer pediatric dentistry in a friendly, reassuring environment."],
  ["Do you treat international patients?", "Yes — see our Dental Tourism page for how we plan treatment around your travel."],
];

function Index() {
  return (
    <>
      <Hero />
      <Shell>
        <Experience />
        <VideoTestimonials />
        <Why />
        <TeethMap />
        <About />
        <Gallery />
        <Team />
        <Testimonials />
        <Blogs />
        <section className="px-5 py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[2fr_3fr]">
            <div className="reveal space-y-6"><ContactCard /><img src={loungeImg} alt="Clinic lounge" width={600} height={340} loading="lazy" className="aspect-video w-full rounded-2xl object-cover" /></div>
            <div className="reveal" style={d(120)}><BookingForm /></div>
          </div>
        </section>
        <section className="px-5 pb-24">
          <Title a="Frequently Asked" b="Questions" />
          <div className="mx-auto max-w-3xl"><Faq items={faqs} /></div>
        </section>
      </Shell>
    </>
  );
}

function Hero() {
  const highlights = [{ img: careImg, t: "Patient Focused" }, { img: techImg, t: "Clinically Advanced" }, { img: smileImg, t: "Excellence Driven" }];
  const stats = [["10,000+", "Smiles Transformed"], ["15+", "Years of Expertise"], ["4.9★", "Patient Rating"], ["98%", "Happy Patients"]];
  return (
    <section className="bg-hero pt-32 pb-36">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2">
        <div>
          <h1 className="rise text-4xl font-semibold leading-tight text-foreground md:text-6xl">Best Dental Clinic in <span className="italic text-ink">{clinic.city}</span></h1>
          <p className="rise mt-5 max-w-lg text-lg text-foreground/80" style={d(120)}>Welcome to {clinic.name}, where advanced technology meets compassionate care for a comfortable, effective dental experience.</p>
          <div className="rise mt-8 flex flex-wrap gap-3" style={d(240)}>
            <Link to="/contact" hash="book" className="btn-shine inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5">Book an Appointment</Link>
            <a href={`tel:${clinic.phoneRaw}`} className="inline-flex items-center gap-2 rounded-lg border border-foreground/30 px-6 py-3.5 font-medium text-foreground transition-colors hover:bg-foreground/5">Call Now <Phone size={18} /></a>
          </div>
          <div className="mt-8 flex gap-4">
            {highlights.map((h, i) => (
              <div key={h.t} className="rise w-28 rounded-xl border border-primary/30 bg-ink/70 p-1.5 text-center backdrop-blur-sm transition-transform hover:-translate-y-1 md:w-32" style={d(360 + i * 100)}>
                <img src={h.img} alt={h.t} width={128} height={110} loading="lazy" className="h-24 w-full rounded-lg object-cover" />
                <p className="py-2 text-sm text-ink-foreground">{h.t}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rise" style={d(200)}>
          <div className="overflow-hidden rounded-2xl shadow-soft">
            <img src={clinicImg} alt="Modern dental clinic interior" width={1600} height={912} fetchPriority="high" className="kenburns aspect-[16/9] w-full object-cover" />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map(([n, l]) => (
              <div key={l} className="rounded-xl border border-primary/25 bg-ink/75 px-3 py-4 text-center backdrop-blur-sm">
                <p className="font-display text-2xl font-semibold text-primary">{n}</p>
                <p className="text-xs text-ink-foreground/90">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const list = services.slice(0, 6);
  return (
    <section className="px-5 py-20 md:py-28">
      <Title a="Profound" b="Experience in" />
      <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((e, i) => (
          <Link key={e.slug} to="/services/$slug" params={{ slug: e.slug }} className="reveal group overflow-hidden rounded-2xl bg-card shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-soft" style={d((i % 3) * 100)}>
            <div className="overflow-hidden"><img src={e.img} alt={e.title} width={600} height={400} loading="lazy" className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold">{e.title}</h3>
              <p className="mt-2 text-muted-foreground">{e.short}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent-strong transition-all group-hover:gap-2">Enquire <ArrowRight size={16} /></span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Why() {
  return (
    <section className="bg-secondary px-5 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1.05fr_0.9fr_1.15fr] lg:gap-4">
        <div className="reveal">
          <h2 className="text-3xl font-semibold leading-[1.1] md:text-5xl">Why Choose <span className="text-gold">{clinic.name}</span>?</h2>
          <p className="mt-5 max-w-sm text-lg text-muted-foreground">Your smile is one of your most valuable assets, and investing in its health and appearance is an investment in yourself.</p>
          <Link to="/contact" className="btn-shine mt-8 inline-flex rounded-full bg-ink px-7 py-3.5 font-medium text-ink-foreground transition-transform duration-300 hover:-translate-y-0.5">Get in touch</Link>
        </div>
        <div className="relative flex items-center justify-center py-4">
          <span aria-hidden="true" className="glow-gold absolute h-[22rem] w-[22rem] md:h-[28rem] md:w-[28rem]" />
          <TiltTooth />
        </div>
        <ul className="pr-16 lg:pr-0 lg:pl-6">
          {why.map(({ t, d: desc }, k) => (
            <li key={t} className="reveal border-b border-border/80 py-5 first:pt-0 last:border-b-0 last:pb-0" style={d(k * 90)}>
              <div className="flex items-start gap-4">
                <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{t}</h3>
                  <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted-foreground">{desc}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="px-5 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div className="reveal grid grid-cols-2 gap-4">
          <img src={loungeImg} alt="Clinic lounge" width={400} height={500} loading="lazy" className="aspect-[4/5] w-full rounded-2xl object-cover shadow-card" />
          <img src={smileImg} alt="Smile" width={400} height={500} loading="lazy" className="mt-10 aspect-[4/5] w-full rounded-2xl object-cover shadow-card" />
        </div>
        <div className="reveal space-y-4 text-muted-foreground" style={d(120)}>
          <h2 className="text-3xl font-semibold text-foreground md:text-4xl">About <span className="text-gold">{clinic.name}</span></h2>
          <p>We are committed to offering a dental experience that is warm, professional and patient-friendly. With a strong focus on <b className="text-foreground">comfort</b> and <b className="text-foreground">care</b>, every treatment feels simple and stress-free.</p>
          <p>Our facilities cover preventive care, cosmetic dentistry, orthodontics, dental implants, root canal treatments and smile makeovers — supported by modern technology and strict sterilization protocols.</p>
          <Link to="/about" className="inline-flex items-center gap-1 font-semibold text-accent-strong">Read more <ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>
  );
}


function Gallery() {
  const items = [smileImg, alignersImg, careImg, techImg, clinicImg, loungeImg];
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);
  return (
    <section className="px-5 py-20 md:py-28">
      <Title sub="Before / After" a="Successful" b="Transformations" />
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-3">
        {items.map((src, i) => (
          <button key={i} onClick={() => setActive(src)} aria-label={`Enlarge demonstration image ${i + 1}`} className="reveal group overflow-hidden rounded-2xl shadow-card" style={d((i % 3) * 100)}>
            <img src={src} alt={`Demonstration image ${i + 1}`} width={400} height={400} loading="lazy" className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-110" />
          </button>
        ))}
      </div>
      <p className="mt-6 text-center text-xs text-muted-foreground">Demonstration imagery — replace with consented patient photos.</p>
      {active && (
        <div role="dialog" aria-modal="true" aria-label="Enlarged image" onClick={() => setActive(null)} className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-6 backdrop-blur-sm">
          <button autoFocus onClick={() => setActive(null)} aria-label="Close image" className="absolute top-5 right-5 rounded-full bg-card px-4 py-2 font-semibold text-foreground">Close</button>
          <img src={active} alt="Enlarged demonstration" className="rise max-h-[85vh] rounded-2xl" />
        </div>
      )}
    </section>
  );
}

function Team() {
  return (
    <section className="bg-secondary px-5 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[2fr_3fr]">
        <div className="reveal overflow-hidden rounded-3xl shadow-soft"><img src={dentistImg} alt={clinic.dentist} width={800} height={800} loading="lazy" className="aspect-square w-full object-cover object-top" /></div>
        <div className="reveal" style={d(120)}>
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent-strong">Meet the Team</p>
          <h2 className="mt-3 text-3xl font-semibold md:text-5xl">{clinic.dentist}</h2>
          <p className="mt-2 text-accent-strong">{clinic.qualifications}</p>
          <p className="mt-5 text-muted-foreground">Our experienced dental team works together with one shared goal — delivering high-quality dental care in a comfortable and caring environment, built on trust, precision and patient-first care.</p>
          <Link to="/about" className="btn-shine mt-8 inline-flex rounded-lg bg-ink px-6 py-3 font-medium text-ink-foreground">Meet the Doctor</Link>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const t = [["Patient A", "Invisalign"], ["Patient B", "Implants"], ["Patient C", "Whitening"], ["Patient D", "Veneers"]];
  const loop = [...t, ...t];
  return (
    <section className="py-20 md:py-28">
      <Title a="What Our" b="Patients Say" />
      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="marquee flex w-max gap-6 hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
          {loop.map(([n, c], i) => (
            <figure key={i} aria-hidden={i >= t.length} className="w-80 shrink-0 rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="flex gap-0.5 text-accent-strong">{Array.from({ length: 5 }).map((_, k) => <Star key={k} size={16} fill="currentColor" />)}</div>
              <blockquote className="mt-3 text-muted-foreground">“Sample review — replace with a genuine patient review.”</blockquote>
              <figcaption className="mt-4 font-semibold">{n} <span className="text-sm font-normal text-accent-strong">· {c}</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Blogs() {
  return (
    <section className="bg-secondary px-5 py-20 md:py-28">
      <Title sub="Dental Knowledge & Tips" a="From Our" b="Blog" />
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
        {posts.slice(0, 3).map((p, i) => (
          <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="reveal group overflow-hidden rounded-2xl bg-card shadow-card transition-transform duration-500 hover:-translate-y-1" style={d(i * 100)}>
            <img src={p.img} alt={p.title} width={600} height={360} loading="lazy" className="aspect-[5/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="p-6"><h3 className="font-semibold">{p.title}</h3><span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent-strong">Read More <ArrowRight size={14} /></span></div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function VideoTestimonials() {
  return (
    <section className="bg-ink px-5 py-20 md:py-28">
      <Title sub="Watch real stories" a="Video" b="Testimonials" light />
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-5 lg:grid-cols-4">
        {videoTestimonials.slice(0, 4).map((v, i) => <VideoCard key={v.id} v={v} delay={i * 100} />)}
      </div>
      <div className="mt-10 text-center">
        <Link to="/testimonials" className="btn-shine inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground">View all testimonials <ArrowRight size={16} aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
