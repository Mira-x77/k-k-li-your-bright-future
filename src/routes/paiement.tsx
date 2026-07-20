import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Smartphone, Receipt, Lock } from "lucide-react";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/site-chrome";

export const Route = createFileRoute("/paiement")({
  head: () => ({
    meta: [
      { title: "Paiement Mobile Money — Stage Kékéli" },
      {
        name: "description",
        content:
          "Payez vos frais Stage Kékéli par MTN Mobile Money, Moov ou Orange Money. Transaction sécurisée, reçu par SMS, TAF 10% intégrée.",
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

function PaymentPage() {
  const [level, setLevel] = useState<"college" | "seconde" | "terminale">("terminale");
  const [operator, setOperator] = useState<"mtn" | "moov">("mtn");
  const base = level === "college" ? 15000 : level === "seconde" ? 20000 : 25000;
  const taf = useMemo(() => Math.round(base * 0.1), [base]);
  const total = base + taf;
  const fmt = (n: number) => n.toLocaleString("fr-FR");

  return (
    <>
      <PageHero
        eyebrow="Paiement sécurisé"
        title={<>Réglez par <span className="italic">Mobile Money</span>.</>}
        intro="MTN Mobile Money, Moov Money ou Orange Money. Chaque transaction est confirmée par SMS et un reçu numérique est envoyé au parent."
      />
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2 md:items-start">
          <Reveal anim="left">
            <div>
              <h2 className="text-3xl md:text-4xl">Une transaction claire et sécurisée.</h2>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                Nous appliquons les mêmes standards que les opérateurs financiers togolais.
                La <strong>Taxe sur les Activités Financières (TAF, ~10%)</strong> est automatiquement
                calculée et intégrée au récapitulatif de paiement.
              </p>
              <ul className="mt-8 space-y-4 text-sm">
                {[
                  { icon: Lock, t: "Transaction chiffrée", d: "Confirmation multi-étape avec code opérateur." },
                  { icon: Receipt, t: "Reçu numérique", d: "Envoyé par SMS et disponible dans l'espace parent." },
                  { icon: ShieldCheck, t: "Conforme à la réglementation", d: "TAF 10% automatiquement intégrée." },
                ].map(({ icon: Icon, t, d }, i) => (
                  <Reveal key={t} anim="up" delay={i * 100}>
                    <li className="flex gap-4 rounded-xl border border-border bg-card p-4">
                      <Icon className="mt-0.5 h-5 w-5 flex-none text-[color:var(--sun-deep)]" />
                      <div>
                        <div className="text-sm font-semibold">{t}</div>
                        <div className="text-xs text-muted-foreground">{d}</div>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal anim="right">
            <div className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-warm)]">
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  Simulateur de paiement
                </div>
                <Smartphone className="h-5 w-5 text-[color:var(--sun-deep)]" />
              </div>
              <div className="mt-6">
                <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Niveau
                </label>
                <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                  {(
                    [
                      ["college", "Collège"],
                      ["seconde", "Seconde"],
                      ["terminale", "1ère · Term."],
                    ] as const
                  ).map(([k, l]) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setLevel(k)}
                      className={`rounded-xl border px-2 py-2.5 font-semibold transition ${
                        level === k
                          ? "border-[color:var(--sun-deep)] bg-[color:var(--sun)]/30 text-foreground"
                          : "border-border bg-background text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-6 space-y-3 text-sm">
                <Row label={`Frais mensuels — ${level === "college" ? "Collège" : level === "seconde" ? "Seconde" : "Terminale"}`} value={`${fmt(base)} FCFA`} />
                <Row label="TAF (10%)" value={`${fmt(taf)} FCFA`} />
                <div className="border-t border-border" />
                <Row label="Total à régler" value={`${fmt(total)} FCFA`} bold />
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setOperator("mtn")}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    operator === "mtn"
                      ? "bg-[color:var(--sun)] text-[color:var(--ink)]"
                      : "border border-border bg-background hover:bg-muted"
                  }`}
                >
                  MTN Mobile Money
                </button>
                <button
                  type="button"
                  onClick={() => setOperator("moov")}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    operator === "moov"
                      ? "bg-[color:var(--sun)] text-[color:var(--ink)]"
                      : "border border-border bg-background hover:bg-muted"
                  }`}
                >
                  Moov / Orange
                </button>
              </div>
              <button className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
                Payer {fmt(total)} FCFA <ArrowRight className="h-4 w-4" />
              </button>
              <div className="mt-4 text-center text-xs text-muted-foreground">
                Transaction chiffrée · reçu envoyé par SMS
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div
      className={`flex items-center justify-between ${
        bold ? "text-base font-semibold" : "text-muted-foreground"
      }`}
    >
      <span>{label}</span>
      <span className={bold ? "text-foreground" : ""}>{value}</span>
    </div>
  );
}