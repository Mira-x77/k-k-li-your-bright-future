import { Link } from "@tanstack/react-router";
import { ArrowRight, Home, Phone } from "lucide-react";

import logoLight from "@/assets/logo-light.png";
import { PHONE_DISPLAY, PHONE_HREF, WHATSAPP_HREF, WHATSAPP_LABEL, WhatsAppIcon } from "@/components/marketing";

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
        className="h-20 w-auto max-w-[min(360px,68vw)] object-contain object-left md:h-28"
      />
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background/70 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <div className="flex items-center gap-3">
          <Logo />
          <Link
            to="/"
            activeOptions={{ exact: true }}
            activeProps={{ className: "nav-pill-active text-foreground" }}
            inactiveProps={{ className: "text-foreground/80 hover:text-foreground" }}
            className="nav-pill relative inline-flex items-center gap-2 rounded-full bg-card/40 px-4 py-2 text-sm font-semibold ring-1 ring-border/50 backdrop-blur-xl transition-colors duration-300"
          >
            <Home className="h-4 w-4" />
            Accueil
          </Link>
        </div>
        <nav className="hidden justify-center lg:flex">
          <div className="flex items-center gap-1 rounded-full bg-card/40 p-1.5 ring-1 ring-border/40 backdrop-blur-xl">
            {NAV_LINKS.slice(1).map((l) => (
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
            to="/tarifs"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
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
    <div className="lg:hidden">
      <div className="mx-auto flex max-w-7xl gap-1.5 overflow-x-auto px-4 pb-3 pt-1 text-sm">
        {NAV_LINKS.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            activeOptions={{ exact: true }}
            activeProps={{ className: "nav-pill-active text-foreground font-semibold" }}
            inactiveProps={{ className: "text-foreground/65" }}
            className="nav-pill relative shrink-0 whitespace-nowrap rounded-full px-3.5 py-2 transition-colors duration-300"
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
        <div className="flex flex-wrap items-center gap-6 text-xs text-muted-foreground">
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-1.5 font-semibold text-foreground/80 hover:text-foreground"
          >
            <Phone className="h-3.5 w-3.5" />
            {PHONE_DISPLAY}
          </a>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={WHATSAPP_LABEL}
            title={WHATSAPP_LABEL}
            className="inline-flex items-center gap-1.5 font-semibold text-[#25D366] hover:text-[#128C7E] transition-colors"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
          <Link to="/" className="hover:text-foreground">Accueil</Link>
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