import { createFileRoute } from "@tanstack/react-router";
import { Landmark, Church, Palette, BadgeIndianRupee, Gem, Zap, Plane, Map, Award, ShieldCheck, Cpu, MapPin, Languages, Sparkles, CheckCircle2 } from "lucide-react";
import cityImg from "@/assets/city.jpg";
import { clinic } from "@/lib/clinic";
import { images } from "@/lib/content";
import { PageHero, Shell, Title, CtaBand, d } from "@/components/site";

export const Route = createFileRoute("/dental-tourism")({
  head: () => ({
    meta: [
      { title: `Dental Tourism in India — ${clinic.name}` },
      { name: "description", content: "World-class dental treatment at a fraction of the cost. Plan your dental vacation in 7 simple steps." },
      { property: "og:title", content: `Dental Tourism — ${clinic.name}` },
      { property: "og:description", content: "Premium, affordable dental care combined with an unforgettable trip to India." },
    ],
  }),
  component: Tourism,
});

const discover = [
  { i: Landmark, t: "UNESCO Heritage Sites", d: "Marvel at Red Fort, Qutub Minar, Humayun's Tomb and India Gate." },
  { i: Church, t: "Sacred Sanctuaries", d: "Visit Lotus Temple, Akshardham and Jama Masjid." },
  { i: Palette, t: "Vibrant Culture", d: "Bustling markets, cuisine, museums and entertainment." },
];
const benefits = [
  { i: BadgeIndianRupee, t: "Low Cost", d: "Treatment, stay and travel often cost less than treatment alone elsewhere." },
  { i: Gem, t: "High Quality", d: "Internationally trained dentists using advanced technology." },
  { i: Zap, t: "Prompt Service", d: "Swift consultations planned around your travel time." },
  { i: Plane, t: "Great Convenience", d: "Coordinated stay and treatment planning for overseas patients." },
  { i: Map, t: "Travel Opportunities", d: "Combine advanced care with unforgettable sightseeing." },
];
const costs = [
  ["Dental Implant", "[₹ / $]", "[$]", "[$]"],
  ["Root Canal", "[₹ / $]", "[$]", "[$]"],
  ["Crowns", "[₹ / $]", "[$]", "[$]"],
  ["Veneers", "[₹ / $]", "[$]", "[$]"],
  ["Teeth Whitening", "[₹ / $]", "[$]", "[$]"],
];
const steps = [
  ["Initial Consultation from Home", "Share X-rays, photographs and medical reports by email."],
  ["Preliminary Diagnosis & Plan", "Receive a provisional plan and estimated costs before travel."],
  ["Scheduling & Assistance", "Plan appointments and get help with visa, stay and sightseeing."],
  ["Arrival", "A thorough in-person evaluation is conducted before procedures begin."],
  ["Dental Treatment", "Procedures carried out according to your customised plan."],
  ["Leisure & Sightseeing", "Enjoy landmarks and attractions between appointments."],
  ["Return Home", "Travel back with a confident smile and follow-up support."],
];
const whyUs = [
  { i: Award, t: "Experienced Team", d: "[Replace with verified recognitions]" },
  { i: ShieldCheck, t: "International Standards", d: "Strict sterilisation protocols" },
  { i: Cpu, t: "Advanced Technology", d: "Modern equipment and digital dentistry" },
  { i: MapPin, t: "Prime Location", d: "Well connected and close to landmarks" },
  { i: Languages, t: "Language Support", d: "English-speaking team" },
  { i: Sparkles, t: "Affordable Excellence", d: "World-class care at competitive costs" },
];

function Tourism() {
  return (
    <>
      <PageHero title={<>Dental <span className="text-ink">Tourism</span></>} sub="World-class dental care, paired with an unforgettable journey." crumb={[{ l: "Dental Tourism" }]} />
      <Shell>
        <section className="px-5 py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
            <div className="reveal space-y-4 text-muted-foreground">
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent-strong">Healthcare excellence & cultural richness</p>
              <h2 className="text-3xl font-semibold text-foreground md:text-5xl">Discover <span className="text-gold">Delhi NCR</span></h2>
              <p>Steeped in centuries of history, the region bears the imprint of powerful empires — grand monuments and storied streets that still echo their legacy.</p>
              <p>With modern infrastructure and excellent connectivity, it remains one of the most visited and beloved destinations in India.</p>
            </div>
            <img src={cityImg} alt="India Gate at sunset" width={1600} height={912} loading="lazy" className="reveal aspect-[16/10] w-full rounded-2xl object-cover shadow-soft" />
          </div>
          <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-3">
            {discover.map(({ i: Icon, t, d: desc }, k) => (
              <div key={t} className="reveal rounded-2xl bg-card p-6 shadow-card" style={d(k * 100)}>
                <Icon className="text-accent-strong" /><h3 className="mt-3 font-semibold">{t}</h3><p className="mt-1 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-ink px-5 py-20 text-ink-foreground md:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
            <div className="reveal space-y-4 text-ink-foreground/85">
              <h2 className="text-3xl font-semibold text-ink-foreground md:text-4xl">Dental Tourism in <span className="text-gold">India</span></h2>
              <p>India is a premier destination for global medical tourism, known for advanced healthcare infrastructure, high clinical standards, skilled professionals and affordable treatment.</p>
              <p>Patients from across the world combine world-class dental expertise with significant cost savings.</p>
            </div>
            <div className="reveal space-y-4 text-ink-foreground/85" style={d(120)}>
              <h2 className="text-3xl font-semibold text-ink-foreground md:text-4xl">Your Premier <span className="text-gold">Destination</span></h2>
              <p>{clinic.name} welcomes patients worldwide, crafting individualised treatment plans that respect your needs and limited travel time.</p>
              <p>Treatments are discussed in advance and appointments meticulously scheduled for a seamless experience.</p>
            </div>
          </div>
        </section>

        <section className="px-5 py-20 md:py-28">
          <Title a="Benefits of Dental" b="Tourism" sub="Far beyond exceptional savings" />
          <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {benefits.map(({ i: Icon, t, d: desc }, k) => (
              <div key={t} className="reveal rounded-2xl border border-border bg-card p-6 text-center transition-transform duration-500 hover:-translate-y-1" style={d(k * 80)}>
                <span className="inline-flex rounded-xl bg-gold p-3 text-primary-foreground"><Icon size={22} /></span>
                <h3 className="mt-4 font-semibold">{t}</h3><p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-secondary px-5 py-20 md:py-28">
          <Title a="Cost" b="Comparison" sub="Indicative prices — replace with your clinic's figures" />
          <div className="reveal mx-auto max-w-4xl overflow-x-auto rounded-2xl bg-card shadow-card">
            <table className="w-full text-left text-sm">
              <thead className="bg-ink text-ink-foreground"><tr>{["Treatment", "India (Us)", "USA", "UK"].map((h) => <th key={h} className="px-5 py-4 font-semibold">{h}</th>)}</tr></thead>
              <tbody>{costs.map((r) => <tr key={r[0]} className="border-t border-border">{r.map((c, i) => <td key={i} className={`px-5 py-4 ${i === 0 ? "font-semibold" : i === 1 ? "text-accent-strong font-semibold" : "text-muted-foreground"}`}>{c}</td>)}</tr>)}</tbody>
            </table>
          </div>
        </section>

        <section className="px-5 py-20 md:py-28">
          <Title a="Planning Your Dental" b="Vacation" sub="7 simple steps" />
          <ol className="relative mx-auto max-w-3xl space-y-6 border-l border-accent/40 pl-8">
            {steps.map(([t, desc], i) => (
              <li key={t} className="reveal relative" style={d(i * 60)}>
                <span className="absolute -left-[3.05rem] flex h-9 w-9 items-center justify-center rounded-full bg-gold font-display font-semibold text-primary-foreground shadow-card">{i + 1}</span>
                <div className="rounded-2xl bg-card p-5 shadow-card"><h3 className="font-semibold">{t}</h3><p className="mt-1 text-sm text-muted-foreground">{desc}</p></div>
              </li>
            ))}
          </ol>
        </section>

        <section className="bg-secondary px-5 py-20 md:py-28">
          <Title a="Why" b={clinic.name + "?"} />
          <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyUs.map(({ i: Icon, t, d: desc }, k) => (
              <div key={t} className="reveal flex gap-4 rounded-2xl bg-card p-6 shadow-card" style={d(k * 70)}>
                <Icon className="shrink-0 text-accent-strong" /><div><h3 className="font-semibold">{t}</h3><p className="text-sm text-muted-foreground">{desc}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-5 py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
            <img src={images.loungeImg} alt="Clinic lounge" width={1600} height={912} loading="lazy" className="reveal aspect-[16/10] w-full rounded-2xl object-cover shadow-soft" />
            <div className="reveal" style={d(120)}>
              <h2 className="text-3xl font-semibold md:text-4xl">Visa & Travel <span className="text-gold">Information</span></h2>
              <p className="mt-3 text-muted-foreground">India offers an online e-Visa for tourism, business and medical visits — no embassy visit needed.</p>
              <ul className="mt-5 space-y-3">
                {["Citizens of many countries can apply online", "Approval is received by email", "Medical e-Visa available for treatment", "We help with stay and local travel planning"].map((x) => <li key={x} className="flex gap-2"><CheckCircle2 size={20} className="shrink-0 text-accent-strong" />{x}</li>)}
              </ul>
              <p className="mt-4 text-xs text-muted-foreground">Check the official Government of India e-Visa site for current eligibility.</p>
            </div>
          </div>
        </section>
        <CtaBand />
      </Shell>
    </>
  );
}
