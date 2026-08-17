import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Smartphone } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { CallbackCta, FaqSection, type FaqItem } from "@/components/marketing";

export const Route = createFileRoute("/tarifs")({
  head: () => ({
    meta: [
      { title: "Tarifs Officiels — Stage Kékéli" },
      {
        name: "description",
        content:
          "Consultez les tarifs de Stage Kékéli : 2 500 FCFA / mois par matière, 22 500 FCFA / an par matière, 1 500 FCFA d'inscription. Transparence totale TAF Moov Money 10%.",
      },
      { property: "og:title", content: "Tarifs Officiels — Stage Kékéli" },
      {
        property: "og:description",
        content: "Grille tarifaire claire et sans frais cachés pour la Première & Terminale C & D.",
      },
    ],
  }),
  component: TarifsPage,
});

const TARIFS_FAQ: FaqItem[] = [
  {
    q: "Y a-t-il des frais cachés en dehors du tarif annoncé ?",
    a: "Non. Seuls s'appliquent les 2 500 FCFA/mois par matière (ou 22 500 FCFA/an), les 1 500 FCFA d'inscription unique et, en cas de paiement Mobile Money, la TAF de 10% prélevée par l'opérateur.",
  },
  {
    q: "Puis-je inscrire mon enfant pour une seule matière ?",
    a: "Oui. Vous pouvez choisir uniquement les Mathématiques ou uniquement la Physique-Chimie. La formule reste à 2 500 FCFA/mois (ou 22 500 FCFA/an).",
  },
  {
    q: "Comment fonctionne la remise annuelle ?",
    a: "En choisissant le paiement annuel (22 500 FCFA/an par matière), vous réglez l'année scolaire de 9 mois en une seule fois.",
  },
];

function TarifsPage() {
  const plans = [
    {
      title: "Formule Mensuelle",
      price: "2 500",
      unit: "FCFA / mois par matière",
      note: "Idéal pour débuter et tester le suivi personnalisé mois par mois.",
      features: [
        "Choix : Maths, Physique ou les deux",
        "Groupes réduits de 10 élèves max",
        "Supports et annales d'examens inclus",
        "Bilan mensuel transmis aux parents",
      ],
      featured: false,
    },
    {
      title: "Formule Annuelle (Recommandée)",
      price: "22 500",
      unit: "FCFA / an par matière",
      note: "Paiement en 1 fois pour toute l'année scolaire (9 mois).",
      features: [
        "Inscrivez votre enfant pour toute l'année",
        "Choix : Maths, Physique ou les deux",
        "Place garantie pour toute l'année",
        "Accès prioritaire aux Séances du Samedi",
        "Supports complets d'examens offerts",
      ],
      featured: true,
    },
  ];

  return (
    <>
      <section className="hero-clean-bg border-b border-border/50">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center md:py-20">
          <Reveal>
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--sun-deep)]">
              Grille Tarifaire Offiicielle
            </div>
            <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              Des tarifs clairs pour l'excellence scientifique
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
              Sans frais cachés, adaptés aux séries Première C, Première D, Terminale C et Terminale D à Lomé.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 md:grid-cols-2 lg:items-stretch">
          {plans.map((plan, i) => (
            <Reveal key={plan.title} anim="up" delay={i * 120}>
              <div
                className={`relative flex h-full flex-col rounded-3xl p-8 transition md:p-10 ${
                  plan.featured
                    ? "bg-[color:var(--sun)] text-[color:var(--ink)] shadow-[var(--shadow-warm)] ring-2 ring-[color:var(--sun-deep)]"
                    : "border border-border bg-card text-card-foreground"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3.5 right-8 rounded-full bg-[color:var(--ink)] px-4 py-1 text-xs font-black uppercase tracking-wider text-[color:var(--sun)] shadow-sm">
                    Recommandé
                  </div>
                )}
                <div className="text-lg font-bold">{plan.title}</div>
                <div className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-4xl font-black tracking-tight sm:text-5xl">
                    {plan.price}
                  </span>
                  <span className="text-xl font-bold">FCFA</span>
                </div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider opacity-80">
                  {plan.unit}
                </div>
                <p className="mt-5 flex-1 text-base leading-relaxed opacity-85">{plan.note}</p>
                <ul className="mt-6 space-y-2 text-sm font-semibold opacity-90">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 flex-none" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/paiement"
                  className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-bold transition hover:opacity-90 ${
                    plan.featured
                      ? "bg-[color:var(--ink)] text-[color:var(--sun)]"
                      : "bg-[color:var(--sun)] text-[color:var(--ink)]"
                  }`}
                >
                  S'inscrire Maintenant <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-4xl">
          <Reveal delay={160}>
            <div className="flex flex-col gap-5 rounded-3xl border border-[color:var(--sun)]/50 bg-[color:var(--cream)]/10 p-7 sm:flex-row sm:items-center sm:gap-8 md:p-9">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-3xl font-black">1 500</span>
                <span className="text-lg font-bold">FCFA</span>
              </div>
              <div className="flex-1">
                <div className="text-base font-bold text-foreground">Frais d'Inscription Uniques</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  Payables une seule fois lors de la première inscription, quel que soit le nombre de matières.
                </div>
              </div>
              <Link
                to="/paiement"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-bold text-primary-foreground transition hover:opacity-90"
              >
                Accéder au Formulaire <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <FaqSection items={TARIFS_FAQ} title={<>Des questions sur les tarifs ?</>} />
      <CallbackCta
        title={<>Besoin de conseils pour choisir la formule de votre enfant ?</>}
        intro="L'équipe Stage Kékéli vous guide au +228 98 93 02 11 pour sélectionner les matières adaptées."
      />
    </>
  );
}
