import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Calculator,
  Check,
  ClipboardCheck,
  FlaskConical,
  GraduationCap,
  HeartHandshake,
  LineChart,
  Sparkles,
  Target,
} from "lucide-react";
import { useState } from "react";
import studyGroupImg from "@/assets/study-group-library.png";
import { Reveal } from "@/components/reveal";
import {
  CallbackCta,
  FaqSection,
  SectionHeading,
  SessionFlow,
  type FaqItem,
} from "@/components/marketing";

export const Route = createFileRoute("/offre")({
  head: () => ({
    meta: [
      { title: "Notre offre — Stage Kékéli" },
      {
        name: "description",
        content:
          "Mathématiques et physique en Première et Terminale, séries C & D. Droits aux examens toute l'année, accès gratuit à GoStudy et accompagnement personnalisé.",
      },
      { property: "og:title", content: "Notre offre — Stage Kékéli" },
      {
        property: "og:description",
        content:
          "Mathématiques et physique, niveaux C & D et méthode pédagogique de Stage Kékéli à Lomé.",
      },
    ],
  }),
  component: OffrePage,
});

const subjects = [
  {
    icon: Calculator,
    name: "Mathématiques",
    desc: "Algèbre, géométrie et analyse au programme des séries C & D.",
    levels: "Première et Terminale C & D",
  },
  {
    icon: FlaskConical,
    name: "Physique",
    desc: "Notions du cours et exercices ciblés au programme des séries C & D.",
    levels: "Première et Terminale C & D",
  },
];

const included = [
  {
    icon: GraduationCap,
    title: "Droits aux examens",
    desc: "Les droits aux examens sont couverts durant toute l'année.",
  },
  {
    icon: Sparkles,
    title: "Accès gratuit à GoStudy",
    desc: "L'accès à GoStudy est offert avec l'inscription.",
  },
  {
    icon: HeartHandshake,
    title: "Accompagnement personnalisé",
    desc: "Un suivi adapté à l'élève, en mathématiques comme en physique.",
  },
];

const method = [
  {
    icon: ClipboardCheck,
    title: "Diagnostic",
    desc: "Évaluation des acquis et objectifs clairs dès la première séance.",
  },
  {
    icon: Target,
    title: "Plan personnalisé",
    desc: "Un programme sur mesure, matière par matière, adapté au rythme de l'élève.",
  },
  {
    icon: LineChart,
    title: "Suivi partagé",
    desc: "Nous tenons à ce que l'élève et ses parents sachent ce qui progresse et ce qui reste à travailler.",
  },
];

const PROGRAMS = [
  {
    level: "Première C & D",
    goal: "Maîtriser le programme de Première",
    focus: "Séries C & D",
    modules: ["Dérivation et suites numériques", "Produit scalaire et trigonométrie"],
  },
  {
    level: "Terminale C & D",
    goal: "Préparer le Baccalauréat",
    focus: "Séries C & D",
    modules: [
      "Limites, continuité et convexité",
      "Primitives et calcul intégral",
      "Combinatoire et lois de probabilités",
      "Géométrie de l'espace : vecteurs et plans",
    ],
  },
];

const OFFER_FAQ: FaqItem[] = [
  {
    q: "Quels niveaux accompagnez-vous ?",
    a: "Uniquement la Première et la Terminale, séries C & D. Nous partons de la classe actuelle de l'élève, puis le diagnostic de la première séance précise les chapitres à renforcer.",
  },
  {
    q: "Quelles matières sont enseignées ?",
    a: "L'offre porte principalement sur deux matières : les mathématiques et la physique. Elles peuvent être suivies ensemble ou séparément.",
  },
  {
    q: "Les cours suivent-ils le programme officiel togolais ?",
    a: "Entièrement. Nos répétiteurs travaillent à partir des programmes en vigueur au Togo pour les séries C & D.",
  },
  {
    q: "Qu'est-ce qui est compris dans l'offre ?",
    a: "Les droits aux examens durant toute l'année, l'accès gratuit à GoStudy et un accompagnement personnalisé.",
  },
];

function OffrePage() {
  const [activeProgram, setActiveProgram] = useState(1);
  const program = PROGRAMS[activeProgram];

  return (
    <>
      <section className="hero-clean-bg border-b border-border/50">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center md:py-20">
          <Reveal>
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--sun-deep)]">
              Notre offre
            </div>
            <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              Mathématiques et physique, avec exigence et bienveillance
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
              Première et Terminale, séries C & D. Diagnostic initial, plan de travail sur mesure et
              séances régulières animées par un répétiteur.
            </p>
          </Reveal>
          <Reveal delay={140}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/tarifs"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground transition hover:opacity-90"
              >
                Voir les tarifs <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-bold transition hover:bg-muted"
              >
                Nous contacter
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="Programmes par niveau"
          title={<>Le programme, niveau par niveau</>}
          intro="Choisissez la classe de votre enfant pour voir les chapitres travaillés en priorité."
        />

        <Reveal>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {PROGRAMS.map((p, i) => {
              const isActive = i === activeProgram;
              return (
                <button
                  key={p.level}
                  type="button"
                  onClick={() => setActiveProgram(i)}
                  aria-current={isActive}
                  className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
                    isActive
                      ? "bg-[color:var(--ink)] text-[color:var(--cream)]"
                      : "bg-card text-muted-foreground ring-1 ring-border hover:text-foreground"
                  }`}
                >
                  {p.level}
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal key={program.level}>
          <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-border bg-card p-7 md:p-9">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[color:var(--sun)]/25 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[color:var(--sun-deep)]">
                {program.focus}
              </span>
            </div>
            <h3 className="mt-4 text-2xl font-black tracking-tight sm:text-3xl">{program.goal}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Programme {program.level} — chapitres de mathématiques travaillés en priorité
            </p>
            <ul className="mt-7 space-y-3">
              {program.modules.map((m) => (
                <li key={m} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 flex-none text-[color:var(--sun-deep)]" />
                  <span className="text-sm leading-relaxed text-foreground/85">{m}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/paiement"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90 shadow-md"
            >
              S'inscrire en {program.level} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-border bg-card/50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeading
            eyebrow="Matières enseignées"
            title={<>Mathématiques et physique, en Première et Terminale C &amp; D</>}
            intro="L'offre porte principalement sur ces deux matières, du cours aux exercices d'application."
          />
          <div className="mx-auto mt-12 grid max-w-3xl gap-5 sm:grid-cols-2">
            {subjects.map(({ icon: Icon, name, desc, levels }, i) => (
              <Reveal key={name} anim="up" delay={i * 70}>
                <div className="group h-full rounded-2xl border border-border bg-background p-6 transition duration-300 hover:-translate-y-1 hover:border-[color:var(--sun-deep)]/40 hover:shadow-[var(--shadow-warm)]">
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--sun)]/25 text-[color:var(--sun-deep)] transition group-hover:bg-[color:var(--sun)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold">{name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                  <div className="mt-5 text-[11px] font-bold uppercase tracking-widest text-[color:var(--sun-deep)]">
                    {levels}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="Inclus dans l'offre"
          title={<>Ce qui est compris avec l'inscription</>}
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {included.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} anim="up" delay={i * 90}>
              <div className="h-full rounded-2xl border border-border bg-card p-7">
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--sun)]/25 text-[color:var(--sun-deep)]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={280}>
          <div className="mt-6 flex flex-col gap-6 rounded-3xl border border-border bg-card p-7 md:flex-row md:items-center md:justify-between md:p-9">
            <div>
              <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                <span className="text-4xl font-black leading-none tracking-tight sm:text-5xl">
                  2 500
                </span>
                <span className="text-lg font-bold">FCFA</span>
                <span className="text-base font-semibold text-muted-foreground">par mois</span>
                <span className="inline-flex rounded-full bg-[color:var(--sun)] px-4 py-1.5 text-sm font-bold text-[color:var(--ink)]">
                  par matière
                </span>
              </div>
              <p className="mt-4 max-w-xl text-base leading-relaxed">
                Ou 22 500 FCFA par an et par matière, sur les 9 mois de l'année scolaire.{" "}
                <strong className="font-black">Inscription : 1 500 FCFA</strong> — frais uniques,
                quel que soit le nombre de matières suivies.
              </p>
            </div>
            <Link
              to="/tarifs"
              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground transition hover:opacity-90"
            >
              Voir les tarifs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>

      <SessionFlow />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="Notre approche"
          title={<>Trois étapes pour révéler chaque élève</>}
        />
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <Reveal anim="left">
            <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl ring-1 ring-border shadow-[var(--shadow-warm)]">
              <img
                src={studyGroupImg}
                alt="Trois élèves assis à une table de bibliothèque devant un ordinateur portable, l'un montrant un détail à l'écran"
                className="aspect-[3/2] w-full object-cover"
                loading="lazy"
                width={630}
                height={420}
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"
                aria-hidden
              />
            </div>
          </Reveal>
          <div className="grid gap-5">
            {method.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} anim="up" delay={i * 100}>
                <div className="flex h-full gap-5 rounded-2xl border border-border bg-card p-6 sm:p-7">
                  <div className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-[color:var(--ink)] text-[color:var(--sun)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                      Étape {i + 1}
                    </div>
                    <h3 className="mt-1 text-xl font-bold">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FaqSection items={OFFER_FAQ} title={<>Questions sur nos programmes</>} />
      <CallbackCta />
    </>
  );
}
