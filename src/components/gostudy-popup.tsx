import { useEffect, useState } from "react";
import { Download, ExternalLink, X, Sparkles } from "lucide-react";
import gostudyLogo from "@/assets/gostudy-logo.jpg";
import gostudyBanner from "@/assets/gostudy-banner.jpg";

export function GoStudyPopupModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if popup was already dismissed in this session
    if (typeof window !== "undefined") {
      const dismissed = sessionStorage.getItem("gostudy_popup_dismissed");
      if (dismissed) return;
    }

    // Set 30-second timer (30,000 ms)
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("gostudy_popup_dismissed", "true");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-300">
      {/* Background glow */}
      <div className="pointer-events-none absolute h-[300px] w-[300px] rounded-full bg-blue-500/20 blur-[100px]" />

      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-[#0F172A] border border-blue-500/40 text-slate-100 shadow-2xl p-6 sm:p-7 transition-all">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition"
          aria-label="Fermer la publicité"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header Badge & Logo */}
        <div className="flex items-center gap-3 pr-8">
          <img
            src={gostudyLogo}
            alt="Go Study Logo"
            className="h-12 w-12 rounded-2xl object-cover border border-blue-500/40 shadow-md shrink-0"
          />
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-0.5 text-[10px] font-bold text-blue-400 mb-1">
              <Sparkles className="h-3 w-3" />
              <span>Application Recommandée</span>
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight leading-tight">Go Study!</h3>
          </div>
        </div>

        {/* Banner Preview */}
        <div className="relative mt-4 overflow-hidden rounded-2xl border border-slate-800">
          <img
            src={gostudyBanner}
            alt="Go Study Application"
            className="h-36 w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />
        </div>

        {/* Content Description */}
        <div className="mt-4 space-y-2">
          <h4 className="text-base font-extrabold text-white">
            Boostez vos notes et réussissez votre BAC 🚀
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Calculez votre moyenne exacte avec les coefficients officiels (Première & Terminale C & D), simulez vos objectifs de notes et révisez gratuitement.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-2.5">
          <a
            href="/gostudy-app.apk"
            download="GoStudy-App.apk"
            onClick={handleClose}
            className="flex items-center justify-center gap-2 w-full rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-500 transition hover:scale-[1.01]"
          >
            <Download className="h-4 w-4" />
            <span>Télécharger l'APK Android</span>
          </a>

          <a
            href="https://goostudy.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClose}
            className="flex items-center justify-center gap-2 w-full rounded-2xl border border-slate-700 bg-slate-800/80 px-5 py-2.5 text-xs font-bold text-slate-200 hover:bg-slate-700 hover:text-white transition"
          >
            <span>Ouvrir la version Web</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Dismiss Footer */}
        <div className="mt-4 text-center">
          <button
            onClick={handleClose}
            className="text-[11px] text-slate-500 hover:text-slate-400 transition underline"
          >
            Continuer sur Stage Kékéli
          </button>
        </div>
      </div>
    </div>
  );
}
