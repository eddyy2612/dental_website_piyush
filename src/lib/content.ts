import clinicImg from "@/assets/clinic.jpg";
import careImg from "@/assets/care.jpg";
import smileImg from "@/assets/smile.jpg";
import techImg from "@/assets/tech.jpg";
import alignersImg from "@/assets/aligners.jpg";
import loungeImg from "@/assets/lounge.jpg";

export const images = { clinicImg, careImg, smileImg, techImg, alignersImg, loungeImg };

export type Service = {
  slug: string;
  title: string;
  short: string;
  img: string;
  intro: string[];
  benefits: string[];
  tech: { t: string; d: string }[];
  faqs: [string, string][];
};

export const services: Service[] = [
  {
    slug: "dental-implants", title: "Dental Implants", img: techImg,
    short: "Permanent tooth replacement with strong, long-lasting implants.",
    intro: [
      "Restore your smile and confidence with advanced dental implants. We use computer-guided implant surgery and digital planning to deliver safe, precise and long-lasting results.",
      "Every implant procedure is performed in a fully sterilised, modern and patient-friendly environment, ensuring comfort and safety at every step.",
    ],
    benefits: ["Permanent replacement for missing teeth", "Looks, feels and functions like natural teeth", "Improves chewing, speech and facial appearance", "Prevents bone loss and supports jaw health", "Long-term and reliable solution"],
    tech: [
      { t: "Computer-Guided Surgery", d: "Highly accurate implant placement with minimal discomfort and faster healing." },
      { t: "Digital Implant Planning", d: "3D imaging and digital scans allow precise planning before surgery." },
      { t: "Same-Day Implants", d: "In selected cases, teeth can be placed on implants the same day." },
      { t: "Full Mouth Rehabilitation", d: "Complete smile restoration for multiple or all missing teeth." },
    ],
    faqs: [
      ["Who is a good candidate for dental implants?", "Most people missing one, several or all teeth can be candidates. Your dentist will assess bone and gum health during consultation."],
      ["Do dental implants last?", "Implants don't decay, but gum health is vital. Good home care and regular check-ups help them last for many years."],
      ["Is implant surgery painful?", "The procedure is done under local anaesthesia. Most patients report mild discomfort that settles within a few days."],
    ],
  },
  {
    slug: "invisalign-aligners", title: "Invisalign Aligners", img: alignersImg,
    short: "Invisible braces. Confident smiles.",
    intro: [
      "Straighten your teeth discreetly with clear aligners. Custom-made, removable trays gently move your teeth into place — without metal wires or brackets.",
      "Your entire treatment is planned digitally, so you can preview your new smile before you begin.",
    ],
    benefits: ["Virtually invisible", "Removable for eating and brushing", "Comfortable, smooth plastic", "Fewer clinic visits", "Digital preview of results"],
    tech: [
      { t: "3D Intraoral Scanning", d: "No messy impressions — a quick digital scan captures your teeth." },
      { t: "ClinCheck Planning", d: "See each stage of your tooth movement before treatment starts." },
      { t: "SmartTrack Material", d: "Flexible aligner material for comfortable, controlled movement." },
      { t: "Progress Monitoring", d: "Regular reviews keep your treatment precisely on track." },
    ],
    faqs: [
      ["How long does aligner treatment take?", "It depends on your case — simple cases can take a few months, complex ones longer. You'll get an estimate after your scan."],
      ["How many hours a day do I wear them?", "Around 20–22 hours a day, removing them only to eat, drink anything other than water, and clean your teeth."],
      ["Are aligners suitable for teenagers?", "Yes, aligners work well for teens with good compliance."],
    ],
  },
  {
    slug: "dental-veneers", title: "Dental Veneers", img: smileImg,
    short: "Ultra-thin, natural-looking veneers for an instant smile upgrade.",
    intro: [
      "Porcelain veneers are thin, custom shells bonded to the front of your teeth to correct chips, gaps, stains and uneven shapes.",
      "Combined with digital smile design, veneers are planned to suit your face, lips and personality.",
    ],
    benefits: ["Natural, stain-resistant finish", "Corrects shape, size and colour", "Minimal tooth preparation", "Long-lasting results", "Digitally designed smile"],
    tech: [
      { t: "Digital Smile Design", d: "Preview and approve your new smile before treatment." },
      { t: "Mock-up Trial", d: "Try your planned smile in the mouth before final veneers." },
      { t: "E-max Porcelain", d: "High-strength ceramic with lifelike translucency." },
      { t: "Adhesive Bonding", d: "Modern bonding for a secure, durable fit." },
    ],
    faqs: [
      ["Do veneers damage natural teeth?", "Only a very thin layer of enamel is usually reshaped. Your dentist will explain what's needed for your case."],
      ["How long do veneers last?", "With good care, porcelain veneers can last many years."],
      ["Will veneers look fake?", "Custom-designed veneers are shaded and shaped to look natural."],
    ],
  },
  {
    slug: "teeth-whitening", title: "Teeth Whitening", img: smileImg,
    short: "Safe, in-clinic whitening for a brighter smile.",
    intro: [
      "Professional teeth whitening lifts stains caused by tea, coffee, ageing and lifestyle — safely and under supervision.",
      "In-clinic whitening gives visible results in a single sitting, with take-home options for maintenance.",
    ],
    benefits: ["Visible results in one visit", "Supervised and safe", "Gum protection during treatment", "Custom take-home kits", "Boosts confidence"],
    tech: [
      { t: "Zoom Whitening", d: "Light-activated whitening for fast results." },
      { t: "Gum Barrier", d: "Protects soft tissues throughout the procedure." },
      { t: "Desensitising Care", d: "Reduces sensitivity during and after whitening." },
      { t: "Custom Trays", d: "Tailored trays for comfortable at-home touch-ups." },
    ],
    faqs: [
      ["Is whitening safe?", "Professional whitening under dental supervision is considered safe for most people."],
      ["Will my teeth be sensitive?", "Some temporary sensitivity is common and usually settles within a day or two."],
      ["How long do results last?", "Results vary with diet and habits; touch-ups help maintain brightness."],
    ],
  },
  {
    slug: "root-canal-treatment", title: "Root Canal Treatment", img: careImg,
    short: "Gentle, precise treatment to save painful teeth.",
    intro: [
      "Root canal treatment removes infected pulp from inside the tooth, relieving pain and saving your natural tooth.",
      "With rotary instruments and digital X-rays, treatment is faster and more comfortable than ever.",
    ],
    benefits: ["Relieves tooth pain", "Saves your natural tooth", "Prevents spread of infection", "Often completed in one or two visits", "Restores normal chewing"],
    tech: [
      { t: "Rotary Endodontics", d: "Efficient canal cleaning with precise instruments." },
      { t: "Digital Radiography", d: "Low-radiation X-rays for accurate diagnosis." },
      { t: "Apex Locator", d: "Measures canal length precisely." },
      { t: "Single-Visit RCT", d: "Available for suitable cases." },
    ],
    faqs: [
      ["Is a root canal painful?", "Modern anaesthesia makes it comparable to getting a filling."],
      ["Do I need a crown after RCT?", "Back teeth usually need a crown to protect them after treatment."],
      ["How do I know if I need one?", "Lingering sensitivity, severe pain or swelling are common signs — a check-up will confirm."],
    ],
  },
  {
    slug: "crowns-and-bridges", title: "Crowns & Bridges", img: techImg,
    short: "Custom crowns and bridges for strength and beauty.",
    intro: [
      "Crowns restore damaged teeth while bridges replace missing ones. Both are custom-made to match your natural teeth.",
      "With CAD/CAM technology, restorations are designed precisely for an accurate, comfortable fit.",
    ],
    benefits: ["Restores strength and function", "Natural tooth-coloured materials", "Replaces missing teeth", "Precise digital fit", "Durable and long-lasting"],
    tech: [
      { t: "CAD/CAM Design", d: "Digitally designed and milled restorations." },
      { t: "Zirconia Crowns", d: "Strong, metal-free and natural-looking." },
      { t: "Digital Shade Matching", d: "Matches the exact colour of your teeth." },
      { t: "Same-Day Options", d: "Available for selected cases." },
    ],
    faqs: [
      ["How long do crowns last?", "With good care, crowns can last many years."],
      ["Bridge or implant?", "It depends on the neighbouring teeth and bone. Your dentist will explain both options."],
      ["Does getting a crown hurt?", "It's done under local anaesthesia and is usually comfortable."],
    ],
  },
  {
    slug: "orthodontics", title: "Orthodontics", img: alignersImg,
    short: "Braces and aligners for perfectly aligned smiles.",
    intro: [
      "Orthodontic treatment corrects crooked, crowded or spaced teeth and bite problems for children and adults.",
      "Choose from metal, ceramic or clear aligner options based on your needs and lifestyle.",
    ],
    benefits: ["Straighter, healthier teeth", "Improved bite and chewing", "Easier cleaning", "Options for all ages", "Boosted confidence"],
    tech: [
      { t: "Metal Braces", d: "Reliable and cost-effective." },
      { t: "Ceramic Braces", d: "Tooth-coloured brackets for a subtle look." },
      { t: "Clear Aligners", d: "Removable, nearly invisible trays." },
      { t: "Digital Records", d: "Scans and photos for precise planning." },
    ],
    faqs: [
      ["What's the right age for braces?", "An orthodontic check around age 7 is helpful, but adults can be treated at any age."],
      ["How long will braces take?", "Typically 12–24 months, depending on the case."],
      ["Do braces hurt?", "Mild soreness after adjustments is normal and short-lived."],
    ],
  },
  {
    slug: "pediatric-dentistry", title: "Pediatric Dentistry", img: careImg,
    short: "Gentle, friendly dental care for children.",
    intro: [
      "We help children build healthy habits and positive feelings about the dentist from an early age.",
      "From first check-ups to preventive treatments, care is gentle, playful and reassuring.",
    ],
    benefits: ["Child-friendly environment", "Preventive sealants and fluoride", "Early problem detection", "Habit guidance for parents", "Gentle, patient approach"],
    tech: [
      { t: "Fissure Sealants", d: "Protects grooves in back teeth from cavities." },
      { t: "Fluoride Therapy", d: "Strengthens developing enamel." },
      { t: "Space Maintainers", d: "Keeps space for permanent teeth." },
      { t: "Behaviour Management", d: "Calm techniques for anxious children." },
    ],
    faqs: [
      ["When should my child first see a dentist?", "By their first birthday or when the first tooth appears."],
      ["Are milk teeth important?", "Yes — they guide permanent teeth and support speech and eating."],
      ["How can I prevent cavities?", "Limit sugary snacks, brush twice daily and keep regular check-ups."],
    ],
  },
  {
    slug: "oral-surgery", title: "Oral Surgery", img: clinicImg,
    short: "Safe, comfortable surgical care including wisdom teeth.",
    intro: [
      "From wisdom tooth removal to minor oral surgeries, procedures are carefully planned and performed with your comfort in mind.",
      "Strict sterilisation and clear aftercare guidance support smooth healing.",
    ],
    benefits: ["Relief from pain and infection", "Careful surgical planning", "Sterile, modern setup", "Clear aftercare guidance", "Faster recovery"],
    tech: [
      { t: "Digital X-rays & CBCT", d: "Detailed imaging for safe planning." },
      { t: "Atraumatic Extraction", d: "Preserves bone and soft tissue." },
      { t: "Bone Grafting", d: "Prepares sites for future implants." },
      { t: "Pain Management", d: "Effective anaesthesia and aftercare." },
    ],
    faqs: [
      ["Do wisdom teeth always need removal?", "Not always — only if they cause pain, infection or crowding."],
      ["How long is recovery?", "Most people resume normal activity within a few days."],
      ["Will I be awake?", "Most procedures use local anaesthesia; you'll be comfortable and numb."],
    ],
  },
  {
    slug: "composite-filling", title: "Composite Filling", img: smileImg,
    short: "Tooth-coloured fillings that blend in naturally.",
    intro: [
      "Composite fillings repair cavities and chips with a tooth-coloured material that bonds directly to your tooth.",
      "They're shaded to match your teeth, so repairs are virtually invisible.",
    ],
    benefits: ["Natural appearance", "Bonds to tooth structure", "Conservative preparation", "Mercury-free", "Completed in one visit"],
    tech: [
      { t: "Nano-Hybrid Composites", d: "Strong and polishable for a natural finish." },
      { t: "Rubber Dam Isolation", d: "Keeps the tooth clean and dry for a better bond." },
      { t: "Shade Matching", d: "Blends seamlessly with your teeth." },
      { t: "LED Curing", d: "Fast, thorough setting of material." },
    ],
    faqs: [
      ["How long do composite fillings last?", "Many last several years with good care."],
      ["Can old silver fillings be replaced?", "Yes, if appropriate — your dentist will advise."],
      ["Is it painful?", "Usually comfortable, with anaesthesia if needed."],
    ],
  },
  {
    slug: "smile-makeover", title: "Smile Makeover", img: smileImg,
    short: "Digitally planned transformations for a confident smile.",
    intro: [
      "A smile makeover combines treatments — veneers, whitening, aligners, gum contouring — into one personalised plan.",
      "Using digital smile design, you can see and refine your new smile before we begin.",
    ],
    benefits: ["Fully personalised plan", "Preview before treatment", "Harmonises with facial features", "Combines multiple treatments", "Life-changing confidence"],
    tech: [
      { t: "Digital Smile Design", d: "Plan your smile with photos and video." },
      { t: "3D Mock-ups", d: "Try-in previews of your future smile." },
      { t: "Gum Contouring", d: "Balances the frame of your smile." },
      { t: "Ceramic Artistry", d: "Lifelike veneers and crowns." },
    ],
    faqs: [
      ["How long does a makeover take?", "From a few visits to a few months, depending on treatments involved."],
      ["Can I see results first?", "Yes, digital design and mock-ups let you preview the outcome."],
      ["Is it only cosmetic?", "Many makeovers also improve bite and function."],
    ],
  },
  {
    slug: "cosmetic-dentistry", title: "Cosmetic Dentistry", img: loungeImg,
    short: "Aesthetic treatments to refine and enhance your smile.",
    intro: [
      "Cosmetic dentistry focuses on improving the appearance of your teeth, gums and smile.",
      "Treatments are chosen to look natural and suit you — never overdone.",
    ],
    benefits: ["Brighter, more even smile", "Natural-looking results", "Minimally invasive options", "Tailored to your face", "Improved self-confidence"],
    tech: [
      { t: "Bonding", d: "Quick fixes for chips and gaps." },
      { t: "Veneers", d: "Transform shape and colour." },
      { t: "Whitening", d: "Lift stains safely." },
      { t: "Gum Aesthetics", d: "Reshape uneven gum lines." },
    ],
    faqs: [
      ["Which treatment is right for me?", "A consultation helps match options to your goals and budget."],
      ["Are results permanent?", "Some are long-lasting; others need occasional maintenance."],
      ["Is cosmetic treatment safe?", "Yes, when planned and performed by a qualified dentist."],
    ],
  },
];

export type Post = { slug: string; title: string; excerpt: string; img: string; date: string; body: { h?: string; p?: string; list?: string[] }[] };

export const posts: Post[] = [
  {
    slug: "signs-of-gum-disease-you-shouldnt-ignore", title: "Signs of Gum Disease You Shouldn't Ignore", img: careImg, date: "2026-10-12",
    excerpt: "Bleeding gums aren't normal. Here are the early warning signs and what to do about them.",
    body: [
      { p: "Gum disease often starts quietly. Many people notice a little blood when brushing and ignore it — but that's often the first sign." },
      { h: "Early warning signs", list: ["Bleeding while brushing or flossing", "Red, swollen or tender gums", "Persistent bad breath", "Gums pulling away from teeth", "Loose or shifting teeth"] },
      { h: "Why it matters", p: "Untreated gum disease can lead to bone loss and tooth loss, and has links with general health conditions." },
      { h: "What to do", p: "Book a check-up and professional cleaning. Early gum disease is usually reversible with good care." },
    ],
  },
  {
    slug: "root-canal-or-filling", title: "How Do I Know If My Tooth Needs a Root Canal or a Filling?", img: techImg, date: "2026-10-02",
    excerpt: "Tooth pain can mean different things. Learn the difference between needing a filling and a root canal.",
    body: [
      { p: "A sudden ache when you bite or sip something cold can be worrying. The right treatment depends on how deep the damage goes." },
      { h: "When a filling is enough", list: ["Short, sharp sensitivity that fades quickly", "Small visible cavity", "No swelling"] },
      { h: "When you may need a root canal", list: ["Lingering pain after hot or cold", "Severe or throbbing pain", "Swelling or a pimple on the gum", "Tooth darkening"] },
      { p: "Only an examination and X-ray can confirm — so don't wait for pain to get worse." },
    ],
  },
  {
    slug: "braces-vs-invisalign", title: "Braces vs Invisalign in 2026", img: alignersImg, date: "2026-09-20",
    excerpt: "Comparing cost, comfort, treatment time and results to help you choose.",
    body: [
      { p: "Both braces and aligners can deliver excellent results. The best choice depends on your case and lifestyle." },
      { h: "Braces", list: ["Fixed — no compliance worries", "Handle complex movements well", "Generally more affordable"] },
      { h: "Invisalign", list: ["Nearly invisible", "Removable for eating and cleaning", "Fewer emergency visits"] },
      { p: "A consultation with a digital scan is the best way to know which option suits you." },
    ],
  },
  {
    slug: "prevent-cavities-in-kids", title: "How to Prevent Cavities in Kids' Teeth", img: smileImg, date: "2026-09-05",
    excerpt: "Simple daily habits that keep your child's teeth healthy and cavity-free.",
    body: [
      { p: "Cavities are one of the most common childhood conditions — and among the most preventable." },
      { h: "Daily habits", list: ["Brush twice a day with age-appropriate fluoride toothpaste", "Limit sugary drinks and sticky snacks", "Avoid bedtime milk bottles", "Encourage water between meals"] },
      { h: "At the clinic", p: "Sealants and fluoride varnish add extra protection. Regular check-ups catch problems early." },
    ],
  },
  {
    slug: "dental-implants-everything-you-need-to-know", title: "Dental Implants: Everything You Need to Know", img: clinicImg, date: "2026-08-22",
    excerpt: "From planning to aftercare — a clear guide to dental implant treatment.",
    body: [
      { p: "Dental implants are the closest replacement to a natural tooth. Here's what the journey looks like." },
      { h: "The process", list: ["Consultation and 3D scan", "Implant placement", "Healing period", "Final crown placement"] },
      { h: "Aftercare", p: "Brush and floss as you would natural teeth, and keep regular hygiene visits." },
    ],
  },
  {
    slug: "safe-teeth-whitening", title: "Safe Teeth Whitening That Won't Hurt", img: loungeImg, date: "2026-08-10",
    excerpt: "Why professional whitening is safer and more effective than DIY hacks.",
    body: [
      { p: "Social media is full of whitening hacks — many of which can damage enamel." },
      { h: "Why go professional", list: ["Controlled, tested whitening agents", "Gum protection", "Sensitivity management", "Predictable results"] },
      { p: "Ask your dentist which option suits your teeth and goals." },
    ],
  },
];

// YouTube testimonials — replace `id` with your own YouTube Short / video IDs
// (the part after youtube.com/shorts/ or watch?v=). Sample clips from other clinics for now.
export type VideoTestimonial = { id: string; name: string; treatment: string };
export const videoTestimonials: VideoTestimonial[] = [
  { id: "aQsp3dCPcP4", name: "Sample Patient 1", treatment: "Dental Implants" },
  { id: "OTjf-M9lQic", name: "Sample Patient 2", treatment: "Root Canal" },
  { id: "C53rE-IiY7I", name: "Sample Patient 3", treatment: "Smile Makeover" },
  { id: "rmY05RiAbDE", name: "Sample Patient 4", treatment: "Teeth Whitening" },
  { id: "qN7HPbijIKk", name: "Sample Patient 5", treatment: "Full Mouth Implants" },
  { id: "r4jFRP_utYY", name: "Sample Patient 6", treatment: "General Dentistry" },
  { id: "-WU0265FI1I", name: "Sample Patient 7", treatment: "Smile Transformation" },
  { id: "6eJjF8klYoc", name: "Sample Patient 8", treatment: "Jaw Pain Relief" },
];
