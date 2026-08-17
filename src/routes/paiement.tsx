import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Lock, Receipt, ShieldCheck, Smartphone, CheckCircle, Printer, MessageSquare, Phone } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { CallbackCta, FaqSection, SectionHeading, type FaqItem } from "@/components/marketing";
import { savePublicRegistration, generateWhatsAppReceiptLink, type ProgramSignIn } from "@/lib/admin-store";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/paiement")({
  head: () => ({
    meta: [
      { title: "Paiement & Inscription — Stage Kékéli" },
      {
        name: "description",
        content:
          "Inscrivez-vous et payez vos frais Stage Kékéli par Moov Money ou en personne : 2 500 FCFA par mois et par matière ou 22 500 FCFA par an, plus 1 500 FCFA d'inscription. TAF 10% intégrée au récapitulatif.",
      },
      { property: "og:title", content: "Paiement & Inscription — Stage Kékéli" },
      {
        property: "og:description",
        content: "Simulateur et formulaire d'inscription direct Moov Money et en personne.",
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
    a: "Moov Money (+228 98 93 02 11) et le paiement en personne / espèces à Lomé.",
  },
  {
    q: "Comment obtenir un justificatif ?",
    a: "Dès validation de votre inscription ci-dessus, un reçu numérique officiel avec numéro de référence est immédiatement généré et téléchargeable, avec envoi par WhatsApp ou SMS.",
  },
];

const MONTHLY_PER_SUBJECT = 2500;
const ANNUAL_PER_SUBJECT = 22500;
const ANNUAL_MONTHS = 9;
const REGISTRATION_FEE = 1500;

const fmt = (n: number) => n.toLocaleString("fr-FR");

function PaymentPage() {
  const [operator, setOperator] = useState<"Moov Money" | "En personne">("Moov Money");
  const [subjectsChoice, setSubjectsChoice] = useState<"math" | "physics" | "both">("both");
  const [series, setSeries] = useState<ProgramSignIn["series"]>("Terminale C");
  const [plan, setPlan] = useState<"mensuel" | "annuel">("mensuel");
  const [withRegistration, setWithRegistration] = useState(true);

  // Parent & Student Input State
  const [studentName, setStudentName] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");

  // Confirmation Modal State
  const [receiptRecord, setReceiptRecord] = useState<ProgramSignIn | null>(null);

  const numSubjects = subjectsChoice === "both" ? 2 : 1;
  const unitPrice = plan === "mensuel" ? MONTHLY_PER_SUBJECT : ANNUAL_PER_SUBJECT;
  const tuition = unitPrice * numSubjects;
  const registration = withRegistration ? REGISTRATION_FEE : 0;
  const subtotal = tuition + registration;
  const taf = operator === "Moov Money" ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + taf;

  const handleRegisterAndPay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !parentPhone.trim()) {
      alert("Veuillez renseigner le nom de l'élève et le numéro de téléphone du parent.");
      return;
    }

    const selectedSubjectsArray: ("Mathématiques" | "Physique-Chimie")[] =
      subjectsChoice === "both"
        ? ["Mathématiques", "Physique-Chimie"]
        : subjectsChoice === "math"
        ? ["Mathématiques"]
        : ["Physique-Chimie"];

    const record = savePublicRegistration({
      studentName: studentName.trim(),
      parentName: parentName.trim() || "Parent",
      parentPhone: parentPhone.trim(),
      series: series,
      subjects: selectedSubjectsArray,
      paymentPlan: plan,
      paymentMethod: operator,
      saturdaySessionIncluded: true,
    });

    setReceiptRecord(record);
  };

  return (
    <>
      <section className="hero-clean-bg border-b border-border/50">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center md:py-20">
          <Reveal>
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--sun-deep)]">
              Paiement & Inscription en Ligne
            </div>
            <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              Réglez vos frais & validez l'inscription
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
              Par Moov Money ou en personne. Renseignez les informations de l'élève ci-dessous pour générer votre reçu numérique officiel.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          {/* Left Column Info */}
          <Reveal anim="left">
            <div>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                Une transaction claire et enregistrée
              </h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                Dès la validation du formulaire ci-contre, l'inscription est immédiatement enregistrée dans le système Stage Kékéli à Lomé et un reçu numérique est délivré.
              </p>

              <Reveal anim="up">
                <div className="mt-8 rounded-3xl border border-border bg-card p-7 md:p-8">
                  <div className="text-sm font-bold uppercase tracking-[0.18em] text-[color:var(--sun-deep)]">
                    Les tarifs officiels Stage Kékéli
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
                </div>
              </Reveal>

              <ul className="mt-8 space-y-3">
                {[
                  {
                    icon: Lock,
                    t: "Validation immédiate",
                    d: "Enregistrement en direct de l'inscription pour les séries C & D.",
                  },
                  {
                    icon: Receipt,
                    t: "Reçu Numérique instantané",
                    d: "Généré immédiatement après validation avec transfert WhatsApp / SMS.",
                  },
                  {
                    icon: ShieldCheck,
                    t: "Transparence TAF",
                    d: "Taxe de 10% Moov Money calculée et affichée avant validation.",
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
            </div>
          </Reveal>

          {/* Right Column Registration & Payment Form */}
          <Reveal anim="right">
            <form onSubmit={handleRegisterAndPay} className="rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-warm)] md:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold uppercase tracking-widest text-[color:var(--sun-deep)]">
                  Formulaire d'Inscription & Paiement
                </div>
                <Smartphone className="h-5 w-5 text-[color:var(--sun-deep)]" />
              </div>

              {/* Student & Parent Info */}
              <div className="space-y-4 rounded-2xl border border-border bg-background p-4">
                <div className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Informations de l'élève & du parent
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    Nom et Prénom de l'Élève *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Amouzou Koffi"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-[color:var(--sun-deep)]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">
                      Nom du Parent
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Mme Amouzou"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      className="w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-[color:var(--sun-deep)]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">
                      Téléphone Parent (+228) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="+228 90 12 34 56"
                      value={parentPhone}
                      onChange={(e) => setParentPhone(e.target.value)}
                      className="w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-[color:var(--sun-deep)]"
                    />
                  </div>
                </div>
              </div>

              {/* Class Series Choice */}
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                  Classe / Série
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {(["Première C", "Première D", "Terminale C", "Terminale D"] as const).map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setSeries(s)}
                      className={`rounded-xl px-3 py-2 text-xs font-bold transition ${
                        series === s
                          ? "bg-[color:var(--sun)] text-[color:var(--ink)] ring-2 ring-[color:var(--sun-deep)]"
                          : "bg-background border border-border hover:bg-muted"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subjects Selection */}
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                  Matières Souhaitées
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSubjectsChoice("both")}
                    className={`rounded-xl px-2.5 py-2 text-xs font-bold transition ${
                      subjectsChoice === "both"
                        ? "bg-[color:var(--sun)] text-[color:var(--ink)] ring-2 ring-[color:var(--sun-deep)]"
                        : "bg-background border border-border hover:bg-muted"
                    }`}
                  >
                    Maths + Physique
                  </button>
                  <button
                    type="button"
                    onClick={() => setSubjectsChoice("math")}
                    className={`rounded-xl px-2.5 py-2 text-xs font-bold transition ${
                      subjectsChoice === "math"
                        ? "bg-[color:var(--sun)] text-[color:var(--ink)] ring-2 ring-[color:var(--sun-deep)]"
                        : "bg-background border border-border hover:bg-muted"
                    }`}
                  >
                    Maths Seules
                  </button>
                  <button
                    type="button"
                    onClick={() => setSubjectsChoice("physics")}
                    className={`rounded-xl px-2.5 py-2 text-xs font-bold transition ${
                      subjectsChoice === "physics"
                        ? "bg-[color:var(--sun)] text-[color:var(--ink)] ring-2 ring-[color:var(--sun-deep)]"
                        : "bg-background border border-border hover:bg-muted"
                    }`}
                  >
                    Physique Seule
                  </button>
                </div>
              </div>

              {/* Plan Choice */}
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                  Formule de Paiement
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Choice active={plan === "mensuel"} onClick={() => setPlan("mensuel")} label="Mensuel (2 500 / m)" />
                  <Choice active={plan === "annuel"} onClick={() => setPlan("annuel")} label="Annuel (22 500 / an)" />
                </div>
              </div>

              {/* Cost Calculation Summary */}
              <div className="space-y-2 rounded-2xl bg-background p-4 text-sm border border-border">
                <Row
                  label={
                    plan === "mensuel"
                      ? `Frais mensuels (${numSubjects} × ${fmt(MONTHLY_PER_SUBJECT)} FCFA)`
                      : `Frais annuels (${numSubjects} × ${fmt(ANNUAL_PER_SUBJECT)} FCFA)`
                  }
                  value={`${fmt(tuition)} FCFA`}
                />
                {withRegistration && (
                  <Row label="Frais d'inscription uniques" value={`${fmt(REGISTRATION_FEE)} FCFA`} />
                )}
                {operator === "Moov Money" && <Row label="TAF (10% Mobile Money)" value={`${fmt(taf)} FCFA`} />}
                <div className="border-t border-border pt-1" />
                <Row label="Total Général à Régler" value={`${fmt(total)} FCFA`} bold />
              </div>

              {/* Payment Operator Selection */}
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                  Moyen de Règlement
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setOperator("Moov Money")}
                    className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
                      operator === "Moov Money"
                        ? "bg-[color:var(--sun)] text-[color:var(--ink)] ring-2 ring-[color:var(--sun-deep)]"
                        : "bg-background border border-border hover:bg-muted"
                    }`}
                  >
                    Moov Money
                  </button>
                  <button
                    type="button"
                    onClick={() => setOperator("En personne")}
                    className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
                      operator === "En personne"
                        ? "bg-[color:var(--sun)] text-[color:var(--ink)] ring-2 ring-[color:var(--sun-deep)]"
                        : "bg-background border border-border hover:bg-muted"
                    }`}
                  >
                    En personne
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-base font-extrabold text-primary-foreground shadow-lg transition hover:opacity-90 cursor-pointer"
              >
                Valider & Recevoir le Reçu ({fmt(total)} FCFA)
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* Confirmation & Digital Receipt Modal */}
      {receiptRecord && (
        <Dialog open={!!receiptRecord} onOpenChange={() => setReceiptRecord(null)}>
          <DialogContent className="bg-card text-foreground border-border max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-xl font-black text-center text-[color:var(--sun-deep)] flex items-center justify-center gap-2">
                <CheckCircle className="h-6 w-6 text-emerald-500" />
                Inscription Validée !
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 pt-2 text-sm">
              <div className="p-4 rounded-2xl bg-[color:var(--sun)]/15 border border-[color:var(--sun-deep)]/30 text-center">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Numéro de Référence Officiel</p>
                <p className="text-2xl font-black text-foreground mt-1 tracking-tight font-mono">{receiptRecord.id}</p>
                <p className="text-xs font-semibold text-emerald-600 mt-1">Enregistré dans le système Stage Kékéli</p>
              </div>

              <div className="space-y-2 rounded-xl bg-muted/40 p-4 border border-border text-xs">
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-muted-foreground">Nom de l'Élève :</span>
                  <span className="font-bold">{receiptRecord.studentName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-muted-foreground">Classe / Série :</span>
                  <span className="font-bold">{receiptRecord.series}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-muted-foreground">Matière(s) :</span>
                  <span className="font-bold">{receiptRecord.subjects.join(" & ")}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-muted-foreground">Moyen de règlement :</span>
                  <span className="font-bold">{receiptRecord.paymentMethod}</span>
                </div>
                <div className="flex justify-between py-1 text-sm font-black pt-1">
                  <span>Montant Total :</span>
                  <span className="text-emerald-600">{fmt(receiptRecord.totalAmountDue)} FCFA</span>
                </div>
              </div>

              {receiptRecord.paymentMethod === "Moov Money" ? (
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs space-y-2">
                  <p className="font-bold text-blue-600 flex items-center gap-1.5">
                    <Smartphone className="h-4 w-4" /> Instructions Moov Money Togo :
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Effectuez le transfert du montant de <strong>{fmt(receiptRecord.totalAmountDue)} FCFA</strong> vers le numéro officiel Stage Kékéli :
                  </p>
                  <p className="text-base font-black text-foreground font-mono bg-background p-2 rounded text-center border border-border">
                    +228 98 93 02 11
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1">
                  <p className="font-bold text-amber-600">Règlement en personne :</p>
                  <p className="text-muted-foreground leading-relaxed">
                    Présentez la référence <strong>{receiptRecord.id}</strong> lors de votre passage dans nos locaux à Lomé pour finaliser le règlement en espèces.
                  </p>
                </div>
              )}

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={generateWhatsAppReceiptLink(receiptRecord)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Envoyer le Reçu par WhatsApp au Parent
                  </Button>
                </a>
                <Button
                  onClick={() => window.print()}
                  variant="outline"
                  className="w-full font-bold gap-2"
                >
                  <Printer className="h-4 w-4" />
                  Imprimer / Télécharger le Reçu PDF
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <FaqSection items={PAYMENT_FAQ} title={<>Questions sur l'inscription & le paiement</>} />
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
          ? "bg-[color:var(--sun)] text-[color:var(--ink)] ring-2 ring-[color:var(--sun-deep)]"
          : "bg-background border border-border hover:bg-muted"
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
        bold ? "text-base font-bold text-foreground" : "text-muted-foreground text-xs"
      }`}
    >
      <span>{label}</span>
      <span className={bold ? "text-foreground font-black text-base" : ""}>{value}</span>
    </div>
  );
}
