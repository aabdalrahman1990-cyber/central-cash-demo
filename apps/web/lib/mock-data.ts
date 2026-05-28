export type MockData = typeof mockData;

const bankNames = [
  { ar: "مصرف الرافدين", en: "Rafidain Bank" },
  { ar: "مصرف الرشيد", en: "Rasheed Bank" },
  { ar: "مصرف بغداد", en: "Bank of Baghdad" },
  { ar: "المصرف العراقي للتجارة", en: "Trade Bank of Iraq" }
];

export const mockData = {
  heroStats: [
    { label: { ar: "الطلبات المفتوحة", en: "Open requests" }, value: "184" },
    { label: { ar: "الحقائب قيد النقل", en: "Bags in transit" }, value: "52" },
    { label: { ar: "الموافقات المعلقة", en: "Pending approvals" }, value: "19" }
  ],
  liveMonitor: [
    {
      label: { ar: "متوسط زمن المعالجة", en: "Average processing time" },
      value: "3.8h",
      hint: { ar: "انخفاض 12% عن أمس", en: "12% lower than yesterday" }
    },
    {
      label: { ar: "أداء SLA لشركات النقل", en: "CIT SLA performance" },
      value: "97.6%",
      hint: { ar: "4 رحلات تحت المراقبة", en: "4 trips under watch" }
    },
    {
      label: { ar: "حالات الفروقات المفتوحة", en: "Open discrepancy cases" },
      value: "7",
      hint: { ar: "اثنتان بانتظار رد البنك", en: "Two awaiting bank response" }
    }
  ],
  kpis: [
    {
      id: "cashToday",
      label: { ar: "إجمالي النقد المستلم اليوم", en: "Total cash received today" },
      value: 3780000000,
      currency: true,
      trend: 9,
      caption: { ar: "مقارنة بمتوسط آخر 7 أيام", en: "Compared with trailing 7-day average" }
    },
    {
      id: "bagsToday",
      label: { ar: "عدد الحقائب المستلمة اليوم", en: "Bags received today" },
      value: 148,
      trend: 11,
      caption: { ar: "حتى هذه اللحظة", en: "As of now" }
    },
    {
      id: "matchedBags",
      label: { ar: "الحقائب المطابقة", en: "Matched bags" },
      value: 131,
      trend: 7,
      caption: { ar: "بعد العد والتحقق", en: "After count verification" }
    },
    {
      id: "rejectedBags",
      label: { ar: "الحقائب المرفوضة", en: "Rejected bags" },
      value: 4,
      trend: -2,
      caption: { ar: "تشمل نقص بيانات أو ختم مكرر", en: "Includes missing data or duplicate seal" }
    }
  ],
  cashByBank: bankNames.map((bank, index) => ({
    nameAr: bank.ar,
    nameEn: bank.en,
    amount: [980, 1120, 760, 920][index] * 1000000
  })),
  bagsByStatus: [
    { nameAr: "مطابق", nameEn: "Matched", value: 131 },
    { nameAr: "قيد النقل", nameEn: "In Transit", value: 52 },
    { nameAr: "بانتظار الاعتماد", nameEn: "Pending Approval", value: 19 },
    { nameAr: "فروقات", nameEn: "Discrepancy", value: 7 },
    { nameAr: "مرفوض", nameEn: "Rejected", value: 4 }
  ],
  cashBags: [
    {
      bagCode: "BAG-2026-00482",
      bank: "Rafidain Bank",
      branch: "Karrada",
      declaredAmount: 18000000,
      status: "In Transit"
    },
    {
      bagCode: "BAG-2026-00483",
      bank: "Rasheed Bank",
      branch: "Basra Main",
      declaredAmount: 24000000,
      status: "Pending CBI Approval"
    },
    {
      bagCode: "BAG-2026-00484",
      bank: "Bank of Baghdad",
      branch: "Mansour",
      declaredAmount: 12500000,
      status: "Matched"
    },
    {
      bagCode: "BAG-2026-00485",
      bank: "Trade Bank of Iraq",
      branch: "Erbil",
      declaredAmount: 31000000,
      status: "Discrepancy Found"
    }
  ],
  timeline: [
    {
      bagCode: "BAG-2026-00482",
      title: { ar: "استلام شركة النقل", en: "CIT pickup confirmed" },
      description: { ar: "تم مسح الحقيبة وربطها بالرحلة CIT-118.", en: "Bag scanned and assigned to trip CIT-118." },
      status: "Picked Up by CIT",
      time: "2026-05-27 09:12"
    },
    {
      bagCode: "BAG-2026-00483",
      title: { ar: "اعتماد مدير البنك المركزي", en: "CBI manager approval" },
      description: { ar: "تم اعتماد استلام الحقيبة للمكتب النقدي.", en: "Cash desk receipt approved by CBI manager." },
      status: "Accepted for Counting",
      time: "2026-05-27 10:06"
    },
    {
      bagCode: "BAG-2026-00484",
      title: { ar: "مطابقة العد", en: "Count matched" },
      description: { ar: "المبلغ الفعلي يساوي المبلغ المعلن وتم إغلاق الحقيبة.", en: "Actual amount matched declared amount and bag was closed." },
      status: "Closed",
      time: "2026-05-27 10:54"
    },
    {
      bagCode: "BAG-2026-00485",
      title: { ar: "فتح حالة فرق", en: "Discrepancy case opened" },
      description: { ar: "تم إنشاء القضية DIS-2201 بسبب فرق 250,000 د.ع.", en: "Case DIS-2201 created for a 250,000 IQD variance." },
      status: "Discrepancy Found",
      time: "2026-05-27 11:11"
    },
    {
      bagCode: "BAG-2026-00486",
      title: { ar: "ربط الوسم الذكي", en: "Smart tag bound" },
      description: { ar: "تم ربط RFID رقم RFID-90883 مع الختم SL-55490.", en: "RFID-90883 bound with seal SL-55490." },
      status: "Sealed",
      time: "2026-05-27 11:42"
    },
    {
      bagCode: "BAG-2026-00487",
      title: { ar: "إرجاع للفرع", en: "Returned to branch" },
      description: { ar: "أُعيدت الحقيبة لعدم اكتمال تفاصيل الفئات.", en: "Bag returned due to incomplete denomination details." },
      status: "Rejected",
      time: "2026-05-27 12:05"
    }
  ],
  managementRows: {
    banks: [
      { code: "BNK-001", bank: "Rafidain Bank", branch: "42 branches", owner: "Bank Admin", amount: 0, status: "Approved by Branch" },
      { code: "BNK-002", bank: "Rasheed Bank", branch: "31 branches", owner: "Bank Admin", amount: 0, status: "Approved by Branch" }
    ],
    branches: [
      { code: "BR-1001", bank: "Rafidain Bank", branch: "Karrada", owner: "Branch Manager", amount: 0, status: "Approved by Branch" },
      { code: "BR-1002", bank: "Trade Bank of Iraq", branch: "Erbil", owner: "Branch Manager", amount: 0, status: "Approved by Branch" }
    ],
    users: [
      { code: "USR-3001", bank: "CBI", branch: "HQ", owner: "CBI Manager", amount: 0, status: "Approved by Branch" },
      { code: "USR-3002", bank: "Rafidain Bank", branch: "Karrada", owner: "Cash Officer", amount: 0, status: "Prepared" }
    ]
  },
  depositRequestsTable: [
    { code: "DR-2026-00091", bank: "Rafidain Bank", branch: "Karrada", owner: "Sara Alwan", amount: 42000000, status: "Prepared" },
    { code: "DR-2026-00092", bank: "Rasheed Bank", branch: "Basra Main", owner: "Ali Jabbar", amount: 55000000, status: "Pending Branch Approval" }
  ],
  cashBagsTable: [
    { code: "BAG-2026-00482", bank: "Rafidain Bank", branch: "Karrada", owner: "Sara Alwan", amount: 18000000, status: "In Transit" },
    { code: "BAG-2026-00483", bank: "Rasheed Bank", branch: "Basra Main", owner: "Ali Jabbar", amount: 24000000, status: "Pending CBI Approval" }
  ],
  denominationsTable: [
    { code: "DEN-00482-25K", bank: "Rafidain Bank", branch: "Karrada", owner: "25,000 x 720", amount: 18000000, status: "Prepared" },
    { code: "DEN-00483-10K", bank: "Rasheed Bank", branch: "Basra Main", owner: "10,000 x 2400", amount: 24000000, status: "Prepared" }
  ],
  approvalQueue: [
    { code: "BAG-2026-00488", bank: "Bank of Baghdad", branch: "Mansour", owner: "Mustafa Raad", amount: 21500000, status: "Pending Branch Approval" },
    { code: "BAG-2026-00489", bank: "Rafidain Bank", branch: "Najaf", owner: "Zainab Fadel", amount: 19800000, status: "Pending Branch Approval" }
  ],
  tagInventoryRows: [
    { code: "RFID-90883", bank: "Inventory", branch: "Bag TAG", owner: "Seal SL-55490", amount: 0, status: "Sealed" },
    { code: "QR-100992", bank: "Inventory", branch: "Bag TAG", owner: "Seal SL-55491", amount: 0, status: "Prepared" }
  ],
  citTripRows: [
    { code: "CIT-118", bank: "SecureTrans", branch: "Baghdad Route", owner: "Driver: Omar", amount: 54000000, status: "Picked Up by CIT" },
    { code: "CIT-119", bank: "Armored Iraq", branch: "Basra Route", owner: "Driver: Haider", amount: 62000000, status: "Assigned to CIT" }
  ],
  cbiGateRows: [
    { code: "GATE-7711", bank: "Rafidain Bank", branch: "Gate A", owner: "Officer: Noor", amount: 18000000, status: "Arrived at CBI Gate" },
    { code: "GATE-7712", bank: "Rasheed Bank", branch: "Gate B", owner: "Officer: Ahmed", amount: 24000000, status: "Arrived at CBI Gate" }
  ],
  cashDeskRows: [
    { code: "CD-1882", bank: "Rasheed Bank", branch: "Desk 2", owner: "Officer: Huda", amount: 24000000, status: "Received by CBI Cash Desk" },
    { code: "CD-1883", bank: "Rafidain Bank", branch: "Desk 1", owner: "Officer: Abbas", amount: 18000000, status: "Pending CBI Approval" }
  ],
  countingRows: [
    { code: "CNT-4412", bank: "Rafidain Bank", branch: "Vault 3", owner: "Counter: Saif", amount: 18000000, status: "Matched" },
    { code: "CNT-4413", bank: "Trade Bank of Iraq", branch: "Vault 5", owner: "Counter: Maryam", amount: 31000000, status: "Counting in Progress" }
  ],
  discrepancyRows: [
    { code: "DIS-2201", bank: "Trade Bank of Iraq", branch: "Erbil", owner: "Pending bank reply", amount: 250000, status: "Pending Bank Response" },
    { code: "DIS-2197", bank: "Bank of Baghdad", branch: "Mansour", owner: "Resolved by CBI", amount: 100000, status: "Resolved" }
  ],
  timelineRows: [
    { code: "TL-00482-01", bank: "Rafidain Bank", branch: "Karrada", owner: "Request created", amount: 18000000, status: "Prepared" },
    { code: "TL-00482-02", bank: "Rafidain Bank", branch: "Karrada", owner: "CIT pickup", amount: 18000000, status: "Picked Up by CIT" }
  ],
  reportRows: [
    { code: "REP-DAILY-01", bank: "All Banks", branch: "Today", owner: "Operations", amount: 3780000000, status: "Closed" },
    { code: "REP-SLA-02", bank: "CIT Companies", branch: "Month to date", owner: "Risk Office", amount: 976, status: "Closed" }
  ],
  auditRows: [
    { code: "AUD-90081", bank: "BAG-2026-00482", branch: "Update", owner: "hash:7bd9ae...", amount: 0, status: "Closed" },
    { code: "AUD-90082", bank: "DIS-2201", branch: "Create", owner: "hash:912eb1...", amount: 0, status: "Closed" }
  ],
  settingsRows: [
    { code: "SET-MFA", bank: "Security", branch: "Global", owner: "OTP required for approvers", amount: 0, status: "Closed" },
    { code: "SET-ATT", bank: "Attachments", branch: "Global", owner: "SHA-256 hashing enabled", amount: 0, status: "Closed" }
  ]
};
