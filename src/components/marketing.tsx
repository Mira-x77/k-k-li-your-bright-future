import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState, type ReactNode } from "react";

import { Reveal } from "@/components/reveal";

/* ---------- Coordonnées ---------- */

export const PHONE_DISPLAY = "+228 92 09 35 07";
export const PHONE_HREF = "tel:+22892093507";

/* ---------- En-tête de section ---------- */

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: string;
  align?: "center" | "left";
}) {
  const centered = align === "center";
  return (
    <Reveal>
      <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
        {eyebrow && (
          <div className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--sun-deep)]">
            {eyebrow}
          </div>
        )}
        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">{title}</h2>
        {intro && <p className="mt-4 text-muted-foreground">{intro}</p>}
      </div>
    </Reveal>
  );
}

/* ---------- Déroulé d'une séance (onglets numérotés) ---------- */

export type ProcessStep = {
  title: string;
  points: string[];
};

export const SESSION_STEPS: ProcessStep[] = [
  {
    title: "Accueil et objectifs",
    points: [
      "Tour de table : chaque élève partage ses objectifs de la semaine",
      "Le répétiteur revient sur les points restés difficiles",
      "Mise en confiance et cadrage bienveillant du groupe",
    ],
  },
  {
    title: "Révision du cours",
    points: [
      "Reprise des définitions et propriétés clés du programme",
      "Schémas et cartes mentales pour aider à la mémorisation",
      "Questions ouvertes pour situer ce qui est compris",
    ],
  },
  {
    title: "Exercices guidés",
    points: [
      "Résolution pas à pas au tableau avec participation active",
      "Méthodologie de rédaction attendue aux examens",
      "Correction des erreurs de raisonnement au fil de la séance",
    ],
  },
  {
    title: "Travail en autonomie",
    points: [
      "Exercices d'application faits seul, répétiteur disponible",
      "Devoir à la maison ciblé sur les points fragiles",
      "Point de fin de séance sur ce qui reste à travailler",
    ],
  },
];

export function SessionFlow({
  steps = SESSION_STEPS,
  eyebrow = "Notre approche",
  title = <>Comment se déroule une séance</>,
  intro = "Une séance structurée en quatre temps, du cadrage des objectifs au travail en autonomie.",
}: {
  steps?: ProcessStep[];
  eyebrow?: string;
  title?: ReactNode;
  intro?: string;
}) {
  const [activeStep, setActiveStep] = useState(0);
  const step = steps[activeStep];

  return (
    <section className="border-y border-border bg-card/50">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading eyebrow={eyebrow} title={title} intro={intro} />

        <div className="mt-12 grid gap-8 lg:grid-cols-[320px_1fr]">
          <Reveal anim="left">
            <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
              {steps.map((s, i) => {
                const isActive = i === activeStep;
                return (
                  <button
                    key={s.title}
                    type="button"
                    onClick={() => setActiveStep(i)}
                    aria-current={isActive}
                    className={`flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-left transition lg:w-full ${
                      isActive
                        ? "bg-[color:var(--sun)]/25 ring-1 ring-[color:var(--sun-deep)]/40"
                        : "bg-background ring-1 ring-border hover:bg-muted"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        isActive
                          ? "bg-[color:var(--sun-deep)] text-white"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="whitespace-nowrap text-sm font-semibold lg:whitespace-normal">
                      {s.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <Reveal anim="right" key={step.title}>
            <div className="rounded-3xl border border-border bg-background p-7 md:p-9">
              <h3 className="text-2xl font-bold tracking-tight">{step.title}</h3>
              <ol className="mt-6 space-y-4">
                {step.points.map((p, i) => (
                  <li key={p} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[color:var(--sun)]/30 text-[11px] font-bold text-[color:var(--sun-deep)]">
                      {i + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-foreground/85">{p}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Questions fréquentes ---------- */

export type FaqItem = { q: string; a: string };

export const GENERAL_FAQ: FaqItem[] = [
  {
    q: "Mon enfant n'est pas motivé — est-ce que ça vaut quand même le coup ?",
    a: "La première séance sert à comprendre d'où vient le blocage, puis le travail repart des chapitres non acquis plutôt que du programme en cours.",
  },
  {
    q: "Qui sont les répétiteurs ?",
    a: "Des répétiteurs de mathématiques et de physique, qui interviennent auprès des élèves de Première et de Terminale, séries C & D. La page « Nos répétiteurs » présente l'équipe.",
  },
  {
    q: "Comment échanger avec le répétiteur de mon enfant ?",
    a: `Appelez-nous au ${PHONE_DISPLAY} : nous faisons le point avec vous sur les chapitres travaillés et sur ce qui reste difficile.`,
  },
];

export function FaqSection({
  items = GENERAL_FAQ,
  eyebrow = "Questions fréquentes",
  title = <>Vous vous demandez peut-être…</>,
}: {
  items?: FaqItem[];
  eyebrow?: string;
  title?: ReactNode;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="border-y border-border bg-card/50">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} anim="up" delay={i * 60}>
                <div
                  className={`overflow-hidden rounded-2xl border bg-background transition ${
                    isOpen ? "border-[color:var(--sun-deep)]/40" : "border-border"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="text-sm font-bold sm:text-base">{item.q}</span>
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-lg leading-none transition-transform duration-300 ${
                        isOpen
                          ? "rotate-45 bg-[color:var(--sun-deep)] text-white"
                          : "bg-muted text-muted-foreground"
                      }`}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>
                  <div
                    className="grid transition-all duration-300 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Appel à l'action final ---------- */

export function CallbackCta({
  title = <>Une question ? Parlons du parcours de votre enfant.</>,
  intro = "Écrivez-nous pour échanger sur le niveau, les matières et le rythme qui conviennent à votre enfant.",
}: {
  title?: ReactNode;
  intro?: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="relative overflow-hidden rounded-[2rem] bg-[color:var(--ink)] px-6 py-14 text-center text-[color:var(--cream)] sm:px-12">
        <div className="sun-glow pointer-events-none absolute inset-0 opacity-25" aria-hidden />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">{title}</h2>
          <p className="mt-4 text-sm text-[color:var(--cream)]/75 sm:text-base">{intro}</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--sun)] px-6 py-3.5 text-sm font-bold text-[color:var(--ink)] transition hover:opacity-90"
            >
              Nous contacter <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
