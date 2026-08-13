import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/reveal";
import {
  FaqSection,
  PHONE_DISPLAY,
  PHONE_HREF,
  WHATSAPP_HREF,
  WHATSAPP_LABEL,
  WhatsAppIcon,
  type FaqItem,
} from "@/components/marketing";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Stage Kékéli" },
      {
        name: "description",
        content:
          "Contactez Stage Kékéli à Lomé, Togo — inscription en mathématiques et en physique pour les élèves de Première C & D et Terminale C & D. Téléphone : +228 98 93 02 11.",
      },
      { property: "og:title", content: "Contact — Stage Kékéli" },
      {
        property: "og:description",
        content: "Appelez-nous au +228 98 93 02 11 ou écrivez-nous : Stage Kékéli, Lomé, Togo.",
      },
    ],
  }),
  component: ContactPage,
});

const CONTACT_FAQ: FaqItem[] = [
  {
    q: "Quelles classes accompagnez-vous ?",
    a: "Uniquement les classes de Première et de Terminale des séries C & D. Précisez la classe de votre enfant dans le formulaire pour que nous puissions vous répondre précisément.",
  },
  {
    q: "Que faut-il préparer pour le premier échange ?",
    a: "La classe de votre enfant et les chapitres de mathématiques ou de physique qui posent difficulté, avec si possible ses derniers bulletins. Cela nous permet d'en parler concrètement dès le premier échange.",
  },
  {
    q: "Prenez-vous des inscriptions en cours d'année ?",
    a: "Il est possible de nous rejoindre en cours d'année scolaire. Appelez-nous pour que nous voyions ensemble ce qui peut être organisé.",
  },
];

function ContactPage() {
  return (
    <>
      <section className="hero-clean-bg border-b border-border/50">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center md:py-20">
          <Reveal>
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--sun-deep)]">
              Nous contacter
            </div>
            <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              Une question ? Parlons du parcours de votre enfant
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
              Appelez-nous ou écrivez-nous pour échanger sur les mathématiques, la physique et le
              rythme de travail de votre enfant en Première C & D ou en Terminale C & D.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#formulaire"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground transition hover:opacity-90"
              >
                Aller au formulaire <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={WHATSAPP_LABEL}
                className="inline-flex items-center gap-2 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 px-6 py-3.5 text-sm font-bold text-[#128C7E] transition hover:bg-[#25D366]/20"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </a>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-bold transition hover:bg-muted"
              >
                <Phone className="h-4 w-4" />
                {PHONE_DISPLAY}
              </a>
              <a
                href="mailto:contact@stagekekeli.tg"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-bold transition hover:bg-muted"
              >
                <Mail className="h-4 w-4" />
                contact@stagekekeli.tg
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="formulaire"
        className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1fr_1.1fr]"
      >
        <Reveal anim="left">
          <div>
            <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
              Joignez-nous directement
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Par téléphone, par courriel ou via le formulaire ci-contre.
            </p>
            <ul className="mt-8 space-y-4 text-sm">
              {[
                {
                  icon: WhatsAppIcon,
                  t: "WhatsApp",
                  d: WHATSAPP_LABEL,
                  href: WHATSAPP_HREF,
                  external: true,
                },
                {
                  icon: Phone,
                  t: PHONE_DISPLAY,
                  d: "Appelez-nous pour l'inscription et l'organisation du suivi.",
                  href: PHONE_HREF,
                },
                {
                  icon: Mail,
                  t: "contact@stagekekeli.tg",
                  d: "Écrivez-nous : classe, matières et disponibilités.",
                  href: "mailto:contact@stagekekeli.tg",
                },
                {
                  icon: MapPin,
                  t: "Lomé, Togo",
                  d: "Créneaux et modalités communiqués sur demande.",
                },
              ].map(({ icon: Icon, t, d, href }, i) => (
                <Reveal key={t} anim="up" delay={i * 80}>
                  <li>
                    {href ? (
                      <a
                        href={href}
                        className="flex gap-4 rounded-2xl border border-border bg-card p-5 transition hover:border-[color:var(--sun-deep)]/40"
                      >
                        <Icon className="mt-0.5 h-5 w-5 flex-none text-[color:var(--sun-deep)]" />
                        <span>
                          <span className="block font-bold">{t}</span>
                          <span className="block text-sm text-muted-foreground">{d}</span>
                        </span>
                      </a>
                    ) : (
                      <div className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                        <Icon className="mt-0.5 h-5 w-5 flex-none text-[color:var(--sun-deep)]" />
                        <div>
                          <div className="font-bold">{t}</div>
                          <div className="text-sm text-muted-foreground">{d}</div>
                        </div>
                      </div>
                    )}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal anim="right">
          <form
            className="rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-soft)] md:p-8"
            onSubmit={(e) => e.preventDefault()}
          >
            <h2 className="text-xl font-black tracking-tight">Nous écrire</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Renseignez la classe, les matières et vos disponibilités — ou appelez-nous
              directement au {PHONE_DISPLAY}.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Nom du parent" placeholder="Kokou A." />
              <Field label="Téléphone" placeholder="+228 …" />
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Prénom de l'élève" placeholder="Amivi" />
              <Field label="Classe" placeholder="Terminale D" />
            </div>
            <div className="mt-4">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Matières souhaitées
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {["Mathématiques", "Physique"].map((s) => (
                  <label
                    key={s}
                    className="cursor-pointer rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-semibold text-muted-foreground transition has-[:checked]:border-[color:var(--sun-deep)] has-[:checked]:bg-[color:var(--sun)]/25 has-[:checked]:text-foreground"
                  >
                    <input type="checkbox" name="matieres" value={s} className="sr-only" />
                    {s}
                  </label>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Disponibilités, objectifs, difficultés rencontrées…"
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-[color:var(--sun-deep)] focus:ring-2 focus:ring-[color:var(--sun)]/40"
              />
            </div>
            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground transition hover:opacity-90"
            >
              Envoyer ma demande <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </Reveal>
      </section>

      <FaqSection items={CONTACT_FAQ} title={<>Avant de nous écrire</>} />
    </>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-[color:var(--sun-deep)] focus:ring-2 focus:ring-[color:var(--sun)]/40"
      />
    </div>
  );
}
