import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, ChevronDown, MessageSquare, Phone } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const PHONE_DISPLAY = "+228 93 51 00 74";
export const PHONE_HREF = "tel:+22893510074";
export const WHATSAPP_LABEL = "+228 93 51 00 74";
export const WHATSAPP_HREF =
  "https://wa.me/22893510074?text=Bonjour%20Stage%20K%C3%A9k%C3%A9li%2C%20je%20souhaite%20des%20informations%20pour%20l%27inscription%20de%20mon%20enfant.";

export function WhatsAppIcon({ className = "h-4 w-4" }: { className?: string }) {
  return <MessageSquare className={className} />;
}

/* ---------- Déroulement d'une séance ---------- */

export type ProcessStep = {
  title: string;
  points: string[];
};

export const SESSION_STEPS: ProcessStep[] = [
  {
    title: "Cadrage de la séance",
    points: [
      "Accueil et rappel des objectifs du jour en mathématiques ou en physique",
      "Point rapide sur le cours vu en classe et le travail réalisé",
      "Identification des blocages (formules non comprises, méthode de résolution)",
    ],
  },
  {
    title: "Reprise des points de cours",
    points: [
      "Réexplication ciblée des notions théoriques non maîtrisées",
      "Exemples simples pour fixer les réflexes de calcul et de raisonnement",
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
  title = <>Comment se déroule une séance du samedi</>,
  intro = "Une séance structurée en quatre temps chaque samedi, du cadrage des objectifs au travail en autonomie.",
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

export interface FaqItem {
  q: string;
  a: string;
}

export function FaqSection({ items, title }: { items: FaqItem[]; title?: ReactNode }) {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <Reveal textCenter>
        <div className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--sun-deep)]">
          Questions Fréquentes
        </div>
        <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
          {title || <>Toutes vos questions sur Stage Kékéli</>}
        </h2>
      </Reveal>

      <div className="mt-10">
        <Accordion type="single" collapsible className="w-full space-y-3">
          {items.map((item, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx}`}
              className="rounded-2xl border border-border bg-card px-6 py-1 transition hover:border-[color:var(--sun-deep)]/40"
            >
              <AccordionTrigger className="text-left text-base font-bold hover:no-underline py-4">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground pb-5">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export function CallbackCta({
  title,
  intro,
}: {
  title?: ReactNode;
  intro?: ReactNode;
}) {
  return (
    <section className="border-t border-border bg-gradient-to-b from-card to-background">
      <div className="mx-auto max-w-5xl px-6 py-20 text-center">
        <Reveal textCenter>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            {title || <>Une question ? Parlons du suivi de votre enfant</>}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            {intro || <>Appelez-nous au +228 93 51 00 74 ou écrivez-nous à stagekekeli@gmail.com pour organiser les séances du samedi.</>}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-4 text-sm font-bold text-slate-950 hover:bg-[#128C7E] hover:text-white transition shadow-md"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Écrire sur WhatsApp (+228 93 51 00 74)
            </a>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-4 text-sm font-bold text-foreground hover:bg-muted transition"
            >
              <Phone className="h-5 w-5" />
              Appeler le +228 93 51 00 74
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: string;
}) {
  return (
    <Reveal textCenter>
      {eyebrow && (
        <div className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--sun-deep)]">
          {eyebrow}
        </div>
      )}
      <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {intro && (
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
          {intro}
        </p>
      )}
    </Reveal>
  );
}
