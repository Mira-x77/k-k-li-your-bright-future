import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Users, BarChart3, Download, ArrowLeft, Plus, Bell } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { exportToCSV, getSignIns, addSignIn, getUnreadCount, markAllAsRead, type ProgramSignIn } from "@/lib/admin-store";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface AdminShellProps {
  children: React.ReactNode;
  onDataChange?: () => void;
}

export function AdminShell({ children, onDataChange }: AdminShellProps) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

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
  });

  const refreshUnread = () => {
    setUnreadCount(getUnreadCount());
  };

  useEffect(() => {
    refreshUnread();

    // Web Audio Chime generator for real-time notifications
    const playAudioChime = () => {
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } catch {
        // Audio playback error fallback
      }
    };

    const handleNewRegistration = (e: any) => {
      const record = e.detail || e.data?.data;
      if (record) {
        playAudioChime();
        toast.success(`🔔 Nouvelle inscription : ${record.studentName} (${record.series})`, {
          description: `Matières : ${record.subjects.join(" & ")} — ${record.tuitionFeePaid.toLocaleString("fr-FR")} FCFA`,
          duration: 6000,
        });
        refreshUnread();
        if (onDataChange) onDataChange();
      }
    };

    // BroadcastChannel Listener for live cross-tab notifications
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
  }, [onDataChange]);

  const handleMarkRead = () => {
    markAllAsRead();
    setUnreadCount(0);
    if (onDataChange) onDataChange();
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
    });
    if (onDataChange) onDataChange();
  };

  const navItems = [
    { label: "Vue d'ensemble", path: "/admin", icon: LayoutDashboard },
    { label: "Inscriptions au programme", path: "/admin/inscriptions", icon: Users },
    { label: "Statistiques & Analytics", path: "/admin/statistiques", icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-400 selection:text-slate-900">
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Retour au site
            </Link>
            <span className="hidden text-slate-600 sm:inline">|</span>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-400 font-bold text-slate-950 text-sm">
                SK
              </div>
              <span className="font-bold text-white text-base tracking-tight">
                Stage Kékéli <span className="text-amber-400 text-xs font-semibold px-2 py-0.5 rounded bg-amber-400/10 ml-1">Admin</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Unread Notifications Badge */}
            {unreadCount > 0 ? (
              <button
                onClick={handleMarkRead}
                title="Cliquer pour tout marquer comme lu"
                className="relative flex items-center gap-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 text-xs font-bold text-amber-400 hover:bg-amber-500/20 transition"
              >
                <Bell className="h-3.5 w-3.5 animate-bounce" />
                <span>{unreadCount} nouvelle{unreadCount > 1 ? "s" : ""}</span>
              </button>
            ) : (
              <span className="flex items-center gap-1.5 text-xs text-slate-400 px-2 py-1">
                <Bell className="h-3.5 w-3.5 text-slate-500" />
                <span>À jour</span>
              </span>
            )}

            {/* New Registration Modal */}
            <Dialog open={openNewModal} onOpenChange={setOpenNewModal}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-amber-400 text-slate-950 font-bold hover:bg-amber-300 text-xs gap-1.5">
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Inscription Manuelle</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-amber-400">Ajouter une Inscription</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreate} className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Nom de l'Élève</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Komla Adji"
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
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
                        className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Téléphone (+228)</label>
                      <input
                        type="text"
                        required
                        placeholder="+228 90 00 00 00"
                        value={formData.parentPhone}
                        onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                        className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Série</label>
                      <select
                        value={formData.series}
                        onChange={(e) => setFormData({ ...formData, series: e.target.value as any })}
                        className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
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
                        className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
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
                      className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Moov Money">Moov Money (+228 98 93 02 11)</option>
                      <option value="En personne">En personne / Espèces</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="saturday"
                      checked={formData.saturdaySessionIncluded}
                      onChange={(e) => setFormData({ ...formData, saturdaySessionIncluded: e.target.checked })}
                      className="rounded border-slate-700 bg-slate-800 text-amber-400 focus:ring-amber-400"
                    />
                    <label htmlFor="saturday" className="text-xs text-slate-300">
                      Inclure l'inscription aux Cours du samedi
                    </label>
                  </div>
                  <Button type="submit" className="w-full bg-amber-400 text-slate-950 font-bold hover:bg-amber-300 mt-2">
                    Enregistrer l'inscription
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <Button
              onClick={() => exportToCSV(getSignIns())}
              variant="outline"
              size="sm"
              className="border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white text-xs gap-1.5"
            >
              <Download className="h-3.5 w-3.5 text-amber-400" />
              <span className="hidden sm:inline">Export CSV (SK)</span>
            </Button>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="mx-auto flex max-w-7xl space-x-1 px-4 sm:px-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition-colors ${
                  isActive
                    ? "border-amber-400 text-amber-400 bg-amber-400/5"
                    : "border-transparent text-slate-400 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
