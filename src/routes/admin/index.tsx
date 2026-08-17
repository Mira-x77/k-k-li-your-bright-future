import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Users, CreditCard, CalendarCheck, TrendingUp, CheckCircle, Clock, AlertCircle, ArrowUpRight, BookOpen } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { getDashboardMetrics, getSignIns, type ProgramSignIn, type DashboardMetrics } from "@/lib/admin-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Tableau de Bord Admin — Stage Kékéli" },
      { name: "description", content: "Gestion des inscriptions, suivi financier et statistiques du site Stage Kékéli." },
    ],
  }),
  component: AdminDashboardPage,
});

function AdminDashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [recentSignIns, setRecentSignIns] = useState<ProgramSignIn[]>([]);

  const loadData = () => {
    setMetrics(getDashboardMetrics());
    setRecentSignIns(getSignIns().slice(0, 5));
  };

  useEffect(() => {
    loadData();
  }, []);

  if (!metrics) return null;

  const fmt = (n: number) => n.toLocaleString("fr-FR");

  return (
    <AdminShell onDataChange={loadData}>
      <div className="space-y-8">
        {/* Welcome & Overview Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight sm:text-3xl">
              Tableau de Bord Général
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Aperçu des inscriptions aux cours de répétition Mathématiques & Physique-Chimie (Lomé).
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Données SK Synchro
            </span>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-slate-900 border-slate-800 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-medium text-slate-400">Total Inscriptions</CardTitle>
              <Users className="h-4 w-4 text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{metrics.totalSignIns}</div>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                <span className="text-emerald-400 font-semibold">{metrics.confirmedSignIns} confirmés</span> · {metrics.pendingSignIns} en attente
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-medium text-slate-400">Recettes Total (FCFA)</CardTitle>
              <CreditCard className="h-4 w-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-400">{fmt(metrics.totalRevenue)} FCFA</div>
              <p className="text-xs text-slate-400 mt-1">
                Moov Money : <span className="text-white font-medium">{fmt(metrics.moovMoneyRevenue)} FCFA</span>
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-medium text-slate-400">Cours du Samedi</CardTitle>
              <CalendarCheck className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{metrics.saturdayCount} élèves</div>
              <p className="text-xs text-slate-400 mt-1">
                {Math.round((metrics.saturdayCount / (metrics.totalSignIns || 1)) * 100)}% de participation aux séances
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-medium text-slate-400">Choix Deux Matières</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{metrics.subjectBreakdown.both} élèves</div>
              <p className="text-xs text-slate-400 mt-1">
                Maths + Physique (Formule Complète)
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Distribution Breakdowns */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Series Distribution */}
          <Card className="bg-slate-900 border-slate-800 text-white">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-white flex items-center justify-between">
                <span>Répartition par Série</span>
                <span className="text-xs font-normal text-slate-400">Première & Terminale</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(metrics.seriesBreakdown).map(([seriesName, count]) => {
                const percentage = metrics.totalSignIns ? Math.round((count / metrics.totalSignIns) * 100) : 0;
                return (
                  <div key={seriesName} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-300">{seriesName}</span>
                      <span className="font-semibold text-white">
                        {count} élève{count > 1 ? "s" : ""} ({percentage}%)
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Subjects Breakdown */}
          <Card className="bg-slate-900 border-slate-800 text-white">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-white flex items-center justify-between">
                <span>Répartition par Matière</span>
                <span className="text-xs font-normal text-slate-400">Matières suivies</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center font-bold text-xs">
                    M+P
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">Mathématiques + Physique-Chimie</p>
                    <p className="text-[11px] text-slate-400">Offre intégrée 2 matières</p>
                  </div>
                </div>
                <span className="font-bold text-amber-400 text-sm">{metrics.subjectBreakdown.both}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-blue-400/10 text-blue-400 flex items-center justify-center font-bold text-xs">
                    MATH
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">Mathématiques Uniquement</p>
                    <p className="text-[11px] text-slate-400">Séries C & D</p>
                  </div>
                </div>
                <span className="font-bold text-blue-400 text-sm">{metrics.subjectBreakdown.mathOnly}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-emerald-400/10 text-emerald-400 flex items-center justify-center font-bold text-xs">
                    PHYS
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">Physique-Chimie Uniquement</p>
                    <p className="text-[11px] text-slate-400">Séries C & D</p>
                  </div>
                </div>
                <span className="font-bold text-emerald-400 text-sm">{metrics.subjectBreakdown.physicsOnly}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity Table */}
        <Card className="bg-slate-900 border-slate-800 text-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold text-white">Dernières Inscriptions Signnalées</CardTitle>
              <p className="text-xs text-slate-400 mt-0.5">Suivi en direct des inscriptions récentes ("Données SK")</p>
            </div>
            <Link
              to="/admin/inscriptions"
              className="text-xs font-semibold text-amber-400 hover:underline flex items-center gap-1"
            >
              Voir tout <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="border-b border-slate-800 bg-slate-950/50 text-slate-400 uppercase text-[10px]">
                  <tr>
                    <th className="py-3 px-3">ID / Élève</th>
                    <th className="py-3 px-3">Série</th>
                    <th className="py-3 px-3">Matières</th>
                    <th className="py-3 px-3">Paiement</th>
                    <th className="py-3 px-3">Montant Réglé</th>
                    <th className="py-3 px-3">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {recentSignIns.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-3">
                        <div className="font-semibold text-white">{item.studentName}</div>
                        <div className="text-[11px] text-slate-400">{item.id}</div>
                      </td>
                      <td className="py-3 px-3 font-medium text-slate-200">{item.series}</td>
                      <td className="py-3 px-3 text-slate-300">{item.subjects.join(" + ")}</td>
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center gap-1 text-[11px]">
                          {item.paymentMethod} ({item.paymentPlan})
                        </span>
                      </td>
                      <td className="py-3 px-3 font-semibold text-emerald-400">{fmt(item.tuitionFeePaid)} FCFA</td>
                      <td className="py-3 px-3">
                        {item.status === "Confirmé" && (
                          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px]">
                            Confirmé
                          </Badge>
                        )}
                        {item.status === "En attente" && (
                          <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 text-[10px]">
                            En attente
                          </Badge>
                        )}
                        {item.status === "Relancé" && (
                          <Badge className="bg-rose-500/10 text-rose-400 border-rose-500/20 text-[10px]">
                            Relancé
                          </Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
