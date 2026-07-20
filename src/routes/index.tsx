import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-student.jpg";
import tutoringImg from "@/assets/tutoring.jpg";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Clock,
  Users,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Typewriter } from "@/components/typewriter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Stage Kékéli — La lumière qui guide vers la réussite scolaire" },
      {
        name: "description",
        content:
          "Cours de répétition et accompagnement scolaire à Lomé, Togo. Collège & Lycée — répétiteurs qualifiés, suivi personnalisé, paiement Mobile Money.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <Trust />
      <Teasers />
      <FinalCTA />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 sun-glow opacity-70" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-6 py-20 md:grid-cols-[1.05fr_0.95fr] md:py-28 lg:py-32">
        <div className="flex flex-col justify-center">
          <Reveal anim="left">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-foreground/70 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--sun-deep)]" />
              Cours de répétition — Lomé, Togo
            </span>
          </Reveal>
          <Reveal anim="left" delay={100}>
            <h1 className="mt-6 text-5xl leading-[1.02] md:text-6xl lg:text-7xl">
              La lumière qui guide
              <br />
              vers la{" "}
              <span className="italic text-[color:var(--sun-deep)]">
                <Typewriter
                  words={["réussite.", "confiance.", "excellence.", "lumière."]}
                />
              </span>
            </h1>
          </Reveal>
          <Reveal anim="left" delay={200}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              <em>« Kékéli »</em> signifie la lumière en éwé. Nous accompagnons chaque
              élève du collège et du lycée avec des répétiteurs qualifiés, un suivi
              personnalisé et un rapport transparent aux parents.
            </p>
          </Reveal>
          <Reveal anim="up" delay={300}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                to="/tarifs"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-warm)] transition hover:-translate-y-0.5 hover:opacity-90"
              >
                Inscrire mon enfant <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/offre"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground transition hover:bg-muted"
              >
                Découvrir nos matières
              </Link>
            </div>
          </Reveal>
          <Reveal anim="up" delay={400}>
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-8">
              {[
                ["+250", "élèves accompagnés"],
                ["12", "matières enseignées"],
                ["96%", "de parents satisfaits"],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt
                    className="font-display text-3xl text-foreground"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {n}
                  </dt>
                  <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                    {l}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
        <Reveal anim="right" delay={150}>
          <div className="relative">
            <div
              className="kk-float absolute -right-6 -top-6 h-64 w-64 rounded-full bg-[color:var(--sun)] blur-3xl opacity-60"
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-[2rem] border border-border shadow-[var(--shadow-warm)]">
              <img
                src={heroImg}
                alt="Élève souriant au travail"
                className="h-full w-full object-cover transition duration-700 hover:scale-[1.03]"
                width={1400}
                height={1600}
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden max-w-[16rem] rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-soft)] sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--sun)] text-[color:var(--ink)]">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Suivi personnalisé</div>
                  <div className="text-xs text-muted-foreground">
                    Rapport hebdomadaire aux parents
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Trust() {
  const items = [
    { icon: Users, label: "Répétiteurs vérifiés" },
    { icon: ShieldCheck, label: "Paiement sécurisé Mobile Money" },
    { icon: Clock, label: "Séances flexibles, 7j/7" },
    { icon: Sparkles, label: "Méthode « Lumière »" },
  ];
  return (
    <section className="border-y border-border bg-card/50">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-8 md:grid-cols-4">
        {items.map(({ icon: Icon, label }, i) => (
          <Reveal key={label} anim="up" delay={i * 90}>
            <div className="flex items-center gap-3">
              <Icon className="h-5 w-5 text-[color:var(--sun-deep)]" />
              <span className="text-sm font-medium text-foreground/80">{label}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Teasers() {
  const cards = [
    {
      to: "/offre" as const,
      eyebrow: "Notre offre",
      title: "12 matières, du Collège à la Terminale",
      desc: "Diagnostic initial, plan personnalisé, séances régulières animées par des répétiteurs qualifiés.",
      icon: BookOpen,
    },
    {
      to: "/repetiteurs" as const,
      eyebrow: "Nos répétiteurs",
      title: "Des enseignants qui inspirent",
      desc: "Sélectionnés pour leur excellence académique et leur sens de la transmission.",
      icon: Users,
    },
    {
      to: "/tarifs" as const,
      eyebrow: "Tarifs",
      title: "Une grille simple et transparente",
      desc: "À partir de 15 000 FCFA/mois pour le collège. Cours particuliers sur devis.",
      icon: GraduationCap,
    },
    {
      to: "/paiement" as const,
      eyebrow: "Paiement",
      title: "Réglez par Mobile Money",
      desc: "MTN, Moov, Orange. Reçu par SMS, TAF 10% intégrée automatiquement.",
      icon: ShieldCheck,
    },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--sun-deep)]">
            Explorer Stage Kékéli
          </div>
          <h2 className="mt-4 text-4xl md:text-5xl">
            Tout ce qu'il faut pour <span className="italic">réussir</span>.
          </h2>
        </div>
      </Reveal>
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ icon: Icon, ...c }, i) => (
          <Reveal key={c.to} anim="up" delay={i * 100}>
            <Link
              to={c.to}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-7 transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-warm)]"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[color:var(--sun)]/30 text-[color:var(--sun-deep)] transition group-hover:bg-[color:var(--sun)]">
                <Icon className="h-6 w-6" />
              </div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--sun-deep)]">
                {c.eyebrow}
              </div>
              <h3 className="mt-2 text-xl">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
              <div className="mt-auto pt-6 text-sm font-semibold text-foreground inline-flex items-center gap-1 transition group-hover:gap-2">
                En savoir plus <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="bg-card/60 border-y border-border">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center">
        <Reveal anim="left">
          <div className="overflow-hidden rounded-[2rem] border border-border shadow-[var(--shadow-warm)]">
            <img
              src={tutoringImg}
              alt="Séance de tutorat"
              className="h-full w-full object-cover"
              loading="lazy"
              width={1400}
              height={1000}
            />
          </div>
        </Reveal>
        <Reveal anim="right">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--sun-deep)]">
              Prêts à commencer ?
            </div>
            <h2 className="mt-4 text-4xl md:text-5xl">
              Faisons briller <span className="italic">le potentiel</span> de votre enfant.
            </h2>
            <p className="mt-6 text-muted-foreground">
              Un conseiller vous répond sous 24h. Prise en charge dès la semaine suivante.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                Nous contacter <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/a-propos"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition hover:bg-muted"
              >
                Notre histoire
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}