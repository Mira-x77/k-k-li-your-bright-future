import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, Lock, Eye, FileText, CheckCircle2, Phone, Mail } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/site-chrome";
import { PHONE_DISPLAY, PHONE_HREF, WHATSAPP_HREF } from "@/components/marketing";
import { OFFICIAL_EMAIL } from "@/lib/admin-store";

export const Route = createFileRoute("/politique-de-confidentialite")({
  head: () => ({
    meta: [
      { title: "Politique de Confidentialité — Stage Kékéli" },
      {
        name: "description",
        content:
          "Politique de confidentialité et protection des données personnelles des parents et élèves de Stage Kékéli à Lomé, Togo. Transparence, sécurité et droits.",
      },
      { property: "og:title", content: "Politique de Confidentialité — Stage Kékéli" },
      {
        property: "og:description",
        content: "Découvrez notre engagement pour la protection et la confidentialité des données de votre enfant.",
      },
    ],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Transparence & Sécurité"
        title="Politique de Confidentialité"
        intro="Chez Stage Kékéli, la protection de la vie privée et des données personnelles des élèves et de leurs parents est une priorité absolue."
      />

      <section className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
        <Reveal>
          <div className="rounded-3xl border border-border bg-card p-8 md:p-12 shadow-sm space-y-10">
            {/* Intro Header Card */}
            <div className="flex items-start gap-4 rounded-2xl bg-[color:var(--sun)]/15 p-6 border border-[color:var(--sun-deep)]/30">
              <Shield className="h-8 w-8 text-[color:var(--sun-deep)] shrink-0 mt-1" />
              <div>
                <h2 className="text-lg font-bold text-foreground">Notre Engagement de Confidentialité</h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Dernière mise à jour : 17 août 2026. Cette politique détaille comment nous collectons, traitons et protégeons les informations confidentielles transmises lors de l'inscription de votre enfant.
                </p>
              </div>
            </div>

            {/* Section 1 */}
            <div className="space-y-3">
              <h3 className="text-xl font-black text-foreground flex items-center gap-2">
                <FileText className="h-5 w-5 text-[color:var(--sun-deep)]" />
                1. Données Personnelles Collectées
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Afin de garantir le bon déroulement des cours de répétition du samedi en mathématiques et physique-chimie (séries Première C, Première D, Terminale C et Terminale D), nous collectons exclusivement les informations nécessaires :
              </p>
              <ul className="grid gap-2 text-sm text-foreground/85 pt-2 sm:grid-cols-2">
                <li className="flex items-center gap-2 rounded-xl bg-muted/40 p-3 border border-border">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Nom & prénom de l'élève</span>
                </li>
                <li className="flex items-center gap-2 rounded-xl bg-muted/40 p-3 border border-border">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Classe et série (C ou D)</span>
                </li>
                <li className="flex items-center gap-2 rounded-xl bg-muted/40 p-3 border border-border">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Nom, téléphone & WhatsApp du parent</span>
                </li>
                <li className="flex items-center gap-2 rounded-xl bg-muted/40 p-3 border border-border">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Photo de profil de l'élève (optionnelle)</span>
                </li>
              </ul>
            </div>

            {/* Section 2 */}
            <div className="space-y-3">
              <h3 className="text-xl font-black text-foreground flex items-center gap-2">
                <Lock className="h-5 w-5 text-[color:var(--sun-deep)]" />
                2. Finalité et Utilisation des Données
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Les informations recueillies sont strictement réservées à l'administration de Stage Kékéli et ne sont utilisées que pour :
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                <li>L'organisation pédagogique des répétitions et l'affectation aux groupes de niveau.</li>
                <li>Le suivi des règlements (TMoney Togocel / espèces) et l'émission des reçus numériques.</li>
                <li>La communication directe par téléphone ou WhatsApp avec le parent concernant la progression ou les horaires de séance.</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="space-y-3">
              <h3 className="text-xl font-black text-foreground flex items-center gap-2">
                <Eye className="h-5 w-5 text-[color:var(--sun-deep)]" />
                3. Confidentialité et Non-Divulgation
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Stage Kékéli s'engage formellement à :
              </p>
              <div className="rounded-2xl bg-muted/30 p-5 border border-border space-y-3 text-sm">
                <p className="font-semibold text-foreground">
                  🔒 Ne jamais vendre, louer, céder ni partager vos données ou photos avec des entreprises tierces ou des partenaires commerciaux.
                </p>
                <p className="text-muted-foreground">
                  Vos coordonnées et la photo d'identité de votre enfant restent strictement confidentielles au sein de notre équipe administrative et de nos répétiteurs.
                </p>
              </div>
            </div>

            {/* Section 4 */}
            <div className="space-y-3">
              <h3 className="text-xl font-black text-foreground flex items-center gap-2">
                <Shield className="h-5 w-5 text-[color:var(--sun-deep)]" />
                4. Vos Droits d'Accès et de Suppression
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                En tant que parent ou tuteur légal, vous disposez à tout moment d'un droit d'accès, de modification, de rectification et de suppression des données personnelles relatives à votre enfant.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Pour toute demande relative à vos données personnelles ou pour demander le retrait d'une photo d'inscription, vous pouvez nous contacter :
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href={`mailto:${OFFICIAL_EMAIL}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-card border border-border px-4 py-2.5 text-xs font-bold hover:bg-muted transition"
                >
                  <Mail className="h-4 w-4 text-[color:var(--sun-deep)]" />
                  {OFFICIAL_EMAIL}
                </a>
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2 rounded-xl bg-card border border-border px-4 py-2.5 text-xs font-bold hover:bg-muted transition"
                >
                  <Phone className="h-4 w-4 text-[color:var(--sun-deep)]" />
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>

            {/* Footer note */}
            <div className="border-t border-border pt-6 text-center text-xs text-muted-foreground">
              Stage Kékéli — Programme de Répétitions d'Excellence · Lomé, Togo.
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
