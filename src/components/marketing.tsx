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

/* ---------- Coordonnées Officielles (Rétablies) ---------- */
export const PHONE_DISPLAY = "+228 98 93 02 11";
export const PHONE_HREF = "tel:+22898930211";
export const WHATSAPP_LABEL = "Envoyez un message à Stage Kékéli sur WhatsApp";
export const WHATSAPP_HREF = "https://wa.me/22898930211";

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className || "h-4 w-4"}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
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
  const step = steps[activeStep] || steps[0];

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
  {
    q: "Quels sont les jours et horaires des cours ?",
    a: "Les cours de répétition se déroulent exclusivement le samedi de 8h00 à 17h00.",
  },
];

export function FaqSection({
  items = GENERAL_FAQ,
  title,
}: {
  items?: FaqItem[];
  title?: ReactNode;
}) {
  const faqList = items && items.length > 0 ? items : GENERAL_FAQ;

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
          {faqList.map((item, idx) => (
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
            {intro || <>Appelez-nous au {PHONE_DISPLAY} ou écrivez-nous sur WhatsApp pour organiser les séances du samedi.</>}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-4 text-sm font-bold text-slate-950 hover:bg-[#128C7E] hover:text-white transition shadow-md"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Écrire sur WhatsApp ({PHONE_DISPLAY})
            </a>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-4 text-sm font-bold text-foreground hover:bg-muted transition"
            >
              <Phone className="h-5 w-5" />
              Appeler le {PHONE_DISPLAY}
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
