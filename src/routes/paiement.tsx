import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Lock, Receipt, ShieldCheck, Smartphone } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { CallbackCta, FaqSection, SectionHeading, type FaqItem } from "@/components/marketing";

export const Route = createFileRoute("/paiement")({
  head: () => ({
    meta: [
      { title: "Paiement Mobile Money — Stage Kékéli" },
      {
        name: "description",
        content:
          "Payez vos frais Stage Kékéli par MTN Mobile Money, Moov ou Orange Money : 2 500 FCFA par mois et par matière ou 22 500 FCFA par an, plus 1 500 FCFA d'inscription. TAF 10% intégrée au récapitulatif.",
      },
      { property: "og:title", content: "Paiement Mobile Money — Stage Kékéli" },
      {
        property: "og:description",
        content: "Simulateur et méthodes de paiement Mobile Money.",
      },
    ],
  }),
  component: PaymentPage,
});

const PAYMENT_FAQ: FaqItem[] = [
  {
    q: "Que faut-il régler pour démarrer ?",
    a: "Le tarif de 2 500 FCFA par mois et par matière — ou 22 500 FCFA par an et par matière — auquel s'ajoutent 1 500 FCFA d'inscription, une seule fois quel que soit le nombre de matières. Le simulateur additionne le tout avant paiement.",
  },
  {
    q: "Pourquoi la TAF de 10% s'ajoute-t-elle ?",
    a: "La Taxe sur les Activités Financières est prélevée par les opérateurs Mobile Money au Togo sur les transactions. Nous l'affichons systématiquement avant validation pour qu'il n'y ait aucune surprise.",
  },
  {
    q: "Quels opérateurs acceptez-vous ?",
    a: "MTN Mobile Money, Moov Money et Orange Money. Le virement bancaire et l'espèce sont également possibles, pour un règlement mensuel comme pour un règlement annuel.",
  },
  {
    q: "Comment obtenir un justificatif ?",
    a: "Un reçu numérique est envoyé par SMS immédiatement après la transaction, et reste disponible dans l'espace parent de l'application. Une attestation annuelle peut être délivrée sur demande.",
  },
  {
    q: "Le paiement est-il sécurisé ?",
    a: "Oui. La transaction est chiffrée et confirmée par un code opérateur envoyé sur votre téléphone. Nous n'avons à aucun moment accès à votre code secret Mobile Money.",
  },
];

const MONTHLY_PER_SUBJECT = 2500;
const ANNUAL_PER_SUBJECT = 22500;
const ANNUAL_MONTHS = 9;
const REGISTRATION_FEE = 1500;
const LEVEL_LABEL = "Première & Terminale, séries C & D";

const fmt = (n: number) => n.toLocaleString("fr-FR");

function PaymentPage() {
  const [operator, setOperator] = useState<"mtn" | "moov">("mtn");
  const [subjects, setSubjects] = useState<1 | 2>(1);
  const [plan, setPlan] = useState<"mensuel" | "annuel">("mensuel");
  const [withRegistration, setWithRegistration] = useState(true);

  const unitPrice = plan === "mensuel" ? MONTHLY_PER_SUBJECT : ANNUAL_PER_SUBJECT;
  const tuition = unitPrice * subjects;
  const registration = withRegistration ? REGISTRATION_FEE : 0;
  const subtotal = tuition + registration;
  const taf = Math.round(subtotal * 0.1);
  const total = subtotal + taf;

  return (
    <>
      <section className="hero-clean-bg border-b border-border/50">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center md:py-20">
          <Reveal>
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--sun-deep)]">
              Paiement sécurisé
            </div>
            <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              Réglez vos frais par Mobile Money
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
              MTN Mobile Money, Moov Money ou Orange Money. Chaque transaction est confirmée par SMS
              et un reçu numérique est envoyé au parent.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <Reveal anim="left">
            <div>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                Une transaction claire et sécurisée
              </h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                Nous appliquons les mêmes standards que les opérateurs financiers togolais. La{" "}
                <strong className="text-foreground">
                  Taxe sur les Activités Financières (TAF, environ 10%)
                </strong>{" "}
                est automatiquement calculée et intégrée au récapitulatif de paiement.
              </p>

              <Reveal anim="up">
                <div className="mt-8 rounded-3xl border border-border bg-card p-7 md:p-8">
                  <div className="text-sm font-bold uppercase tracking-[0.18em] text-[color:var(--sun-deep)]">
                    Les tarifs en clair
                  </div>
                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    {[
                      { price: MONTHLY_PER_SUBJECT, unit: "par mois" },
                      { price: ANNUAL_PER_SUBJECT, unit: "par an" },
                    ].map(({ price, unit }) => (
                      <div key={unit}>
                        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                          <span className="text-4xl font-black leading-none tracking-tight">
                            {fmt(price)}
                          </span>
                          <span className="text-lg font-bold">FCFA</span>
                          <span className="text-base font-semibold text-muted-foreground">
                            {unit}
                          </span>
                        </div>
                        <span className="mt-3 inline-flex w-fit rounded-full bg-[color:var(--sun)] px-4 py-1.5 text-sm font-bold text-[color:var(--ink)]">
                          par matière
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-7 border-t border-border pt-6 text-base leading-relaxed">
                    <strong className="font-black">
                      Inscription : {fmt(REGISTRATION_FEE)} FCFA
                    </strong>{" "}
                    — frais uniques, quel que soit le nombre de matières suivies.
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    TAF d'environ 10% sur les paiements Mobile Money, ajoutée au récapitulatif
                    ci-contre. La formule annuelle correspond aux {ANNUAL_MONTHS} mois de l'année
                    scolaire.
                  </p>
                </div>
              </Reveal>

              <ul className="mt-8 space-y-3">
                {[
                  {
                    icon: Lock,
                    t: "Transaction chiffrée",
                    d: "Confirmation multi-étape avec code opérateur envoyé sur votre téléphone.",
                  },
                  {
                    icon: Receipt,
                    t: "Reçu numérique immédiat",
                    d: "Envoyé par SMS et disponible à tout moment dans l'espace parent.",
                  },
                  {
                    icon: ShieldCheck,
                    t: "Conforme à la réglementation",
                    d: "TAF de 10% affichée et intégrée avant toute validation.",
                  },
                ].map(({ icon: Icon, t, d }, i) => (
                  <Reveal key={t} anim="up" delay={i * 90}>
                    <li className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                      <Icon className="mt-0.5 h-5 w-5 flex-none text-[color:var(--sun-deep)]" />
                      <div>
                        <div className="text-sm font-bold">{t}</div>
                        <div className="mt-1 text-sm text-muted-foreground">{d}</div>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ul>
              <Link
                to="/tarifs"
                className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[color:var(--sun-deep)] transition hover:gap-3"
              >
                Voir la grille tarifaire complète <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <Reveal anim="right">
            <div className="rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-warm)] md:p-8">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Simulateur de paiement
                </div>
                <Smartphone className="h-5 w-5 text-[color:var(--sun-deep)]" />
              </div>

              <div className="mt-6">
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Niveau
                </div>
                <div className="mt-2 rounded-xl bg-[color:var(--sun)]/30 px-4 py-2.5 text-center text-xs font-bold text-foreground ring-1 ring-[color:var(--sun-deep)]">
                  {LEVEL_LABEL}
                </div>
              </div>

              <div className="mt-6">
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Matières
                </div>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  {([1, 2] as const).map((n) => (
                    <Choice
                      key={n}
                      active={subjects === n}
                      onClick={() => setSubjects(n)}
                      label={n === 1 ? "1 matière" : "2 matières"}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Formule
                </div>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <Choice
                    active={plan === "mensuel"}
                    onClick={() => setPlan("mensuel")}
                    label="Mensuel"
                  />
                  <Choice
                    active={plan === "annuel"}
                    onClick={() => setPlan("annuel")}
                    label="Annuel"
                  />
                </div>
              </div>

              <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-background px-4 py-3">
                <input
                  type="checkbox"
                  checked={withRegistration}
                  onChange={(e) => setWithRegistration(e.target.checked)}
                  className="mt-0.5 h-4 w-4 flex-none accent-[color:var(--sun-deep)]"
                />
                <span className="text-sm">
                  <span className="font-semibold">
                    Inclure l'inscription ({fmt(REGISTRATION_FEE)} FCFA)
                  </span>
                  <span className="mt-0.5 block text-sm text-muted-foreground">
                    Frais uniques, quel que soit le nombre de matières suivies.
                  </span>
                </span>
              </label>

              <div className="mt-6 space-y-3 text-sm">
                <Row
                  label={
                    plan === "mensuel"
                      ? `Frais mensuels (${subjects} × ${fmt(MONTHLY_PER_SUBJECT)} FCFA)`
                      : `Frais annuels (${subjects} × ${fmt(ANNUAL_PER_SUBJECT)} FCFA)`
                  }
                  value={`${fmt(tuition)} FCFA`}
                />
                {withRegistration && (
                  <Row label="Inscription (une fois)" value={`${fmt(registration)} FCFA`} />
                )}
                <Row label="TAF (10%)" value={`${fmt(taf)} FCFA`} />
                <div className="border-t border-border" />
                <Row label="Total à régler" value={`${fmt(total)} FCFA`} bold />
              </div>
              {plan === "annuel" && (
                <p className="mt-3 text-xs text-muted-foreground">
                  La formule annuelle correspond aux {ANNUAL_MONTHS} mois de l'année scolaire, soit
                  le même tarif de {fmt(MONTHLY_PER_SUBJECT)} FCFA par mois et par matière réglé en
                  une fois.
                </p>
              )}

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setOperator("mtn")}
                  className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
                    operator === "mtn"
                      ? "bg-[color:var(--sun)] text-[color:var(--ink)]"
                      : "bg-background ring-1 ring-border hover:bg-muted"
                  }`}
                >
                  MTN Mobile Money
                </button>
                <button
                  type="button"
                  onClick={() => setOperator("moov")}
                  className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
                    operator === "moov"
                      ? "bg-[color:var(--sun)] text-[color:var(--ink)]"
                      : "bg-background ring-1 ring-border hover:bg-muted"
                  }`}
                >
                  Moov / Orange
                </button>
              </div>

              <button className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground transition hover:opacity-90">
                Payer {fmt(total)} FCFA
                <ArrowRight className="h-4 w-4" />
              </button>
              <div className="mt-4 text-center text-xs text-muted-foreground">
                Transaction chiffrée · reçu envoyé par SMS
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-card/50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeading eyebrow="Moyens de paiement" title={<>Payez comme cela vous arrange</>} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "MTN Mobile Money", d: "Confirmation par code USSD, reçu SMS immédiat." },
              { t: "Moov Money", d: "Même parcours, même délai de confirmation." },
              { t: "Orange Money", d: "Disponible pour les règlements mensuels et annuels." },
              {
                t: "Virement ou espèces",
                d: "À Lomé, pour un règlement mensuel comme pour un règlement annuel.",
              },
            ].map((m, i) => (
              <Reveal key={m.t} anim="up" delay={i * 80}>
                <div className="h-full rounded-2xl border border-border bg-background p-6">
                  <h3 className="text-base font-bold">{m.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FaqSection items={PAYMENT_FAQ} title={<>Questions sur le paiement</>} />
      <CallbackCta
        title={<>Un doute sur le règlement ? Écrivez-nous.</>}
        intro="Écrivez-nous à contact@stagekekeli.tg pour toute question sur le règlement ou l'inscription."
      />
    </>
  );
}

function Choice({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
        active
          ? "bg-[color:var(--sun)] text-[color:var(--ink)]"
          : "bg-background ring-1 ring-border hover:bg-muted"
      }`}
    >
      {label}
    </button>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div
      className={`flex items-center justify-between ${
        bold ? "text-base font-bold" : "text-muted-foreground"
      }`}
    >
      <span>{label}</span>
      <span className={bold ? "text-foreground" : ""}>{value}</span>
    </div>
  );
}
