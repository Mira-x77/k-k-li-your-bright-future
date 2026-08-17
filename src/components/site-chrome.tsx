import { Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck } from "lucide-react";

const NAV_LINKS = [
  { to: "/", label: "Accueil" },
  { to: "/offre", label: "Notre Offre" },
  { to: "/samedi", label: "Séances du Samedi" },
  { to: "/repetiteurs", label: "Nos Répétiteurs" },
  { to: "/tarifs", label: "Tarifs" },
  { to: "/a-propos", label: "À propos" },
  { to: "/paiement", label: "Paiement & Inscription" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/50 bg-[#FAF9F6]/90 dark:bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          {/* Official Stage Kékéli Logo Images */}
          <div className="flex items-center gap-2">
            <img src="/logo-light.png" alt="Stage Kékéli Logo" className="h-10 w-auto object-contain dark:hidden" />
            <img src="/logo-dark.png" alt="Stage Kékéli Logo" className="h-10 w-auto object-contain hidden dark:block" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight">Stage Kékéli</span>
            <span className="text-[11px] font-semibold text-muted-foreground">
              Maths & Physique · Première & Terminale C & D (Samedi uniquement)
            </span>
          </div>
        </Link>
        <nav className="hidden lg:flex lg:items-center lg:gap-7 text-sm font-medium">
          {NAV_LINKS.slice(0, 6).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: true }}
              activeProps={{ className: "nav-pill-active font-bold text-foreground" }}
              inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
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
    <div className="lg:hidden border-t border-border/40 bg-[#FAF9F6]/95 dark:bg-background/95">
      <div className="mx-auto flex max-w-7xl gap-1.5 overflow-x-auto px-4 pb-3 pt-2 text-sm">
        {NAV_LINKS.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            activeOptions={{ exact: true }}
            activeProps={{ className: "nav-pill-active text-foreground font-bold bg-muted" }}
            inactiveProps={{ className: "text-foreground/75" }}
            className="shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold"
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
    <footer className="border-t border-border bg-[#F5F4F0] dark:bg-card">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <img src="/logo-light.png" alt="Stage Kékéli Logo" className="h-10 w-auto object-contain dark:hidden" />
              <img src="/logo-dark.png" alt="Stage Kékéli Logo" className="h-10 w-auto object-contain hidden dark:block" />
              <span className="text-xl font-black tracking-tight">Stage Kékéli</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Le programme de répétitions d'excellence en Mathématiques et Physique-Chimie exclusivement les samedis pour les élèves des séries Première C, Première D, Terminale C et Terminale D à Lomé, Togo.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
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
              <div>Téléphone / WhatsApp : +228 93 51 00 74</div>
              <div>TMoney (Togocel) : +228 93 51 00 74</div>
              <div>Email : stagekekeli@gmail.com</div>
              <div>Horaires : <strong>Samedi uniquement (8h00 - 17h00)</strong></div>
              <div className="pt-2 text-xs font-bold text-[color:var(--sun-deep)]">Lomé, Togo</div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} Stage Kékéli — Tous droits réservés.
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