import { Link } from "@tanstack/react-router";
import { ArrowRight, Home, Phone, ShieldCheck, MessageSquare } from "lucide-react";

import logoLight from "@/assets/logo-light.png";
import logoDark from "@/assets/logo-dark.png";
import { PHONE_DISPLAY, PHONE_HREF, WHATSAPP_HREF, WHATSAPP_LABEL } from "@/components/marketing";

const NAV_LINKS = [
  { label: "Accueil", to: "/" },
  { label: "Notre offre", to: "/offre" },
  { label: "Répétiteurs", to: "/repetiteurs" },
  { label: "Cours du samedi", to: "/samedi" },
  { label: "Tarifs", to: "/tarifs" },
  { label: "Paiement & Inscription", to: "/paiement" },
  { label: "À propos", to: "/a-propos" },
  { label: "Contact", to: "/contact" },
] as const;

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`inline-flex shrink-0 ${className}`} aria-label="Stage Kékéli — Accueil">
      <img
        src={logoLight}
        alt="Stage Kékéli — La lumière qui guide vers la réussite"
        width={320}
        height={96}
        className="h-16 w-auto max-w-[min(320px,65vw)] object-contain object-left md:h-24 dark:hidden"
      />
      <img
        src={logoDark}
        alt="Stage Kékéli — La lumière qui guide vers la réussite"
        width={320}
        height={96}
        className="h-16 w-auto max-w-[min(320px,65vw)] object-contain object-left md:h-24 hidden dark:block"
      />
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/40">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-2.5 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <div className="flex items-center gap-3">
          <Logo />
          <Link
            to="/"
            activeOptions={{ exact: true }}
            activeProps={{ className: "nav-pill-active text-foreground" }}
            inactiveProps={{ className: "text-foreground/80 hover:text-foreground" }}
            className="nav-pill relative hidden sm:inline-flex items-center gap-2 rounded-full bg-card/40 px-4 py-2 text-sm font-semibold ring-1 ring-border/50 backdrop-blur-xl transition-colors duration-300"
          >
            <Home className="h-4 w-4" />
            Accueil
          </Link>
        </div>
        <nav className="hidden justify-center lg:flex">
          <div className="flex items-center gap-1 rounded-full bg-card/40 p-1.5 ring-1 ring-border/40 backdrop-blur-xl">
            {NAV_LINKS.slice(1, 5).map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: true }}
                activeProps={{ className: "nav-pill-active text-foreground" }}
                inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
                className="nav-pill relative whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-colors duration-300"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
        <div className="flex items-center justify-end gap-3">
          <Link
            to="/contact"
            className="hidden text-sm font-medium text-muted-foreground transition hover:text-foreground sm:inline-flex"
          >
            Contact
          </Link>
          <Link
            to="/paiement"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition hover:opacity-90 shadow-md"
          >
            S'inscrire <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
      <MobileNav />
    </header>
  );
}

function MobileNav() {
  return (
    <div className="lg:hidden border-t border-border/40 bg-background/95">
      <div className="mx-auto flex max-w-7xl gap-1.5 overflow-x-auto px-4 pb-3 pt-2 text-sm">
        {NAV_LINKS.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            activeOptions={{ exact: true }}
            activeProps={{ className: "nav-pill-active text-foreground font-bold bg-muted" }}
            inactiveProps={{ className: "text-foreground/75" }}
            className="shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/60">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2 space-y-4">
            <Logo />
            <p className="max-w-sm text-sm text-muted-foreground leading-relaxed">
              Le programme de répétitions d'excellence en Mathématiques et Physique-Chimie exclusivement les samedis pour les élèves des séries Première C, Première D, Terminale C et Terminale D à Lomé, Togo.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/paiement"
                className="inline-flex items-center gap-2 rounded-full bg-[color:var(--sun)] px-4 py-2 text-xs font-bold text-[color:var(--ink)] hover:opacity-90 transition shadow-sm"
              >
                Inscrire un Élève <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/admin"
                className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-xs font-bold text-amber-600 hover:bg-amber-500/20 transition"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                Espace Admin (/admin)
              </Link>
            </div>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-foreground">
              Navigation
            </div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="transition hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-foreground">
              Direct & Urgence
            </div>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <div>Téléphone / WhatsApp : {PHONE_DISPLAY}</div>
              <div>TMoney (Togocel) : +228 93 51 00 74</div>
              <div>Email : stagekekeli@gmail.com</div>
              <div>Horaires : <strong>Samedi uniquement (8h00 - 17h00)</strong></div>
              <div className="pt-2 text-xs font-bold text-[color:var(--sun-deep)]">Lomé, Togo</div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} Stage Kékéli · Lomé, Togo · Tous droits réservés.
          </div>
          <div className="flex items-center gap-4">
            <Link to="/paiement" className="hover:underline font-semibold text-foreground">Formulaire Inscription Parent</Link>
            <span>·</span>
            <Link to="/admin" className="hover:underline font-semibold text-amber-600">Portail Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 sun-glow opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-5xl px-6 py-20 text-center md:py-28">
        <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--sun-deep)]">
          {eyebrow}
        </div>
        <h1 className="mt-5 text-5xl leading-[1.05] md:text-6xl font-black">{title}</h1>
        {intro && (
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">{intro}</p>
        )}
      </div>
    </section>
  );
}