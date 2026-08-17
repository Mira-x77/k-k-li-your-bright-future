import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { BarChart3, PieChart, Wallet, ShieldCheck, Globe, Activity, Smartphone, CheckCircle2 } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { getDashboardMetrics, type DashboardMetrics } from "@/lib/admin-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/admin/statistiques")({
  head: () => ({
    meta: [
      { title: "Statistiques & Analytics — Admin Stage Kékéli" },
      { name: "description", content: "Analytiques financières, statistiques de fréquentation et performance des cours." },
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
  }, []);

  if (!metrics) return null;

  const fmt = (n: number) => n.toLocaleString("fr-FR");

  return (
    <AdminShell onDataChange={loadData}>
      <div className="space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold text-white tracking-tight sm:text-3xl">
            Statistiques & Analytiques du Site
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Indicateurs financiers, répartition des recettes Moov Money / Espèces et demandes pédagogiques.
          </p>
        </div>

        {/* Financial Overview Cards */}
        <div className="grid gap-6 md:grid-cols-3">
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
                <span>Moov Money (+228 98 93 02 11)</span>
                <Smartphone className="h-4 w-4 text-blue-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-blue-400">{fmt(metrics.moovMoneyRevenue)} FCFA</div>
              <p className="text-xs text-slate-400 mt-2">
                {Math.round((metrics.moovMoneyRevenue / (metrics.totalRevenue || 1)) * 100)}% du total des encaissements
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-slate-400 flex items-center justify-between">
                <span>Paiement en Personne / Espèces</span>
                <CheckCircle2 className="h-4 w-4 text-amber-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-amber-400">{fmt(metrics.cashRevenue)} FCFA</div>
              <p className="text-xs text-slate-400 mt-2">
                {Math.round((metrics.cashRevenue / (metrics.totalRevenue || 1)) * 100)}% du total des encaissements
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Operational Analytics */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Program Features Impact */}
          <Card className="bg-slate-900 border-slate-800 text-white">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                <Activity className="h-4 w-4 text-amber-400" />
                Performance des Options de Stage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div>
                  <p className="font-semibold text-white">Séances Révision du Samedi</p>
                  <p className="text-[11px] text-slate-400">Accompagnement intensif de fin de semaine</p>
                </div>
                <span className="font-bold text-amber-400 text-sm">{metrics.saturdayCount} élèves inscrits</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div>
                  <p className="font-semibold text-white">Accès Plateforme GoStudy</p>
                  <p className="text-[11px] text-slate-400">Application compagnon offerte (100% des inscrits)</p>
                </div>
                <span className="font-bold text-emerald-400 text-sm">{metrics.totalSignIns} accès activés</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div>
                  <p className="font-semibold text-white">Droits aux Examens d'Entraînement</p>
                  <p className="text-[11px] text-slate-400">Devoirs et examens blancs inclus</p>
                </div>
                <span className="font-bold text-blue-400 text-sm">Inclus</span>
              </div>
            </CardContent>
          </Card>

          {/* Site Activity Info */}
          <Card className="bg-slate-900 border-slate-800 text-white">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
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
                  <span>Contact Téléphonique Officiel</span>
                  <span className="text-amber-400">+228 98 93 02 11</span>
                </div>
                <div className="flex justify-between font-semibold text-slate-300">
                  <span>Ville d'Implantation</span>
                  <span className="text-amber-400">Lomé, Togo</span>
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
