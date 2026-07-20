import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Award, HeartHandshake } from "lucide-react";
import tutor1 from "@/assets/tutor-1.jpg";
import tutor2 from "@/assets/tutor-2.jpg";
import tutor3 from "@/assets/tutor-3.jpg";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/site-chrome";

export const Route = createFileRoute("/repetiteurs")({
  head: () => ({
    meta: [
      { title: "Nos répétiteurs — Stage Kékéli" },
      {
        name: "description",
        content:
          "Découvrez les répétiteurs de Stage Kékéli à Lomé : enseignants et étudiants avancés, sélectionnés pour leur excellence académique et pédagogique.",
      },
      { property: "og:title", content: "Nos répétiteurs — Stage Kékéli" },
      {
        property: "og:description",
        content: "Des enseignants qui inspirent — l'équipe pédagogique Stage Kékéli.",
      },
    ],
  }),
  component: TutorsPage,
});

const tutors = [
  {
    img: tutor1,
    name: "Mme Adjo K.",
    role: "Lettres & Français",
    years: "8 ans d'expérience",
    bio: "Agrégée de lettres, spécialiste de la dissertation et de la préparation au Bac de français.",
    tags: ["Français", "Philosophie", "Méthodologie"],
  },
  {
    img: tutor2,
    name: "Mlle Efua M.",
    role: "Mathématiques",
    years: "Ingénieure — 5 ans",
    bio: "Ingénieure diplômée. Passionnée par la démystification des maths et l'accompagnement à la Terminale S.",
    tags: ["Maths", "Sciences", "Terminale"],
  },
  {
    img: tutor3,
    name: "M. Kodjo A.",
    role: "Physique-Chimie",
    years: "Docteur — 10 ans",
    bio: "Docteur en physique. Approche expérimentale, exercices ciblés et rigueur bienveillante.",
    tags: ["Physique", "Chimie", "SVT"],
  },
];

const values = [
  { icon: BadgeCheck, title: "Sélection exigeante", desc: "Chaque répétiteur est évalué sur ses compétences académiques et pédagogiques." },
  { icon: Award, title: "Formation continue", desc: "Ateliers réguliers autour de la méthode Kékéli et des retours parents." },
  { icon: HeartHandshake, title: "Éthique & bienveillance", desc: "Nous choisissons des enseignants qui croient au potentiel de chaque élève." },
];

function TutorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Nos répétiteurs"
        title={<>Des enseignants <span className="italic">qui inspirent</span>.</>}
        intro="Enseignants confirmés et étudiants avancés — tous sélectionnés pour leur excellence académique et leur sens de la transmission."
      />
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 md:grid-cols-3">
          {tutors.map((t, i) => (
            <Reveal key={t.name} anim="up" delay={i * 120}>
              <figure className="group">
                <div className="relative overflow-hidden rounded-2xl border border-border">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                    loading="lazy"
                    width={800}
                    height={1000}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[color:var(--ink)]/85 to-transparent p-5">
                    <div className="font-display text-2xl text-[color:var(--cream)]" style={{ fontFamily: "var(--font-display)" }}>
                      {t.name}
                    </div>
                    <div className="text-sm text-[color:var(--sun)]">{t.role}</div>
                  </div>
                </div>
                <figcaption className="mt-4">
                  <div className="text-xs uppercase tracking-widest text-[color:var(--sun-deep)]">
                    {t.years}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{t.bio}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {t.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-card px-3 py-1 text-[11px] font-medium text-foreground/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="border-y border-border bg-card/60">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--sun-deep)]">
                Notre engagement
              </div>
              <h2 className="mt-4 text-4xl md:text-5xl">
                Une équipe <span className="italic">exigeante</span>, choisie avec soin.
              </h2>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} anim="up" delay={i * 120}>
                <div className="h-full rounded-2xl border border-border bg-background p-7">
                  <Icon className="h-7 w-7 text-[color:var(--sun-deep)]" />
                  <h3 className="mt-4 text-xl">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Rejoindre l'équipe <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}