import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, HeartHandshake, MapPin, Sparkles } from "lucide-react";
import tutoringImg from "@/assets/tutoring.jpg";
import { Reveal } from "@/components/reveal";
import { CallbackCta, SectionHeading } from "@/components/marketing";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos — Stage Kékéli" },
      {
        name: "description",
        content:
          "Stage Kékéli — la lumière qui guide vers la réussite. Notre histoire, notre mission et nos valeurs, en mathématiques et en physique, pour les élèves de Première C & D et Terminale C & D à Lomé.",
      },
      { property: "og:title", content: "À propos — Stage Kékéli" },
      {
        property: "og:description",
        content: "L'histoire et les valeurs de Stage Kékéli à Lomé, Togo.",
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    icon: BadgeCheck,
    title: "Sélection exigeante",
    desc: "Chaque répétiteur est évalué sur ses résultats académiques et sur un entretien pédagogique avant de rejoindre l'équipe.",
  },
  {
    icon: Sparkles,
    title: "Méthode Lumière",
    desc: "Diagnostic, plan personnalisé, exercices guidés puis autonomie : une progression structurée et mesurable.",
  },
  {
    icon: HeartHandshake,
    title: "Éthique & bienveillance",
    desc: "Nous choisissons des enseignants qui croient au potentiel de chaque élève, sans jamais l'humilier.",
  },
];

function AboutPage() {
  return (
    <>
      <section className="hero-clean-bg border-b border-border/50">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center md:py-20">
          <Reveal>
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--sun-deep)]">
              Notre histoire
            </div>
            <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              La lumière qui éclaire chaque parcours
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
              « Kékéli » signifie la lumière en langue éwé. Notre mission : révéler le potentiel des
              élèves togolais avec méthode, régularité et confiance.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-14 px-6 py-20 md:grid-cols-2 md:items-center">
        <Reveal anim="left">
          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] border border-border shadow-[var(--shadow-warm)]">
              <img
                src={tutoringImg}
                alt="Séance de tutorat en petit groupe"
                className="h-full w-full object-cover"
                loading="lazy"
                width={1400}
                height={1000}
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden rounded-2xl bg-[color:var(--sun)] px-5 py-4 text-[color:var(--ink)] shadow-[var(--shadow-warm)] sm:block">
              <div className="text-2xl font-black leading-none tracking-tight">Kékéli</div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-widest">
                /ke.ke.li/ · lumière
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal anim="right">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--sun-deep)]">
              Notre mission
            </div>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
              Un accompagnement qui éclaire chaque étape
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Fondée à Lomé par deux associés passionnés d'éducation, Stage Kékéli réunit des
              répétiteurs de mathématiques et de physique au service des élèves de Première et
              Terminale, séries C & D. Nous croyons que chaque élève porte une lumière — notre rôle
              est de la révéler.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                [
                  "Diagnostic personnalisé",
                  "Nous évaluons les acquis et fixons des objectifs clairs dès la première séance.",
                ],
                [
                  "Répétiteurs sélectionnés",
                  "Enseignants et étudiants avancés, formés à notre méthode pédagogique.",
                ],
                [
                  "Suivi transparent aux parents",
                  "Rapport de progression régulier via l'application mobile.",
                ],
              ].map(([t, d], i) => (
                <Reveal key={t} anim="up" delay={i * 90}>
                  <li className="flex gap-4">
                    <div className="mt-1.5 h-2 w-2 flex-none rounded-full bg-[color:var(--sun-deep)]" />
                    <div>
                      <div className="font-bold">{t}</div>
                      <div className="mt-0.5 text-sm text-muted-foreground">{d}</div>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/repetiteurs"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground transition hover:opacity-90"
              >
                Rencontrer l'équipe <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/offre"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-bold transition hover:bg-muted"
              >
                Découvrir nos programmes
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-border bg-card/50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeading
            eyebrow="Nos engagements"
            title={<>Ce qui ne se négocie pas chez nous</>}
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} anim="up" delay={i * 100}>
                <div className="h-full rounded-2xl border border-border bg-background p-7">
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--ink)] text-[color:var(--sun)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading eyebrow="Infos pratiques" title={<>Où nous intervenons</>} />
        <div className="mx-auto mt-12 max-w-2xl">
          <Reveal anim="up">
            <div className="h-full rounded-2xl border border-border bg-card p-7">
              <MapPin className="h-5 w-5 text-[color:var(--sun-deep)]" />
              <h3 className="mt-4 text-lg font-bold">Lomé, Togo</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Nos séances se déroulent à Lomé. Créneaux et modalités communiqués sur demande.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CallbackCta />
    </>
  );
}
