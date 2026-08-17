import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-students-group.jpg";
import classroomBg from "@/assets/hero-classroom.png";
import tutoringImg from "@/assets/tutoring.jpg";
import lateNightImg from "@/assets/student-late-night.png";
import {
  ArrowRight,
  Award,
  BookOpen,
  GraduationCap,
  Lightbulb,
  Phone,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Typewriter } from "@/components/typewriter";
import {
  CallbackCta,
  FaqSection,
  PHONE_DISPLAY,
  PHONE_HREF,
  SectionHeading,
  SessionFlow,
} from "@/components/marketing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Stage Kékéli — La lumière qui guide vers la réussite scolaire" },
      {
        name: "description",
        content:
          "Cours de répétition en mathématiques et en physique à Lomé, Togo. Première et Terminale, séries C & D — 2 500 FCFA par mois et par matière, accompagnement personnalisé, paiement Mobile Money.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <Teasers />
      <WhySection />
      <SessionFlow />
      <FinalCTA />
      <FaqSection />
      <CallbackCta />
    </>
  );
}

const HERO_FEATURES = [
  {
    label: "Nouveau",
    title: "Avez-vous choisi le bon accompagnement ?",
    to: "/offre" as const,
  },
  {
    label: "Répétiteurs",
    title: "Où voulez-vous progresser aujourd'hui ?",
    to: "/repetiteurs" as const,
  },
  {
    label: "Parents",
    title: "Offrez la lumière — accompagnez votre enfant",
    to: "/tarifs" as const,
  },
];

const FLOATING_BADGES = [
  { icon: Lightbulb, className: "left-0 top-8 bg-emerald-100 text-emerald-700" },
  { icon: Award, className: "right-4 top-16 bg-violet-100 text-violet-700" },
  { icon: Target, className: "bottom-16 left-1/4 bg-orange-100 text-orange-700" },
];

function Hero() {
  return (
    <section className="hero-clean-bg relative overflow-hidden">
      <img
        src={classroomBg}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-100"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background from-0% via-background/90 via-40% to-transparent to-80%"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-6 pb-4 pt-10 md:pt-14 lg:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="max-w-xl">
            <Reveal anim="left">
              <h1 className="text-foreground">
                <span
                  className="block text-4xl italic leading-[1.05] sm:text-5xl lg:text-6xl"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
                >
                  Inspirer
                </span>
                <span
                  className="-mt-1 block text-5xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  la{" "}
                  <Typewriter
                    words={["réussite", "confiance", "lumière", "excellence"]}
                    className="inline-block min-w-[7ch] align-top text-[color:var(--sun-deep)]"
                  />
                </span>
              </h1>
            </Reveal>
            <Reveal anim="left" delay={80}>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
                Trouvez l'accompagnement qu'il vous faut en mathématiques et en physique — pour les
                élèves de Première et Terminale, séries C & D, à Lomé.
              </p>
            </Reveal>
          </div>

          <Reveal anim="right" delay={120}>
            <div className="relative mx-auto max-w-md lg:max-w-none lg:mx-0">
              <div className="relative overflow-hidden rounded-[2rem] bg-card/40 shadow-[var(--shadow-soft)]">
                <img
                  src={heroImg}
                  alt="Groupe d'élèves travaillant ensemble"
                  className="aspect-[4/5] w-full object-cover"
                  width={900}
                  height={1125}
                />
              </div>
              {FLOATING_BADGES.map(({ icon: Icon, className }, i) => (
                <div
                  key={i}
                  className={`absolute flex h-14 w-14 items-center justify-center rounded-2xl shadow-[var(--shadow-soft)] ${className}`}
                >
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-12 pt-8">
        <div className="grid gap-8 border-t border-border/50 pt-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-border/50">
          {HERO_FEATURES.map(({ label, title, to }, i) => (
            <Reveal key={to} anim="up" delay={i * 80}>
              <Link to={to} className="group block px-0 md:px-8 first:md:pl-0 last:md:pr-0">
                <p className="text-xs font-medium text-[color:var(--sage)]">{label}</p>
                <h2 className="mt-2 font-sans text-lg font-bold leading-snug text-foreground transition group-hover:text-[color:var(--sun-deep)] sm:text-xl">
                  {title}
                </h2>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Teasers() {
  const cards = [
    {
      to: "/offre" as const,
      eyebrow: "Notre offre",
      title: "Mathématiques et physique, séries C & D",
      desc: "Diagnostic initial, plan personnalisé et séances régulières animées par un répétiteur.",
      icon: BookOpen,
    },
    {
      to: "/repetiteurs" as const,
      eyebrow: "Nos répétiteurs",
      title: "Des enseignants qui inspirent",
      desc: "Des répétiteurs de mathématiques et de physique, pour la Première et la Terminale, séries C & D.",
      icon: Users,
    },
    {
      to: "/tarifs" as const,
      eyebrow: "Tarifs",
      title: "Une grille simple et transparente",
      desc: (
        <>
          <strong className="font-black text-foreground">2 500 FCFA par mois et par matière</strong>
          , ou 22 500 FCFA par an et par matière. Inscription : 1 500 FCFA, frais uniques.
        </>
      ),
      icon: GraduationCap,
    },
    {
      to: "/paiement" as const,
      eyebrow: "Paiement",
      title: "Réglez par Mobile Money",
      desc: "MTN, Moov, Orange. Reçu par SMS, TAF 10% intégrée automatiquement.",
      icon: ShieldCheck,
    },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <SectionHeading
        eyebrow="Explorer Stage Kékéli"
        title={<>Tout ce qu'il faut pour réussir</>}
        intro="Un parcours complet, du diagnostic initial au suivi transmis aux parents."
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ icon: Icon, ...c }, i) => (
          <Reveal key={c.to} anim="up" delay={i * 90}>
            <Link
              to={c.to}
              className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition duration-300 hover:-translate-y-1 hover:border-[color:var(--sun-deep)]/40 hover:shadow-[var(--shadow-warm)]"
            >
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--sun)]/25 text-[color:var(--sun-deep)] transition group-hover:bg-[color:var(--sun)]">
                <Icon className="h-5 w-5" />
              </div>
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--sun-deep)]">
                {c.eyebrow}
              </div>
              <h3 className="mt-2 text-lg font-bold leading-snug">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
              <div className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-bold text-foreground transition group-hover:gap-2">
                En savoir plus <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const WHY_POINTS = [
  [
    "Savoir d'où l'on part",
    "Le diagnostic de la première séance situe ce qui est acquis et ce qui ne l'est pas, avant d'ajouter du travail.",
  ],
  [
    "Savoir quoi travailler d'abord",
    "Un plan de travail par matière, en mathématiques comme en physique, pour ne plus ouvrir ses cahiers au hasard.",
  ],
  [
    "Ne pas rester bloqué seul",
    "Un répétiteur avec qui reprendre le raisonnement, et pas seulement la réponse.",
  ],
];

function WhySection() {
  return (
    <section>
      <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-20 md:grid-cols-2 md:items-center md:gap-16">
        <Reveal anim="left">
          <div className="relative mx-auto w-full max-w-md">
            <div className="relative overflow-hidden rounded-[2rem] ring-1 ring-border shadow-[var(--shadow-warm)]">
              <img
                src={lateNightImg}
                alt="Un élève endormi sur son bureau, la tête posée sur ses bras, au milieu de feuilles éparpillées, de notes autocollantes et d'un ordinateur portable"
                className="aspect-square w-full object-cover"
                loading="lazy"
                width={735}
                height={735}
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"
                aria-hidden
              />
            </div>
          </div>
        </Reveal>
        <Reveal anim="right">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--sun-deep)]">
              Pourquoi Stage Kékéli existe
            </div>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
              Travailler beaucoup, sans savoir si l'on travaille juste
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Un chapitre repris une troisième fois, des feuilles volantes qui s'empilent, un soir
              de plus à relire sans être sûr d'avoir compris. Le problème est rarement l'effort —
              c'est de ne pas savoir où le porter, et de devoir le décider seul.
            </p>
            <ul className="mt-8 space-y-4">
              {WHY_POINTS.map(([title, desc], i) => (
                <Reveal key={title} anim="up" delay={i * 90}>
                  <li className="flex gap-4">
                    <div className="mt-1.5 h-2 w-2 flex-none rounded-full bg-[color:var(--sun-deep)]" />
                    <div>
                      <div className="font-bold">{title}</div>
                      <div className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                        {desc}
                      </div>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
            <p className="mt-8 max-w-lg text-sm leading-relaxed text-foreground/85">
              Nous ne promettons pas de raccourci. Nous proposons un cadre, de la régularité, et
              quelqu'un à côté de l'élève.
            </p>
            <Link
              to="/offre"
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-bold text-foreground transition hover:bg-muted"
            >
              Voir comment nous travaillons <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="border-y border-border bg-card/60">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center">
        <Reveal anim="left">
          <div className="overflow-hidden rounded-[2rem] border border-border shadow-[var(--shadow-warm)]">
            <img
              src={tutoringImg}
              alt="Séance de tutorat"
              className="h-full w-full object-cover"
              loading="lazy"
              width={1400}
              height={1000}
            />
          </div>
        </Reveal>
        <Reveal anim="right">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--sun-deep)]">
              Prêts à commencer ?
            </div>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
              Faisons briller le potentiel de votre enfant
            </h2>
            <p className="mt-5 text-muted-foreground">
              Écrivez-nous pour échanger sur le niveau, les matières et le rythme qui conviennent à
              votre enfant.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/paiement"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground transition hover:opacity-90 shadow-md"
              >
                Inscrire mon enfant <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-bold text-foreground transition hover:bg-muted"
              >
                <Phone className="h-4 w-4" />
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
