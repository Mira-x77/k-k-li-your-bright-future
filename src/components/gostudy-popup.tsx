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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300 overflow-y-auto">
      {/* Background glow */}
      <div className="pointer-events-none absolute h-[260px] w-[260px] sm:h-[320px] sm:w-[320px] rounded-full bg-blue-500/20 blur-[100px]" />

      <div className="relative w-[95vw] max-w-md max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0F172A] border border-blue-500/40 text-slate-100 shadow-2xl p-4 sm:p-7 transition-all my-auto">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3.5 right-3.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition cursor-pointer"
          aria-label="Fermer la publicité"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header Badge & Logo */}
        <div className="flex items-center gap-3 pr-8">
          <img
            src={gostudyLogo}
            alt="Go Study Logo"
            className="h-11 w-11 sm:h-13 sm:w-13 rounded-2xl object-cover border border-blue-500/40 shadow-md shrink-0"
          />
          <div className="min-w-0 flex-1">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-0.5 text-[10px] font-bold text-blue-400 mb-1">
              <Sparkles className="h-3 w-3 shrink-0" />
              <span>Application Partenaire</span>
            </div>
            <h3 className="text-base sm:text-xl font-bold text-white tracking-tight leading-tight truncate">Go Study!</h3>
          </div>
        </div>

        {/* Banner Preview */}
        <div className="relative mt-3.5 sm:mt-4 overflow-hidden rounded-2xl border border-slate-800">
          <img
            src={gostudyBanner}
            alt="Go Study Application"
            className="h-28 sm:h-36 w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />
        </div>

        {/* Content Description */}
        <div className="mt-3.5 sm:mt-4 space-y-1.5">
          <h4 className="text-sm sm:text-base font-extrabold text-white leading-snug">
            Boostez vos notes et réussissez votre BAC 🚀
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Calculez votre moyenne exacte avec les coefficients officiels (Première & Terminale C & D), simulez vos objectifs de notes et révisez gratuitement.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 space-y-2.5">
          <a
            href="/gostudy-app.apk"
            download="GoStudy-App.apk"
            onClick={handleClose}
            className="flex items-center justify-center gap-2 w-full rounded-2xl bg-blue-600 px-4 py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-500 transition cursor-pointer"
          >
            <Download className="h-4 w-4 shrink-0" />
            <span>Télécharger l'APK Direct Android</span>
          </a>

          <a
            href="https://goostudy.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClose}
            className="flex items-center justify-center gap-2 w-full rounded-2xl border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-xs font-bold text-slate-200 hover:bg-slate-700 hover:text-white transition cursor-pointer"
          >
            <span>Ouvrir la version Web (goostudy.vercel.app)</span>
            <ExternalLink className="h-3.5 w-3.5 shrink-0" />
          </a>
        </div>

        {/* Dismiss Footer */}
        <div className="mt-3.5 text-center">
          <button
            onClick={handleClose}
            className="text-[11px] text-slate-400 hover:text-slate-200 transition underline cursor-pointer"
          >
            Continuer sur Stage Kékéli
          </button>
        </div>
      </div>
    </div>
  );
}
