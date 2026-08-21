import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, ChevronLeft, ChevronRight, GraduationCap, HeartHandshake } from "lucide-react";
import { useCallback, useState } from "react";
import kolouDavid from "@/assets/kolou-david.jpg";
import kofi from "@/assets/kofi.jpg";
import { Reveal } from "@/components/reveal";
import {
  TutorArcCarousel,
  type TutorCarouselItem,
} from "@/components/tutor-arc-carousel";

export const Route = createFileRoute("/repetiteurs")({
  head: () => ({
    meta: [
      { title: "Nos répétiteurs — Stage Kékéli" },
      {
        name: "description",
        content:
          "Les répétiteurs de Stage Kékéli à Lomé : mathématiques et physique, pour les élèves de Première et Terminale, séries C & D.",
      },
      { property: "og:title", content: "Nos répétiteurs — Stage Kékéli" },
      {
        property: "og:description",
        content:
          "L'équipe pédagogique Stage Kékéli en mathématiques et en physique, à Lomé.",
      },
    ],
  }),
  component: TutorsPage,
});

const tutors: TutorCarouselItem[] = [
  {
    img: kolouDavid,
    name: "M. KOLOU David",
    role: "Mathématiques",
    bio: "Titulaire d'un BAC série C, en formation de Mathématiques à l'Université. Encadre les élèves de Première & Terminale C & D avec rigueur et passion.",
    tags: ["Mathématiques", "Première & Terminale C & D"],
  },
  {
    img: kofi,
    name: "M. KOFI",
    role: "Physique-Chimie",
    bio: "Titulaire d'un BAC série D, en formation de Physique et d'Informatique à l'Université. Accompagne les élèves avec méthode et clarté.",
    tags: ["Physique-Chimie", "Première & Terminale C & D"],
  },
];

const values = [
  {
    icon: GraduationCap,
    title: "Exigence académique",
    desc: "Nous tenons à ce que chaque répétiteur maîtrise le programme de sa matière en Première et Terminale, séries C & D.",
  },
  {
    icon: BookOpen,
    title: "Clarté pédagogique",
    desc: "Reprendre le cours, puis les exercices d'application, jusqu'à ce que la notion soit comprise.",
  },
  {
    icon: HeartHandshake,
    title: "Éthique & bienveillance",
    desc: "Un cadre où l'élève ose poser ses questions et revenir sur ce qu'il n'a pas compris.",
  },
];

function TutorsPage() {
  const [active, setActive] = useState(tutors[0]);

  const handleActiveChange = useCallback((tutor: TutorCarouselItem) => {
    setActive(tutor);
  }, []);

  return (
    <>
      <section className="hero-clean-bg border-b border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-4 sm:pb-6 pt-8 sm:pt-12 text-center md:pt-16">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--sage)]">
              Nos répétiteurs
            </p>
            <h1 className="mx-auto mt-3 sm:mt-4 max-w-2xl font-sans text-2xl sm:text-4xl font-bold tracking-tight md:text-5xl">
              Des enseignants qui inspirent
            </h1>
            <p className="mx-auto mt-3 sm:mt-4 max-w-xl text-sm sm:text-base text-muted-foreground">
              Parcourez notre équipe de répétiteurs en mathématiques et en physique, pour la
              Première et la Terminale, séries C & D.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-4 pt-2 sm:px-6">
          <TutorArcCarousel tutors={tutors} onActiveChange={handleActiveChange} />
        </div>

        <div className="mx-auto max-w-lg px-4 sm:px-6 pb-8 sm:pb-10 pt-0 text-center">
          <Reveal key={active.name}>
            <div className="font-display text-xl sm:text-2xl" style={{ fontFamily: "var(--font-display)" }}>
              {active.name}
            </div>
            <div className="mt-1 text-sm font-medium text-[color:var(--sun-deep)]">
              {active.role}
            </div>
            {active.years && (
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                {active.years}
              </div>
            )}
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{active.bio}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {active.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-card px-3 py-1 text-[11px] font-medium text-foreground/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>

          <div className="mt-8 flex items-center justify-center gap-3 text-xs text-muted-foreground">
            <ChevronLeft className="h-4 w-4 opacity-40" aria-hidden />
            <span>Défilement automatique · touchez pour pause</span>
            <ChevronRight className="h-4 w-4 opacity-40" aria-hidden />
          </div>
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
                Ce à quoi nous <span className="italic">tenons</span>.
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
