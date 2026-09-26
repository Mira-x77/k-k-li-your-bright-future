import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, CalendarDays, Check, Clock, Target, Users } from "lucide-react";
import groupTableImg from "@/assets/study-group-table.png";
import saturdayBg from "@/assets/samedi-offre-backdrop.jpg";
import { SESSION_STEPS as SEANCE_STEPS } from "@/components/marketing";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/samedi")({
  head: () => ({
    meta: [
      { title: "Cours du samedi — Stage Kékéli" },
      {
        name: "description",
        content:
          "Les cours du samedi de Stage Kékéli : mathématiques et physique pour les élèves de Première C & D et de Terminale C & D à Lomé. Créneaux et modalités communiqués sur demande.",
      },
      { property: "og:title", content: "Cours du samedi — Stage Kékéli" },
      {
        property: "og:description",
        content:
          "Un rendez-vous hebdomadaire pour les Première C & D et Terminale C & D, en complément du travail scolaire de l'année.",
      },
    ],
  }),
  component: SamediPage,
});

const SESSION_STEPS = [
  {
    icon: BookOpen,
    title: "Révision du cours",
    desc: "On reprend les notions vues en classe dans la semaine et on clarifie les points restés flous.",
  },
  {
    icon: Target,
    title: "Exercices guidés",
    desc: "Application immédiate, avec le répétiteur qui accompagne le raisonnement pas à pas.",
  },
  {
    icon: Clock,
    title: "Travail en autonomie",
    desc: "L'élève traite seul des exercices du même type pour vérifier ce qui est réellement acquis.",
  },
  {
    icon: Check,
    title: "Méthodologie de rédaction",
    desc: "Présentation de la copie, justification des étapes et gestion du temps sur une épreuve.",
  },
];

const AUDIENCE = [
  {
    level: "Première C & D",
    goal: "Consolider les bases en mathématiques et en physique",
    note: "La série C est davantage orientée mathématiques, la série D vers les sciences de la vie.",
    subjects: ["Mathématiques", "Physique"],
  },
  {
    level: "Terminale C & D",
    goal: "Préparer le Baccalauréat",
    note: "Travail régulier sur le programme de l'année en mathématiques et en physique.",
    subjects: ["Mathématiques", "Physique"],
  },
];

function SamediPage() {
  return (
    <>
      <section className="hero-clean-bg relative overflow-hidden border-b border-border/50">
        <img
          src={saturdayBg}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[center_40%]"
        />
        <div className="pointer-events-none absolute inset-0 bg-background/20" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 py-16 text-center md:py-20">
          <Reveal>
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--sun-deep)]">
              Cours du samedi
            </div>
            <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl drop-shadow-[0_2px_10px_rgba(255,252,245,0.9)]">
              Un rendez-vous hebdomadaire pour avancer toute l'année
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
              Une séance chaque samedi en mathématiques et en physique, en accompagnement du travail
              scolaire de la semaine, pour les élèves de Première C & D et de Terminale C & D.
            </p>
          </Reveal>
          <Reveal delay={140}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground transition hover:opacity-90"
              >
                Demander les créneaux <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/offre"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-bold transition hover:bg-muted"
              >
                Voir nos programmes
              </Link>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mt-8 max-w-xl text-sm text-muted-foreground">
              Horaires, lieu et modalités d'inscription communiqués sur demande.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--sun-deep)]">
              Déroulé d'une séance
            </div>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              Quatre temps, chaque samedi
            </h2>
            <p className="mt-4 text-muted-foreground">
              La même trame de travail d'une semaine à l'autre, pour que l'élève sache toujours ce
              qui est attendu de lui.
            </p>
          </div>
        </Reveal>
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14">
          <Reveal anim="left">
            <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] ring-1 ring-border shadow-[var(--shadow-warm)]">
              <img
                src={groupTableImg}
                alt="Quatre élèves réunis autour d'une table ronde avec un ordinateur portable, des cahiers et des tasses, en train de travailler ensemble"
                className="aspect-[3/4] w-full object-cover"
                loading="lazy"
                width={735}
                height={980}
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"
                aria-hidden
              />
            </div>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {SESSION_STEPS.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} anim="up" delay={i * 80}>
                <div className="h-full rounded-2xl border border-border bg-card p-7">
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--ink)] text-[color:var(--sun)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                    Temps {i + 1}
                  </div>
                  <h3 className="mt-1 text-xl font-bold">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card/50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <div className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--sun-deep)]">
                Pour qui
              </div>
              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                Séries scientifiques C et D
              </h2>
              <p className="mt-4 text-muted-foreground">
                Nous accompagnons uniquement les classes de Première et de Terminale des séries C et
                D.
              </p>
            </div>
          </Reveal>
          <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-2">
            {AUDIENCE.map(({ level, goal, note, subjects }, i) => (
              <Reveal key={level} anim="up" delay={i * 100}>
                <div className="h-full rounded-2xl border border-border bg-background p-7">
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--sun)]/25 text-[color:var(--sun-deep)]">
                    <Users className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold">{level}</h3>
                  <p className="mt-2 text-sm font-semibold text-[color:var(--sun-deep)]">{goal}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{note}</p>
                  <ul className="mt-6 space-y-2.5">
                    {subjects.map((s) => (
                      <li key={s} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-4 w-4 flex-none text-[color:var(--sun-deep)]" />
                        <span className="text-sm text-foreground/85">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mx-auto mt-5 grid max-w-4xl gap-5 sm:grid-cols-2">
            {SEANCE_STEPS.map((step, i) => (
              <Reveal key={step.title} anim="up" delay={i * 80}>
                <div className="h-full rounded-2xl border border-border bg-background p-7">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color:var(--sun-deep)] text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <h3 className="text-lg font-bold leading-snug">{step.title}</h3>
                  </div>
                  <ol className="mt-5 space-y-3">
                    {step.points.map((point, j) => (
                      <li key={point} className="flex gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[color:var(--sun)]/30 text-[11px] font-bold text-[color:var(--sun-deep)]">
                          {j + 1}
                        </span>
                        <span className="text-sm leading-relaxed text-foreground/85">{point}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <Reveal anim="zoom">
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-7 text-center md:p-10">
            <div className="mx-auto mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--sun)]/25 text-[color:var(--sun-deep)]">
              <CalendarDays className="h-5 w-5" />
            </div>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              Rejoindre les cours du samedi
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Contactez-nous pour connaître les créneaux disponibles et les modalités d'inscription
              en mathématiques et en physique pour la classe de votre enfant.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground transition hover:opacity-90"
              >
                Nous contacter <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/tarifs"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-bold transition hover:bg-muted"
              >
                Consulter les tarifs
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
