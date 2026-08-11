import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { FaqSection, SectionHeading, type FaqItem } from "@/components/marketing";

export const Route = createFileRoute("/tarifs")({
  head: () => ({
    meta: [
      { title: "Tarifs & inscription — Stage Kékéli" },
      {
        name: "description",
        content:
          "Grille tarifaire Stage Kékéli : 2 500 FCFA par mois et par matière, ou 22 500 FCFA par an et par matière. Inscription unique de 1 500 FCFA. Mathématiques et physique, séries C & D.",
      },
      { property: "og:title", content: "Tarifs Stage Kékéli — Simple et transparent" },
      {
        property: "og:description",
        content:
          "2 500 FCFA par mois et par matière pour la Première et la Terminale, séries C & D, à Lomé.",
      },
    ],
  }),
  component: PricingPage,
});

const MONTHLY_PER_SUBJECT = 2500;
const ANNUAL_PER_SUBJECT = 22500;
const ANNUAL_MONTHS = 9;
const REGISTRATION_FEE = 1500;

const PLANS = [
  {
    label: "Formule mensuelle",
    price: MONTHLY_PER_SUBJECT,
    unit: "par mois",
    note: "Pour les deux matières, mathématiques et physique : 5 000 FCFA par mois.",
    featured: true,
  },
  {
    label: "Formule annuelle",
    price: ANNUAL_PER_SUBJECT,
    unit: "par an",
    note: "Le même tarif réglé en une fois, sur les 9 mois de l'année scolaire (9 × 2 500 FCFA). Pour les deux matières : 45 000 FCFA par an.",
    featured: false,
  },
];

const INCLUDED = [
  "Droits aux examens durant toute l'année",
  "Accès gratuit à GoStudy",
  "Accompagnement personnalisé",
];

const PRICING_FAQ: FaqItem[] = [
  {
    q: "Quels niveaux accompagnez-vous ?",
    a: "Nous accompagnons uniquement la Première et la Terminale, séries C & D, afin de concentrer notre pédagogie sur les programmes scientifiques du Bac.",
  },
  {
    q: "Comment le tarif est-il calculé ?",
    a: "Le tarif est de 2 500 FCFA par mois et par matière. Un élève qui suit les mathématiques et la physique paie donc 5 000 FCFA par mois. La formule annuelle applique le même tarif réglé en une fois : 22 500 FCFA par an et par matière, soit 9 mois d'école.",
  },
  {
    q: "Y a-t-il des frais d'inscription ?",
    a: "Inscription : 1 500 FCFA — frais uniques, quel que soit le nombre de matières suivies. S'y ajoute uniquement la Taxe sur les Activités Financières (environ 10%) sur les paiements Mobile Money, affichée avant validation.",
  },
];

const fmt = (n: number) => n.toLocaleString("fr-FR");

function PricingPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[color:var(--ink)] text-[color:var(--cream)]">
        <div className="sun-glow absolute inset-0 opacity-25" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-24">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <div className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--sun)]">
                Tarifs & inscription
              </div>
              <h1 className="mt-4 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                Une grille simple et transparente
              </h1>
              <p className="mt-5 text-lg text-[color:var(--cream)]/80">
                Mathématiques et physique, en Première et Terminale, séries C & D. Les tarifs
                s'entendent <strong className="text-[color:var(--sun)]">par matière</strong>.
              </p>
            </div>
          </Reveal>

          <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-2">
            {PLANS.map((plan, i) => (
              <Reveal key={plan.label} delay={80 + i * 80}>
                <div
                  className={`relative flex h-full flex-col rounded-3xl border p-7 transition duration-300 hover:-translate-y-1 md:p-9 ${
                    plan.featured
                      ? "border-[color:var(--sun)] bg-[color:var(--sun)] text-[color:var(--ink)]"
                      : "border-[color:var(--cream)]/30 bg-[color:var(--cream)]/10 text-[color:var(--cream)]"
                  }`}
                >
                  {plan.featured && (
                    <span className="absolute -top-3 left-7 rounded-full bg-[color:var(--ink)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[color:var(--sun)]">
                      Notre spécialité
                    </span>
                  )}
                  <div className="text-sm font-bold uppercase tracking-[0.18em] opacity-80">
                    {plan.label}
                  </div>
                  <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-5xl font-black leading-none tracking-tight">
                      {fmt(plan.price)}
                    </span>
                    <span className="text-xl font-bold">FCFA</span>
                    <span className="text-base font-semibold opacity-80">{plan.unit}</span>
                  </div>
                  <span
                    className={`mt-4 inline-flex w-fit rounded-full px-4 py-1.5 text-sm font-bold ${
                      plan.featured
                        ? "bg-[color:var(--ink)] text-[color:var(--sun)]"
                        : "bg-[color:var(--sun)] text-[color:var(--ink)]"
                    }`}
                  >
                    par matière
                  </span>
                  <p className="mt-5 flex-1 text-base leading-relaxed opacity-85">{plan.note}</p>
                  <Link
                    to="/contact"
                    className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-bold transition hover:opacity-90 ${
                      plan.featured
                        ? "bg-[color:var(--ink)] text-[color:var(--sun)]"
                        : "bg-[color:var(--sun)] text-[color:var(--ink)]"
                    }`}
                  >
                    S'inscrire <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mx-auto mt-6 max-w-4xl">
            <Reveal delay={160}>
              <div className="flex flex-col gap-5 rounded-3xl border border-[color:var(--sun)]/50 bg-[color:var(--cream)]/10 p-7 sm:flex-row sm:items-center sm:gap-8 md:p-9">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-4xl font-black leading-none tracking-tight text-[color:var(--sun)] sm:text-5xl">
                    {fmt(REGISTRATION_FEE)}
                  </span>
                  <span className="text-lg font-bold text-[color:var(--sun)]">FCFA</span>
                </div>
                <p className="text-base leading-relaxed text-[color:var(--cream)] sm:text-lg">
                  <strong className="font-black">Inscription : {fmt(REGISTRATION_FEE)} FCFA</strong>{" "}
                  — frais uniques, quel que soit le nombre de matières suivies.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="mx-auto mt-6 max-w-4xl">
            <Reveal delay={200}>
              <div className="rounded-3xl border border-[color:var(--cream)]/25 bg-[color:var(--cream)]/10 p-7 md:p-9">
                <div className="text-sm font-bold uppercase tracking-[0.18em] text-[color:var(--sun)]">
                  Compris dans les deux formules
                </div>
                <ul className="mt-5 grid gap-3 text-base text-[color:var(--cream)] sm:grid-cols-3">
                  {INCLUDED.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check className="mt-1 h-4 w-4 flex-none text-[color:var(--sun)]" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-7 border-t border-[color:var(--cream)]/20 pt-6 text-base leading-relaxed text-[color:var(--cream)]/85">
                  La formule annuelle correspond aux {ANNUAL_MONTHS} mois de l'année scolaire. Une
                  TAF d'environ 10% s'applique aux paiements Mobile Money conformément à la
                  réglementation togolaise, et le récapitulatif complet est présenté avant
                  validation.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="Comment s'inscrire"
          title={<>Trois étapes, sans détour</>}
          intro="De votre premier message à la première séance, le parcours est volontairement court."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            {
              t: "Vous nous écrivez",
              d: "Via le formulaire de contact ou par e-mail à contact@stagekekeli.tg. Nous cernons la série, les matières et vos disponibilités.",
            },
            {
              t: "Nous cadrons le programme",
              d: "Un répétiteur fait le point sur les acquis de votre enfant et propose un plan de travail écrit.",
            },
            {
              t: "Inscription et démarrage",
              d: "Vous réglez l'inscription et le premier mois — ou l'année — par Mobile Money, puis les séances peuvent commencer.",
            },
          ].map((s, i) => (
            <Reveal key={s.t} anim="up" delay={i * 100}>
              <div className="h-full rounded-2xl border border-border bg-card p-7">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--sun-deep)] text-sm font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-lg font-bold">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <FaqSection items={PRICING_FAQ} title={<>Questions sur les tarifs</>} />
    </>
  );
}
