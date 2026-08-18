import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Users, BarChart3, Download, ArrowLeft, Plus, Bell, Menu, X, LogOut, Lock, Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { exportToCSV, getSignIns, addSignIn, getUnreadCount, markAllAsRead, type ProgramSignIn } from "@/lib/admin-store";
import { ProfilePhotoCapture } from "@/components/profile-photo-capture";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

/* ──────────────────────────────────────────────
   Password-protected Admin Login Gate
   ────────────────────────────────────────────── */

const ADMIN_PASSWORD = "Admin123Kekeli";
const AUTH_KEY = "sk_admin_auth";

function AdminLoginGate({ onAuthenticated }: { onAuthenticated: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, "true");
      onAuthenticated();
    } else {
      setError("Mot de passe incorrect. Réessayez.");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F1115]">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-[#CDFE00]/5 blur-[120px]" />
      </div>

      <div
        className={`relative w-full max-w-sm mx-4 rounded-3xl bg-[#14171D] border border-slate-800 p-8 shadow-2xl transition-transform ${
          isShaking ? "animate-[shake_0.3s_ease-in-out]" : ""
        }`}
      >
        {/* Logo */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <img src="/logo-dark.png" alt="Stage Kékéli" className="h-14 w-auto object-contain" />
          <div className="text-center">
            <h1 className="text-xl font-extrabold text-white tracking-tight">Stage Kékéli</h1>
            <span className="text-[#CDFE00] text-xs font-bold px-3 py-1 rounded-full bg-[#CDFE00]/10 border border-[#CDFE00]/20 inline-block mt-2">
              Administration
            </span>
          </div>
        </div>

        {/* Lock Icon */}
        <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 border border-slate-800">
          <Lock className="h-5 w-5 text-[#CDFE00]" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2">Mot de passe administrateur</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Entrez le mot de passe"
                autoFocus
                className="w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#CDFE00] focus:ring-1 focus:ring-[#CDFE00]/30 transition-colors pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-xs text-rose-400 font-semibold bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <Button
            type="submit"
            className="w-full bg-[#CDFE00] text-slate-950 font-bold hover:bg-[#b8e600] rounded-xl py-3 text-sm transition-all shadow-lg shadow-[#CDFE00]/10"
          >
            Accéder au Tableau de Bord
          </Button>
        </form>

        <p className="text-center text-[11px] text-slate-600 mt-6">
          Accès réservé à l'équipe Stage Kékéli
        </p>
      </div>

      {/* Shake animation */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Main AdminShell Component
   ────────────────────────────────────────────── */

interface AdminShellProps {
  children: React.ReactNode;
  onDataChange?: () => void;
}

export function AdminShell({ children, onDataChange }: AdminShellProps) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  /* ── Auth State ── */
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem(AUTH_KEY) === "true";
    }
    return false;
  });

  /* ── Mobile Sidebar State ── */
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [unreadCount, setUnreadCount] = useState(0);
  const [openNewModal, setOpenNewModal] = useState(false);
  const [formData, setFormData] = useState({
    studentName: "",
    parentName: "",
    parentPhone: "",
    series: "Terminale C" as ProgramSignIn["series"],
    subjects: ["Mathématiques", "Physique-Chimie"] as ("Mathématiques" | "Physique-Chimie")[],
    paymentPlan: "mensuel" as "mensuel" | "annuel",
    paymentMethod: "Moov Money" as "Moov Money" | "En personne",
    saturdaySessionIncluded: true,
    photoUrl: "",
  });

  const refreshUnread = () => {
    setUnreadCount(getUnreadCount());
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    refreshUnread();

    const playAudioChime = () => {
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(587.33, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } catch {}
    };

    const handleNewRegistration = (e: any) => {
      const record = e.detail || e.data?.data;
      if (record) {
        playAudioChime();
        toast.success(`🔔 Nouvelle inscription : ${record.studentName} (${record.series})`, {
          description: `Matières : ${record.subjects.join(" & ")} — ${(record.tuitionFeePaid || 0).toLocaleString("fr-FR")} FCFA`,
          duration: 6000,
        });
        refreshUnread();
        if (onDataChange) onDataChange();
      }
    };

    let bc: BroadcastChannel | null = null;
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      try {
        bc = new BroadcastChannel("stage_kekeli_live_events");
        bc.onmessage = (event) => {
          if (event.data?.type === "NEW_REGISTRATION") {
            handleNewRegistration(event);
          }
        };
      } catch {}
    }

    window.addEventListener("sk_new_registration", handleNewRegistration);
    window.addEventListener("sk_data_updated", () => {
      refreshUnread();
      if (onDataChange) onDataChange();
    });

    return () => {
      window.removeEventListener("sk_new_registration", handleNewRegistration);
      if (bc) bc.close();
    };
  }, [onDataChange, isAuthenticated]);

  const handleMarkRead = () => {
    markAllAsRead();
    setUnreadCount(0);
    if (onDataChange) onDataChange();
  };

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName || !formData.parentPhone) return;

    const mathFee = formData.subjects.includes("Mathématiques") ? (formData.paymentPlan === "annuel" ? 22500 : 2500) : 0;
    const physFee = formData.subjects.includes("Physique-Chimie") ? (formData.paymentPlan === "annuel" ? 22500 : 2500) : 0;
    const totalDue = mathFee + physFee + 1500;

    addSignIn({
      studentName: formData.studentName,
      parentName: formData.parentName || "Parent",
      parentPhone: formData.parentPhone,
      series: formData.series,
      subjects: formData.subjects,
      paymentPlan: formData.paymentPlan,
      paymentMethod: formData.paymentMethod,
      registrationFeePaid: true,
      tuitionFeePaid: totalDue,
      totalAmountDue: totalDue,
      status: "Confirmé",
      saturdaySessionIncluded: formData.saturdaySessionIncluded,
      photoUrl: formData.photoUrl || undefined,
    });

    setOpenNewModal(false);
    setFormData({
      studentName: "",
      parentName: "",
      parentPhone: "",
      series: "Terminale C",
      subjects: ["Mathématiques", "Physique-Chimie"],
      paymentPlan: "mensuel",
      paymentMethod: "Moov Money",
      saturdaySessionIncluded: true,
      photoUrl: "",
    });
    if (onDataChange) onDataChange();
  };

  const navItems = [
    { label: "Tableau de bord", path: "/admin", icon: LayoutDashboard },
    { label: "Inscriptions", path: "/admin/inscriptions", icon: Users },
    { label: "Statistiques", path: "/admin/statistiques", icon: BarChart3 },
  ];

  /* ── Auth Gate ── */
  if (!isAuthenticated) {
    return <AdminLoginGate onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#0F1115] text-slate-100 selection:bg-[#CDFE00] selection:text-slate-950 font-sans">
      {/* ─── Mobile Sidebar Overlay ─── */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* ─── Mobile Sidebar Drawer ─── */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-[#14171D] border-r border-slate-800 shadow-2xl transform transition-transform duration-300 ease-out lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <img src="/logo-dark.png" alt="Stage Kékéli" className="h-9 w-auto object-contain" />
            <div>
              <span className="font-bold text-white text-sm tracking-tight block">Stage Kékéli</span>
              <span className="text-[#CDFE00] text-[10px] font-bold px-2 py-0.5 rounded bg-[#CDFE00]/10 border border-[#CDFE00]/20 inline-block mt-0.5">
                Admin
              </span>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="flex items-center justify-center h-8 w-8 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 p-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-[#CDFE00] text-slate-950 shadow-md"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors mb-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour au site
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* ─── Top Header ─── */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#14171D]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2.5 sm:px-6 sm:py-3">
          {/* Left: Hamburger (mobile) + Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Hamburger */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex items-center justify-center h-9 w-9 rounded-xl bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Desktop: Back to site */}
            <Link
              to="/"
              className="hidden lg:flex items-center gap-2 rounded-lg bg-slate-800/80 px-3 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Retour au site
            </Link>
            <span className="hidden text-slate-700 lg:inline">|</span>

            {/* Logo */}
            <div className="flex items-center gap-2">
              <img src="/logo-dark.png" alt="Stage Kékéli Logo" className="h-7 sm:h-8 w-auto object-contain" />
              <span className="font-bold text-white text-sm sm:text-base tracking-tight">
                <span className="hidden sm:inline">Stage </span>Kékéli
                <span className="text-[#CDFE00] text-[10px] sm:text-[11px] font-bold px-1.5 sm:px-2 py-0.5 rounded bg-[#CDFE00]/10 ml-1 border border-[#CDFE00]/20">
                  Admin
                </span>
              </span>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Unread Notifications Badge */}
            {unreadCount > 0 ? (
              <button
                onClick={handleMarkRead}
                title="Cliquer pour tout marquer comme lu"
                className="relative flex items-center gap-1.5 rounded-lg bg-[#CDFE00]/10 border border-[#CDFE00]/30 px-2 sm:px-3 py-1.5 text-xs font-bold text-[#CDFE00] hover:bg-[#CDFE00]/20 transition"
              >
                <Bell className="h-3.5 w-3.5 animate-bounce" />
                <span className="hidden sm:inline">{unreadCount} nouvelle{unreadCount > 1 ? "s" : ""}</span>
                <span className="sm:hidden text-[10px]">{unreadCount}</span>
              </button>
            ) : (
              <span className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 px-2 py-1">
                <Bell className="h-3.5 w-3.5 text-slate-500" />
                <span>À jour</span>
              </span>
            )}

            {/* New Registration Modal */}
            <Dialog open={openNewModal} onOpenChange={setOpenNewModal}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-[#CDFE00] text-slate-950 font-bold hover:bg-[#b8e600] text-xs gap-1.5 shadow-sm h-8 sm:h-9 px-2 sm:px-3">
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Inscription</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#14171D] border-slate-800 text-white max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-[#CDFE00]">Ajouter une Inscription</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreate} className="space-y-4 pt-2">
                  <ProfilePhotoCapture value={formData.photoUrl} onChange={(photo) => setFormData({ ...formData, photoUrl: photo })} />

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Nom de l'Élève *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Komla Adji"
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#CDFE00]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Nom du Parent</label>
                      <input
                        type="text"
                        placeholder="Mme Adji"
                        value={formData.parentName}
                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                        className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#CDFE00]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Téléphone (+228) *</label>
                      <input
                        type="text"
                        required
                        placeholder="+228 90 00 00 00"
                        value={formData.parentPhone}
                        onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                        className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#CDFE00]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Série</label>
                      <select
                        value={formData.series}
                        onChange={(e) => setFormData({ ...formData, series: e.target.value as any })}
                        className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#CDFE00]"
                      >
                        <option value="Première C">Première C</option>
                        <option value="Première D">Première D</option>
                        <option value="Terminale C">Terminale C</option>
                        <option value="Terminale D">Terminale D</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Formule</label>
                      <select
                        value={formData.paymentPlan}
                        onChange={(e) => setFormData({ ...formData, paymentPlan: e.target.value as any })}
                        className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#CDFE00]"
                      >
                        <option value="mensuel">Mensuel (2500 / m)</option>
                        <option value="annuel">Annuel (22500 / an)</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Mode de règlement</label>
                    <select
                      value={formData.paymentMethod}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as any })}
                      className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#CDFE00]"
                    >
                      <option value="TMoney">TMoney Togocel (+228 93 51 00 74)</option>
                      <option value="En personne">En personne / Espèces</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="saturday"
                      checked={formData.saturdaySessionIncluded}
                      onChange={(e) => setFormData({ ...formData, saturdaySessionIncluded: e.target.checked })}
                      className="rounded border-slate-700 bg-slate-900 text-[#CDFE00] focus:ring-[#CDFE00]"
                    />
                    <label htmlFor="saturday" className="text-xs text-slate-300">
                      Inclure l'inscription aux Cours du samedi
                    </label>
                  </div>
                  <Button type="submit" className="w-full bg-[#CDFE00] text-slate-950 font-bold hover:bg-[#b8e600] mt-2">
                    Enregistrer l'inscription
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            {/* CSV Export */}
            <Button
              onClick={() => exportToCSV(getSignIns())}
              variant="outline"
              size="sm"
              className="border-slate-800 bg-slate-900 text-slate-200 hover:bg-slate-800 hover:text-white text-xs gap-1.5 h-8 sm:h-9 px-2 sm:px-3"
            >
              <Download className="h-3.5 w-3.5 text-[#CDFE00]" />
              <span className="hidden md:inline">Export CSV</span>
            </Button>

            {/* Desktop Logout */}
            <button
              onClick={handleLogout}
              title="Déconnexion"
              className="hidden lg:flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden xl:inline">Déconnexion</span>
            </button>
          </div>
        </div>

        {/* Desktop Navigation Tabs (hidden on mobile — sidebar used instead) */}
        <div className="hidden lg:flex mx-auto max-w-7xl space-x-1 px-4 sm:px-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition-colors ${
                  isActive
                    ? "border-[#CDFE00] text-[#CDFE00] bg-[#CDFE00]/5"
                    : "border-transparent text-slate-400 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile Navigation Tabs (compact, scrollable) */}
        <div className="flex lg:hidden overflow-x-auto scrollbar-hide border-t border-slate-800/50">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-1.5 border-b-2 px-3 py-2 text-[11px] font-semibold transition-colors whitespace-nowrap flex-1 justify-center ${
                  isActive
                    ? "border-[#CDFE00] text-[#CDFE00] bg-[#CDFE00]/5"
                    : "border-transparent text-slate-500 hover:text-slate-300"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="hidden xs:inline">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-3 py-4 sm:px-6 sm:py-6">{children}</main>
    </div>
  );
}
