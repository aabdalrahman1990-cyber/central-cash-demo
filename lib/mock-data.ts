export const mockData = {
  depositRequestsTable: [
    {
      code: "DR-2026-00091",
      bank: "مصرف الرافدين",
      branch: "فرع الكرادة",
      owner: "سارة علوان",
      amount: 18000000,
      status: "Prepared"
    },
    {
      code: "DR-2026-00092",
      bank: "مصرف الرشيد",
      branch: "فرع المنصور",
      owner: "أحمد قتيبة",
      amount: 24000000,
      status: "Pending Branch Approval"
    },
    {
      code: "DR-2026-00093",
      bank: "مصرف بغداد",
      branch: "فرع الكاظمية",
      owner: "ميثم سالم",
      amount: 12000000,
      status: "Approved by Branch"
    }
  ],
  cashBagsTable: [
    {
      code: "BAG-2026-00482",
      bank: "مصرف الرافدين",
      branch: "فرع الكرادة",
      owner: "مسؤول الخزنة",
      amount: 18000000,
      status: "Prepared"
    },
    {
      code: "BAG-2026-00483",
      bank: "مصرف الرشيد",
      branch: "فرع المنصور",
      owner: "مسؤول الفرع",
      amount: 24000000,
      status: "Pending Branch Approval"
    },
    {
      code: "BAG-2026-00484",
      bank: "مصرف بغداد",
      branch: "فرع الكاظمية",
      owner: "شركة الأمان للنقل النقدي",
      amount: 12000000,
      status: "In Transit"
    },
    {
      code: "BAG-2026-00485",
      bank: "المصرف العراقي للتجارة",
      branch: "فرع الجادرية",
      owner: "مكتب الاستلام النقدي",
      amount: 20000000,
      status: "Pending Bank Response"
    }
  ],
  discrepancyRows: [
    {
      code: "DIS-2201",
      bank: "المصرف العراقي للتجارة",
      branch: "فرع الجادرية",
      owner: "بانتظار رد البنك",
      amount: -500000,
      status: "Pending Bank Response"
    },
    {
      code: "DIS-2202",
      bank: "مصرف بغداد",
      branch: "فرع الكاظمية",
      owner: "قيد المراجعة في البنك المركزي",
      amount: 250000,
      status: "Pending CBI Approval"
    }
  ],
  timeline: [
    {
      bagCode: "BAG-2026-00485",
      title: { ar: "فتح قضية فرق", en: "Discrepancy case opened" },
      description: { ar: "تم تسجيل فرق أثناء العد وإرسال القضية إلى البنك للرد.", en: "A variance was recorded during counting and sent to the bank for response." },
      status: "Discrepancy Found",
      time: "2026-05-28 10:20"
    },
    {
      bagCode: "BAG-2026-00484",
      title: { ar: "الوصول إلى بوابة البنك المركزي", en: "Arrived at CBI gate" },
      description: { ar: "تم مسح الحقيبة عند بوابة البنك المركزي وتحديث حالة الرحلة.", en: "The bag was scanned at the central bank gate and the journey state was updated." },
      status: "Arrived at CBI Gate",
      time: "2026-05-28 09:40"
    },
    {
      bagCode: "BAG-2026-00483",
      title: { ar: "بانتظار اعتماد مدير الفرع", en: "Waiting for branch manager approval" },
      description: { ar: "الحقيبة مكتملة الفئات وجاهزة لمرحلة الموافقة.", en: "The bag contains full denomination details and is ready for approval." },
      status: "Pending Branch Approval",
      time: "2026-05-28 08:55"
    }
  ],
  reportRows: [
    {
      code: "REP-DAILY-01",
      bank: "جميع البنوك",
      branch: "يومي",
      owner: "إجمالي المقبوضات",
      amount: 74000000,
      status: "Closed"
    },
    {
      code: "REP-CIT-02",
      bank: "شركات النقل",
      branch: "أداء",
      owner: "التزام SLA",
      amount: 97,
      status: "Closed"
    }
  ],
  auditRows: [
    {
      code: "AUD-90081",
      bank: "BAG-2026-00484",
      branch: "MOVE_BAG",
      owner: "Arrived at CBI Gate",
      amount: 0,
      status: "Closed"
    },
    {
      code: "AUD-90082",
      bank: "BAG-2026-00483",
      branch: "ADD_DENOMINATION",
      owner: "25,000",
      amount: 0,
      status: "Closed"
    }
  ],
  managementRows: {
    banks: [
      { code: "BNK-0001", bank: "مصرف الرافدين", branch: "حكومي", owner: "إدارة البنوك", amount: 0, status: "Approved by Branch" },
      { code: "BNK-0002", bank: "مصرف الرشيد", branch: "حكومي", owner: "إدارة البنوك", amount: 0, status: "Approved by Branch" },
      { code: "BNK-0003", bank: "مصرف بغداد", branch: "خاص", owner: "إدارة البنوك", amount: 0, status: "Approved by Branch" }
    ],
    branches: [
      { code: "BR-0001", bank: "مصرف الرافدين", branch: "فرع الكرادة", owner: "منطقة بغداد", amount: 0, status: "Approved by Branch" },
      { code: "BR-0002", bank: "مصرف الرشيد", branch: "فرع المنصور", owner: "منطقة بغداد", amount: 0, status: "Approved by Branch" },
      { code: "BR-0003", bank: "مصرف بغداد", branch: "فرع الكاظمية", owner: "منطقة بغداد", amount: 0, status: "Approved by Branch" }
    ],
    users: [
      { code: "USR-0001", bank: "مدير فرع", branch: "مصرف الرافدين", owner: "اعتماد الحقائب", amount: 0, status: "Approved by Branch" },
      { code: "USR-0002", bank: "موظف عد", branch: "البنك المركزي", owner: "العد والتحقق", amount: 0, status: "Approved by Branch" },
      { code: "USR-0003", bank: "ضابط بوابة", branch: "البنك المركزي", owner: "استلام البوابة", amount: 0, status: "Approved by Branch" }
    ]
  }
};

export type MockData = typeof mockData;
