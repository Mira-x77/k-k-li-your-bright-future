import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Wallet,
  Smartphone,
  Landmark,
  CalendarCheck,
  ShieldCheck,
  TrendingUp,
  Globe,
  Eye,
  Users,
  Calendar,
  Laptop,
} from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import {
  getDashboardMetrics,
  syncFromSupabase,
  getVisitorAnalytics,
  type DashboardMetrics,
  type VisitorAnalytics,
} from "@/lib/admin-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/admin/statistiques")({
  head: () => ({
    meta: [
      { title: "Statistiques & Financials — Admin Stage Kékéli" },
      {
        name: "description",
        content:
          "Chiffre d'affaires, suivi de la fréquentation des visiteurs du site et métriques des cours Stage Kékéli.",
      },
    ],
  }),
  component: AdminStatistiquesPage,
});

function AdminStatistiquesPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [visitorStats, setVisitorStats] = useState<VisitorAnalytics | null>(null);

  const loadData = () => {
    setMetrics(getDashboardMetrics());
    setVisitorStats(getVisitorAnalytics());
  };

  useEffect(() => {
    loadData();
    syncFromSupabase().then(() => loadData());

    const handleVisit = () => setVisitorStats(getVisitorAnalytics());
    const handleData = () => loadData();
    window.addEventListener("sk_visit_recorded", handleVisit);
    window.addEventListener("sk_data_updated", handleData);
    return () => {
      window.removeEventListener("sk_visit_recorded", handleVisit);
      window.removeEventListener("sk_data_updated", handleData);
    };
  }, []);

  if (!metrics || !visitorStats) return null;

  const fmt = (n: number | undefined | null) =>
    (typeof n === "number" && !isNaN(n) ? n : 0).toLocaleString("fr-FR");

  const formatDate = (iso: string) => {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return iso;
    }
  };

  return (
    <AdminShell onDataChange={loadData}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold text-white tracking-tight sm:text-3xl">
            Statistiques & Métriques Financières
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Indicateurs de performance, trafic des visiteurs du site et suivi des règlements Stage Kékéli.
          </p>
        </div>

        {/* Financial KPI Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-slate-900 border-slate-800 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-slate-400 flex items-center justify-between">
                <span>Revenus Encaissés (Confirmés)</span>
                <Wallet className="h-4 w-4 text-emerald-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-emerald-400">
                {fmt(metrics.totalRevenue || 0)} FCFA
              </div>
              <p className="text-xs text-slate-400 mt-1.5">
                Inscriptions validées par l'admin ({metrics.confirmedSignIns} élève
                {metrics.confirmedSignIns > 1 ? "s" : ""})
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800 text-white border-amber-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-amber-400 flex items-center justify-between">
                <span>Règlements en Attente</span>
                <TrendingUp className="h-4 w-4 text-amber-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-amber-400">
                {fmt(metrics.pendingRevenue || 0)} FCFA
              </div>
              <p className="text-xs text-slate-400 mt-1.5">
                Paiements en attente de vérification ({metrics.pendingSignIns} dossier
                {metrics.pendingSignIns > 1 ? "s" : ""})
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-slate-400 flex items-center justify-between">
                <span>TMoney Togocel (Confirmé)</span>
                <Smartphone className="h-4 w-4 text-blue-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-blue-400">
                {fmt(metrics.tmoneyRevenue || 0)} FCFA
              </div>
              <p className="text-xs text-slate-400 mt-1.5">
                Transferts validés sur le +228 93 51 00 74
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-slate-400 flex items-center justify-between">
                <span>En personne / Espèces</span>
                <Landmark className="h-4 w-4 text-purple-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-purple-400">
                {fmt(metrics.cashRevenue || 0)} FCFA
              </div>
              <p className="text-xs text-slate-400 mt-1.5">
                Règlements encaissés le samedi à Lomé
              </p>
            </CardContent>
          </Card>
        </div>

        {/* SITE VISITORS & AUDIENCE SECTION */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Eye className="h-5 w-5 text-cyan-400" />
              Fréquentation & Audience du Site Vitrine
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              Mises à jour en direct
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="bg-slate-900 border-slate-800 text-white border-cyan-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-slate-400 flex items-center justify-between">
                  <span>Total Pages Vues</span>
                  <Eye className="h-4 w-4 text-cyan-400" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black text-cyan-400">
                  {fmt(visitorStats.totalVisits || 0)}
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Visites totales enregistrées sur le site
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-slate-400 flex items-center justify-between">
                  <span>Visiteurs Uniques</span>
                  <Users className="h-4 w-4 text-purple-400" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black text-purple-400">
                  {fmt(visitorStats.uniqueVisitorsCount || 0)}
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Appareils / utilisateurs distincts
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-slate-400 flex items-center justify-between">
                  <span>Visites Aujourd'hui</span>
                  <Calendar className="h-4 w-4 text-emerald-400" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black text-emerald-400">
                  {fmt(visitorStats.visitsToday || 0)}
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Trafic de la journée en cours
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Visits History Table */}
          <Card className="bg-slate-900 border-slate-800 text-white overflow-hidden max-w-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Laptop className="h-4 w-4 text-cyan-400" />
                Journal des Dernières Visites
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto max-w-full">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="border-b border-slate-800 bg-slate-950/80 text-slate-400 uppercase text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Page Visitée</th>
                      <th className="py-3 px-4">Appareil</th>
                      <th className="py-3 px-4">Identifiant Visiteur</th>
                      <th className="py-3 px-4 text-right">Date & Heure</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {(visitorStats.recentVisits || []).slice(0, 15).map((visit) => (
                      <tr key={visit.id} className="hover:bg-slate-800/40 transition">
                        <td className="py-3 px-4 font-mono text-cyan-400 font-bold">
                          {visit.path}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block rounded px-2 py-0.5 text-[10px] font-semibold ${
                              visit.device === "Mobile"
                                ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                : visit.device === "Tablette"
                                ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                                : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                            }`}
                          >
                            {visit.device}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono text-slate-400 text-[11px]">
                          {visit.visitorId}
                        </td>
                        <td className="py-3 px-4 text-right text-slate-400 text-[11px]">
                          {formatDate(visit.timestamp)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Operational Analytics */}
        <div className="grid gap-6 md:grid-cols-2 pt-2">
          <Card className="bg-slate-900 border-slate-800 text-white">
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <CalendarCheck className="h-4 w-4 text-blue-400" />
                Séances du Samedi (Horaires Officiels)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div>
                  <p className="text-2xl font-bold text-white">{metrics.saturdayCount} élèves</p>
                  <p className="text-xs text-slate-400">Inscrits aux séances du samedi (8h00 - 17h00)</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-sm">
                  100%
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Toutes les répétitions et cours d'approfondissement en mathématiques et physique-chimie se déroulent exclusivement le samedi à Lomé.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800 text-white">
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Globe className="h-4 w-4 text-amber-400" />
                Informations du Site Vitrine
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex justify-between font-semibold text-slate-300">
                  <span>Matières Enseignées</span>
                  <span className="text-amber-400">Mathématiques & Physique-Chimie</span>
                </div>
                <div className="flex justify-between font-semibold text-slate-300">
                  <span>Niveaux Concernés</span>
                  <span className="text-amber-400">Première C, Première D, Terminale C, Terminale D</span>
                </div>
                <div className="flex justify-between font-semibold text-slate-300">
                  <span>Téléphone / TMoney</span>
                  <span className="text-amber-400">+228 93 51 00 74</span>
                </div>
                <div className="flex justify-between font-semibold text-slate-300">
                  <span>Email Officiel</span>
                  <span className="text-amber-400">stagekekeli@gmail.com</span>
                </div>
                <div className="flex justify-between font-semibold text-slate-300">
                  <span>Horaires</span>
                  <span className="text-amber-400">Samedi uniquement (8h00 - 17h00)</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-400/5 border border-amber-400/20 text-slate-300">
                <p className="font-semibold text-amber-400 mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4" />
                  Conformité des Données SK
                </p>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Conformément au contrat de prestation Stage Kékéli, toutes les données élèves/parents sont la propriété exclusive de Stage Kékéli et exportables en format CSV à tout moment.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminShell>
  );
}
