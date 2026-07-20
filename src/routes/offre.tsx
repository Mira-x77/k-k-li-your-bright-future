import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Calculator,
  FlaskConical,
  Globe2,
  Languages,
  Sparkles,
  ClipboardCheck,
  Target,
  LineChart,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/site-chrome";

export const Route = createFileRoute("/offre")({
  head: () => ({
    meta: [
      { title: "Notre offre — Stage Kékéli" },
      {
        name: "description",
        content:
          "12 matières enseignées du collège à la Terminale : maths, sciences, français, anglais, philosophie. Méthode « Lumière » et suivi personnalisé.",
      },
      { property: "og:title", content: "Notre offre — Stage Kékéli" },
      {
        property: "og:description",
        content: "Matières, niveaux et méthode pédagogique de Stage Kékéli à Lomé.",
      },
    ],
  }),
  component: OffrePage,
});

const subjects = [
  { icon: Calculator, name: "Mathématiques", desc: "Algèbre, géométrie, analyse — de la 6e à la Terminale.", levels: "Tous niveaux" },
  { icon: FlaskConical, name: "Sciences Physiques", desc: "Physique, chimie, expériences guidées et exercices ciblés.", levels: "Collège & Lycée" },
  { icon: BookOpen, name: "Français & Philosophie", desc: "Rédaction, dissertation, préparation aux examens du Bac.", levels: "Collège & Lycée" },
  { icon: Languages, name: "Anglais", desc: "Compréhension, expression et confiance à l'oral.", levels: "Tous niveaux" },
  { icon: Globe2, name: "Histoire-Géographie", desc: "Méthodologie, cartes, dissertations et commentaires.", levels: "Collège & Lycée" },
  { icon: Sparkles, name: "SVT & Informatique", desc: "Sciences de la vie et initiation aux outils numériques.", levels: "Tous niveaux" },
];

const method = [
  { icon: ClipboardCheck, title: "Diagnostic", desc: "Évaluation des acquis et objectifs clairs dès la première séance." },
  { icon: Target, title: "Plan personnalisé", desc: "Un programme sur mesure, matière par matière, adapté au rythme de l'élève." },
  { icon: LineChart, title: "Suivi mesuré", desc: "Rapport hebdomadaire, bilans mensuels et point trimestriel aux parents." },
];

function OffrePage() {
  return (
    <>
      <PageHero
        eyebrow="Notre offre"
        title={<>Des matières couvertes <span className="italic">avec exigence</span> et bienveillance.</>}
        intro="Collège et lycée — toutes séries. Chaque élève bénéficie d'un diagnostic initial, d'un plan de travail sur mesure et de séances régulières animées par un répétiteur qualifié."
      />
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map(({ icon: Icon, name, desc, levels }, i) => (
            <Reveal key={name} anim="up" delay={i * 80}>
              <div className="group h-full overflow-hidden rounded-2xl border border-border bg-card p-7 transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-warm)]">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[color:var(--sun)]/30 text-[color:var(--sun-deep)] transition group-hover:bg-[color:var(--sun)]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl">{name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                <div className="mt-5 text-[11px] font-semibold uppercase tracking-widest text-[color:var(--sun-deep)]">
                  {levels}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="border-y border-border bg-card/60">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--sun-deep)]">
                Méthode Lumière
              </div>
              <h2 className="mt-4 text-4xl md:text-5xl">
                Trois étapes pour <span className="italic">révéler</span> chaque élève.
              </h2>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {method.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} anim={i === 0 ? "left" : i === 2 ? "right" : "up"} delay={i * 120}>
                <div className="h-full rounded-2xl border border-border bg-background p-7">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[color:var(--ink)] text-[color:var(--sun)]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Étape {i + 1}
                  </div>
                  <h3 className="mt-1 text-2xl">{title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-20 text-center">
        <Reveal>
          <h2 className="text-3xl md:text-4xl">Une matière en particulier ?</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Parlez-nous du niveau et des objectifs de votre enfant — nous construisons son parcours.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Nous contacter <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>
    </>
  );
}