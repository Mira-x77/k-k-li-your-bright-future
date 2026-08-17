export interface ProgramSignIn {
  id: string;
  studentName: string;
  parentName: string;
  parentPhone: string;
  series: "Première C" | "Première D" | "Terminale C" | "Terminale D";
  subjects: ("Mathématiques" | "Physique-Chimie")[];
  paymentPlan: "mensuel" | "annuel";
  paymentMethod: "TMoney" | "Moov Money" | "En personne" | "Virement";
  registrationFeePaid: boolean;
  tuitionFeePaid: number; // in FCFA
  totalAmountDue: number; // in FCFA
  status: "Confirmé" | "En attente" | "Relancé";
  saturdaySessionIncluded: boolean;
  photoUrl?: string; // Base64 data URI or image URL
  createdAt: string; // ISO string
  readByAdmin?: boolean;
  notes?: string;
}

export interface DashboardMetrics {
  totalSignIns: number;
  confirmedSignIns: number;
  pendingSignIns: number;
  totalRevenue: number;
  tmoneyRevenue: number;
  cashRevenue: number;
  saturdayCount: number;
  seriesBreakdown: Record<string, number>;
  subjectBreakdown: { mathOnly: number; physicsOnly: number; both: number };
}

const STORAGE_KEY = "stage_kekeli_real_sign_ins";
const UNREAD_KEY = "stage_kekeli_unread_count";

export const OFFICIAL_PHONE = "+228 93 51 00 74";
export const OFFICIAL_EMAIL = "stagekekeli@gmail.com";

// Real-time broadcast channel across browser tabs
let broadcastChannel: BroadcastChannel | null = null;
if (typeof window !== "undefined" && "BroadcastChannel" in window) {
  try {
    broadcastChannel = new BroadcastChannel("stage_kekeli_live_events");
  } catch {
    broadcastChannel = null;
  }
}

export function getSignIns(): ProgramSignIn[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

export function savePublicRegistration(entry: {
  studentName: string;
  parentName: string;
  parentPhone: string;
  series: ProgramSignIn["series"];
  subjects: ("Mathématiques" | "Physique-Chimie")[];
  paymentPlan: "mensuel" | "annuel";
  paymentMethod: "TMoney" | "Moov Money" | "En personne" | "Virement";
  saturdaySessionIncluded?: boolean;
  photoUrl?: string;
}): ProgramSignIn {
  const current = getSignIns();
  const dateStr = new Date().toISOString().slice(2, 7).replace("-", "");
  const newId = `SK-${dateStr}-${String(current.length + 1).padStart(3, "0")}`;

  const unitPrice = entry.paymentPlan === "mensuel" ? 2500 : 22500;
  const tuition = unitPrice * entry.subjects.length;
  const registrationFee = 1500;
  const subtotal = tuition + registrationFee;
  const isMobileMoney = entry.paymentMethod === "TMoney" || entry.paymentMethod === "Moov Money";
  const taf = isMobileMoney ? Math.round(subtotal * 0.1) : 0;
  const totalDue = subtotal + taf;

  const newRecord: ProgramSignIn = {
    id: newId,
    studentName: entry.studentName,
    parentName: entry.parentName || "Parent",
    parentPhone: entry.parentPhone,
    series: entry.series,
    subjects: entry.subjects,
    paymentPlan: entry.paymentPlan,
    paymentMethod: entry.paymentMethod,
    registrationFeePaid: true,
    tuitionFeePaid: isMobileMoney ? totalDue : registrationFee,
    totalAmountDue: totalDue,
    status: isMobileMoney ? "Confirmé" : "En attente",
    saturdaySessionIncluded: true, // Toujours le samedi
    photoUrl: entry.photoUrl,
    createdAt: new Date().toISOString(),
    readByAdmin: false,
  };

  const updated = [newRecord, ...current];
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    incrementUnreadCount();

    // Broadcast event for open Admin tabs
    if (broadcastChannel) {
      broadcastChannel.postMessage({ type: "NEW_REGISTRATION", data: newRecord });
    }
    window.dispatchEvent(new CustomEvent("sk_new_registration", { detail: newRecord }));
  }

  return newRecord;
}

export function updateSignInStatus(id: string, newStatus: ProgramSignIn["status"]): ProgramSignIn[] {
  const current = getSignIns();
  const updated = current.map((item) =>
    item.id === id
      ? {
          ...item,
          status: newStatus,
          tuitionFeePaid: newStatus === "Confirmé" ? item.totalAmountDue : item.tuitionFeePaid,
          registrationFeePaid: newStatus === "Confirmé" ? true : item.registrationFeePaid,
        }
      : item
  );
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("sk_data_updated"));
  }
  return updated;
}

export function addSignIn(newEntry: Omit<ProgramSignIn, "id" | "createdAt">): ProgramSignIn {
  const current = getSignIns();
  const newId = `SK-ADMIN-${String(current.length + 1).padStart(3, "0")}`;
  const record: ProgramSignIn = {
    ...newEntry,
    id: newId,
    createdAt: new Date().toISOString(),
    readByAdmin: true,
  };
  const updated = [record, ...current];
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("sk_data_updated"));
  }
  return record;
}

export function getUnreadCount(): number {
  if (typeof window === "undefined") return 0;
  try {
    return parseInt(localStorage.getItem(UNREAD_KEY) || "0", 10);
  } catch {
    return 0;
  }
}

export function incrementUnreadCount() {
  if (typeof window === "undefined") return;
  const current = getUnreadCount();
  localStorage.setItem(UNREAD_KEY, String(current + 1));
}

export function markAllAsRead() {
  if (typeof window === "undefined") return;
  localStorage.setItem(UNREAD_KEY, "0");
  const current = getSignIns();
  const updated = current.map((item) => ({ ...item, readByAdmin: true }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent("sk_data_updated"));
}

export function getDashboardMetrics(): DashboardMetrics {
  const signIns = getSignIns();

  return {
    totalSignIns: signIns.length,
    confirmedSignIns: signIns.filter((s) => s.status === "Confirmé").length,
    pendingSignIns: signIns.filter((s) => s.status !== "Confirmé").length,
    totalRevenue: signIns.reduce((acc, s) => acc + s.tuitionFeePaid, 0),
    tmoneyRevenue: signIns
      .filter((s) => s.paymentMethod === "TMoney" || s.paymentMethod === "Moov Money")
      .reduce((acc, s) => acc + s.tuitionFeePaid, 0),
    cashRevenue: signIns
      .filter((s) => s.paymentMethod === "En personne")
      .reduce((acc, s) => acc + s.tuitionFeePaid, 0),
    saturdayCount: signIns.length, // Samedi uniquement
    seriesBreakdown: {
      "Première C": signIns.filter((s) => s.series === "Première C").length,
      "Première D": signIns.filter((s) => s.series === "Première D").length,
      "Terminale C": signIns.filter((s) => s.series === "Terminale C").length,
      "Terminale D": signIns.filter((s) => s.series === "Terminale D").length,
    },
    subjectBreakdown: {
      mathOnly: signIns.filter((s) => s.subjects.length === 1 && s.subjects.includes("Mathématiques")).length,
      physicsOnly: signIns.filter((s) => s.subjects.length === 1 && s.subjects.includes("Physique-Chimie")).length,
      both: signIns.filter((s) => s.subjects.length === 2).length,
    },
  };
}

export function generateWhatsAppReceiptLink(record: ProgramSignIn): string {
  const cleanPhone = record.parentPhone.replace(/[^0-9]/g, "");
  const text = encodeURIComponent(
    `*STAGE KÉKÉLI — REÇU D'INSCRIPTION*\n\n` +
      `Référence : *${record.id}*\n` +
      `Élève : *${record.studentName}* (${record.series})\n` +
      `Matière(s) : ${record.subjects.join(" & ")}\n` +
      `Formule : ${record.paymentPlan === "annuel" ? "Annuel" : "Mensuel"} (Séances du Samedi)\n` +
      `Mode de règlement : ${record.paymentMethod} (T-Money Togocel : ${OFFICIAL_PHONE})\n` +
      `Montant Réglé : *${record.tuitionFeePaid.toLocaleString("fr-FR")} FCFA*\n` +
      `Statut : ${record.status === "Confirmé" ? "✅ Confirmé" : "⏳ En attente de règlement"}\n\n` +
      `Merci d'avoir choisi Stage Kékéli, la lumière qui guide vers la réussite !`
  );
  return `https://wa.me/${cleanPhone}?text=${text}`;
}

export function exportToCSV(data: ProgramSignIn[] = getSignIns()) {
  const headers = [
    "ID Inscription",
    "Nom Éleve",
    "Série",
    "Matières",
    "Formule",
    "Moyen de Paiement",
    "Frais d'inscription",
    "Montant Réglé (FCFA)",
    "Montant Dû (FCFA)",
    "Statut",
    "Horaires",
    "Nom Parent",
    "Téléphone Parent",
    "Date d'inscription",
  ];

  const rows = data.map((item) => [
    item.id,
    `"${item.studentName}"`,
    `"${item.series}"`,
    `"${item.subjects.join(" & ")}"`,
    item.paymentPlan,
    item.paymentMethod,
    item.registrationFeePaid ? "Payé (1 500)" : "Non payé",
    item.tuitionFeePaid,
    item.totalAmountDue,
    item.status,
    "Samedi uniquement",
    `"${item.parentName}"`,
    `"${item.parentPhone}"`,
    new Date(item.createdAt).toLocaleDateString("fr-FR"),
  ]);

  const csvContent =
    "data:text/csv;charset=utf-8,\uFEFF" +
    [headers.join(";"), ...rows.map((e) => e.join(";"))].join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `donnees_sk_inscriptions_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
