import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Phone, MessageCircle, Mail, MapPin, Clock, Menu, X, ChevronDown, CheckCircle2, ChevronRight } from "lucide-react";
import { clinic, whatsappLink } from "@/lib/clinic";
import { services, type VideoTestimonial } from "@/lib/content";
import { Play, Heart } from "lucide-react";
import nutrenaLogo from "@/assets/nutrena-logo.jpg";

export const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` });

export function useReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px 80px 0px" },
    );

    const scanAndObserve = () => {
      const elements = document.querySelectorAll<HTMLElement>(".reveal:not(.in)");
      if (!elements.length) return;

      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // If element is already within or above the viewport, reveal immediately
        if (rect.top <= viewportHeight + 60 && rect.bottom >= -60) {
          el.classList.add("in");
        } else {
          io.observe(el);
        }
      });
    };

    // Immediate check
    scanAndObserve();

    // Observe DOM mutations so client-side route transitions and delayed React renders
    // automatically hook up without leaving elements stuck at opacity: 0
    let mo: MutationObserver | null = null;
    if ("MutationObserver" in window) {
      mo = new MutationObserver(() => {
        scanAndObserve();
      });
      mo.observe(document.body, { childList: true, subtree: true });
    }

    // Staggered scans to catch frames as the new route component mounts
    const t1 = setTimeout(scanAndObserve, 40);
    const t2 = setTimeout(scanAndObserve, 150);
    const t3 = setTimeout(scanAndObserve, 350);

    // Failsafe: after 1.2s, force any remaining hidden elements to show so content is NEVER blank
    const failsafe = setTimeout(() => {
      document.querySelectorAll(".reveal:not(.in)").forEach((el) => el.classList.add("in"));
    }, 1200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(failsafe);
      mo?.disconnect();
      io.disconnect();
    };
  }, [pathname]);
}

const nav = [
  { l: "Home", to: "/" },
  { l: "About", to: "/about" },
  { l: "Services", to: "/services" },
  { l: "Blogs", to: "/blog" },
  { l: "Contact", to: "/contact" },
  { l: "Dental Tourism", to: "/dental-tourism" },
  { l: "Testimonials", to: "/testimonials" },
  { l: "Smile Advisor", to: "/smile-advisor" },
] as const;

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2 leading-none" aria-label={`${clinic.name} home`}>
      <img src={nutrenaLogo} alt="Nutrena logo" width={36} height={36} className="h-9 w-9 rounded-lg object-cover shadow-sm" />
      <div>
        <span className="block font-display text-xs font-semibold uppercase tracking-[0.3em] text-accent-strong">Eddy</span>
        <span className={`block font-display text-xl font-semibold leading-tight ${light ? "text-ink-foreground" : "text-foreground"}`}>{clinic.name}</span>
      </div>
    </Link>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <>
    <a href="#main" className="skip-link">Skip to content</a>
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/85 py-2 shadow-card backdrop-blur-md" : "py-5"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-1 rounded-full bg-ink px-3 py-2 shadow-soft lg:flex">
          {nav.map((n) =>
            n.to === "/services" ? (
              <div key={n.to} className="group relative">
                <Link to="/services" className="flex items-center gap-1 rounded-full px-3 py-2 text-sm text-ink-foreground/85 transition-colors hover:text-primary" activeProps={{ className: "text-primary" }}>
                  Services <ChevronDown size={14} className="transition-transform group-hover:rotate-180" aria-hidden="true" />
                </Link>
                <div className="invisible absolute left-1/2 top-full w-[34rem] -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <div className="grid grid-cols-2 gap-1 rounded-2xl bg-card p-3 shadow-soft">
                    {services.map((s) => (
                      <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-secondary hover:text-accent-strong">{s.title}</Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }} className="rounded-full px-3 py-2 text-sm text-ink-foreground/85 transition-colors hover:text-primary" activeProps={{ className: "text-primary" }}>{n.l}</Link>
            ),
          )}
          <Link to="/contact" hash="book" className="btn-shine ml-2 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-105">Book Now</Link>
        </nav>
        <button aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)} className="rounded-full bg-ink p-3 text-ink-foreground lg:hidden">
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>
      <div id="mobile-menu" hidden={!open} className="overflow-hidden lg:hidden">
        <nav aria-label="Mobile" className="rise mx-4 mt-3 rounded-2xl bg-ink p-4">
          {nav.map((n) => <Link key={n.to} to={n.to} className="block py-2 text-ink-foreground">{n.l}</Link>)}
          <Link to="/contact" hash="book" className="mt-2 block rounded-full bg-primary py-3 text-center font-medium text-primary-foreground">Book Now</Link>
        </nav>
      </div>
    </header>
    </>
  );
}

export function PageHero({ title, crumb, sub }: { title: ReactNode; crumb: { l: string; to?: string }[]; sub?: string }) {
  return (
    <section className="bg-hero pt-36 pb-28 text-center">
      <div className="mx-auto max-w-4xl px-5">
        <h1 className="rise text-4xl font-semibold text-foreground md:text-6xl">{title}</h1>
        {sub && <p className="rise mx-auto mt-4 max-w-2xl text-lg text-foreground" style={d(100)}>{sub}</p>}
        <nav aria-label="Breadcrumb"><ol className="rise mt-6 inline-flex flex-wrap items-center justify-center gap-1 rounded-full bg-ink/85 px-5 py-2 text-sm text-ink-foreground backdrop-blur-sm" style={d(200)}>
          <li><Link to="/" className="hover:text-primary">Home</Link></li>
          {crumb.map((c) => (
            <li key={c.l} className="flex items-center gap-1">
              <ChevronRight size={14} aria-hidden="true" />
              {c.to ? <Link to={c.to} className="hover:text-primary">{c.l}</Link> : <span className="text-primary" aria-current="page">{c.l}</span>}
            </li>
          ))}
        </ol></nav>
      </div>
    </section>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  return <main id="main" tabIndex={-1} className="relative outline-none mx-3 -mt-16 rounded-[2rem] bg-background shadow-soft md:mx-12">{children}</main>;
}

export function Title({ a, b, sub, light }: { a: string; b: string; sub?: string; light?: boolean }) {
  return (
    <div className="reveal mx-auto mb-12 max-w-2xl text-center">
      {sub && <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-accent-strong">{sub}</p>}
      <h2 className={`text-3xl font-semibold md:text-5xl ${light ? "text-ink-foreground" : ""}`}>{a} <span className="text-gold">{b}</span></h2>
    </div>
  );
}

export function ContactCard() {
  return (
    <div className="rounded-2xl bg-ink p-6 text-ink-foreground shadow-soft">
      <h3 className="text-xl font-semibold">Feel Free to <span className="text-gold">Contact Us</span></h3>
      <ul className="mt-5 space-y-4 text-sm">
        <li className="flex gap-3"><Phone size={18} className="shrink-0 text-primary" aria-hidden="true" /><a href={`tel:${clinic.phoneRaw}`}>{clinic.phone}</a></li>
        <li className="flex gap-3"><Mail size={18} className="shrink-0 text-primary" aria-hidden="true" /><a href={`mailto:${clinic.email}`}>{clinic.email}</a></li>
        <li className="flex gap-3"><MapPin size={18} className="shrink-0 text-primary" aria-hidden="true" />{clinic.address}</li>
        <li className="flex gap-3"><Clock size={18} className="shrink-0 text-primary" aria-hidden="true" />{clinic.hours}</li>
      </ul>
    </div>
  );
}

export function Faq({ items }: { items: [string, string][] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {items.map(([q, a], i) => (
        <div key={q} className="reveal rounded-2xl border border-border bg-card">
          <button aria-expanded={open === i} aria-controls={`faq-${i}`} onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold">
            {q}<ChevronDown aria-hidden="true" className={`shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`} />
          </button>
          <div id={`faq-${i}`} role="region" className={`grid transition-all duration-500 ${open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
            <div className="overflow-hidden px-5 text-muted-foreground"><p className="pb-5">{a}</p></div>
          </div>
        </div>
      ))}
    </div>
  );
}

type FormFields = { name: string; phone: string; email: string; treatment: string; date: string; time: string; message: string };
type Errs = { name?: string; phone?: string; email?: string; date?: string };
const slots = ["10:00 AM – 11:00 AM", "11:00 AM – 12:00 PM", "12:00 PM – 1:00 PM", "1:00 PM – 2:00 PM", "2:00 PM – 3:00 PM", "5:30 PM – 6:30 PM", "6:30 PM – 7:30 PM", "7:30 PM – 8:00 PM"];

function Field({ children, err, id }: { children: ReactNode; err?: string | undefined; id?: string }) {
  return <div>{children}{err && <p id={id} role="alert" className="mt-1 text-xs text-destructive">{err}</p>}</div>;
}

export function BookingForm({ defaultService }: { defaultService?: string }) {
  const [errors, setErrors] = useState<Errs>({});
  const [done, setDone] = useState(false);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget)) as unknown as FormFields;
    const err: Errs = {};
    if (f.name.trim().length < 2) err.name = "Please enter your name";
    if (!/^[+]?[\d\s-]{10,15}$/.test(f.phone)) err.phone = "Enter a valid phone number";
    if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) err.email = "Enter a valid email";
    if (!f.date) err.date = "Choose a preferred date";
    setErrors(err);
    if (Object.keys(err).length) return;
    const msg = `Appointment request\nName: ${f.name}\nPhone: ${f.phone}\nEmail: ${f.email || "-"}\nService: ${f.treatment}\nDate: ${f.date}, ${f.time}\nMessage: ${f.message || "-"}`;
    window.open(whatsappLink(msg), "_blank", "noopener");
    setDone(true);
  }
  const input = "w-full rounded-lg border border-input bg-background px-4 py-3 transition placeholder:text-muted-foreground focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40";
  if (done) {
    return (
      <div role="status" className="rise rounded-2xl bg-card p-8 text-center shadow-card">
        <CheckCircle2 aria-hidden="true" className="mx-auto text-accent-strong" size={48} />
        <h3 className="mt-4 text-2xl font-semibold">Request sent</h3>
        <p className="mt-2 text-muted-foreground">We've opened WhatsApp with your details. Our team will confirm your appointment shortly.</p>
        <button onClick={() => setDone(false)} className="mt-6 text-sm font-semibold text-accent-strong">Send another</button>
      </div>
    );
  }
  return (
    <form id="book" aria-label="Book an appointment" onSubmit={submit} noValidate className="grid scroll-mt-28 gap-4 rounded-2xl bg-card p-6 shadow-card sm:grid-cols-2">
      <h3 className="text-xl font-semibold sm:col-span-2">Book an Appointment</h3>
      <Field err={errors.name} id="err-name"><input name="name" aria-label="Full name" aria-required="true" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "err-name" : undefined} placeholder="Full name *" className={input} /></Field>
      <Field err={errors.phone} id="err-phone"><input name="phone" type="tel" aria-label="Phone number" aria-required="true" autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "err-phone" : undefined} placeholder="Phone *" className={input} /></Field>
      <Field err={errors.email} id="err-email"><input name="email" type="email" aria-label="Email (optional)" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "err-email" : undefined} placeholder="Email (optional)" className={input} /></Field>
      <Field><select name="treatment" aria-label="Service" defaultValue={defaultService} className={input}>{services.map((s) => <option key={s.slug}>{s.title}</option>)}</select></Field>
      <Field err={errors.date} id="err-date"><input name="date" type="date" aria-label="Preferred date" aria-required="true" aria-invalid={!!errors.date} aria-describedby={errors.date ? "err-date" : undefined} className={input} /></Field>
      <Field><select name="time" aria-label="Preferred time" className={input}>{slots.map((s) => <option key={s}>{s}</option>)}</select></Field>
      <textarea name="message" aria-label="Message (optional)" rows={3} placeholder="Message (optional)" className={`${input} sm:col-span-2`} />
      <button className="btn-shine rounded-lg bg-primary py-3.5 font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 sm:col-span-2">Submit Appointment</button>
      <p className="text-xs text-muted-foreground sm:col-span-2">Your details are sent only to our clinic via WhatsApp to arrange your visit.</p>
    </form>
  );
}

export function CtaBand() {
  return (
    <section className="px-5 pb-20">
      <div className="reveal mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 rounded-3xl bg-ink p-10 text-center text-ink-foreground md:flex-row md:text-left">
        <div>
          <h3 className="text-2xl font-semibold md:text-3xl">Ready for your <span className="text-gold">best smile?</span></h3>
          <p className="mt-2 text-ink-foreground/80">Book a consultation and get a personalised treatment plan.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/contact" hash="book" className="btn-shine rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground">Book Now</Link>
          <a href={`tel:${clinic.phoneRaw}`} className="rounded-lg border border-ink-foreground/30 px-6 py-3">Call Now</a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="-mt-12 bg-ink px-5 pt-28 pb-10 text-ink-foreground/80">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-4 text-sm">Advanced technology meets compassionate care.</p>
          <div className="mt-6 flex items-center gap-2">
            <img src={nutrenaLogo} alt="Nutrena" width={32} height={32} className="h-8 w-8 rounded-md object-cover" />
            <p className="text-xs text-ink-foreground/60">Powered by <span className="font-semibold text-primary">Eddy</span></p>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <p className="mb-3 font-semibold text-primary">Explore</p>
          {nav.map((n) => <Link key={n.to} to={n.to} className="block hover:text-primary">{n.l}</Link>)}
        </div>
        <div className="space-y-2 text-sm">
          <p className="mb-3 font-semibold text-primary">Services</p>
          {services.slice(0, 7).map((s) => <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="block hover:text-primary">{s.title}</Link>)}
        </div>
        <div className="space-y-2 text-sm">
          <p className="mb-3 font-semibold text-primary">Visit</p>
          <p>{clinic.address}</p><p>{clinic.phone}</p><p>{clinic.hours}</p>
        </div>
      </div>
      <div className="mt-12 border-t border-ink-foreground/10 pt-6 text-center">
        <p className="text-xs text-ink-foreground/60">© {new Date().getFullYear()} {clinic.name}. All rights reserved.</p>
        <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-ink-foreground/50">
          Made with <Heart size={12} className="text-primary" fill="currentColor" aria-hidden="true" /> by{" "}
          <span className="font-semibold text-ink-foreground/80">Nutrena</span>
        </p>
      </div>
    </footer>
  );
}

export function FloatingButtons() {
  return (
    <div className="fixed right-5 bottom-5 z-50 flex flex-col gap-3">
      <a href={`tel:${clinic.phoneRaw}`} aria-label={`Call ${clinic.phone}`} className="rounded-full bg-ink p-4 text-ink-foreground shadow-soft transition-transform hover:scale-110"><Phone size={22} aria-hidden="true" /></a>
      <a href={whatsappLink("Hi, I'd like to book an appointment.")} target="_blank" rel="noopener" aria-label="Chat on WhatsApp (opens in new tab)" className="rounded-full bg-whatsapp p-4 text-primary-foreground shadow-soft transition-transform hover:scale-110"><MessageCircle size={22} aria-hidden="true" /></a>
    </div>
  );
}

/** Lightweight YouTube facade: shows a thumbnail and only loads the player when clicked. */
export function VideoCard({ v, delay = 0 }: { v: VideoTestimonial; delay?: number }) {
  const [play, setPlay] = useState(false);
  return (
    <figure className="reveal group overflow-hidden rounded-2xl bg-ink shadow-card" style={d(delay)}>
      <div className="relative aspect-[9/16] w-full">
        {play ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0&playsinline=1`}
            title={`${v.name} — ${v.treatment} testimonial`}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button onClick={() => setPlay(true)} aria-label={`Play testimonial from ${v.name} about ${v.treatment}`} className="absolute inset-0 h-full w-full">
            <img src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt="" loading="lazy" width={480} height={360} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" aria-hidden="true" />
            <span className="absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-soft transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
              <Play size={26} fill="currentColor" className="ml-1" />
            </span>
          </button>
        )}
      </div>
      <figcaption className="p-4 text-ink-foreground">
        <p className="font-semibold">{v.name}</p>
        <p className="text-sm text-primary">{v.treatment}</p>
      </figcaption>
    </figure>
  );
}
