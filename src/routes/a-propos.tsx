import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import tutoringImg from "@/assets/tutoring.jpg";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/site-chrome";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos — Stage Kékéli" },
      {
        name: "description",
        content:
          "Stage Kékéli — la lumière qui guide vers la réussite. Notre histoire, notre mission et nos valeurs pour les élèves de Lomé.",
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

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Notre histoire"
        title={<>La lumière <span className="italic">qui éclaire</span> chaque parcours.</>}
        intro="« Kékéli » signifie la lumière en langue éwé. Notre mission : révéler le potentiel des élèves togolais avec méthode, régularité et confiance."
      />
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
              <div
                className="font-display text-2xl leading-none"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Kékéli
              </div>
              <div className="text-xs uppercase tracking-widest">/ke.ke.li/ · lumière</div>
            </div>
          </div>
        </Reveal>
        <Reveal anim="right">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--sun-deep)]">
              Notre mission
            </div>
            <h2 className="mt-4 text-4xl md:text-5xl">
              Un accompagnement <span className="italic">qui éclaire</span> chaque étape.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Fondée à Lomé par deux associés passionnés d'éducation, Stage Kékéli réunit
              des répétiteurs engagés au service des collégiens et lycéens du Togo. Nous
              croyons que chaque élève porte une lumière — notre rôle est de la révéler.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                ["Diagnostic personnalisé", "Nous évaluons les acquis et fixons des objectifs clairs dès la première séance."],
                ["Répétiteurs sélectionnés", "Enseignants et étudiants avancés, formés à notre méthode pédagogique."],
                ["Suivi transparent aux parents", "Rapport de progression régulier via l'application mobile."],
              ].map(([t, d], i) => (
                <Reveal key={t} anim="up" delay={i * 100}>
                  <li className="flex gap-4">
                    <div className="mt-1.5 h-2 w-2 flex-none rounded-full bg-[color:var(--sun-deep)]" />
                    <div>
                      <div className="font-semibold">{t}</div>
                      <div className="text-sm text-muted-foreground">{d}</div>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
            <Link
              to="/contact"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Nous rencontrer <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}