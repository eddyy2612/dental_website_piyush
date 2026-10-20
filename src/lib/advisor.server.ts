/**
 * advisor.server.ts  –  Offline keyword-matching Smile Advisor
 *
 * No external API keys required. Responses are built from pre-trained
 * keyword rules that map patient concerns to services and blog posts
 * from content.ts. Out-of-scope questions fall back to a
 * "book a consultation" recommendation.
 */

import { services, posts } from "@/lib/content";

// ---------------------------------------------------------------------------
// Public types (kept identical so smile-advisor.tsx needs no changes)
// ---------------------------------------------------------------------------

export type AdvisorResult = {
  summary: string;
  urgent: boolean;
  treatments: { slug: string; title: string; reason: string }[];
  articles: { slug: string; title: string; why: string }[];
};

export type AdvisorResponse =
  | { ok: true; result: AdvisorResult }
  | { ok: false; error: string };

// ---------------------------------------------------------------------------
// Rule engine
// ---------------------------------------------------------------------------

type Rule = {
  keywords: string[];
  treatmentSlugs: string[];
  articleSlugs: string[];
  summary: string;
  treatmentReasons: Record<string, string>;
  articleWhys: Record<string, string>;
  urgent?: boolean;
};

const rules: Rule[] = [
  // ── GUMS / BLEEDING ──────────────────────────────────────────────────────
  {
    keywords: [
      "gum", "bleed", "bleeding", "swollen gum", "swollen gums",
      "red gum", "red gums", "tender gum", "tender gums",
      "gum disease", "periodont", "gingivit",
    ],
    treatmentSlugs: ["oral-surgery", "composite-filling"],
    articleSlugs: ["signs-of-gum-disease-you-shouldnt-ignore"],
    summary:
      "Bleeding or swollen gums may be an early sign of gum disease, which is very common and treatable. It could be caused by plaque build-up, brushing technique, or other factors. We recommend a professional check-up and cleaning — early gum disease is usually reversible with the right care. A dentist can assess the cause and recommend the best course of action for you.",
    treatmentReasons: {
      "oral-surgery": "For advanced gum conditions that require surgical management.",
      "composite-filling": "Cavities near the gum line are common when gums are inflamed.",
    },
    articleWhys: {
      "signs-of-gum-disease-you-shouldnt-ignore":
        "Explains the early warning signs of gum disease and what to do about bleeding gums.",
    },
  },

  // ── TOOTH PAIN / SENSITIVITY ─────────────────────────────────────────────
  {
    keywords: [
      "pain", "hurts", "ache", "aching", "sore", "sensitive", "sensitivity",
      "cold", "hot", "sharp pain", "throbbing", "toothache",
      "bite down", "bite", "chew", "chewing",
    ],
    treatmentSlugs: [
      "root-canal-treatment",
      "composite-filling",
      "crowns-and-bridges",
    ],
    articleSlugs: ["root-canal-or-filling"],
    summary:
      "Tooth pain or sensitivity can range from a minor cavity to deeper issues inside the tooth. Sharp pain that fades quickly often suggests a cavity, while lingering or throbbing pain may indicate the nerve is affected. Either way, it is important not to leave it — an examination and X-ray can confirm the exact cause and the right treatment for you.",
    treatmentReasons: {
      "root-canal-treatment":
        "If the pain is deep or persistent, root canal treatment may be needed to save the tooth.",
      "composite-filling":
        "A tooth-coloured filling may be all that is needed if the damage is limited to the outer layers.",
      "crowns-and-bridges":
        "A crown may be recommended to protect and restore a badly damaged or treated tooth.",
    },
    articleWhys: {
      "root-canal-or-filling":
        "Helps you understand when sensitivity signals a simple filling versus a root canal.",
    },
  },

  // ── SEVERE PAIN / SWELLING / EMERGENCY ───────────────────────────────────
  {
    keywords: [
      "severe pain", "unbearable", "swelling", "swollen face",
      "swollen jaw", "jaw swelling", "facial swelling",
      "fever", "pus", "abscess", "infection", "uncontrolled bleeding",
      "trauma", "knocked out", "broken tooth", "emergency", "urgent",
    ],
    treatmentSlugs: ["root-canal-treatment", "oral-surgery"],
    articleSlugs: ["root-canal-or-filling"],
    summary:
      "This sounds like it may need prompt attention. Severe pain, facial swelling, fever, or a knocked-out tooth are dental emergencies. Please call or WhatsApp the clinic right away rather than waiting for an appointment. In the meantime, do not take aspirin near the affected area, and keep any knocked-out tooth moist.",
    urgent: true,
    treatmentReasons: {
      "root-canal-treatment":
        "Root canal treatment can relieve severe infection or nerve pain quickly.",
      "oral-surgery":
        "Surgical drainage or extraction may be needed for abscesses or badly damaged teeth.",
    },
    articleWhys: {
      "root-canal-or-filling":
        "Covers when pain signals something that needs urgent root canal care.",
    },
  },

  // ── MISSING TOOTH ────────────────────────────────────────────────────────
  {
    keywords: [
      "missing tooth", "missing teeth", "lost tooth", "lost teeth",
      "gap", "space", "replace tooth", "replace teeth",
      "tooth replacement", "teeth replacement",
    ],
    treatmentSlugs: ["dental-implants", "crowns-and-bridges", "smile-makeover"],
    articleSlugs: ["dental-implants-everything-you-need-to-know"],
    summary:
      "A missing tooth can affect your appearance, confidence, and even your bite over time. The two main options are dental implants — which act like natural teeth — and bridges, which use neighbouring teeth as supports. The best choice depends on your bone health and overall dental condition, which we can assess at a consultation.",
    treatmentReasons: {
      "dental-implants":
        "Implants are the closest long-term replacement for a natural tooth.",
      "crowns-and-bridges":
        "Bridges are a good option when implants are not suitable or you want a quicker solution.",
      "smile-makeover":
        "If multiple teeth are missing, a full smile makeover plan may be the ideal approach.",
    },
    articleWhys: {
      "dental-implants-everything-you-need-to-know":
        "A clear guide to the implant process from consultation to final crown.",
    },
  },

  // ── CROOKED / MISALIGNED TEETH ───────────────────────────────────────────
  {
    keywords: [
      "crooked", "misaligned", "crowded", "crowding", "overlap",
      "overlapping", "spacing", "spaced", "gap between", "space between",
      "protruding", "overbite", "underbite", "open bite", "cross bite",
      "orthodont", "brace", "braces", "aligner",
    ],
    treatmentSlugs: ["invisalign-aligners", "orthodontics"],
    articleSlugs: ["braces-vs-invisalign"],
    summary:
      "Crooked, crowded, or spaced teeth can be corrected with braces or clear aligners. Clear aligners like Invisalign are nearly invisible and removable, while traditional braces handle more complex cases. The right option depends on your specific tooth movements needed, lifestyle, and budget — a consultation with a digital scan will give you a clear picture.",
    treatmentReasons: {
      "invisalign-aligners":
        "Virtually invisible removable aligners — a popular choice for adults and teens.",
      "orthodontics":
        "Traditional or ceramic braces are reliable for a wide range of alignment problems.",
    },
    articleWhys: {
      "braces-vs-invisalign":
        "Compares both options across cost, comfort, and results to help you decide.",
    },
  },

  // ── TEETH WHITENING / STAINS ─────────────────────────────────────────────
  {
    keywords: [
      "white", "whiten", "whitening", "stain", "stained", "stains",
      "yellow", "yellowing", "discolour", "discolored", "dull teeth",
      "coffee stain", "tea stain", "bright", "brighter",
    ],
    treatmentSlugs: ["teeth-whitening", "cosmetic-dentistry"],
    articleSlugs: ["safe-teeth-whitening"],
    summary:
      "Tooth staining is very common and can be caused by tea, coffee, red wine, or simply ageing. Professional whitening is safe, effective, and produces visible results — often in a single session. It is important to get a check-up first to make sure your teeth and gums are healthy before whitening. We can also advise on take-home kits for long-term maintenance.",
    treatmentReasons: {
      "teeth-whitening":
        "In-clinic professional whitening gives fast, controlled, supervised results.",
      "cosmetic-dentistry":
        "Cosmetic treatments like bonding or veneers may help if staining is within the tooth.",
    },
    articleWhys: {
      "safe-teeth-whitening":
        "Explains why professional whitening is safer and more effective than home hacks.",
    },
  },

  // ── VENEERS / CHIPS / COSMETIC ───────────────────────────────────────────
  {
    keywords: [
      "veneer", "veneers", "chip", "chipped", "shape", "reshap",
      "uneven", "appearance", "look better", "smile improvement",
      "cosmetic", "aesthetic", "bonding", "gap in front",
    ],
    treatmentSlugs: ["dental-veneers", "cosmetic-dentistry", "smile-makeover"],
    articleSlugs: [],
    summary:
      "Chipped, uneven, or discoloured teeth can often be transformed with veneers or cosmetic bonding — both minimally invasive options. Porcelain veneers give a natural, long-lasting result, while bonding is a quick and affordable fix for minor issues. A smile makeover can combine multiple treatments into one personalised plan. A consultation will help identify the best approach for your smile goals.",
    treatmentReasons: {
      "dental-veneers":
        "Ultra-thin porcelain shells bonded to the front of teeth to correct shape, colour, and size.",
      "cosmetic-dentistry":
        "Includes bonding and other options for quick, minimally invasive aesthetic improvements.",
      "smile-makeover":
        "Combines treatments into a single plan for a complete smile transformation.",
    },
    articleWhys: {},
  },

  // ── SMILE MAKEOVER ───────────────────────────────────────────────────────
  {
    keywords: [
      "smile makeover", "full smile", "complete smile", "transform",
      "transformation", "total smile", "full mouth", "all teeth",
    ],
    treatmentSlugs: ["smile-makeover", "dental-veneers", "teeth-whitening"],
    articleSlugs: [],
    summary:
      "A smile makeover is a personalised combination of treatments — veneers, whitening, aligners, and more — planned around your face, goals, and budget. We use digital smile design so you can preview your new smile before a single tooth is touched. A consultation is the best first step to map out what is possible for your specific smile.",
    treatmentReasons: {
      "smile-makeover":
        "A digitally planned total smile transformation tailored to your face and goals.",
      "dental-veneers":
        "Veneers are often a core part of a makeover for shape and colour correction.",
      "teeth-whitening":
        "Whitening is a common first step before other cosmetic work.",
    },
    articleWhys: {},
  },

  // ── IMPLANTS ─────────────────────────────────────────────────────────────
  {
    keywords: [
      "implant", "implants", "dental implant", "screw", "titanium",
      "bone graft", "bone loss", "jaw bone",
    ],
    treatmentSlugs: ["dental-implants", "oral-surgery"],
    articleSlugs: ["dental-implants-everything-you-need-to-know"],
    summary:
      "Dental implants are the gold standard for replacing missing teeth — they look, feel, and function like natural teeth. The process involves placing a small titanium post into the jaw, followed by a crown once it has healed. Bone health is key, and a 3D scan at consultation will confirm whether implants are right for you.",
    treatmentReasons: {
      "dental-implants":
        "Computer-guided implant surgery for precise, comfortable, long-lasting results.",
      "oral-surgery":
        "Bone grafting may be needed to prepare the site before implant placement.",
    },
    articleWhys: {
      "dental-implants-everything-you-need-to-know":
        "A step-by-step guide covering the entire implant journey.",
    },
  },

  // ── ROOT CANAL ───────────────────────────────────────────────────────────
  {
    keywords: [
      "root canal", "nerve", "pulp", "pulpitis",
      "infected tooth", "dead tooth", "dark tooth", "darkening",
    ],
    treatmentSlugs: ["root-canal-treatment", "crowns-and-bridges"],
    articleSlugs: ["root-canal-or-filling"],
    summary:
      "Root canal treatment removes infected or inflamed tissue from inside the tooth, relieving pain while saving your natural tooth. Modern techniques and anaesthesia make it far more comfortable than most people expect. After the procedure a crown is usually placed to protect and restore the tooth's strength.",
    treatmentReasons: {
      "root-canal-treatment":
        "Removes infected pulp to relieve pain and save the tooth.",
      "crowns-and-bridges":
        "A crown is typically placed after root canal treatment to protect the tooth.",
    },
    articleWhys: {
      "root-canal-or-filling":
        "Explains the signs that point to a root canal versus a simple filling.",
    },
  },

  // ── CROWNS / BRIDGES ─────────────────────────────────────────────────────
  {
    keywords: [
      "crown", "crowns", "cap", "caps", "bridge", "bridges",
      "broken tooth", "damaged tooth", "weak tooth", "crumbling",
      "large filling", "old filling", "replace filling",
    ],
    treatmentSlugs: ["crowns-and-bridges", "composite-filling"],
    articleSlugs: [],
    summary:
      "Crowns protect and restore teeth that are damaged, broken, or weakened, while bridges can replace one or more missing teeth using the neighbouring teeth as anchors. Both are custom-made to match your natural teeth using digital technology. A check-up will confirm whether a crown, bridge, or another option best suits your situation.",
    treatmentReasons: {
      "crowns-and-bridges":
        "Custom-made ceramic crowns and bridges digitally designed for a precise fit.",
      "composite-filling":
        "For less extensive damage, a tooth-coloured filling may be sufficient.",
    },
    articleWhys: {},
  },

  // ── CHILDREN ─────────────────────────────────────────────────────────────
  {
    keywords: [
      "child", "children", "kid", "kids", "baby", "toddler",
      "son", "daughter", "milk tooth", "milk teeth", "baby tooth",
      "baby teeth", "first tooth", "school", "teenager", "teen",
    ],
    treatmentSlugs: ["pediatric-dentistry", "orthodontics"],
    articleSlugs: ["prevent-cavities-in-kids"],
    summary:
      "Children's dental health is so important, and early visits help build positive associations with dental care. We provide gentle, child-friendly treatment including check-ups, sealants, fluoride, and space maintainers. If teeth are coming in crooked, early orthodontic assessment around age 7 can be very helpful.",
    treatmentReasons: {
      "pediatric-dentistry":
        "Gentle, fun, and reassuring dental care designed specifically for children.",
      "orthodontics":
        "An early orthodontic check can catch and guide teeth as permanent teeth come through.",
    },
    articleWhys: {
      "prevent-cavities-in-kids":
        "Practical daily habits and clinic visits that keep children's teeth healthy.",
    },
  },

  // ── WISDOM TEETH ─────────────────────────────────────────────────────────
  {
    keywords: [
      "wisdom", "wisdom tooth", "wisdom teeth", "third molar",
      "impacted", "erupting", "partially erupted",
    ],
    treatmentSlugs: ["oral-surgery"],
    articleSlugs: [],
    summary:
      "Wisdom teeth do not always cause problems, but when they are impacted, erupting at an angle, or causing pain and crowding, removal is often the best solution. A digital X-ray or CBCT scan helps us plan the safest removal. Most patients recover well within a few days with proper aftercare.",
    treatmentReasons: {
      "oral-surgery":
        "Careful, planned wisdom tooth removal with minimal discomfort and fast recovery.",
    },
    articleWhys: {},
  },

  // ── FILLINGS / CAVITIES / DECAY ──────────────────────────────────────────
  {
    keywords: [
      "filling", "fillings", "cavity", "cavities", "decay",
      "caries", "hole in tooth", "cavity in tooth", "rotten", "rotting",
    ],
    treatmentSlugs: ["composite-filling", "root-canal-treatment"],
    articleSlugs: ["root-canal-or-filling"],
    summary:
      "Cavities are very common and the earlier they are treated, the simpler the fix. A tooth-coloured composite filling can restore a decayed tooth in a single visit and blends in naturally. If the decay has reached deeper into the tooth, a root canal may be needed before the filling or crown. A check-up with X-rays will tell us exactly how far the decay has gone.",
    treatmentReasons: {
      "composite-filling":
        "Mercury-free, natural-looking filling completed in a single visit.",
      "root-canal-treatment":
        "If decay has reached the nerve, root canal treatment will be needed first.",
    },
    articleWhys: {
      "root-canal-or-filling":
        "Explains the difference between a filling and root canal so you know what to expect.",
    },
  },

  // ── BAD BREATH ───────────────────────────────────────────────────────────
  {
    keywords: [
      "bad breath", "halitosis", "smell", "smelly", "odour", "breath",
      "mouth odour",
    ],
    treatmentSlugs: ["cosmetic-dentistry"],
    articleSlugs: ["signs-of-gum-disease-you-shouldnt-ignore"],
    summary:
      "Persistent bad breath is often linked to gum disease, cavities, or bacteria on the tongue — not just diet. A professional clean and check-up usually identifies the cause. Treating the underlying issue (such as gum disease or a hidden cavity) often resolves bad breath completely. Good home care habits and a follow-up plan will help keep it away.",
    treatmentReasons: {
      "cosmetic-dentistry":
        "A thorough professional clean and assessment of gum and tooth health.",
    },
    articleWhys: {
      "signs-of-gum-disease-you-shouldnt-ignore":
        "Bad breath is one of the signs of gum disease — this article explains what to watch for.",
    },
  },

  // ── GENERAL CHECK-UP ─────────────────────────────────────────────────────
  {
    keywords: [
      "check-up", "checkup", "check up", "consultation", "cleaning",
      "scale", "polish", "hygiene", "routine", "general", "first visit",
      "appointment", "book", "booking",
    ],
    treatmentSlugs: ["cosmetic-dentistry"],
    articleSlugs: [],
    summary:
      "Regular dental check-ups and professional cleanings are the foundation of good oral health. We recommend visiting every six months — this helps catch small problems early before they become bigger ones. Our team will do a full assessment and leave you with a clear picture of your dental health and any priorities.",
    treatmentReasons: {
      "cosmetic-dentistry":
        "A comprehensive check-up covers your teeth, gums, bite, and overall oral health.",
    },
    articleWhys: {},
  },
];

// ---------------------------------------------------------------------------
// Fallback results
// ---------------------------------------------------------------------------

const OUT_OF_SCOPE: AdvisorResult = {
  summary:
    "Your question does not seem to be related to dental health, so we are not the best source of guidance here. If you do have any dental concerns — even minor ones — we are always happy to help. We recommend booking a consultation with our dentist for any dental questions, even if they seem small.",
  urgent: false,
  treatments: [],
  articles: [],
};

const BOOK_CONSULTATION_RESULT: AdvisorResult = {
  summary:
    "We could not identify a specific concern from your message, but every smile is unique and deserves personalised attention. We recommend booking a consultation with our dentist who can assess your situation in person and give you tailored advice.",
  urgent: false,
  treatments: [],
  articles: [],
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function normalise(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ");
}

// ---------------------------------------------------------------------------
// Main entry point
// ---------------------------------------------------------------------------

export async function runAdvisor(concern: string): Promise<AdvisorResponse> {
  const normalised = normalise(concern);

  // Score each rule by how many of its keywords appear in the input
  const scored = rules.map((rule) => {
    const hits = rule.keywords.filter((kw) =>
      normalised.includes(normalise(kw))
    ).length;
    return { rule, hits };
  });

  scored.sort((a, b) => b.hits - a.hits);
  const best = scored[0];

  // Detect if the input has any dental content at all
  const dentalTerms = [
    "tooth", "teeth", "dental", "gum", "smile", "jaw", "mouth", "bite",
    "crown", "implant", "veneer", "brace", "aligner", "filling", "cavity",
    "pain", "ache", "bleed", "sensitive", "white", "yellow", "child", "kid",
    "wisdom", "root canal", "bad breath", "missing", "crooked", "gap",
    "chip", "crack", "broken", "stain", "ortho",
  ];
  const hasDentalContent = dentalTerms.some((t) =>
    normalised.includes(normalise(t))
  );

  if (!hasDentalContent) {
    return { ok: true, result: OUT_OF_SCOPE };
  }

  if (best.hits === 0) {
    return { ok: true, result: BOOK_CONSULTATION_RESULT };
  }

  const { rule } = best;

  // Resolve treatments (validate slug exists in content.ts)
  const treatments = rule.treatmentSlugs
    .slice(0, 3)
    .flatMap((slug) => {
      const svc = services.find((s) => s.slug === slug);
      if (!svc) return [];
      return [
        {
          slug: svc.slug,
          title: svc.title,
          reason: rule.treatmentReasons[slug] ?? svc.short,
        },
      ];
    });

  // Resolve articles (validate slug exists in content.ts)
  const articles = rule.articleSlugs
    .slice(0, 2)
    .flatMap((slug) => {
      const post = posts.find((p) => p.slug === slug);
      if (!post) return [];
      return [
        {
          slug: post.slug,
          title: post.title,
          why: rule.articleWhys[slug] ?? post.excerpt,
        },
      ];
    });

  return {
    ok: true,
    result: {
      summary: rule.summary,
      urgent: rule.urgent ?? false,
      treatments,
      articles,
    },
  };
}
