export interface ProgramSignIn {
  id: string;
  studentName: string;
  parentName: string;
  parentPhone: string;
  series: "Première C" | "Première D" | "Terminale C" | "Terminale D";
  subjects: ("Mathématiques" | "Physique-Chimie")[];
  paymentPlan: "mensuel" | "annuel";
  paymentMethod: "Moov Money" | "En personne" | "Virement";
  registrationFeePaid: boolean;
  tuitionFeePaid: number; // in FCFA
  totalAmountDue: number; // in FCFA
  status: "Confirmé" | "En attente" | "Relancé";
  saturdaySessionIncluded: boolean;
  createdAt: string; // ISO string
}

export interface DashboardMetrics {
  totalSignIns: number;
  confirmedSignIns: number;
  pendingSignIns: number;
  totalRevenue: number;
  moovMoneyRevenue: number;
  cashRevenue: number;
  saturdayCount: number;
  seriesBreakdown: Record<string, number>;
  subjectBreakdown: { mathOnly: number; physicsOnly: number; both: number };
}

// Initial realistic dataset for Stage Kékéli ("Données SK")
const INITIAL_SIGN_INS: ProgramSignIn[] = [
  {
    id: "SK-2026-001",
    studentName: "Kofi Amouzou",
    parentName: "Mme Amouzou Akossiwa",
    parentPhone: "+228 90 12 34 56",
    series: "Terminale C",
    subjects: ["Mathématiques", "Physique-Chimie"],
    paymentPlan: "annuel",
    paymentMethod: "Moov Money",
    registrationFeePaid: true,
    tuitionFeePaid: 46500, // 22500*2 + 1500
    totalAmountDue: 46500,
    status: "Confirmé",
    saturdaySessionIncluded: true,
    createdAt: "2026-08-14T09:30:00Z",
  },
  {
    id: "SK-2026-002",
    studentName: "Abla Mensah",
    parentName: "M. Mensah Lawson",
    parentPhone: "+228 91 87 65 43",
    series: "Terminale D",
    subjects: ["Mathématiques"],
    paymentPlan: "mensuel",
    paymentMethod: "Moov Money",
    registrationFeePaid: true,
    tuitionFeePaid: 4000, // 2500 + 1500
    totalAmountDue: 4000,
    status: "Confirmé",
    saturdaySessionIncluded: false,
    createdAt: "2026-08-14T14:15:00Z",
  },
  {
    id: "SK-2026-003",
    studentName: "Enyonam Kpodar",
    parentName: "Mme Kpodar Elvire",
    parentPhone: "+228 98 44 22 11",
    series: "Première C",
    subjects: ["Mathématiques", "Physique-Chimie"],
    paymentPlan: "mensuel",
    paymentMethod: "En personne",
    registrationFeePaid: true,
    tuitionFeePaid: 1500,
    totalAmountDue: 6500, // 5000 + 1500
    status: "En attente",
    saturdaySessionIncluded: true,
    createdAt: "2026-08-15T11:00:00Z",
  },
  {
    id: "SK-2026-004",
    studentName: "Yawovi Agbeko",
    parentName: "M. Agbeko Kodjo",
    parentPhone: "+228 93 11 55 99",
    series: "Terminale D",
    subjects: ["Physique-Chimie"],
    paymentPlan: "annuel",
    paymentMethod: "Moov Money",
    registrationFeePaid: true,
    tuitionFeePaid: 24000, // 22500 + 1500
    totalAmountDue: 24000,
    status: "Confirmé",
    saturdaySessionIncluded: true,
    createdAt: "2026-08-15T16:45:00Z",
  },
  {
    id: "SK-2026-005",
    studentName: "Sena Dovon",
    parentName: "Mme Dovon Pascaline",
    parentPhone: "+228 99 33 77 11",
    series: "Première D",
    subjects: ["Mathématiques", "Physique-Chimie"],
    paymentPlan: "mensuel",
    paymentMethod: "En personne",
    registrationFeePaid: false,
    tuitionFeePaid: 0,
    totalAmountDue: 6500,
    status: "Relancé",
    saturdaySessionIncluded: false,
    createdAt: "2026-08-16T10:20:00Z",
  },
  {
    id: "SK-2026-006",
    studentName: "Fafa Lawson",
    parentName: "M. Lawson Ayité",
    parentPhone: "+228 90 99 88 77",
    series: "Terminale C",
    subjects: ["Mathématiques", "Physique-Chimie"],
    paymentPlan: "annuel",
    paymentMethod: "Moov Money",
    registrationFeePaid: true,
    tuitionFeePaid: 46500,
    totalAmountDue: 46500,
    status: "Confirmé",
    saturdaySessionIncluded: true,
    createdAt: "2026-08-16T15:05:00Z",
  },
];

const STORAGE_KEY = "stage_kekeli_sign_ins";

export function getSignIns(): ProgramSignIn[] {
  if (typeof window === "undefined") return INITIAL_SIGN_INS;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SIGN_INS));
      return INITIAL_SIGN_INS;
    }
    return JSON.parse(saved);
  } catch {
    return INITIAL_SIGN_INS;
  }
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
  }
  return updated;
}

export function addSignIn(newEntry: Omit<ProgramSignIn, "id" | "createdAt">): ProgramSignIn {
  const current = getSignIns();
  const newId = `SK-2026-${String(current.length + 1).padStart(3, "0")}`;
  const record: ProgramSignIn = {
    ...newEntry,
    id: newId,
    createdAt: new Date().toISOString(),
  };
  const updated = [record, ...current];
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
  return record;
}

export function getDashboardMetrics(): DashboardMetrics {
  const signIns = getSignIns();
  
  const metrics: DashboardMetrics = {
    totalSignIns: signIns.length,
    confirmedSignIns: signIns.filter((s) => s.status === "Confirmé").length,
    pendingSignIns: signIns.filter((s) => s.status !== "Confirmé").length,
    totalRevenue: signIns.reduce((acc, s) => acc + s.tuitionFeePaid, 0),
    moovMoneyRevenue: signIns
      .filter((s) => s.paymentMethod === "Moov Money")
      .reduce((acc, s) => acc + s.tuitionFeePaid, 0),
    cashRevenue: signIns
      .filter((s) => s.paymentMethod === "En personne")
      .reduce((acc, s) => acc + s.tuitionFeePaid, 0),
    saturdayCount: signIns.filter((s) => s.saturdaySessionIncluded).length,
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

  return metrics;
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
    "Cours Samedi",
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
    item.saturdaySessionIncluded ? "Oui" : "Non",
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
