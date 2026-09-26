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

function sanitizeRecord(row: any): ProgramSignIn {
  return {
    id: String(row?.id || `SK-${Date.now()}`),
    studentName: String(row?.studentName || row?.student_name || "Élève"),
    parentName: String(row?.parentName || row?.parent_name || "Parent"),
    parentPhone: String(row?.parentPhone || row?.parent_phone || ""),
    series: (row?.series as any) || "Terminale C",
    subjects: Array.isArray(row?.subjects) && row.subjects.length > 0 ? row.subjects : ["Mathématiques"],
    paymentPlan: (row?.paymentPlan || row?.payment_plan as any) || "mensuel",
    paymentMethod: (row?.paymentMethod || row?.payment_method as any) || "Moov Money",
    registrationFeePaid: Boolean(row?.registrationFeePaid ?? row?.registration_fee_paid ?? false),
    tuitionFeePaid: Number(row?.tuitionFeePaid ?? row?.tuition_fee_paid ?? 0),
    totalAmountDue: Number(row?.totalAmountDue ?? row?.total_amount_due ?? 0),
    status: (row?.status as any) || "En attente",
    saturdaySessionIncluded: true,
    photoUrl: String(row?.photoUrl || row?.photo_url || ""),
    createdAt: String(row?.createdAt || row?.created_at || new Date().toISOString()),
    readByAdmin: Boolean(row?.readByAdmin ?? row?.read_by_admin ?? false),
    notes: String(row?.notes || ""),
  };
}

export function getSignIns(): ProgramSignIn[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(sanitizeRecord);
  } catch {
    return [];
  }
}

const DEMO_SIGN_IN_IDS = new Set(["SK-2608-001", "SK-2608-002", "SK-TEST-READY"]);

function isPersistedRegistration(record: ProgramSignIn): boolean {
  if (DEMO_SIGN_IN_IDS.has(record.id)) return false;
  if (record.studentName === "Koffi Amouzou" && record.parentPhone.includes("90 12 34 56")) return false;
  if (record.studentName === "Afiwa Mensah" && record.parentPhone.includes("91 87 65 43")) return false;
  return Boolean(record.id && record.studentName);
}

export async function syncFromSupabase(): Promise<ProgramSignIn[]> {
  if (typeof window === "undefined") return getSignIns();
  const localRecords = getSignIns().filter(isPersistedRegistration);

  try {
    await Promise.all(localRecords.map((record) => persistToSupabase(record)));

    const { data, error } = await supabase.from("sign_ins").select("*").order("created_at", { ascending: false });
    if (!error && data) {
      const remote = data.map(sanitizeRecord).filter(isPersistedRegistration);
      const byId = new Map<string, ProgramSignIn>();
      for (const record of remote) byId.set(record.id, record);
      for (const record of localRecords) {
        if (!byId.has(record.id)) byId.set(record.id, record);
      }
      const merged = [...byId.values()].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      window.dispatchEvent(new CustomEvent("sk_data_updated"));
      return merged;
    }
    if (error) {
      console.warn("Supabase fetch fallback to local state:", error.message);
    }
  } catch (err) {
    console.warn("Supabase fetch fallback to local state:", err);
  }
  return localRecords;
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
    const { error } = await supabase.from("sign_ins").upsert(payload);
    if (error) {
      console.warn("Supabase upsert error:", error.message);
    }
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
  updated.forEach((record) => persistToSupabase(record));
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
  const phone = record?.parentPhone || "";
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  const subjects = Array.isArray(record?.subjects) ? record.subjects.join(" & ") : "Mathématiques";
  const text = encodeURIComponent(
    `*STAGE KÉKÉLI — REÇU D'INSCRIPTION*\n\n` +
      `Référence : *${record?.id || "N/A"}*\n` +
      `Élève : *${record?.studentName || "Élève"}* (${record?.series || ""})\n` +
      `Matière(s) : ${subjects}\n` +
      `Formule : ${record?.paymentPlan === "annuel" ? "Annuel" : "Mensuel"} (Séances du Samedi)\n` +
      `Mode de règlement : ${record?.paymentMethod || "Mobile Money"} (T-Money Togocel : ${TMONEY_TOGOCEL_PHONE})\n` +
      `Montant Réglé : *${(record?.tuitionFeePaid || 0).toLocaleString("fr-FR")} FCFA*\n` +
      `Statut : ${record?.status === "Confirmé" ? "✅ Confirmé" : "⏳ En attente de règlement"}\n\n` +
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

/* ──────────────────────────────────────────────
   Site Visitor Tracking & Analytics
   ────────────────────────────────────────────── */

export interface VisitorRecord {
  id: string;
  visitorId: string;
  path: string;
  device: "Mobile" | "Desktop" | "Tablette";
  timestamp: string;
}

export interface VisitorAnalytics {
  totalVisits: number;
  uniqueVisitorsCount: number;
  visitsToday: number;
  lastVisitAt?: string;
  recentVisits: VisitorRecord[];
}

const VISITOR_STORAGE_KEY = "stage_kekeli_visitor_analytics";
const VISITOR_ID_KEY = "sk_unique_visitor_id";

function getDeviceType(): "Mobile" | "Desktop" | "Tablette" {
  if (typeof window === "undefined") return "Desktop";
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "Tablette";
  }
  if (
    /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    ) ||
    window.innerWidth < 768
  ) {
    return "Mobile";
  }
  return "Desktop";
}

function getOrCreateVisitorId(): string {
  if (typeof window === "undefined") return "v-server";
  let id = localStorage.getItem(VISITOR_ID_KEY);
  if (!id) {
    id = "v_" + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
    localStorage.setItem(VISITOR_ID_KEY, id);
  }
  return id;
}

export function getVisitorAnalytics(): VisitorAnalytics {
  if (typeof window === "undefined") {
    return {
      totalVisits: 0,
      uniqueVisitorsCount: 0,
      visitsToday: 0,
      recentVisits: [],
    };
  }

  try {
    const raw = localStorage.getItem(VISITOR_STORAGE_KEY);
    if (!raw) {
      return {
        totalVisits: 0,
        uniqueVisitorsCount: 0,
        visitsToday: 0,
        recentVisits: [],
      };
    }
    const data: VisitorAnalytics = JSON.parse(raw);
    const recent = Array.isArray(data.recentVisits) ? data.recentVisits : [];

    // Clean up sample demo visits if any exist from earlier versions
    const hasDemo = recent.some(
      (v) => v?.id?.startsWith("visit-") || v?.visitorId?.startsWith("v_sample")
    );
    if (hasDemo) {
      localStorage.removeItem(VISITOR_STORAGE_KEY);
      return {
        totalVisits: 0,
        uniqueVisitorsCount: 0,
        visitsToday: 0,
        recentVisits: [],
      };
    }
    const todayIso = new Date().toISOString().slice(0, 10);
    const visitsToday = (data.recentVisits || []).filter((v) =>
      v.timestamp.startsWith(todayIso)
    ).length;

    return {
      ...data,
      visitsToday: Math.max(data.visitsToday || 0, visitsToday),
    };
  } catch {
    return {
      totalVisits: 0,
      uniqueVisitorsCount: 0,
      visitsToday: 0,
      recentVisits: [],
    };
  }
}

export function recordSiteVisit(path: string) {
  if (typeof window === "undefined") return;
  // Don't track admin panel route visits
  if (path.startsWith("/admin")) return;

  const visitorId = getOrCreateVisitorId();
  const device = getDeviceType();
  const now = new Date().toISOString();

  const current = getVisitorAnalytics();

  const isUnique = !current.recentVisits.some((v) => v.visitorId === visitorId);
  const newUniqueCount = current.uniqueVisitorsCount + (isUnique ? 1 : 0);
  const newTotalVisits = current.totalVisits + 1;

  const newVisitRecord: VisitorRecord = {
    id: "visit_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6),
    visitorId,
    path,
    device,
    timestamp: now,
  };

  const updatedRecent = [newVisitRecord, ...current.recentVisits].slice(0, 50);

  const todayIso = now.slice(0, 10);
  const visitsToday = updatedRecent.filter((v) => v.timestamp.startsWith(todayIso)).length;

  const updated: VisitorAnalytics = {
    totalVisits: newTotalVisits,
    uniqueVisitorsCount: newUniqueCount,
    visitsToday,
    lastVisitAt: now,
    recentVisits: updatedRecent,
  };

  localStorage.setItem(VISITOR_STORAGE_KEY, JSON.stringify(updated));

  window.dispatchEvent(new CustomEvent("sk_visit_recorded", { detail: newVisitRecord }));
  if (broadcastChannel) {
    try {
      broadcastChannel.postMessage({ type: "NEW_VISIT", data: newVisitRecord });
    } catch {}
  }

  try {
    supabase.from("site_visits").insert({
      visitor_id: visitorId,
      path: path,
      device: device,
      created_at: now,
    }).then();
  } catch {}
}

