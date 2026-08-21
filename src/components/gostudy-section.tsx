import { ExternalLink, Sparkles, Calculator, Target, BookOpen, Smartphone, CheckCircle2 } from "lucide-react";
import gostudyLogo from "@/assets/gostudy-logo.jpg";
import gostudyBanner from "@/assets/gostudy-banner.jpg";
import { Reveal } from "@/components/reveal";

export function GoStudyPartnerSection() {
  return (
    <section className="border-y border-border bg-card/40 relative overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="pointer-events-none absolute -right-20 top-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-blue-500/10 blur-[130px]" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-[350px] w-[350px] rounded-full bg-[color:var(--sun)]/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 relative z-10">
        {/* Section Heading */}
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-bold text-blue-500 mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Partenaire Édtech Officiel</span>
            </div>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
              Suivez vos notes et réussissez avec <span className="text-blue-500 italic">Go Study!</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Stage Kékéli s'associe à <strong>Go Study!</strong>, l'application de suivi scolaire et de révision spécialement conçue pour les élèves de Première et Terminale en Afrique de l'Ouest.
            </p>
          </div>
        </Reveal>

        {/* Content Showcase Grid */}
        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Information & Key Features */}
          <div className="lg:col-span-7 space-y-6">
            <Reveal anim="left">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src={gostudyLogo}
                    alt="Go Study Logo"
                    className="h-12 w-12 rounded-2xl object-cover border border-blue-500/30 shadow-md"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Go Study!</h3>
                    <p className="text-xs text-muted-foreground">Outil gratuit de révision et calcul de moyenne</p>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-foreground/85">
                  Ne laissez plus le doute s'installer avant les devoirs et examens. Avec Go Study!, chaque élève sait exactement où il en est et ce qu'il doit obtenir pour décrocher sa mention au BAC.
                </p>
              </div>
            </Reveal>

            {/* Feature Cards Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Reveal anim="up" delay={100}>
                <div className="rounded-2xl border border-border bg-background/80 p-4 space-y-2 hover:border-blue-500/40 transition">
                  <div className="flex items-center gap-2 text-blue-500 font-bold text-sm">
                    <Calculator className="h-4 w-4" />
                    <span>Calculateur BAC & APC</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Intègre les coefficients exacts des séries C & D au Togo et en Afrique de l'Ouest.
                  </p>
                </div>
              </Reveal>

              <Reveal anim="up" delay={200}>
                <div className="rounded-2xl border border-border bg-background/80 p-4 space-y-2 hover:border-blue-500/40 transition">
                  <div className="flex items-center gap-2 text-blue-500 font-bold text-sm">
                    <Target className="h-4 w-4" />
                    <span>Target Mode (Simulateur)</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Simulez la note minimale nécessaire aux prochains contrôles pour atteindre votre objectif.
                  </p>
                </div>
              </Reveal>

              <Reveal anim="up" delay={300}>
                <div className="rounded-2xl border border-border bg-background/80 p-4 space-y-2 hover:border-blue-500/40 transition">
                  <div className="flex items-center gap-2 text-blue-500 font-bold text-sm">
                    <BookOpen className="h-4 w-4" />
                    <span>Annales & Épreuves</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Entraînez-vous avec les sujets et annales d'examens des années précédentes.
                  </p>
                </div>
              </Reveal>

              <Reveal anim="up" delay={400}>
                <div className="rounded-2xl border border-border bg-background/80 p-4 space-y-2 hover:border-blue-500/40 transition">
                  <div className="flex items-center gap-2 text-blue-500 font-bold text-sm">
                    <Smartphone className="h-4 w-4" />
                    <span>Web & Android Gratuit</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Accessible instantanément sur tout navigateur sans installation ou via l'APK Android.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* CTAs */}
            <Reveal anim="up" delay={450}>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="https://goostudy.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700 hover:scale-[1.02]"
                >
                  <span>Accéder à Go Study (Web)</span>
                  <ExternalLink className="h-4 w-4" />
                </a>

                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium px-3 py-2 rounded-full bg-muted/60 border border-border">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>100% Gratuit · Sans engagement</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Visual Preview Box */}
          <div className="lg:col-span-5">
            <Reveal anim="right">
              <div className="relative mx-auto max-w-md rounded-3xl border border-blue-500/30 bg-gradient-to-b from-blue-950/40 to-background p-6 shadow-2xl backdrop-blur-sm overflow-hidden">
                {/* Decorative Badge */}
                <div className="absolute top-4 right-4 rounded-full bg-blue-500/20 border border-blue-400/30 px-3 py-1 text-[11px] font-bold text-blue-400">
                  Partenaire Stage Kékéli
                </div>

                {/* Banner Image */}
                <div className="relative mt-4 overflow-hidden rounded-2xl border border-border shadow-md">
                  <img
                    src={gostudyBanner}
                    alt="Go Study - Élève travaillant avec confiance"
                    className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                    <div>
                      <p className="text-white text-xs font-semibold uppercase tracking-wider text-blue-400">
                        Target, Track, Achieve
                      </p>
                      <p className="text-white text-base font-extrabold">
                        "Ensemble, nous réussirons chaque examen."
                      </p>
                    </div>
                  </div>
                </div>

                {/* Feature Highlights Footer inside card */}
                <div className="mt-5 space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-background/90 border border-border text-xs">
                    <span className="text-muted-foreground">Moyenne visée au BAC</span>
                    <span className="font-extrabold text-blue-500 text-sm">15.5 / 20 (Mention Bien)</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-background/90 border border-border text-xs">
                    <span className="text-muted-foreground">Compatibilité séries</span>
                    <span className="font-bold text-foreground">Première & Terminale C & D</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-background/90 border border-border text-xs">
                    <span className="text-muted-foreground">Lien officiel</span>
                    <a
                      href="https://goostudy.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-blue-500 hover:underline flex items-center gap-1"
                    >
                      goostudy.vercel.app
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
