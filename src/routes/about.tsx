import { createFileRoute } from "@tanstack/react-router";
import { Award, GraduationCap, Trophy, CheckCircle2 } from "lucide-react";
import dentistImg from "@/assets/dentist.jpg";
import { clinic } from "@/lib/clinic";
import { images } from "@/lib/content";
import { PageHero, Shell, Title, ContactCard, CtaBand, d } from "@/components/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About Us — ${clinic.name}` },
      { name: "description", content: `Meet the team at ${clinic.name}: our philosophy, our dentist's qualifications, experience and recognitions.` },
      { property: "og:title", content: `About ${clinic.name}` },
      { property: "og:description", content: "Patient-centric dental care with advanced technology and strict sterilisation." },
    ],
  }),
  component: About,
});

const qualifications = ["[Degree] – [Institution] ([Years])", "[Degree] – [Institution] ([Years])", "[Specialisation] – [Institution] ([Years])", "[Certification] – [Institution] ([Years])"];
const awards = [
  { tag: "[Award type]", t: "[Award title]", d: "[Short description of the recognition]", by: "[Awarding body – Year]" },
  { tag: "[Award type]", t: "[Award title]", d: "[Short description of the recognition]", by: "[Awarding body – Year]" },
  { tag: "[Award type]", t: "[Award title]", d: "[Short description of the recognition]", by: "[Awarding body – Year]" },
];
const values = ["Patient-centric values", "Transparent treatment plans", "Advanced technology", "Strict sterilisation protocols", "Care for all ages", "Warm, welcoming environment"];

function About() {
  return (
    <>
      <PageHero title={<>About <span className="text-ink">Us</span></>} crumb={[{ l: "About Us" }]} />
      <Shell>
        <section className="px-5 py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[3fr_2fr]">
            <div className="reveal space-y-4 text-muted-foreground">
              <h2 className="text-3xl font-semibold text-foreground md:text-4xl">About <span className="text-gold">{clinic.name}</span></h2>
              <p>Welcome to <b className="text-foreground">{clinic.name}</b>. We are committed to offering a dental care experience like no other. With patient-centric values, we strive to make every treatment simple, hassle-free and holistic.</p>
              <p>Our services include preventive care, cosmetic dentistry, orthodontics, dental implants, root canal treatments and smile makeovers — all performed using advanced technology and strict sterilisation protocols.</p>
              <p>Our skilled team provides personalised treatment in a warm and welcoming environment, ensuring comfort, transparency and exceptional care for patients of all ages.</p>
              <div className="grid gap-3 pt-4 sm:grid-cols-2">
                {values.map((v) => <p key={v} className="flex items-center gap-2 text-foreground"><CheckCircle2 size={18} className="text-accent-strong" />{v}</p>)}
              </div>
            </div>
            <div className="reveal space-y-6" style={d(120)}>
              <ContactCard />
              <img src={images.loungeImg} alt="Clinic lounge" width={600} height={340} loading="lazy" className="aspect-video w-full rounded-2xl object-cover shadow-card" />
            </div>
          </div>
        </section>

        <section className="bg-secondary px-5 py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[2fr_3fr]">
            <div className="reveal sticky top-28 overflow-hidden rounded-3xl shadow-soft">
              <img src={dentistImg} alt={clinic.dentist} width={800} height={1000} loading="lazy" className="aspect-[4/5] w-full object-cover object-top" />
            </div>
            <div className="reveal space-y-6" style={d(120)}>
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent-strong">Meet the Doctor</p>
                <h2 className="mt-3 text-3xl font-semibold md:text-5xl">{clinic.dentist}</h2>
                <p className="mt-2 text-accent-strong">{clinic.qualifications}</p>
              </div>
              <p className="text-muted-foreground">[Short professional biography — specialisations, areas of interest and care philosophy. Replace with verified details.]</p>
              <div className="rounded-2xl bg-card p-6 shadow-card">
                <h3 className="flex items-center gap-2 text-lg font-semibold"><GraduationCap className="text-accent-strong" /> Academic Qualifications</h3>
                <ul className="mt-4 space-y-2 text-muted-foreground">{qualifications.map((q, i) => <li key={i} className="flex gap-2"><span className="text-accent-strong">•</span>{q}</li>)}</ul>
              </div>
              <div className="rounded-2xl bg-card p-6 shadow-card">
                <h3 className="flex items-center gap-2 text-lg font-semibold"><Award className="text-accent-strong" /> Professional Experience</h3>
                <p className="mt-3 text-muted-foreground">[Years of experience and areas of clinical expertise.]</p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-20 md:py-28">
          <Title a="Awards &" b="Recognition" />
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
            {awards.map((a, i) => (
              <div key={i} className="reveal rounded-2xl border border-border bg-card p-6 shadow-card transition-transform duration-500 hover:-translate-y-1" style={d(i * 100)}>
                <span className="inline-flex rounded-xl bg-gold p-3 text-primary-foreground"><Trophy size={22} /></span>
                <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-accent-strong">{a.tag}</p>
                <h3 className="mt-1 text-lg font-semibold">{a.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{a.d}</p>
                <p className="mt-3 text-xs text-muted-foreground">{a.by}</p>
              </div>
            ))}
          </div>
        </section>
        <CtaBand />
      </Shell>
    </>
  );
}
