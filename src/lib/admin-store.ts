import { supabase } from "./supabase";

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
  pendingRevenue: number;
  tmoneyRevenue: number;
  cashRevenue: number;
  saturdayCount: number;
  seriesBreakdown: Record<string, number>;
  subjectBreakdown: { mathOnly: number; physicsOnly: number; both: number };
}

const STORAGE_KEY = "stage_kekeli_real_sign_ins";
const UNREAD_KEY = "stage_kekeli_unread_count";

export const OFFICIAL_PHONE = "+228 98 93 02 11";
export const TMONEY_TOGOCEL_PHONE = "+228 93 51 00 74";
export const OFFICIAL_EMAIL = "stagekekeli@gmail.com";

// Real-time broadcast channel across browser tabs & Supabase Realtime
let broadcastChannel: BroadcastChannel | null = null;
if (typeof window !== "undefined") {
  if ("BroadcastChannel" in window) {
    try {
      broadcastChannel = new BroadcastChannel("stage_kekeli_live_events");
    } catch {
      broadcastChannel = null;
    }
  }

  // Subscribe to Supabase Postgres Realtime changes
  try {
    supabase
      .channel("public:sign_ins")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "sign_ins" },
        () => {
          syncFromSupabase();
        }
      )
      .subscribe();
  } catch (err) {
    console.warn("Supabase Realtime subscription warning:", err);
  }
}

// Initial sample data if no data exists anywhere
const INITIAL_DEMO_DATA: ProgramSignIn[] = [
  {
    id: "SK-2608-001",
    studentName: "Koffi Amouzou",
    parentName: "Mme Amouzou",
    parentPhone: "+228 90 12 34 56",
    series: "Terminale C",
    subjects: ["Mathématiques", "Physique-Chimie"],
    paymentPlan: "mensuel",
    paymentMethod: "TMoney",
    registrationFeePaid: true,
    tuitionFeePaid: 7150,
    totalAmountDue: 7150,
    status: "Confirmé",
    saturdaySessionIncluded: true,
    createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    readByAdmin: true,
  },
  {
    id: "SK-2608-002",
    studentName: "Afiwa Mensah",
    parentName: "M. Mensah",
    parentPhone: "+228 91 87 65 43",
    series: "Première D",
    subjects: ["Mathématiques"],
    paymentPlan: "mensuel",
    paymentMethod: "En personne",
    registrationFeePaid: true,
    tuitionFeePaid: 1500,
    totalAmountDue: 4000,
    status: "En attente",
    saturdaySessionIncluded: true,
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    readByAdmin: true,
  },
];

export function getSignIns(): ProgramSignIn[] {
  if (typeof window === "undefined") return INITIAL_DEMO_DATA;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_DATA));
      return INITIAL_DEMO_DATA;
    }
    return JSON.parse(saved);
  } catch {
    return INITIAL_DEMO_DATA;
  }
}

// Asynchronously sync data with Supabase table
export async function syncFromSupabase(): Promise<ProgramSignIn[]> {
  if (typeof window === "undefined") return getSignIns();
  try {
    const { data, error } = await supabase.from("sign_ins").select("*").order("created_at", { ascending: false });
    if (!error && data && data.length > 0) {
      const formatted: ProgramSignIn[] = data.map((row) => ({
        id: row.id,
        studentName: row.student_name,
        parentName: row.parent_name,
        parentPhone: row.parent_phone,
        series: row.series,
        subjects: row.subjects || [],
        paymentPlan: row.payment_plan,
        paymentMethod: row.payment_method,
        registrationFeePaid: row.registration_fee_paid,
        tuitionFeePaid: row.tuition_fee_paid,
        totalAmountDue: row.total_amount_due,
        status: row.status,
        saturdaySessionIncluded: row.saturday_session_included,
        photoUrl: row.photo_url,
        createdAt: row.created_at,
        readByAdmin: row.read_by_admin,
        notes: row.notes,
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formatted));
      window.dispatchEvent(new CustomEvent("sk_data_updated"));
      return formatted;
    }
  } catch (err) {
    console.warn("Supabase fetch fallback to local state:", err);
  }
  return getSignIns();
}

async function persistToSupabase(record: ProgramSignIn) {
  try {
    const payload = {
      id: record.id,
      student_name: record.studentName,
      parent_name: record.parentName,
      parent_phone: record.parentPhone,
      series: record.series,
      subjects: record.subjects,
      payment_plan: record.paymentPlan,
      payment_method: record.paymentMethod,
      registration_fee_paid: record.registrationFeePaid,
      tuition_fee_paid: record.tuitionFeePaid,
      total_amount_due: record.totalAmountDue,
      status: record.status,
      saturday_session_included: record.saturdaySessionIncluded,
      photo_url: record.photoUrl,
      created_at: record.createdAt,
      read_by_admin: record.readByAdmin,
      notes: record.notes,
    };
    await supabase.from("sign_ins").upsert(payload);
  } catch (err) {
    console.warn("Supabase upsert error:", err);
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
    registrationFeePaid: false,
    tuitionFeePaid: 0,
    totalAmountDue: totalDue,
    status: "En attente",
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

  // Sync to Supabase in background
  persistToSupabase(newRecord);

  return newRecord;
}

export function updateSignInStatus(id: string, newStatus: ProgramSignIn["status"]): ProgramSignIn[] {
  const current = getSignIns();
  let updatedRecord: ProgramSignIn | null = null;
  const updated = current.map((item) => {
    if (item.id === id) {
      updatedRecord = {
        ...item,
        status: newStatus,
        tuitionFeePaid: newStatus === "Confirmé" ? item.totalAmountDue : item.tuitionFeePaid,
        registrationFeePaid: newStatus === "Confirmé" ? true : item.registrationFeePaid,
      };
      return updatedRecord;
    }
    return item;
  });

  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("sk_data_updated"));
  }

  if (updatedRecord) {
    persistToSupabase(updatedRecord);
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

  persistToSupabase(record);

  return record;
}

export function deleteSignIn(id: string): ProgramSignIn[] {
  const current = getSignIns();
  const updated = current.filter((item) => item.id !== id);
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("sk_data_updated"));
  }

  try {
    supabase.from("sign_ins").delete().eq("id", id).then();
  } catch (err) {
    console.warn("Supabase delete error:", err);
  }

  return updated;
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
  const confirmedList = signIns.filter((s) => s.status === "Confirmé");
  const pendingList = signIns.filter((s) => s.status !== "Confirmé");

  return {
    totalSignIns: signIns.length,
    confirmedSignIns: confirmedList.length,
    pendingSignIns: pendingList.length,
    totalRevenue: confirmedList.reduce((acc, s) => acc + (s.tuitionFeePaid || s.totalAmountDue), 0),
    pendingRevenue: pendingList.reduce((acc, s) => acc + s.totalAmountDue, 0),
    tmoneyRevenue: confirmedList
      .filter((s) => s.paymentMethod === "TMoney" || s.paymentMethod === "Moov Money")
      .reduce((acc, s) => acc + (s.tuitionFeePaid || s.totalAmountDue), 0),
    cashRevenue: confirmedList
      .filter((s) => s.paymentMethod === "En personne")
      .reduce((acc, s) => acc + (s.tuitionFeePaid || s.totalAmountDue), 0),
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
      `Mode de règlement : ${record.paymentMethod} (T-Money Togocel : ${TMONEY_TOGOCEL_PHONE})\n` +
      `Montant Réglé : *${(record.tuitionFeePaid || 0).toLocaleString("fr-FR")} FCFA*\n` +
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
    item.createdAt,
  ]);

  const csvContent =
    "data:text/csv;charset=utf-8,\uFEFF" +
    [headers.join(";"), ...rows.map((e) => e.join(";"))].join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute(
    "download",
    `Inscriptions_Stage_Kekeli_${new Date().toISOString().slice(0, 10)}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
