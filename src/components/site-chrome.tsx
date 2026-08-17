import { Link } from "@tanstack/react-router";
import { ArrowRight, Home, ShieldCheck } from "lucide-react";

import logoLight from "@/assets/logo-light.png";
import logoDark from "@/assets/logo-dark.png";
import { PHONE_DISPLAY } from "@/components/marketing";

const NAV_LINKS = [
  { label: "Accueil", to: "/" },
  { label: "Notre offre", to: "/offre" },
  { label: "Répétiteurs", to: "/repetiteurs" },
  { label: "Cours du samedi", to: "/samedi" },
  { label: "Tarifs", to: "/tarifs" },
  { label: "Paiement", to: "/paiement" },
  { label: "À propos", to: "/a-propos" },
  { label: "Contact", to: "/contact" },
] as const;

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`inline-flex shrink-0 ${className}`} aria-label="Stage Kékéli — Accueil">
      <img
        src={logoLight}
        alt="Stage Kékéli"
        width={320}
        height={96}
        className="h-10 w-auto max-w-[min(240px,50vw)] object-contain object-left dark:hidden md:h-12"
      />
      <img
        src={logoDark}
        alt="Stage Kékéli"
        width={320}
        height={96}
        className="h-10 w-auto max-w-[min(240px,50vw)] object-contain object-left hidden dark:block md:h-12"
      />
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/40">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3.5 lg:grid lg:grid-cols-[auto_1fr_auto]">
        <div className="flex items-center gap-3">
          <Logo />
          <Link
            to="/"
            activeOptions={{ exact: true }}
            activeProps={{ className: "nav-pill-active text-foreground font-semibold" }}
            inactiveProps={{ className: "text-foreground/80 hover:text-foreground" }}
            className="nav-pill relative hidden sm:inline-flex items-center gap-2 rounded-full bg-card/60 px-4 py-2 text-sm font-semibold ring-1 ring-border/50 backdrop-blur-xl transition-colors duration-300"
          >
            <Home className="h-4 w-4" />
            Accueil
          </Link>
        </div>
        <nav className="hidden justify-center lg:flex">
          <div className="flex items-center gap-1 rounded-full bg-card/60 p-1.5 ring-1 ring-border/40 backdrop-blur-xl shadow-xs">
            {NAV_LINKS.slice(1).map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: true }}
                activeProps={{ className: "nav-pill-active text-foreground font-semibold" }}
                inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
                className="nav-pill relative whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-300"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
        <div className="flex items-center justify-end gap-4">
          <Link
            to="/contact"
            className="hidden text-sm font-medium text-muted-foreground transition hover:text-foreground sm:inline-flex"
          >
            Contact
          </Link>
          <Link
            to="/paiement"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-bold text-background transition hover:opacity-90 shadow-md"
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
    <div className="lg:hidden border-t border-border/40 bg-background/95 backdrop-blur-md">
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
              Le programme de répétitions d'excellence en Mathématiques et Physique-Chimie exclusivement les samedis pour les élèves des séries scientifiques Première C, Première D, Terminale C et Terminale D à Lomé, Togo.
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