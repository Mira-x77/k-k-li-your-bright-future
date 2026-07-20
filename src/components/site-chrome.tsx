import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import logoAsset from "@/assets/logo.png.asset.json";

const NAV_LINKS = [
  { label: "Accueil", to: "/" },
  { label: "Notre offre", to: "/offre" },
  { label: "Répétiteurs", to: "/repetiteurs" },
  { label: "Tarifs", to: "/tarifs" },
  { label: "Paiement", to: "/paiement" },
  { label: "À propos", to: "/a-propos" },
  { label: "Contact", to: "/contact" },
] as const;

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2.5 ${className}`}>
      <img src={logoAsset.url} alt="Stage Kékéli" className="h-10 w-10 object-contain" />
      <div className="leading-tight">
        <div className="font-display text-lg tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
          Stage <span className="text-[color:var(--sun-deep)]">Kékéli</span>
        </div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Lumière & Réussite
        </div>
      </div>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: true }}
              activeProps={{ className: "text-[color:var(--sun-deep)]" }}
              inactiveProps={{ className: "text-foreground/80" }}
              className="relative text-sm font-medium transition hover:text-[color:var(--sun-deep)] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[color:var(--sun-deep)] after:transition-transform after:duration-300 hover:after:scale-x-100 data-[status=active]:after:scale-x-100"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/contact"
          className="hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition hover:opacity-90 sm:inline-flex"
        >
          S'inscrire <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <MobileNav />
    </header>
  );
}

function MobileNav() {
  return (
    <div className="border-t border-border/50 lg:hidden">
      <div className="mx-auto flex max-w-7xl gap-4 overflow-x-auto px-6 py-2 text-sm">
        {NAV_LINKS.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            activeOptions={{ exact: true }}
            activeProps={{ className: "text-[color:var(--sun-deep)] font-semibold" }}
            inactiveProps={{ className: "text-foreground/70" }}
            className="whitespace-nowrap"
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
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">
        <Logo />
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Stage Kékéli · Lomé, Togo · Tous droits réservés
        </p>
        <div className="flex flex-wrap gap-6 text-xs text-muted-foreground">
          <Link to="/offre" className="hover:text-foreground">Offre</Link>
          <Link to="/tarifs" className="hover:text-foreground">Tarifs</Link>
          <Link to="/paiement" className="hover:text-foreground">Paiement</Link>
          <Link to="/contact" className="hover:text-foreground">Contact</Link>
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
        <h1 className="mt-5 text-5xl leading-[1.05] md:text-6xl">{title}</h1>
        {intro && (
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">{intro}</p>
        )}
      </div>
    </section>
  );
}