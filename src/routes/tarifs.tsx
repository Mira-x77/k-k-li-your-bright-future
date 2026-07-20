import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/tarifs")({
  head: () => ({
    meta: [
      { title: "Tarifs & inscription — Stage Kékéli" },
      {
        name: "description",
        content:
          "Grille tarifaire Stage Kékéli : Collège 15 000 FCFA, Seconde 20 000 FCFA, Première & Terminale 25 000 FCFA. Paiement Mobile Money.",
      },
      { property: "og:title", content: "Tarifs Stage Kékéli — Simple et transparent" },
      {
        property: "og:description",
        content: "Une grille claire pour le collège et le lycée à Lomé.",
      },
    ],
  }),
  component: PricingPage,
});

const levels = [
  {
    label: "Collège",
    detail: "6ᵉ · 5ᵉ · 4ᵉ · 3ᵉ",
    price: "15 000",
    features: [
      "Séances hebdomadaires en petit groupe",
      "Suivi personnalisé",
      "Accès application parent",
      "Bilan mensuel écrit",
    ],
  },
  {
    label: "Seconde",
    detail: "Tronc commun",
    price: "20 000",
    features: [
      "Séances hebdomadaires",
      "Préparation à l'orientation Première",
      "Suivi mensuel parent",
      "Bilans réguliers",
    ],
  },
  {
    label: "Première & Terminale",
    detail: "Toutes séries",
    price: "25 000",
    features: [
      "Séances renforcées Bac",
      "Annales et sujets blancs",
      "Suivi hebdomadaire aux parents",
      "Coaching orientation post-Bac",
    ],
  },
];

function PricingPage() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--ink)] text-[color:var(--cream)]">
      <div className="absolute inset-0 opacity-30 sun-glow" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6 py-24">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--sun)]">
              Tarifs & inscription
            </div>
            <h1 className="mt-4 text-5xl md:text-6xl">
              Une grille <span className="italic">simple</span> et transparente.
            </h1>
            <p className="mt-4 text-[color:var(--cream)]/70">
              Séances hebdomadaires en petit groupe. Cours particuliers à domicile disponibles sur devis.
            </p>
          </div>
        </Reveal>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {levels.map((l, i) => (
            <Reveal
              key={l.label}
              anim={i === 0 ? "left" : i === 2 ? "right" : "up"}
              delay={i * 120}
            >
              <div
                className={`relative h-full rounded-2xl border p-8 transition duration-300 hover:-translate-y-1 ${
                  i === 1
                    ? "border-[color:var(--sun)] bg-[color:var(--sun)] text-[color:var(--ink)]"
                    : "border-white/10 bg-white/5"
                }`}
              >
                {i === 1 && (
                  <span className="absolute -top-3 left-8 rounded-full bg-[color:var(--ink)] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[color:var(--sun)]">
                    Populaire
                  </span>
                )}
                <div className="text-sm uppercase tracking-widest opacity-70">{l.detail}</div>
                <div
                  className="mt-1 font-display text-3xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {l.label}
                </div>
                <div className="mt-6 flex items-baseline gap-2">
                  <span
                    className="font-display text-5xl"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {l.price}
                  </span>
                  <span className="text-sm opacity-70">FCFA / mois</span>
                </div>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {l.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 flex-none" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${
                    i === 1
                      ? "bg-[color:var(--ink)] text-[color:var(--sun)] hover:opacity-90"
                      : "border border-white/20 hover:bg-white/10"
                  }`}
                >
                  S'inscrire <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mx-auto mt-14 max-w-2xl text-center text-sm text-[color:var(--cream)]/60">
            Une TAF (~10%) s'applique aux paiements Mobile Money conformément à la réglementation togolaise. Le récapitulatif est présenté avant validation.
          </p>
        </Reveal>
      </div>
    </section>
  );
}