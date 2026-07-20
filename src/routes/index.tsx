import { createFileRoute } from "@tanstack/react-router";
import logoAsset from "@/assets/logo.png.asset.json";
import heroImg from "@/assets/hero-student.jpg";
import tutoringImg from "@/assets/tutoring.jpg";
import tutor1 from "@/assets/tutor-1.jpg";
import tutor2 from "@/assets/tutor-2.jpg";
import tutor3 from "@/assets/tutor-3.jpg";
import {
  ArrowRight,
  BookOpen,
  Calculator,
  FlaskConical,
  Globe2,
  Languages,
  MapPin,
  Phone,
  Mail,
  Smartphone,
  Sparkles,
  ShieldCheck,
  GraduationCap,
  Users,
  Clock,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const subjects = [
  { icon: Calculator, name: "Mathématiques", desc: "Algèbre, géométrie, analyse — de la 6e à la Terminale." },
  { icon: FlaskConical, name: "Sciences Physiques", desc: "Physique, chimie, expériences guidées et exercices ciblés." },
  { icon: BookOpen, name: "Français & Philosophie", desc: "Rédaction, dissertation, préparation aux examens." },
  { icon: Languages, name: "Anglais", desc: "Compréhension, expression et confiance à l'oral." },
  { icon: Globe2, name: "Histoire-Géographie", desc: "Méthodologie, cartes, dissertations et commentaires." },
  { icon: Sparkles, name: "SVT & Informatique", desc: "Sciences de la vie et initiation aux outils numériques." },
];

const levels = [
  { label: "Collège", detail: "6ᵉ · 5ᵉ · 4ᵉ · 3ᵉ", price: "15 000", note: "FCFA / mois" },
  { label: "Seconde", detail: "Tronc commun", price: "20 000", note: "FCFA / mois" },
  { label: "Première & Terminale", detail: "Toutes séries", price: "25 000", note: "FCFA / mois" },
];

const tutors = [
  { img: tutor1, name: "Mme Adjo K.", role: "Lettres & Français", years: "8 ans d'expérience" },
  { img: tutor2, name: "Mlle Efua M.", role: "Mathématiques", years: "Ingénieure — 5 ans" },
  { img: tutor3, name: "M. Kodjo A.", role: "Physique-Chimie", years: "Docteur — 10 ans" },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Trust />
      <Offer />
      <About />
      <Tutors />
      <Pricing />
      <Payment />
      <Contact />
      <Footer />
    </div>
  );
}

function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`flex items-center gap-2.5 ${className}`}>
      <img src={logoAsset.url} alt="Stage Kékéli" className="h-10 w-10 object-contain" />
      <div className="leading-tight">
        <div className="font-display text-lg tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
          Stage <span className="text-[color:var(--sun-deep)]">Kékéli</span>
        </div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Lumière & Réussite</div>
      </div>
    </a>
  );
}

function Nav() {
  const links = [
    ["Notre offre", "#offre"],
    ["Répétiteurs", "#repetiteurs"],
    ["Tarifs", "#tarifs"],
    ["Paiement", "#paiement"],
    ["Contact", "#contact"],
  ];
  return (
    <header id="top" className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="text-sm font-medium text-foreground/80 transition hover:text-[color:var(--sun-deep)]">
              {label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition hover:opacity-90"
        >
          S'inscrire <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 sun-glow opacity-70" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-6 py-20 md:grid-cols-[1.05fr_0.95fr] md:py-28 lg:py-32">
        <div className="flex flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-foreground/70 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--sun-deep)]" />
            Cours de répétition — Lomé, Togo
          </span>
          <h1 className="mt-6 text-5xl leading-[1.02] md:text-6xl lg:text-7xl">
            La lumière
            <br />
            qui guide vers la
            <br />
            <span className="italic text-[color:var(--sun-deep)]">réussite scolaire.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            <em>« Kékéli »</em> signifie la lumière en éwé. Nous accompagnons chaque élève du collège
            et du lycée avec des répétiteurs qualifiés, un suivi personnalisé et un rapport
            transparent aux parents.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#tarifs"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-warm)] transition hover:opacity-90"
            >
              Inscrire mon enfant <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#offre"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground transition hover:bg-muted"
            >
              Découvrir nos matières
            </a>
          </div>
          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-8">
            {[
              ["+250", "élèves accompagnés"],
              ["12", "matières enseignées"],
              ["96%", "de parents satisfaits"],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="font-display text-3xl text-foreground" style={{ fontFamily: "var(--font-display)" }}>{n}</dt>
                <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative">
          <div className="absolute -right-6 -top-6 h-64 w-64 rounded-full bg-[color:var(--sun)] blur-3xl opacity-60" aria-hidden />
          <div className="relative overflow-hidden rounded-[2rem] border border-border shadow-[var(--shadow-warm)]">
            <img src={heroImg} alt="Élève souriant au travail" className="h-full w-full object-cover" width={1400} height={1600} />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden max-w-[16rem] rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-soft)] sm:block">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--sun)] text-[color:var(--ink)]">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold">Suivi personnalisé</div>
                <div className="text-xs text-muted-foreground">Rapport hebdomadaire aux parents</div>
              </div>
            </div>
          </div>
        </div>
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
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3">
            <Icon className="h-5 w-5 text-[color:var(--sun-deep)]" />
            <span className="text-sm font-medium text-foreground/80">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, kicker }: { eyebrow: string; title: React.ReactNode; kicker?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--sun-deep)]">{eyebrow}</div>
      <h2 className="mt-4 text-4xl md:text-5xl">{title}</h2>
      {kicker && <p className="mt-4 text-base text-muted-foreground">{kicker}</p>}
    </div>
  );
}

function Offer() {
  return (
    <section id="offre" className="mx-auto max-w-7xl px-6 py-24">
      <SectionTitle
        eyebrow="Notre offre"
        title={<>Des matières couvertes<br /><span className="italic">avec exigence et bienveillance.</span></>}
        kicker="Collège et lycée — toutes séries. Chaque élève bénéficie d'un diagnostic initial, d'un plan de travail sur mesure et de séances régulières animées par un répétiteur qualifié."
      />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map(({ icon: Icon, name, desc }) => (
          <div
            key={name}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 transition hover:shadow-[var(--shadow-warm)]"
          >
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[color:var(--sun)]/30 text-[color:var(--sun-deep)] transition group-hover:bg-[color:var(--sun)]">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="text-xl">{name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="bg-card/60 border-y border-border">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-24 md:grid-cols-2 md:items-center">
        <div className="relative">
          <div className="overflow-hidden rounded-[2rem] border border-border shadow-[var(--shadow-warm)]">
            <img src={tutoringImg} alt="Séance de tutorat en petit groupe" className="h-full w-full object-cover" loading="lazy" width={1400} height={1000} />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden rounded-2xl bg-[color:var(--sun)] px-5 py-4 text-[color:var(--ink)] shadow-[var(--shadow-warm)] sm:block">
            <div className="font-display text-2xl leading-none" style={{ fontFamily: "var(--font-display)" }}>Kékéli</div>
            <div className="text-xs uppercase tracking-widest">/ke.ke.li/ · lumière</div>
          </div>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--sun-deep)]">Notre approche</div>
          <h2 className="mt-4 text-4xl md:text-5xl">
            Un accompagnement <span className="italic">qui éclaire</span> chaque étape scolaire.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Fondée à Lomé, Stage Kékéli réunit des répétiteurs passionnés au service des collégiens
            et lycéens du Togo. Nous croyons que chaque élève porte une lumière — notre rôle est de
            la révéler avec méthode, régularité et confiance.
          </p>
          <ul className="mt-8 space-y-4">
            {[
              ["Diagnostic personnalisé", "Nous évaluons les acquis et fixons des objectifs clairs dès la première séance."],
              ["Répétiteurs sélectionnés", "Enseignants et étudiants avancés, formés à notre méthode pédagogique."],
              ["Suivi transparent aux parents", "Rapport de progression régulier, disponible aussi via l'application mobile."],
            ].map(([t, d]) => (
              <li key={t} className="flex gap-4">
                <div className="mt-1.5 h-2 w-2 flex-none rounded-full bg-[color:var(--sun-deep)]" />
                <div>
                  <div className="font-semibold">{t}</div>
                  <div className="text-sm text-muted-foreground">{d}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Tutors() {
  return (
    <section id="repetiteurs" className="mx-auto max-w-7xl px-6 py-24">
      <SectionTitle
        eyebrow="Nos répétiteurs"
        title={<>Des enseignants <span className="italic">qui inspirent.</span></>}
        kicker="Chaque répétiteur est sélectionné pour ses compétences académiques et son sens de la transmission."
      />
      <div className="mt-14 grid gap-8 md:grid-cols-3">
        {tutors.map((t) => (
          <figure key={t.name} className="group">
            <div className="relative overflow-hidden rounded-2xl border border-border">
              <img src={t.img} alt={t.name} className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-[1.03]" loading="lazy" width={800} height={1000} />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[color:var(--ink)]/80 to-transparent p-5">
                <div className="font-display text-2xl text-[color:var(--cream)]" style={{ fontFamily: "var(--font-display)" }}>{t.name}</div>
                <div className="text-sm text-[color:var(--sun)]">{t.role}</div>
              </div>
            </div>
            <figcaption className="mt-3 text-sm text-muted-foreground">{t.years}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="tarifs" className="relative overflow-hidden bg-[color:var(--ink)] text-[color:var(--cream)]">
      <div className="absolute inset-0 opacity-30 sun-glow" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--sun)]">Tarifs & inscription</div>
          <h2 className="mt-4 text-4xl md:text-5xl">
            Une grille <span className="italic">simple</span> et transparente.
          </h2>
          <p className="mt-4 text-[color:var(--cream)]/70">
            Séances hebdomadaires en petit groupe. Cours particuliers à domicile disponibles sur devis.
          </p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {levels.map((l, i) => (
            <div
              key={l.label}
              className={`relative rounded-2xl border p-8 ${
                i === 1
                  ? "border-[color:var(--sun)] bg-[color:var(--sun)] text-[color:var(--ink)]"
                  : "border-white/10 bg-white/5"
              }`}
            >
              {i === 1 && (
                <span className="absolute -top-3 left-8 rounded-full bg-[color:var(--ink)] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[color:var(--sun)]">
                  Populaire
                </span>
              )}
              <div className="text-sm uppercase tracking-widest opacity-70">{l.detail}</div>
              <div className="mt-1 font-display text-3xl" style={{ fontFamily: "var(--font-display)" }}>{l.label}</div>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-display text-5xl" style={{ fontFamily: "var(--font-display)" }}>{l.price}</span>
                <span className="text-sm opacity-70">{l.note}</span>
              </div>
              <ul className="mt-6 space-y-2 text-sm">
                <li>· Séances hebdomadaires</li>
                <li>· Suivi personnalisé</li>
                <li>· Accès application parent</li>
                <li>· Bilan mensuel écrit</li>
              </ul>
              <a
                href="#contact"
                className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${
                  i === 1
                    ? "bg-[color:var(--ink)] text-[color:var(--sun)] hover:opacity-90"
                    : "border border-white/20 hover:bg-white/10"
                }`}
              >
                S'inscrire <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Payment() {
  return (
    <section id="paiement" className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--sun-deep)]">Paiement sécurisé</div>
          <h2 className="mt-4 text-4xl md:text-5xl">
            Réglez vos frais par <span className="italic">Mobile Money.</span>
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Nous acceptons les paiements par <strong>MTN Mobile Money</strong> et <strong>Moov / Orange Money</strong>.
            Chaque transaction est confirmée par SMS et un reçu numérique est envoyé au parent.
          </p>
          <div className="mt-6 rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 flex-none text-[color:var(--sun-deep)]" />
              <p>
                Conformément à la réglementation togolaise, une <strong>Taxe sur les Activités Financières (TAF, ~10%)</strong> s'applique aux transactions Mobile Money et
                est intégrée automatiquement au récapitulatif de paiement.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Démarrer un paiement <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="relative">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-warm)]">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Récapitulatif</div>
              <Smartphone className="h-5 w-5 text-[color:var(--sun-deep)]" />
            </div>
            <div className="mt-6 space-y-3 text-sm">
              <Row label="Frais mensuels — Terminale" value="25 000 FCFA" />
              <Row label="TAF (10%)" value="2 500 FCFA" />
              <div className="border-t border-border" />
              <Row label="Total à régler" value="27 500 FCFA" bold />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold transition hover:bg-muted">
                MTN Mobile Money
              </button>
              <button className="rounded-xl bg-[color:var(--sun)] px-4 py-3 text-sm font-semibold text-[color:var(--ink)] transition hover:opacity-90">
                Moov Money
              </button>
            </div>
            <div className="mt-4 text-center text-xs text-muted-foreground">Transaction chiffrée · reçu envoyé par SMS</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex items-center justify-between ${bold ? "text-base font-semibold" : "text-muted-foreground"}`}>
      <span>{label}</span>
      <span className={bold ? "text-foreground" : ""}>{value}</span>
    </div>
  );
}

function Contact() {
  return (
    <section id="contact" className="border-t border-border bg-card/60">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-[1fr_1.1fr]">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--sun-deep)]">Nous contacter</div>
          <h2 className="mt-4 text-4xl md:text-5xl">
            Prêts à faire briller <span className="italic">le potentiel</span> de votre enfant ?
          </h2>
          <p className="mt-6 text-muted-foreground">
            Écrivez-nous ou passez à notre centre à Lomé. Un conseiller vous répond sous 24h.
          </p>
          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-[color:var(--sun-deep)]" />
              Lomé — République Togolaise
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-[color:var(--sun-deep)]" />
              +228 90 00 00 00
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-[color:var(--sun-deep)]" />
              contact@stagekekeli.tg
            </li>
          </ul>
        </div>
        <form
          className="rounded-3xl border border-border bg-background p-8 shadow-[var(--shadow-soft)]"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nom du parent" placeholder="Kokou A." />
            <Field label="Téléphone" placeholder="+228 …" />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Prénom de l'élève" placeholder="Amivi" />
            <Field label="Classe" placeholder="Terminale D" />
          </div>
          <div className="mt-4">
            <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Message</label>
            <textarea
              rows={4}
              placeholder="Matières souhaitées, disponibilités…"
              className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition focus:border-[color:var(--sun-deep)] focus:ring-2 focus:ring-[color:var(--sun)]/40"
            />
          </div>
          <button
            type="submit"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Envoyer ma demande <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition focus:border-[color:var(--sun-deep)] focus:ring-2 focus:ring-[color:var(--sun)]/40"
      />
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">
        <Logo />
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Stage Kékéli · Lomé, Togo · Tous droits réservés
        </p>
        <div className="flex gap-6 text-xs text-muted-foreground">
          <a href="#offre" className="hover:text-foreground">Offre</a>
          <a href="#tarifs" className="hover:text-foreground">Tarifs</a>
          <a href="#contact" className="hover:text-foreground">Contact</a>
        </div>
      </div>
    </footer>
  );
}
