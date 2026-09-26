import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Search, Phone, Eye, Download, MessageSquare, Sparkles, User } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { DeleteStudentButton } from "@/components/admin/delete-student-button";
import { getSignIns, syncFromSupabase, updateSignInStatus, exportToCSV, generateWhatsAppReceiptLink, type ProgramSignIn } from "@/lib/admin-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const Route = createFileRoute("/admin/inscriptions")({
  head: () => ({
    meta: [
      { title: "Inscriptions — Admin Stage Kékéli" },
      { name: "description", content: "Liste et suivi détaillé des inscriptions des élèves aux répétitions Stage Kékéli." },
    ],
  }),
  component: AdminInscriptionsPage,
});

function AdminInscriptionsPage() {
  const [data, setData] = useState<ProgramSignIn[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"Tous" | "Confirmé" | "En attente" | "Relancé">("Tous");
  const [seriesFilter, setSeriesFilter] = useState<string>("Toutes");
  const [selectedStudent, setSelectedStudent] = useState<ProgramSignIn | null>(null);

  const loadData = () => {
    setData(getSignIns());
  };

  useEffect(() => {
    loadData();
    syncFromSupabase().then(() => loadData());
    const handleData = () => loadData();
    window.addEventListener("sk_data_updated", handleData);
    return () => window.removeEventListener("sk_data_updated", handleData);
  }, []);

  const handleStatusChange = (id: string, newStatus: ProgramSignIn["status"]) => {
    const updated = updateSignInStatus(id, newStatus);
    setData(updated);
    if (selectedStudent && selectedStudent.id === id) {
      setSelectedStudent(updated.find((s) => s.id === id) || null);
    }
  };

  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.parentPhone.includes(searchTerm) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "Tous" || item.status === statusFilter;
    const matchesSeries = seriesFilter === "Toutes" || item.series === seriesFilter;

    return matchesSearch && matchesStatus && matchesSeries;
  });

  const fmt = (n: number | undefined | null) =>
    (typeof n === "number" && !isNaN(n) ? n : 0).toLocaleString("fr-FR");

  return (
    <AdminShell onDataChange={loadData}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight sm:text-3xl">
              Inscriptions au Programme
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Registre officiel des élèves inscrits en Mathématiques et Physique-Chimie ("Données SK").
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => exportToCSV(filteredData)}
              size="sm"
              disabled={filteredData.length === 0}
              className="bg-[#CDFE00] text-slate-950 font-bold hover:bg-[#b8e600] text-xs gap-1.5 disabled:opacity-50"
            >
              <Download className="h-4 w-4" />
              Exporter Sélection CSV
            </Button>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <Card className="bg-[#14171D] border-slate-800 text-white">
          <CardContent className="p-4 space-y-4">
            <div className="grid gap-3 md:grid-cols-4">
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Rechercher par élève, parent, téléphone ou ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 bg-slate-950 border-slate-800 text-white placeholder-slate-500 text-xs focus-visible:ring-[#CDFE00]"
                />
              </div>

              <div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="w-full h-9 rounded-md bg-slate-950 border border-slate-800 px-3 text-xs text-white focus:outline-none focus:border-[#CDFE00]"
                >
                  <option value="Tous">Tous les Statuts</option>
                  <option value="Confirmé">Confirmé (Payé)</option>
                  <option value="En attente">En attente de règlement</option>
                  <option value="Relancé">Relancé</option>
                </select>
              </div>

              <div>
                <select
                  value={seriesFilter}
                  onChange={(e) => setSeriesFilter(e.target.value)}
                  className="w-full h-9 rounded-md bg-slate-950 border border-slate-800 px-3 text-xs text-white focus:outline-none focus:border-[#CDFE00]"
                >
                  <option value="Toutes">Toutes les Séries</option>
                  <option value="Première C">Première C</option>
                  <option value="Première D">Première D</option>
                  <option value="Terminale C">Terminale C</option>
                  <option value="Terminale D">Terminale D</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Student Sign-ins Table */}
        <Card className="bg-[#14171D] border-slate-800 text-white overflow-hidden max-w-full">
          <CardContent className="p-0">
            <div className="overflow-x-auto max-w-full">
              <table className="w-full min-w-[800px] text-left text-xs text-slate-300">
                <thead className="border-b border-slate-800 bg-slate-950/80 text-slate-400 uppercase text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Photo & ID</th>
                    <th className="py-3 px-4">Élève & Série</th>
                    <th className="py-3 px-4">Matières Choisies</th>
                    <th className="py-3 px-4">Parent & Contact</th>
                    <th className="py-3 px-4">Mode & Montant</th>
                    <th className="py-3 px-4">Statut</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-slate-400 text-xs">
                        <div className="max-w-xs mx-auto space-y-2">
                          <Sparkles className="h-6 w-6 text-[#CDFE00] mx-auto" />
                          <p className="font-semibold text-white">Aucune inscription enregistrée</p>
                          <p className="text-[11px] text-slate-500">
                            Les fiches d'élèves apparaîtront automatiquement dès qu'une inscription sera soumise sur le site public.
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="h-9 w-9 rounded-full overflow-hidden border border-slate-700 bg-slate-950 flex items-center justify-center shrink-0">
                              {item.photoUrl ? (
                                <img src={item.photoUrl} alt={item.studentName} className="h-full w-full object-cover" />
                              ) : (
                                <User className="h-4 w-4 text-slate-400" />
                              )}
                            </div>
                            <span className="font-mono font-bold text-[#CDFE00] text-xs">{item.id}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-white text-sm">{item.studentName}</div>
                          <div className="text-[11px] text-slate-400 font-medium">{item.series}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex flex-wrap gap-1">
                            {(item.subjects || []).map((sub) => (
                              <span
                                key={sub}
                                className="inline-block rounded bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-slate-200 border border-slate-700"
                              >
                                {sub}
                              </span>
                            ))}
                          </div>
                          {item.saturdaySessionIncluded && (
                            <span className="text-[10px] text-blue-400 font-semibold block mt-1">
                              + Cours du Samedi
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="text-white font-medium">{item.parentName}</div>
                          <div className="text-[11px] text-slate-400 flex items-center gap-1">
                            <Phone className="h-3 w-3 text-slate-500" />
                            {item.parentPhone}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-emerald-400 text-sm">{fmt(item.tuitionFeePaid || 0)} FCFA</div>
                          <div className="text-[11px] text-slate-400">
                            {item.paymentMethod} ({item.paymentPlan})
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <select
                            value={item.status}
                            onChange={(e) => handleStatusChange(item.id, e.target.value as any)}
                            className={`rounded px-2 py-1 text-[11px] font-bold border focus:outline-none cursor-pointer ${
                              item.status === "Confirmé"
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                                : item.status === "En attente"
                                ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                                : "bg-rose-500/10 text-rose-400 border-rose-500/30"
                            }`}
                          >
                            <option value="Confirmé" className="bg-slate-900 text-emerald-400">Confirmé</option>
                            <option value="En attente" className="bg-slate-900 text-amber-400">En attente</option>
                            <option value="Relancé" className="bg-slate-900 text-rose-400">Relancé</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center justify-end gap-1">
                            <Button
                              onClick={() => setSelectedStudent(item)}
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-slate-800"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <DeleteStudentButton
                              student={item}
                              onDeleted={(remaining) => {
                                setData(remaining);
                                if (selectedStudent?.id === item.id) setSelectedStudent(null);
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Student Details Card Modal */}
        {selectedStudent && (
          <Dialog open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
            <DialogContent className="bg-[#14171D] border-slate-800 text-white max-w-lg">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-[#CDFE00] flex items-center justify-between">
                  <span>Fiche Inscription {selectedStudent.id}</span>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-[#CDFE00] bg-slate-900 flex items-center justify-center shrink-0">
                    {selectedStudent.photoUrl ? (
                      <img src={selectedStudent.photoUrl} alt={selectedStudent.studentName} className="h-full w-full object-cover" />
                    ) : (
                      <User className="h-8 w-8 text-slate-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-white truncate">{selectedStudent.studentName}</h3>
                        <p className="text-xs text-[#CDFE00] font-semibold">{selectedStudent.series}</p>
                      </div>
                      <Badge
                        className={
                          selectedStudent.status === "Confirmé"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        }
                      >
                        {selectedStudent.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs pt-2 mt-2 border-t border-slate-800">
                      <div>
                        <span className="text-slate-500 block">Parent</span>
                        <span className="font-semibold text-slate-200">{selectedStudent.parentName}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Téléphone</span>
                        <a href={`tel:${selectedStudent.parentPhone}`} className="font-semibold text-[#CDFE00] hover:underline">
                          {selectedStudent.parentPhone}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-300">
                    <span className="text-slate-500">Matières inscrites :</span>
                    <span className="font-semibold">{selectedStudent.subjects.join(", ")}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-300">
                    <span className="text-slate-500">Formule de cours :</span>
                    <span className="font-semibold capitalize">{selectedStudent.paymentPlan}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-300">
                    <span className="text-slate-500">Moyen de règlement :</span>
                    <span className="font-semibold">{selectedStudent.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-300">
                    <span className="text-slate-500">Frais d'inscription (1 500 FCFA) :</span>
                    <span className="font-semibold text-emerald-400">
                      {selectedStudent.registrationFeePaid ? "Réglé" : "En attente"}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 text-sm font-bold text-white pt-2">
                    <span>Montant Total Réglé :</span>
                    <span className="text-emerald-400">{fmt(selectedStudent.tuitionFeePaid || 0)} FCFA</span>
                  </div>
                </div>

                <div className="pt-3 flex flex-col sm:flex-row gap-2">
                  <a
                    href={generateWhatsAppReceiptLink(selectedStudent)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-xs gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Envoyer le Reçu par WhatsApp au Parent
                    </Button>
                  </a>
                  <DeleteStudentButton
                    student={selectedStudent}
                    appearance="button"
                    onDeleted={(remaining) => {
                      setData(remaining);
                      setSelectedStudent(null);
                    }}
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </AdminShell>
  );
}
