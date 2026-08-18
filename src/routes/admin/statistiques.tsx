import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Wallet, Smartphone, Landmark, CalendarCheck, BookOpen, ShieldCheck, TrendingUp, BarChart3, Globe } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { getDashboardMetrics, getSignIns, syncFromSupabase, type DashboardMetrics } from "@/lib/admin-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/admin/statistiques")({
  head: () => ({
    meta: [
      { title: "Statistiques & Financials — Admin Stage Kékéli" },
      { name: "description", content: "Chiffre d'affaires, répartition TMoney vs Espèces et métriques des cours Stage Kékéli." },
    ],
  }),
  component: AdminStatistiquesPage,
});

function AdminStatistiquesPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);

  const loadData = () => {
    setMetrics(getDashboardMetrics());
  };

  useEffect(() => {
    loadData();
    syncFromSupabase().then(() => loadData());
  }, []);

  if (!metrics) return null;

  const fmt = (n: number) => n.toLocaleString("fr-FR");

  return (
    <AdminShell onDataChange={loadData}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold text-white tracking-tight sm:text-3xl">
            Statistiques & Métriques Financières
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Indicateurs de performance, répartition TMoney (Togocel) et suivi des inscriptions du samedi.
          </p>
        </div>

        {/* Financial KPI Cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="bg-slate-900 border-slate-800 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-slate-400 flex items-center justify-between">
                <span>Chiffre d'Affaires Global</span>
                <Wallet className="h-4 w-4 text-emerald-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-emerald-400">{fmt(metrics.totalRevenue)} FCFA</div>
              <p className="text-xs text-slate-400 mt-2">
                Frais de scolarité + 1 500 FCFA inscription par élève
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-slate-400 flex items-center justify-between">
                <span>TMoney Togocel (+228 93 51 00 74)</span>
                <Smartphone className="h-4 w-4 text-blue-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-blue-400">{fmt(metrics.tmoneyRevenue)} FCFA</div>
              <p className="text-xs text-slate-400 mt-2">
                {Math.round((metrics.tmoneyRevenue / (metrics.totalRevenue || 1)) * 100)}% du total des encaissements
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-slate-400 flex items-center justify-between">
                <span>Règlement en Espèces (Lomé)</span>
                <Landmark className="h-4 w-4 text-amber-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-amber-400">{fmt(metrics.cashRevenue)} FCFA</div>
              <p className="text-xs text-slate-400 mt-2">
                Paiement direct en personne
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Operational Analytics */}
        <div className="grid gap-6 md:grid-cols-2">
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
