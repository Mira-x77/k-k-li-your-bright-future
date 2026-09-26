import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import heroVideo from "@/assets/hero-highlight.mp4";
import classroomBg from "@/assets/hero-classroom-session.jpg";
import classroomTables from "@/assets/classroom-tables.jpg";
import studentAtDesk from "@/assets/student-at-desk.jpg";
import locationEntrance from "@/assets/location-entrance.jpg";
import locationClassroom from "@/assets/location-classroom.jpg";
import locationBuilding from "@/assets/location-building.png";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Phone,
  MapPin,
  ShieldCheck,
  Users,
  Volume2,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Typewriter } from "@/components/typewriter";
import {
  CallbackCta,
  FaqSection,
  PHONE_DISPLAY,
  PHONE_HREF,
  SectionHeading,
  SessionFlow,
} from "@/components/marketing";

import { GoStudyPartnerSection } from "@/components/gostudy-section";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Stage Kékéli — La lumière qui guide vers la réussite scolaire" },
      {
        name: "description",
        content:
          "Cours de répétition en mathématiques et en physique à Lomé, Togo. Première et Terminale, séries C & D — 2 500 FCFA par mois et par matière, accompagnement personnalisé, paiement Mobile Money.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <Teasers />
      <WhySection />
      <SessionFlow />
      <GoStudyPartnerSection />
      <FinalCTA />
      <LocationSection />
      <FaqSection />
      <CallbackCta />
    </>
  );
}

const HERO_FEATURES = [
  {
    label: "Nouveau",
    title: "Avez-vous choisi le bon accompagnement ?",
    to: "/offre" as const,
  },
  {
    label: "Répétiteurs",
    title: "Où voulez-vous progresser aujourd'hui ?",
    to: "/repetiteurs" as const,
  },
  {
    label: "Parents",
    title: "Offrez la lumière — accompagnez votre enfant",
    to: "/tarifs" as const,
  },
];

function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.loop = true;
    video.playsInline = true;
    video.muted = true;
    video.preload = "auto";
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");
    video.setAttribute("x5-playsinline", "true");

    const tryPlay = () => {
      void video.play().catch(() => {});
    };

    const enableSound = () => {
      video.muted = false;
      video.volume = 1;
      setSoundOn(true);
      if (video.ended) video.currentTime = 0;
      tryPlay();
    };

    const restart = () => {
      video.currentTime = 0;
      video.loop = true;
      tryPlay();
    };

    tryPlay();
    video.addEventListener("ended", restart);
    window.addEventListener("pointerdown", enableSound, { once: true });
    window.addEventListener("touchstart", enableSound, { once: true, passive: true });
    window.addEventListener("keydown", enableSound, { once: true });

    return () => {
      video.removeEventListener("ended", restart);
      window.removeEventListener("pointerdown", enableSound);
      window.removeEventListener("touchstart", enableSound);
      window.removeEventListener("keydown", enableSound);
    };
  }, []);

  return (
    <section className="hero-clean-bg relative overflow-hidden">
      <img
        src={classroomBg}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-100"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/40 from-0% via-background/20 via-40% to-transparent to-75%"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background/50 to-transparent"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 pb-4 pt-8 sm:px-6 md:pt-14 lg:pt-16">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="max-w-xl">
            <Reveal anim="left">
              <h1 className="text-foreground">
                <span
                  className="block text-4xl italic leading-[1.05] sm:text-5xl lg:text-6xl"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
                >
                  Inspirer
                </span>
                <span
                  className="-mt-1 block text-5xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  la{" "}
                  <Typewriter
                    words={["réussite", "confiance", "lumière", "excellence"]}
                    className="inline-block min-w-[7ch] align-top text-[color:var(--sun-deep)]"
                  />
                </span>
              </h1>
            </Reveal>
            <Reveal anim="left" delay={80}>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
                Trouvez l'accompagnement qu'il vous faut en mathématiques et en physique — pour les
                élèves de Première et Terminale, séries C & D, à Lomé.
              </p>
            </Reveal>
          </div>

          <Reveal anim="right" delay={120}>
            <div className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none lg:mx-0">
              <div
                className="relative w-full overflow-hidden rounded-[1.5rem] bg-card/40 shadow-[var(--shadow-soft)] sm:rounded-[2rem]"
                onClick={() => {
                  const video = videoRef.current;
                  if (!video) return;
                  video.muted = false;
                  video.volume = 1;
                  setSoundOn(true);
                  void video.play().catch(() => {});
                }}
              >
                <video
                  ref={videoRef}
                  className="aspect-[3/4] max-h-[62vh] w-full object-cover sm:aspect-[4/5] sm:max-h-none"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  poster={classroomTables}
                  controls={false}
                  disablePictureInPicture
                >
                  <source src={heroVideo} type="video/mp4" />
                </video>
                {!soundOn && (
                  <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-black/65 px-3 py-1.5 text-[11px] font-semibold text-white sm:bottom-4 sm:right-4">
                    <Volume2 className="h-3.5 w-3.5" />
                    Touchez pour le son
                  </span>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-12 pt-8">
        <div className="grid gap-8 border-t border-border/50 pt-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-border/50">
          {HERO_FEATURES.map(({ label, title, to }, i) => (
            <Reveal key={to} anim="up" delay={i * 80}>
              <Link to={to} className="group block px-0 md:px-8 first:md:pl-0 last:md:pr-0">
                <p className="text-xs font-medium text-[color:var(--sage)]">{label}</p>
                <h2 className="mt-2 font-sans text-lg font-bold leading-snug text-foreground transition group-hover:text-[color:var(--sun-deep)] sm:text-xl">
                  {title}
                </h2>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Teasers() {
  const cards = [
    {
      to: "/offre" as const,
      eyebrow: "Notre offre",
      title: "Mathématiques et physique, séries C & D",
      desc: "Diagnostic initial, plan personnalisé et séances régulières animées par un répétiteur.",
      icon: BookOpen,
    },
    {
      to: "/repetiteurs" as const,
      eyebrow: "Nos répétiteurs",
      title: "Des enseignants qui inspirent",
      desc: "Des répétiteurs de mathématiques et de physique, pour la Première et la Terminale, séries C & D.",
      icon: Users,
    },
    {
      to: "/tarifs" as const,
      eyebrow: "Tarifs",
      title: "Une grille simple et transparente",
      desc: (
        <>
          <strong className="font-black text-foreground">2 500 FCFA par mois et par matière</strong>
          , ou 22 500 FCFA par an et par matière. Inscription : 1 500 FCFA, frais uniques.
        </>
      ),
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
    <section className="mx-auto max-w-7xl px-6 py-20">
      <SectionHeading
        eyebrow="Explorer Stage Kékéli"
        title={<>Tout ce qu'il faut pour réussir</>}
        intro="Un parcours complet, du diagnostic initial au suivi transmis aux parents."
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ icon: Icon, ...c }, i) => (
          <Reveal key={c.to} anim="up" delay={i * 90}>
            <Link
              to={c.to}
              className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition duration-300 hover:-translate-y-1 hover:border-[color:var(--sun-deep)]/40 hover:shadow-[var(--shadow-warm)]"
            >
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--sun)]/25 text-[color:var(--sun-deep)] transition group-hover:bg-[color:var(--sun)]">
                <Icon className="h-5 w-5" />
              </div>
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--sun-deep)]">
                {c.eyebrow}
              </div>
              <h3 className="mt-2 text-lg font-bold leading-snug">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
              <div className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-bold text-foreground transition group-hover:gap-2">
                En savoir plus <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const WHY_POINTS = [
  [
    "Savoir d'où l'on part",
    "Le diagnostic de la première séance situe ce qui est acquis et ce qui ne l'est pas, avant d'ajouter du travail.",
  ],
  [
    "Savoir quoi travailler d'abord",
    "Un plan de travail par matière, en mathématiques comme en physique, pour ne plus ouvrir ses cahiers au hasard.",
  ],
  [
    "Ne pas rester bloqué seul",
    "Un répétiteur avec qui reprendre le raisonnement, et pas seulement la réponse.",
  ],
];

function WhySection() {
  return (
    <section>
      <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-20 md:grid-cols-2 md:items-center md:gap-16">
        <Reveal anim="left">
          <div className="relative mx-auto w-full max-w-md">
            <div className="relative overflow-hidden rounded-[2rem] ring-1 ring-border shadow-[var(--shadow-warm)]">
              <img
                src={studentAtDesk}
                alt="Élève concentré à son pupitre, en train d'écrire dans son cahier"
                className="aspect-square w-full object-cover"
                loading="lazy"
                width={735}
                height={735}
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"
                aria-hidden
              />
            </div>
          </div>
        </Reveal>
        <Reveal anim="right">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--sun-deep)]">
              Pourquoi Stage Kékéli existe
            </div>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
              Travailler beaucoup, sans savoir si l'on travaille juste
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Un chapitre repris une troisième fois, des feuilles volantes qui s'empilent, un soir
              de plus à relire sans être sûr d'avoir compris. Le problème est rarement l'effort —
              c'est de ne pas savoir où le porter, et de devoir le décider seul.
            </p>
            <ul className="mt-8 space-y-4">
              {WHY_POINTS.map(([title, desc], i) => (
                <Reveal key={title} anim="up" delay={i * 90}>
                  <li className="flex gap-4">
                    <div className="mt-1.5 h-2 w-2 flex-none rounded-full bg-[color:var(--sun-deep)]" />
                    <div>
                      <div className="font-bold">{title}</div>
                      <div className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                        {desc}
                      </div>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
            <p className="mt-8 max-w-lg text-sm leading-relaxed text-foreground/85">
              Nous ne promettons pas de raccourci. Nous proposons un cadre, de la régularité, et
              quelqu'un à côté de l'élève.
            </p>
            <Link
              to="/offre"
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-bold text-foreground transition hover:bg-muted"
            >
              Voir comment nous travaillons <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="border-y border-border bg-card/60">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center">
        <Reveal anim="left">
          <div className="overflow-hidden rounded-[2rem] border border-border shadow-[var(--shadow-warm)]">
            <img
              src={classroomTables}
              alt="Répétiteur auprès des élèves autour des pupitres, pendant une séance"
              className="h-full w-full object-cover"
              loading="lazy"
              width={1400}
              height={1000}
            />
          </div>
        </Reveal>
        <Reveal anim="right">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--sun-deep)]">
              Prêts à commencer ?
            </div>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
              Faisons briller le potentiel de votre enfant
            </h2>
            <p className="mt-5 text-muted-foreground">
              Écrivez-nous pour échanger sur le niveau, les matières et le rythme qui conviennent à
              votre enfant.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/paiement"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground transition hover:opacity-90 shadow-md"
              >
                Inscrire mon enfant <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-bold text-foreground transition hover:bg-muted"
              >
                <Phone className="h-4 w-4" />
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const MAPS_URL = "https://maps.app.goo.gl/dM2WfBp1MVEzQVro9";

const locationPhotos = [
  { src: locationBuilding, alt: "Vue extérieure du centre CPP-Ancilla à Lomé", caption: "Le bâtiment" },
  { src: locationClassroom, alt: "Salle de cours équipée de tables et chaises", caption: "Notre salle de cours" },
  { src: locationEntrance, alt: "Entrée du centre avec cour ombragée", caption: "L'entrée du centre" },
];

function LocationSection() {
  return (
    <section className="border-y border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24">
        {/* Heading */}
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--sun-deep)]">
              Lieu des cours
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
              Où nous retrouver à <span className="italic">Lomé</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
              Les cours de Stage Kékéli se déroulent chaque samedi au centre CPP-Ancilla, un cadre spacieux et calme idéal pour apprendre.
            </p>
          </div>
        </Reveal>

        {/* Photo Grid */}
        <div className="mt-12 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-3">
          {locationPhotos.map((photo, i) => (
            <Reveal key={photo.caption} anim="up" delay={i * 120}>
              <div className="group relative overflow-hidden rounded-2xl sm:rounded-[1.5rem] border border-border shadow-[var(--shadow-soft)]">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  width={800}
                  height={600}
                />
                {/* Caption Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-4 pb-4 pt-10">
                  <span className="text-white text-sm font-semibold drop-shadow">{photo.caption}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Address + Map CTA */}
        <Reveal>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-center sm:text-left">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[color:var(--sun-deep)]/10 text-[color:var(--sun-deep)]">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold text-foreground">Centre CPP-Ancilla</p>
                <p className="text-sm text-muted-foreground">Lomé, Togo</p>
                <p className="text-xs text-muted-foreground mt-1">Tous les samedis · 8h00 — 17h00</p>
              </div>
            </div>

            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground transition hover:opacity-90 shadow-md"
            >
              <MapPin className="h-4 w-4" />
              Voir sur Google Maps
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
