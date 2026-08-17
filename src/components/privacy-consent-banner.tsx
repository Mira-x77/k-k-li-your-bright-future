import { Link } from "@tanstack/react-router";
import { ShieldCheck, Check, Lock, X } from "lucide-react";
import { useEffect, useState } from "react";

const CONSENT_KEY = "stage_kekeli_privacy_accepted_v1";

export function PrivacyConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if consent has already been recorded
    const accepted = localStorage.getItem(CONSENT_KEY);
    if (!accepted) {
      // Small delay for smooth entry animation on landing
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-label="Consentement à la politique de confidentialité"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-xl animate-in fade-in slide-in-from-bottom-6 duration-500"
    >
      <div className="rounded-3xl border border-border/80 bg-background/95 p-6 shadow-2xl backdrop-blur-xl dark:bg-card/95 sm:p-7">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[color:var(--sun)]/25 text-[color:var(--sun-deep)] shadow-xs">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black tracking-tight text-foreground flex items-center gap-1.5">
                <Lock className="h-4 w-4 text-[color:var(--sun-deep)]" />
                Respect de votre Vie Privée
              </h3>
              <button
                type="button"
                onClick={handleAccept}
                className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition"
                aria-label="Fermer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Chez <strong>Stage Kékéli</strong>, nous protégeons rigoureusement la confidentialité des données personnelles et des photos des élèves (séries Première & Terminale C & D). En poursuivant votre navigation, vous acceptez notre traitement sécurisé des données.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <Link
                to="/politique-de-confidentialite"
                onClick={handleAccept}
                className="text-xs font-semibold text-[color:var(--sun-deep)] hover:underline"
              >
                Lire la politique complète →
              </Link>
              <button
                type="button"
                onClick={handleAccept}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-xs font-bold text-primary-foreground transition hover:opacity-90 shadow-md cursor-pointer"
              >
                <Check className="h-3.5 w-3.5" />
                J'accepte
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
