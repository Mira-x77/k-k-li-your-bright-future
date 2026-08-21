import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Users, Phone, MessageSquare, CheckCircle2, Clock, AlertCircle, Calendar, BookOpen, ShieldCheck, Sparkles, User, ExternalLink, Send, FileText, Eye } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { getDashboardMetrics, getSignIns, syncFromSupabase, generateWhatsAppReceiptLink, updateSignInStatus, getVisitorAnalytics, type ProgramSignIn, type DashboardMetrics, type VisitorAnalytics } from "@/lib/admin-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Tableau de Bord Admin — Stage Kékéli" },
      { name: "description", content: "Gestion des inscriptions, suivi financier et fiches élèves Stage Kékéli." },
    ],
  }),
  component: AdminDashboardPage,
});

function AdminDashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [signIns, setSignIns] = useState<ProgramSignIn[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [visitorStats, setVisitorStats] = useState<VisitorAnalytics | null>(null);

  const loadData = () => {
    const data = getSignIns();
    setSignIns(data);
    setMetrics(getDashboardMetrics());
    setVisitorStats(getVisitorAnalytics());
    if (data.length > 0 && !selectedStudentId) {
      setSelectedStudentId(data[0].id);
    }
  };

  useEffect(() => {
    loadData();
    syncFromSupabase().then(() => loadData());

    const handleVisit = () => setVisitorStats(getVisitorAnalytics());
    window.addEventListener("sk_visit_recorded", handleVisit);
    return () => window.removeEventListener("sk_visit_recorded", handleVisit);
  }, []);

  const handleStatusChange = (id: string, newStatus: ProgramSignIn["status"]) => {
    updateSignInStatus(id, newStatus);
    loadData();
  };

  if (!metrics || !visitorStats) return null;

  const selectedStudent = signIns.find((s) => s.id === selectedStudentId) || signIns[0];

  const fmt = (n: number | undefined | null) =>
    (typeof n === "number" && !isNaN(n) ? n : 0).toLocaleString("fr-FR");

  return (
    <AdminShell onDataChange={loadData}>
      {signIns.length === 0 ? (
        /* Clean Empty State */
        <div className="rounded-3xl bg-[#14171D] border border-slate-800 p-12 text-center text-white space-y-4 max-w-lg mx-auto mt-8 shadow-xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#CDFE00]/10 text-[#CDFE00]">
            <Sparkles className="h-7 w-7" />
          </div>
          <h2 className="text-xl font-bold">Base de Données Éléves Prête</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Aucune inscription enregistrée pour le moment. Dès qu'un élève s'inscrit sur la page <Link to="/paiement" className="text-[#CDFE00] underline font-bold">Paiement & Inscription</Link>, sa fiche avec photo apparaîtra ici en temps réel.
          </p>
          <div className="pt-2">
            <Link to="/paiement">
              <Button size="sm" className="bg-[#CDFE00] text-slate-950 font-bold hover:bg-[#b8e600] text-xs">
                Tester une Inscription Public
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        /* Adapted Modern 3-Pane Dashboard UI */
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[300px_1fr_260px] items-start">
          {/* LEFT PANE: Worklist Rail (Dark Theme) */}
          <div className="rounded-3xl bg-[#14171D] border border-slate-800/80 p-4 space-y-4 shadow-lg">
            <div className="flex items-center justify-between px-2 pt-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Liste des Élèves ({signIns.length})
              </span>
              <span className="bg-[#CDFE00]/10 text-[#CDFE00] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-[#CDFE00]/20">
                En Direct
              </span>
            </div>

            {/* Student Worklist Items */}
            <div className="space-y-2.5 max-h-[260px] md:max-h-[680px] overflow-y-auto pr-1">
              {signIns.map((student) => {
                const isSelected = selectedStudent?.id === student.id;
                return (
                  <button
                    key={student.id}
                    onClick={() => setSelectedStudentId(student.id)}
                    className={`w-full text-left p-3 rounded-2xl transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-[#CDFE00] text-slate-950 shadow-md transform scale-[1.01]"
                        : "bg-slate-900/90 text-white hover:bg-slate-800/90 border border-slate-800/60"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className="relative h-10 w-10 shrink-0 rounded-full overflow-hidden border border-slate-700 bg-slate-800">
                        {student.photoUrl ? (
                          <img src={student.photoUrl} alt={student.studentName} className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-slate-400">
                            <User className="h-5 w-5" />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <p className={`text-xs font-bold truncate ${isSelected ? "text-slate-950" : "text-white"}`}>
                            {student.studentName}
                          </p>
                          <span className={`text-[10px] font-mono ${isSelected ? "text-slate-800" : "text-amber-400"}`}>
                            {student.id}
                          </span>
                        </div>
                        <p className={`text-[11px] ${isSelected ? "text-slate-800 font-semibold" : "text-slate-400"}`}>
                          {student.series} · {student.subjects.length} matière{student.subjects.length > 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>

                    {/* Status tag */}
                    <div className="mt-2 flex items-center justify-between pt-1 border-t border-black/10">
                      <span className={`text-[10px] font-bold ${isSelected ? "text-slate-900" : "text-emerald-400"}`}>
                        {fmt(student.tuitionFeePaid || 0)} FCFA
                      </span>
                      <span
                        className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                          student.status === "Confirmé"
                            ? isSelected
                              ? "bg-slate-950 text-[#CDFE00]"
                              : "bg-emerald-500/20 text-emerald-400"
                            : isSelected
                            ? "bg-rose-900 text-white"
                            : "bg-amber-500/20 text-amber-400"
                        }`}
                      >
                        {student.status}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CENTER PANE: Selected Student Hero & Details Workspace */}
          {selectedStudent && (
            <div className="space-y-6">
              {/* Student Hero Header Card */}
              <div className="rounded-3xl bg-slate-900 border border-slate-800/90 p-4 sm:p-6 shadow-xl text-white">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-between">
                  <div className="flex items-center gap-5">
                    {/* Student Large Photo Avatar */}
                    <div className="relative h-20 w-20 rounded-full overflow-hidden border-2 border-[#CDFE00] bg-slate-950 shadow-lg shrink-0">
                      {selectedStudent.photoUrl ? (
                        <img src={selectedStudent.photoUrl} alt={selectedStudent.studentName} className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-slate-400">
                          <User className="h-10 w-10" />
                        </div>
                      )}
                    </div>

                    {/* Student Info Details */}
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-extrabold text-white tracking-tight">{selectedStudent.studentName}</h2>
                        <Badge className="bg-[#CDFE00]/10 text-[#CDFE00] border-[#CDFE00]/30 text-xs font-bold">
                          {selectedStudent.series}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        Parent : <strong className="text-slate-200">{selectedStudent.parentName}</strong> ({selectedStudent.parentPhone})
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Inscrit le : {new Date(selectedStudent.createdAt).toLocaleDateString("fr-FR")} · Référence : <span className="font-mono text-amber-400 font-bold">{selectedStudent.id}</span>
                      </p>
                    </div>
                  </div>

                  {/* Status Toggle Badge */}
                  <div className="flex flex-col items-end gap-2">
                    <select
                      value={selectedStudent.status}
                      onChange={(e) => handleStatusChange(selectedStudent.id, e.target.value as any)}
                      className={`rounded-full px-3 py-1 text-xs font-extrabold border focus:outline-none cursor-pointer ${
                        selectedStudent.status === "Confirmé"
                          ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                          : selectedStudent.status === "En attente"
                          ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
                          : "bg-rose-500/20 text-rose-400 border-rose-500/40"
                      }`}
                    >
                      <option value="Confirmé" className="bg-slate-900 text-emerald-400">Confirmé (Payé)</option>
                      <option value="En attente" className="bg-slate-900 text-amber-400">En attente</option>
                      <option value="Relancé" className="bg-slate-900 text-rose-400">Relancé</option>
                    </select>
                  </div>
                </div>

                {/* Quick Action Contact Pills */}
                <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800">
                  <a
                    href={generateWhatsAppReceiptLink(selectedStudent)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-xs font-bold text-slate-950 hover:bg-[#128C7E] hover:text-white transition shadow-sm"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    Envoyer Reçu WhatsApp
                  </a>
                  <a
                    href={`tel:${selectedStudent.parentPhone.replace(/[^0-9]/g, "")}`}
                    className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-4 py-2 text-xs font-bold text-slate-200 hover:bg-slate-700 hover:text-white transition"
                  >
                    <Phone className="h-3.5 w-3.5 text-[#CDFE00]" />
                    Appeler Parent ({selectedStudent.parentPhone})
                  </a>
                </div>
              </div>

              {/* Detail Tabs & Information Cards */}
              <div className="rounded-3xl bg-slate-900 border border-slate-800/90 p-4 sm:p-6 space-y-4 sm:space-y-6 text-white shadow-lg">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                    Détails du Programme & Inscription
                  </h3>
                  <span className="text-xs font-mono text-[#CDFE00] font-semibold">Stage Kékéli Lomé</span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2">
                    <span className="text-[11px] font-semibold text-slate-400 block">Matières Enseignées</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedStudent.subjects.map((sub) => (
                        <span key={sub} className="rounded-md bg-[#CDFE00]/10 text-[#CDFE00] border border-[#CDFE00]/20 px-2.5 py-1 text-xs font-bold">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2">
                    <span className="text-[11px] font-semibold text-slate-400 block">Formule & Règlement</span>
                    <p className="text-sm font-bold text-white">
                      {selectedStudent.paymentPlan === "annuel" ? "Annuel (22 500 FCFA / an)" : "Mensuel (2 500 FCFA / mois)"}
                    </p>
                    <p className="text-xs text-slate-400">Mode : {selectedStudent.paymentMethod}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2">
                    <span className="text-[11px] font-semibold text-slate-400 block">Frais d'inscription (1 500 FCFA)</span>
                    <p className="text-sm font-bold text-emerald-400">
                      {selectedStudent.registrationFeePaid ? "Réglé (Frais uniques)" : "En attente"}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2">
                    <span className="text-[11px] font-semibold text-slate-400 block">Cours du Samedi</span>
                    <p className="text-sm font-bold text-blue-400">
                      {selectedStudent.saturdaySessionIncluded ? "Inclus (Séances intensives)" : "Non inclus"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* RIGHT PANE: Task Checklist & Summary Widgets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6 md:col-span-2 lg:col-span-1">
            {/* Lime Vibrant Task/Checklist Widget */}
            <div className="rounded-3xl bg-[#CDFE00] text-slate-950 p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-950/10 pb-3">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                  Tâches Admin
                </span>
                <CheckCircle2 className="h-4 w-4 text-slate-950" />
              </div>

              <div className="space-y-2.5 text-xs font-semibold">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950/5 border border-slate-950/10">
                  <input type="checkbox" defaultChecked className="rounded border-slate-950 text-slate-950 focus:ring-slate-950" />
                  <span>Enregistrer l'élève au registre SK</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950/5 border border-slate-950/10">
                  <input type="checkbox" defaultChecked className="rounded border-slate-950 text-slate-950 focus:ring-slate-950" />
                  <span>Envoyer reçu WhatsApp au parent</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950/5 border border-slate-950/10">
                  <input type="checkbox" className="rounded border-slate-950 text-slate-950 focus:ring-slate-950" />
                  <span>Activer l'accès offert GoStudy</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950/5 border border-slate-950/10">
                  <input type="checkbox" className="rounded border-slate-950 text-slate-950 focus:ring-slate-950" />
                  <span>Confirmer la séance du samedi</span>
                </div>
              </div>
            </div>

            {/* Purple Summary Widget */}
            <div className="rounded-3xl bg-[#6C5CE7] text-white p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/20 pb-3">
                <span className="text-xs font-extrabold uppercase tracking-wider text-white">
                  Recettes Encaissées
                </span>
                <Badge className="bg-white/20 text-white border-none text-[10px]">Moov / Espèces</Badge>
              </div>

              <div>
                <p className="text-3xl font-extrabold tracking-tight">{fmt(metrics.totalRevenue || 0)} FCFA</p>
                <p className="text-xs text-white/80 mt-1">
                  TMoney : {fmt(metrics.tmoneyRevenue || 0)} FCFA · Espèces : {fmt(metrics.cashRevenue || 0)} FCFA
                </p>
              </div>

              <div className="pt-2 border-t border-white/20 text-xs text-white/90 space-y-1">
                <div className="flex justify-between">
                  <span>Confirmés :</span>
                  <span className="font-bold">{metrics.confirmedSignIns} élèves</span>
                </div>
                <div className="flex justify-between">
                  <span>En attente :</span>
                  <span className="font-bold">{metrics.pendingSignIns} élèves</span>
                </div>
              </div>
            </div>

            {/* Cyan Visitor Analytics Widget */}
            <div className="rounded-3xl bg-[#0F172A] text-white p-6 space-y-4 shadow-xl border border-cyan-500/30">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                  <Eye className="h-4 w-4 text-cyan-400" />
                  <span>Visites du Site</span>
                </span>
                <Badge className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 text-[10px] font-bold">En direct</Badge>
              </div>

              <div>
                <p className="text-3xl font-black text-cyan-400 tracking-tight">{fmt(visitorStats.totalVisits || 0)}</p>
                <p className="text-xs text-slate-400 mt-1">Pages vues au total sur le site</p>
              </div>

              <div className="pt-2 border-t border-slate-800 text-xs text-slate-300 space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Visiteurs uniques :</span>
                  <span className="font-bold text-white">{fmt(visitorStats.uniqueVisitorsCount || 0)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Visites aujourd'hui :</span>
                  <span className="font-bold text-cyan-400">{fmt(visitorStats.visitsToday || 0)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
