import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Mail, MapPin, Phone, CheckCircle, ShieldCheck, MessageSquare } from "lucide-react";
import { useState } from "react";
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
import { savePublicRegistration, generateWhatsAppReceiptLink, OFFICIAL_EMAIL, type ProgramSignIn } from "@/lib/admin-store";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Stage Kékéli" },
      {
        name: "description",
        content:
          `Contactez Stage Kékéli à Lomé, Togo — inscription en mathématiques et en physique pour votre enfant en Première C & D et Terminale C & D. Téléphone / WhatsApp : ${PHONE_DISPLAY}.`,
      },
      { property: "og:title", content: "Contact — Stage Kékéli" },
      {
        property: "og:description",
        content: `Appelez-nous au ${PHONE_DISPLAY} ou écrivez-nous à stagekekeli@gmail.com : Stage Kékéli, Lomé, Togo.`,
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
    q: "Quels sont les horaires des séances ?",
    a: "Les répétitions et cours d'approfondissement se déroulent exclusivement le samedi (8h00 - 17h00).",
  },
  {
    q: "Prenez-vous des inscriptions en cours d'année ?",
    a: `Il est possible de nous rejoindre en cours d'année scolaire. Appelez-nous au ${PHONE_DISPLAY} pour que nous voyions ensemble ce qui peut être organisé.`,
  },
];

function ContactPage() {
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [studentName, setStudentName] = useState("");
  const [series, setSeries] = useState<ProgramSignIn["series"]>("Terminale C");
  const [mathSelected, setMathSelected] = useState(true);
  const [physicsSelected, setPhysicsSelected] = useState(true);
  const [message, setMessage] = useState("");

  const [confirmationRecord, setConfirmationRecord] = useState<ProgramSignIn | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentPhone.trim() || !studentName.trim()) {
      alert("Veuillez renseigner le nom de votre enfant et votre numéro de téléphone (parent).");
      return;
    }

    const selectedSubjects: ("Mathématiques" | "Physique-Chimie")[] = [];
    if (mathSelected) selectedSubjects.push("Mathématiques");
    if (physicsSelected) selectedSubjects.push("Physique-Chimie");
    if (selectedSubjects.length === 0) selectedSubjects.push("Mathématiques");

    const record = savePublicRegistration({
      studentName: studentName.trim(),
      parentName: parentName.trim() || "Parent",
      parentPhone: parentPhone.trim(),
      series: series,
      subjects: selectedSubjects,
      paymentPlan: "mensuel",
      paymentMethod: "En personne",
      saturdaySessionIncluded: true,
    });

    setConfirmationRecord(record);
  };

  return (
    <>
      <section className="bg-[#F6F5F0] dark:bg-card border-b border-border/50">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center md:py-20">
          <Reveal>
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--sun-deep)]">
              Espace Parent — Nous contacter
            </div>
            <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              Une question ? Parlons du parcours de votre enfant
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
              Appelez-nous au {PHONE_DISPLAY} ou écrivez-nous à stagekekeli@gmail.com. Les séances ont lieu exclusivement le samedi.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#formulaire"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground transition hover:opacity-90 shadow-md"
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
                WhatsApp ({PHONE_DISPLAY})
              </a>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-bold transition hover:bg-muted"
              >
                <Phone className="h-4 w-4" />
                {PHONE_DISPLAY}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="formulaire"
        className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1fr_1.1fr] bg-[#FAF9F5] dark:bg-background"
      >
        <Reveal anim="left">
          <div>
            <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
              Joignez-nous directement
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Par téléphone, par courriel ou via le formulaire ci-contre pour toute question relative au suivi scolaire du samedi.
            </p>
            <ul className="mt-8 space-y-4 text-sm">
              {[
                {
                  icon: WhatsAppIcon,
                  t: "WhatsApp & Téléphone",
                  d: PHONE_DISPLAY,
                  href: WHATSAPP_HREF,
                  external: true,
                },
                {
                  icon: Phone,
                  t: PHONE_DISPLAY,
                  d: "Appelez-nous pour l'inscription aux séances du samedi.",
                  href: PHONE_HREF,
                },
                {
                  icon: Mail,
                  t: OFFICIAL_EMAIL,
                  d: "Écrivez-nous : classe, matières et besoins de votre enfant.",
                  href: `mailto:${OFFICIAL_EMAIL}`,
                },
                {
                  icon: MapPin,
                  t: "Lomé, Togo",
                  d: "Séances exclusivement le samedi (8h00 - 17h00).",
                },
              ].map(({ icon: Icon, t, d, href }, i) => (
                <Reveal key={t} anim="up" delay={i * 80}>
                  <li>
                    {href ? (
                      <a
                        href={href}
                        className="flex gap-4 rounded-2xl border border-border bg-[#F3F2EC] dark:bg-card p-5 transition hover:border-[color:var(--sun-deep)]/40"
                      >
                        <Icon className="mt-0.5 h-5 w-5 flex-none text-[color:var(--sun-deep)]" />
                        <span>
                          <span className="block font-bold">{t}</span>
                          <span className="block text-sm text-muted-foreground">{d}</span>
                        </span>
                      </a>
                    ) : (
                      <div className="flex gap-4 rounded-2xl border border-border bg-[#F3F2EC] dark:bg-card p-5">
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
            className="rounded-3xl border border-border bg-[#F3F2EC] dark:bg-card p-7 shadow-[var(--shadow-soft)] md:p-8 space-y-4"
            onSubmit={handleSubmit}
          >
            <h2 className="text-xl font-black tracking-tight">Formulaire de Contact Parent</h2>
            <p className="text-sm text-muted-foreground">
              Renseignez la classe et les besoins de votre enfant pour transmettre votre demande à l'équipe Stage Kékéli.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Votre Nom (Parent / Tuteur) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Mme Amouzou"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition focus:border-[color:var(--sun-deep)] focus:ring-2"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Votre Téléphone / WhatsApp (+228) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="+228 98 93 02 11"
                  value={parentPhone}
                  onChange={(e) => setParentPhone(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition focus:border-[color:var(--sun-deep)] focus:ring-2"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Nom & Prénom de votre Enfant (élève) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Koffi Amouzou"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition focus:border-[color:var(--sun-deep)] focus:ring-2"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Classe de votre enfant
                </label>
                <select
                  value={series}
                  onChange={(e) => setSeries(e.target.value as any)}
                  className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition focus:border-[color:var(--sun-deep)]"
                >
                  <option value="Première C">Première C</option>
                  <option value="Première D">Première D</option>
                  <option value="Terminale C">Terminale C</option>
                  <option value="Terminale D">Terminale D</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Matières souhaitées pour votre enfant
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setMathSelected(!mathSelected)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold border transition ${
                    mathSelected
                      ? "border-[color:var(--sun-deep)] bg-[color:var(--sun)]/30 text-foreground font-bold"
                      : "border-border bg-background text-muted-foreground"
                  }`}
                >
                  Mathématiques
                </button>
                <button
                  type="button"
                  onClick={() => setPhysicsSelected(!physicsSelected)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold border transition ${
                    physicsSelected
                      ? "border-[color:var(--sun-deep)] bg-[color:var(--sun)]/30 text-foreground font-bold"
                      : "border-border bg-background text-muted-foreground"
                  }`}
                >
                  Physique-Chimie
                </button>
              </div>
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Message / Précisions (Séances du samedi)
              </label>
              <textarea
                rows={3}
                placeholder="Objectifs, difficultés en maths ou en physique…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition focus:border-[color:var(--sun-deep)] focus:ring-2"
              />
            </div>
            <button
              type="submit"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground transition hover:opacity-90 cursor-pointer shadow-md"
            >
              Envoyer ma demande <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </Reveal>
      </section>

      {/* Confirmation Modal */}
      {confirmationRecord && (
        <Dialog open={!!confirmationRecord} onOpenChange={() => setConfirmationRecord(null)}>
          <DialogContent className="bg-card text-foreground border-border max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-xl font-black text-center text-[color:var(--sun-deep)] flex items-center justify-center gap-2">
                <CheckCircle className="h-6 w-6 text-emerald-500" />
                Demande Enregistrée !
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2 text-sm text-center">
              <p className="text-xs text-muted-foreground">
                Votre demande d'inscription pour votre enfant a été enregistrée avec succès sous la référence :
              </p>
              <p className="text-2xl font-black font-mono text-foreground">{confirmationRecord.id}</p>
              <p className="text-xs text-slate-500">
                Élève : <strong>{confirmationRecord.studentName}</strong> ({confirmationRecord.series})
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={generateWhatsAppReceiptLink(confirmationRecord)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Finaliser la demande sur WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <FaqSection items={CONTACT_FAQ} title={<>Avant de nous écrire</>} />
    </>
  );
}
