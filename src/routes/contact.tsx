import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/site-chrome";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Stage Kékéli" },
      {
        name: "description",
        content:
          "Contactez Stage Kékéli à Lomé. Un conseiller pédagogique vous répond sous 24h — inscription, tarifs, matières.",
      },
      { property: "og:title", content: "Contact — Stage Kékéli" },
      {
        property: "og:description",
        content: "Écrivez-nous, appelez-nous ou passez à Lomé.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Nous contacter"
        title={<>Prêts à faire briller <span className="italic">le potentiel</span> ?</>}
        intro="Écrivez-nous ou passez à notre centre à Lomé. Un conseiller vous répond sous 24h."
      />
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-[1fr_1.1fr]">
        <Reveal anim="left">
          <div>
            <ul className="space-y-5 text-sm">
              {[
                { icon: MapPin, t: "Lomé — République Togolaise", d: "Adresse détaillée transmise sur rendez-vous." },
                { icon: Phone, t: "+228 90 00 00 00", d: "Lundi au samedi · 8h – 19h" },
                { icon: Mail, t: "contact@stagekekeli.tg", d: "Réponse sous 24h ouvrées." },
                { icon: Clock, t: "Séances 7j/7", d: "Créneaux flexibles en soirée et week-end." },
              ].map(({ icon: Icon, t, d }, i) => (
                <Reveal key={t} anim="up" delay={i * 90}>
                  <li className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                    <Icon className="mt-0.5 h-5 w-5 flex-none text-[color:var(--sun-deep)]" />
                    <div>
                      <div className="font-semibold">{t}</div>
                      <div className="text-sm text-muted-foreground">{d}</div>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal anim="right">
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
              <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Message
              </label>
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
        </Reveal>
      </section>
    </>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition focus:border-[color:var(--sun-deep)] focus:ring-2 focus:ring-[color:var(--sun)]/40"
      />
    </div>
  );
}