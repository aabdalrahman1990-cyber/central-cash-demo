import type { MockData } from "@/lib/mock-data";

export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];

export const screenIds = [
  "banks",
  "branches",
  "users-roles",
  "deposit-requests",
  "create-request",
  "cash-bag",
  "denominations",
  "branch-approval",
  "tag-binding",
  "cit-handover",
  "cbi-gate",
  "cash-desk",
  "counting",
  "discrepancies",
  "timeline",
  "reports",
  "audit-trail",
  "settings"
] as const;

type LocalizedText = Record<Locale, string>;

export type Dictionary = typeof dictionaryAr;
type ScreenKey = keyof Dictionary["screens"];
type NavItem = {
  href: string;
  key: ScreenKey;
  icon: string;
};

export const navItems: NavItem[] = [
  { href: "/portal", key: "dashboard", icon: "LayoutDashboard" },
  { href: "/portal/banks", key: "banks", icon: "Landmark" },
  { href: "/portal/branches", key: "branches", icon: "Building2" },
  { href: "/portal/users-roles", key: "usersRoles", icon: "UsersRound" },
  { href: "/portal/deposit-requests", key: "depositRequests", icon: "ClipboardList" },
  { href: "/portal/create-request", key: "createRequest", icon: "FilePlus2" },
  { href: "/portal/cash-bag", key: "cashBag", icon: "Package" },
  { href: "/portal/denominations", key: "denominations", icon: "Coins" },
  { href: "/portal/branch-approval", key: "branchApproval", icon: "BadgeCheck" },
  { href: "/portal/tag-binding", key: "tagBinding", icon: "QrCode" },
  { href: "/portal/cit-handover", key: "citHandover", icon: "Truck" },
  { href: "/portal/cbi-gate", key: "cbiGate", icon: "ScanLine" },
  { href: "/portal/cash-desk", key: "cashDesk", icon: "WalletCards" },
  { href: "/portal/counting", key: "counting", icon: "Scale" },
  { href: "/portal/discrepancies", key: "discrepancies", icon: "ShieldAlert" },
  { href: "/portal/timeline", key: "timeline", icon: "History" },
  { href: "/portal/reports", key: "reports", icon: "BarChart3" },
  { href: "/portal/audit-trail", key: "auditTrail", icon: "FileSearch" },
  { href: "/portal/settings", key: "settings", icon: "Settings2" }
];

export const screenDefinitions: Record<
  string,
  {
    key: keyof Dictionary["screens"];
    description: LocalizedText;
    primaryAction: LocalizedText;
    rules: LocalizedText;
    formFields: Record<Locale, string[]>;
    badges: Record<Locale, { title: string; text: string; status: string }[]>;
    dataset: (data: MockData) => Record<string, unknown>[];
  }
> = {
  banks: screenFactory(
    "banks",
    "إدارة البنوك التجارية وتعريف نطاقات الرؤية المؤسسية وربط البنوك بالفروع والصلاحيات.",
    "Manage commercial banks, visibility scopes, and branch associations.",
    "إضافة بنك",
    "Add bank",
    (data) => data.managementRows.banks
  ),
  branches: screenFactory(
    "branches",
    "إدارة الفروع وربطها بالبنوك ومراكز الإيداع ومسارات النقل النقدي.",
    "Maintain branches, deposit centers, and routing relationships.",
    "إضافة فرع",
    "Add branch",
    (data) => data.managementRows.branches
  ),
  "users-roles": screenFactory(
    "usersRoles",
    "إدارة المستخدمين والأدوار والصلاحيات مع فصل كامل بين المُنشئ والمُعتمد.",
    "Control users, roles, permissions, and maker-checker separation.",
    "إضافة مستخدم",
    "Add user",
    (data) => data.managementRows.users
  ),
  "deposit-requests": screenFactory(
    "depositRequests",
    "قائمة طلبات الإيداع النقدي مع التصفية حسب البنك والفرع والحالة وتاريخ الإنشاء.",
    "Track deposit requests by bank, branch, status, and submission date.",
    "طلب جديد",
    "New request",
    (data) => data.depositRequestsTable
  ),
  "create-request": screenFactory(
    "createRequest",
    "إنشاء طلب إيداع جديد مع ربط البنك والفرع وإجمالي المبلغ والتاريخ المرجعي.",
    "Create a new deposit request with bank, branch, amount, and reference date.",
    "حفظ الطلب",
    "Save request",
    (data) => data.depositRequestsTable
  ),
  "cash-bag": screenFactory(
    "cashBag",
    "إنشاء وتعديل الحقيبة النقدية وربطها بالطلب ورقم الختم والمبلغ المعلن.",
    "Create and edit cash bags with seal, request, and declared amount.",
    "إضافة حقيبة",
    "Add bag",
    (data) => data.cashBagsTable
  ),
  denominations: screenFactory(
    "denominations",
    "إدخال تفاصيل الفئات النقدية مع تحقق تلقائي من مجموع الحقيبة قبل الختم.",
    "Enter denomination details and validate totals before sealing.",
    "إضافة فئة",
    "Add denomination",
    (data) => data.denominationsTable
  ),
  "branch-approval": screenFactory(
    "branchApproval",
    "صف اعتماد مدير الفرع مع إجراءات اعتماد أو إرجاع وتعليقات إلزامية.",
    "Branch manager queue for approve or return actions with mandatory comments.",
    "اعتماد مختار",
    "Approve selected",
    (data) => data.approvalQueue
  ),
  "tag-binding": screenFactory(
    "tagBinding",
    "ربط QR/RFID والختم بالحقيبة مع منع التكرار والتحقق من المخزون.",
    "Bind QR/RFID and seals while enforcing uniqueness and inventory controls.",
    "ربط الوسم",
    "Bind tag",
    (data) => data.tagInventoryRows
  ),
  "cit-handover": screenFactory(
    "citHandover",
    "تسليم الحقائب إلى شركة النقل النقدي مع تأكيد الاستلام ومسار الرحلة.",
    "Hand over bags to CIT with pickup confirmation and trip route assignment.",
    "إنشاء رحلة",
    "Create trip",
    (data) => data.citTripRows
  ),
  "cbi-gate": screenFactory(
    "cbiGate",
    "استلام بوابة البنك المركزي عبر المسح الفوري والتحقق من الوصول.",
    "Central bank gate receiving through real-time scan and arrival validation.",
    "تأكيد الوصول",
    "Confirm arrival",
    (data) => data.cbiGateRows
  ),
  "cash-desk": screenFactory(
    "cashDesk",
    "استلام مكتب النقد وربط المحفظة التشغيلية قبل الاعتماد الإداري.",
    "Cash desk receipt and operational vault allocation before manager approval.",
    "تسجيل استلام",
    "Register receipt",
    (data) => data.cashDeskRows
  ),
  counting: screenFactory(
    "counting",
    "العد والتحقق ومقارنة المبلغ الفعلي بالمبلغ المعلن وإنشاء حالات الفرق تلقائيًا.",
    "Count, verify, compare actual to declared, and auto-create discrepancy cases.",
    "بدء العد",
    "Start counting",
    (data) => data.countingRows
  ),
  discrepancies: screenFactory(
    "discrepancies",
    "إدارة حالات الفرق ومراسلات البنك والقرارات النهائية والإغلاقات.",
    "Manage discrepancy cases, bank responses, adjudication, and closures.",
    "فتح حالة",
    "Open case",
    (data) => data.discrepancyRows
  ),
  timeline: screenFactory(
    "timeline",
    "جواز السفر الرقمي للحقيبة مع كل حركة ووقت ومستخدم وجهة تنفيذ.",
    "Digital passport timeline for every bag event, actor, timestamp, and location.",
    "عرض الخط الزمني",
    "View timeline",
    (data) => data.timelineRows
  ),
  reports: screenFactory(
    "reports",
    "تقارير تشغيلية وتنظيمية مع تصدير ومؤشرات أداء للبنوك وشركات النقل.",
    "Operational and regulatory reports with exports and KPI breakdowns.",
    "إنشاء تقرير",
    "Generate report",
    (data) => data.reportRows
  ),
  "audit-trail": screenFactory(
    "auditTrail",
    "سجل تدقيق كامل لكل عملية مع بصمة رقمية وعدم قابلية الحذف بعد الاعتماد.",
    "Full immutable audit trail with digital hash and post-approval protection.",
    "تصدير السجل",
    "Export audit trail",
    (data) => data.auditRows
  ),
  settings: screenFactory(
    "settings",
    "إعدادات المنصة وسياسات MFA والاحتفاظ بالمرفقات وقيود الصلاحيات.",
    "Platform settings for MFA policies, attachment retention, and access controls.",
    "حفظ الإعدادات",
    "Save settings",
    (data) => data.settingsRows
  )
};

function screenFactory(
  key: keyof Dictionary["screens"],
  arDescription: string,
  enDescription: string,
  arAction: string,
  enAction: string,
  dataset: (data: MockData) => Record<string, unknown>[]
) {
  return {
    key,
    description: { ar: arDescription, en: enDescription },
    primaryAction: { ar: arAction, en: enAction },
    rules: {
      ar: "تطبق هذه الشاشة قواعد التحقق المؤسسية: منع الاعتماد الذاتي، منع الختم بدون فئات، ومنع التكرار مع تسجيل كل حدث في سجل التدقيق.",
      en: "This screen enforces enterprise controls: no self-approval, no sealing without denominations, no duplicates, and every action is audit logged."
    },
    formFields: {
      ar: ["المرجع", "البنك", "الفرع", "المالك التشغيلي", "المبلغ", "الحالة"],
      en: ["Reference", "Bank", "Branch", "Operational Owner", "Amount", "Status"]
    },
    badges: {
      ar: [
        {
          title: "فصل الصلاحيات",
          text: "المُنشئ لا يمكنه اعتماد نفس الحقيبة أو الطلب.",
          status: "Pending Branch Approval"
        },
        {
          title: "تحقق الأختام",
          text: "لا يسمح برقم ختم أو QR/RFID مكرر ضمن المخزون النشط.",
          status: "Sealed"
        },
        {
          title: "الاستجابة الرقابية",
          text: "كل اختلاف ينشئ قضية تلقائيًا مع خط زمن وسجل تدقيق.",
          status: "Discrepancy Found"
        }
      ],
      en: [
        {
          title: "Segregation of duties",
          text: "The maker cannot approve the same bag or request.",
          status: "Pending Branch Approval"
        },
        {
          title: "Seal validation",
          text: "Duplicate seal or QR/RFID codes are blocked across active inventory.",
          status: "Sealed"
        },
        {
          title: "Regulatory response",
          text: "Every variance opens a case with timeline and audit trace.",
          status: "Discrepancy Found"
        }
      ]
    },
    dataset
  };
}

const dictionaryAr = {
  product: {
    kicker: "Central Bank of Iraq",
    title: "منصة الإيداع النقدي وتتبع الحقائب الذكية",
    description:
      "منصة مصرفية مؤسسية موحدة لإدارة دورة حياة الإيداع النقدي من إنشاء الطلب وحتى العد والتسوية وإغلاق الفروقات، مع ضوابط صلاحيات وموافقات وسجل تدقيق كامل."
  },
  login: {
    title: "تسجيل دخول آمن",
    subtitle:
      "ادخل بياناتك للوصول إلى منصة التشغيل المركزية. الهيكل الحالي جاهز لدعم MFA وJWT وسياسات الامتثال البنكي.",
    username: "اسم المستخدم أو البريد المؤسسي",
    password: "كلمة المرور",
    mfa: "رمز التحقق الثاني",
    mfaPlaceholder: "123456",
    signIn: "دخول إلى المنصة",
    requestAccess: "طلب صلاحية",
    securityNote:
      "سياسات المنصة تمنع المشاركة بالحسابات وتفرض فصل المهام بين الإنشاء والاعتماد وتحتفظ ببصمة رقمية لكل مرفق.",
    heroCards: [
      { title: "سجل التدقيق", value: "100% Immutable" },
      { title: "جاهزية MFA", value: "JWT + OTP" },
      { title: "نطاق الرؤية", value: "CBI / Bank / Branch" }
    ]
  },
  sidebar: {
    title: "وحدة التشغيل",
    subtitle: "مراقبة نقدية مركزية",
    description:
      "لوحات عربية أولًا مع مسارات موافقة، تصفية متقدمة، وشفافية كاملة على حركة الحقائب."
  },
  common: {
    search: "بحث",
    export: "تصدير",
    filters: "فلاتر",
    createRequest: "إنشاء طلب إيداع"
  },
  dashboard: {
    title: "لوحة المتابعة المؤسسية",
    subtitle:
      "رؤية آنية لحالة الحقائب النقدية، أداء شركات النقل، فروقات العد، ومستوى الالتزام الزمني عبر البنوك التجارية والبنك المركزي.",
    heroBadge: "Secure Operations Center",
    liveMonitor: "مؤشرات مباشرة",
    recentBags: "أحدث الحقائب",
    timeline: "آخر الأنشطة",
    cashByBank: "النقد حسب البنك",
    bagsByStatus: "الحقائب حسب الحالة"
  },
  screenMeta: {
    workflow: "شاشة تشغيلية",
    formSection: "نموذج العمل",
    approvalRules: "قواعد الرقابة والاعتماد",
    operationalData: "البيانات التشغيلية"
  },
  screens: {
    dashboard: "الرئيسية",
    banks: "إدارة البنوك",
    branches: "إدارة الفروع",
    usersRoles: "المستخدمون والأدوار",
    depositRequests: "طلبات الإيداع",
    createRequest: "إنشاء طلب إيداع",
    cashBag: "إنشاء وتعديل الحقيبة",
    denominations: "تفاصيل الفئات",
    branchApproval: "صف اعتماد الفرع",
    tagBinding: "ربط الوسوم",
    citHandover: "تسليم شركة النقل",
    cbiGate: "استلام بوابة CBI",
    cashDesk: "استلام مكتب النقد",
    counting: "العد والتحقق",
    discrepancies: "إدارة الفروقات",
    timeline: "الجواز الرقمي للحقيبة",
    reports: "التقارير",
    auditTrail: "سجل التدقيق",
    settings: "الإعدادات"
  },
  table: {
    bagCode: "رمز الحقيبة",
    bank: "البنك",
    branch: "الفرع",
    amount: "المبلغ",
    status: "الحالة",
    reference: "المرجع",
    owner: "المالك التشغيلي"
  }
};

const dictionaryEn: Dictionary = {
  product: {
    kicker: "Central Bank of Iraq",
    title: "Cash Deposit & Smart Bag Tracking Platform",
    description:
      "A unified enterprise platform for managing the cash deposit lifecycle from request creation through counting, settlement, and discrepancy closure with full approvals and auditability."
  },
  login: {
    title: "Secure Sign In",
    subtitle:
      "Enter your credentials to access the operational hub. The prototype is structured for MFA, JWT, and banking compliance controls.",
    username: "Corporate username or email",
    password: "Password",
    mfa: "Second-factor code",
    mfaPlaceholder: "123456",
    signIn: "Enter platform",
    requestAccess: "Request access",
    securityNote:
      "Platform controls block credential sharing, enforce maker-checker segregation, and keep a digital fingerprint for every attachment.",
    heroCards: [
      { title: "Audit coverage", value: "100% Immutable" },
      { title: "MFA readiness", value: "JWT + OTP" },
      { title: "Visibility scope", value: "CBI / Bank / Branch" }
    ]
  },
  sidebar: {
    title: "Operations Unit",
    subtitle: "Central cash monitoring",
    description:
      "Arabic-first dashboards with approval routes, advanced filters, and end-to-end bag visibility."
  },
  common: {
    search: "Search",
    export: "Export",
    filters: "Filters",
    createRequest: "Create deposit request"
  },
  dashboard: {
    title: "Enterprise Monitoring Dashboard",
    subtitle:
      "Live visibility into bag status, transport performance, counting discrepancies, and processing compliance across commercial banks and the central bank.",
    heroBadge: "Secure Operations Center",
    liveMonitor: "Live monitor",
    recentBags: "Recent bags",
    timeline: "Recent activity",
    cashByBank: "Cash by bank",
    bagsByStatus: "Bags by status"
  },
  screenMeta: {
    workflow: "Operational screen",
    formSection: "Working form",
    approvalRules: "Controls and approvals",
    operationalData: "Operational data"
  },
  screens: {
    dashboard: "Dashboard",
    banks: "Banks Management",
    branches: "Branches Management",
    usersRoles: "Users and Roles",
    depositRequests: "Deposit Requests",
    createRequest: "Create Deposit Request",
    cashBag: "Create/Edit Cash Bag",
    denominations: "Denomination Breakdown",
    branchApproval: "Branch Approval Queue",
    tagBinding: "Tag Binding",
    citHandover: "CIT Handover",
    cbiGate: "CBI Gate Receiving",
    cashDesk: "CBI Cash Desk Receiving",
    counting: "Counting & Verification",
    discrepancies: "Discrepancy Cases",
    timeline: "Bag Digital Passport",
    reports: "Reports",
    auditTrail: "Audit Trail",
    settings: "Settings"
  },
  table: {
    bagCode: "Bag Code",
    bank: "Bank",
    branch: "Branch",
    amount: "Amount",
    status: "Status",
    reference: "Reference",
    owner: "Owner"
  }
};

export function getDictionary(locale: Locale) {
  return locale === "en" ? dictionaryEn : dictionaryAr;
}
