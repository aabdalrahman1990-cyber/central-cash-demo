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

export type ScreenId = (typeof screenIds)[number];
type LocalizedText = Record<Locale, string>;

const dictionaryAr = {
  product: {
    kicker: "Central Bank of Iraq",
    title: "منصة الإيداع النقدي وتتبع الحقائب الذكية",
    description:
      "منصة مصرفية مؤسسية لإدارة دورة حياة الإيداع النقدي من إنشاء الطلب وحتى العد والتسوية وإغلاق الفروقات مع سجل تدقيق كامل ومسار موافقات واضح."
  },
  login: {
    title: "تسجيل دخول آمن",
    subtitle:
      "ادخل إلى مركز العمليات النقدية المركزي. هذه النسخة جاهزة للعرض التشغيلي مع دعم العربية والإنجليزية وبنية أولية جاهزة لـ MFA وJWT.",
    username: "اسم المستخدم أو البريد المؤسسي",
    password: "كلمة المرور",
    mfa: "رمز التحقق الثنائي",
    mfaPlaceholder: "123456",
    signIn: "دخول إلى المنصة",
    requestAccess: "طلب صلاحية",
    securityNote:
      "تفرض المنصة فصل المهام بين المنشئ والمعتمد وتحتفظ ببصمة تدقيق رقمية لكل عملية ولكل مرفق.",
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
      "لوحات عربية أولًا، جواز رقمي لكل حقيبة، وإجراءات تشغيلية تبدأ من البنك التجاري وتنتهي عند التسوية لدى البنك المركزي."
  },
  common: {
    search: "بحث",
    export: "تصدير",
    filters: "فلاتر",
    createRequest: "إنشاء طلب إيداع",
    save: "حفظ",
    cancel: "إلغاء",
    update: "تحديث",
    create: "إنشاء",
    approve: "اعتماد",
    return: "إرجاع",
    bind: "ربط",
    count: "تنفيذ العد",
    open: "فتح",
    close: "إغلاق"
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
    cashBag: "إدارة الحقائب النقدية",
    denominations: "تفاصيل الفئات",
    branchApproval: "اعتماد الفرع",
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
    owner: "المالك التشغيلي",
    actions: "إجراءات"
  }
};

export type Dictionary = typeof dictionaryAr;

const dictionaryEn: Dictionary = {
  product: {
    kicker: "Central Bank of Iraq",
    title: "Cash Deposit & Smart Bag Tracking Platform",
    description:
      "An enterprise platform for managing the cash deposit lifecycle from request creation through counting, settlement, and discrepancy closure."
  },
  login: {
    title: "Secure Sign In",
    subtitle:
      "Enter the central cash operations command center. This prototype is ready for Arabic and English demos with MFA/JWT-ready structure.",
    username: "Corporate username or email",
    password: "Password",
    mfa: "Second-factor code",
    mfaPlaceholder: "123456",
    signIn: "Enter platform",
    requestAccess: "Request access",
    securityNote:
      "The platform enforces maker-checker segregation and keeps a digital audit fingerprint for every action and attachment.",
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
      "Arabic-first dashboards, digital bag passports, and operational workflows from commercial banks to central settlement."
  },
  common: {
    search: "Search",
    export: "Export",
    filters: "Filters",
    createRequest: "Create deposit request",
    save: "Save",
    cancel: "Cancel",
    update: "Update",
    create: "Create",
    approve: "Approve",
    return: "Return",
    bind: "Bind",
    count: "Count",
    open: "Open",
    close: "Close"
  },
  dashboard: {
    title: "Enterprise Monitoring Dashboard",
    subtitle:
      "Live visibility into bag status, transport performance, counting discrepancies, and timing compliance across commercial banks and the central bank.",
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
    cashBag: "Cash Bags",
    denominations: "Denomination Breakdown",
    branchApproval: "Branch Approval",
    tagBinding: "Tag Binding",
    citHandover: "CIT Handover",
    cbiGate: "CBI Gate Receiving",
    cashDesk: "Cash Desk Receiving",
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
    owner: "Owner",
    actions: "Actions"
  }
};

export type ScreenDefinition = {
  key: keyof Dictionary["screens"];
  description: LocalizedText;
  primaryAction: LocalizedText;
  rules: LocalizedText;
  formFields: Record<Locale, string[]>;
  badges: Record<Locale, { title: string; text: string; status: string }[]>;
};

function screenFactory(
  key: keyof Dictionary["screens"],
  arDescription: string,
  enDescription: string,
  arAction: string,
  enAction: string
): ScreenDefinition {
  return {
    key,
    description: { ar: arDescription, en: enDescription },
    primaryAction: { ar: arAction, en: enAction },
    rules: {
      ar: "تطبق هذه الشاشة قواعد التحقق المؤسسية: منع الاعتماد الذاتي، منع الختم دون فئات، ومنع التكرار مع تسجيل كل حدث في سجل التدقيق.",
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
          text: "المنشئ لا يمكنه اعتماد نفس الحقيبة أو الطلب.",
          status: "Pending Branch Approval"
        },
        {
          title: "تحقق الأختام",
          text: "لا يسمح برقم ختم أو QR/RFID مكرر ضمن المخزون النشط.",
          status: "Sealed"
        },
        {
          title: "الاستجابة الرقابية",
          text: "كل اختلاف ينشئ قضية تلقائيًا مع خط زمني وسجل تدقيق.",
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
    }
  };
}

export const screenDefinitions: Record<ScreenId, ScreenDefinition> = {
  banks: screenFactory("banks", "تعريف البنوك التجارية ونطاقات الرؤية المؤسسية.", "Define commercial banks and visibility scopes.", "إضافة بنك", "Add bank"),
  branches: screenFactory("branches", "إدارة الفروع وربطها بالبنوك والمسارات التشغيلية.", "Manage branches and operational routing.", "إضافة فرع", "Add branch"),
  "users-roles": screenFactory("usersRoles", "إدارة المستخدمين والأدوار والصلاحيات.", "Manage users, roles, and permissions.", "إضافة مستخدم", "Add user"),
  "deposit-requests": screenFactory("depositRequests", "قائمة طلبات الإيداع النقدي مع البحث والتصفية.", "View and search deposit requests.", "طلب جديد", "New request"),
  "create-request": screenFactory("createRequest", "إنشاء طلب إيداع جديد وربطه بالبنك والفرع.", "Create a new deposit request.", "حفظ الطلب", "Save request"),
  "cash-bag": screenFactory("cashBag", "إنشاء حقيبة وربطها بطلب إيداع قائم.", "Create or update a cash bag.", "إضافة حقيبة", "Add bag"),
  denominations: screenFactory("denominations", "إدخال فئات الحقيبة مع إعادة احتساب الإجمالي.", "Manage bag denomination lines and totals.", "إضافة فئة", "Add denomination"),
  "branch-approval": screenFactory("branchApproval", "اعتماد أو إرجاع الحقائب من الفرع.", "Approve or return bags at branch level.", "اعتماد", "Approve"),
  "tag-binding": screenFactory("tagBinding", "ربط الوسم الذكي ورقم الختم بالحقيبة.", "Bind smart tags and seal numbers.", "ربط الوسم", "Bind tag"),
  "cit-handover": screenFactory("citHandover", "تسليم الحقيبة لشركة النقل وتحديث مراحل الرحلة.", "Hand over bags to CIT and move journey statuses.", "تسليم", "Handover"),
  "cbi-gate": screenFactory("cbiGate", "تأكيد وصول الحقيبة إلى بوابة البنك المركزي.", "Confirm arrival at the central bank gate.", "تأكيد الوصول", "Confirm arrival"),
  "cash-desk": screenFactory("cashDesk", "استلام الحقيبة في المكتب النقدي واعتمادها للعد.", "Receive the bag at the cash desk.", "تسجيل استلام", "Register receipt"),
  counting: screenFactory("counting", "إدخال العد الفعلي وإنشاء الفروقات عند الحاجة.", "Perform counting and generate discrepancies.", "تنفيذ العد", "Count"),
  discrepancies: screenFactory("discrepancies", "معالجة رد البنك وإغلاق قضايا الفرق.", "Manage bank responses and resolve discrepancy cases.", "فتح حالة", "Open case"),
  timeline: screenFactory("timeline", "عرض الجواز الرقمي الكامل للحقيبة.", "Show the full digital passport timeline.", "عرض", "View"),
  reports: screenFactory("reports", "تقارير تشغيلية ومؤشرات الأداء.", "Operational and performance reports.", "إنشاء تقرير", "Generate report"),
  "audit-trail": screenFactory("auditTrail", "سجل تدقيق غير قابل للحذف بعد الاعتماد.", "Immutable audit log after approval.", "تصدير", "Export"),
  settings: screenFactory("settings", "إعدادات السياسات الأمنية والتشغيلية.", "Security and operational settings.", "حفظ الإعدادات", "Save settings")
};

export const navItems = [
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
] as const;

export function getDictionary(locale: Locale) {
  return locale === "en" ? dictionaryEn : dictionaryAr;
}
