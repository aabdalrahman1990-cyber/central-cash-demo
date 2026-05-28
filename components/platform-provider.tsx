"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { mockData } from "@/lib/mock-data";

type ManagementRow = {
  code: string;
  bank: string;
  branch: string;
  owner: string;
  amount: number;
  status: string;
};

type DepositRequest = {
  code: string;
  bank: string;
  branch: string;
  owner: string;
  amount: number;
  status: string;
};

type DenominationLine = {
  id: string;
  bagCode: string;
  label: string;
  units: number;
  unitValue: number;
  total: number;
};

type CashBag = {
  code: string;
  requestCode: string;
  bank: string;
  branch: string;
  owner: string;
  amount: number;
  status: string;
  tagCode?: string;
  sealNumber?: string;
  actualAmount?: number;
};

type DiscrepancyCase = {
  code: string;
  bank: string;
  branch: string;
  owner: string;
  amount: number;
  status: string;
  bagCode: string;
  response?: string;
  resolution?: string;
};

type TimelineEvent = {
  bagCode: string;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  status: string;
  time: string;
};

type ReportRow = {
  code: string;
  bank: string;
  branch: string;
  owner: string;
  amount: number;
  status: string;
};

type AuditRow = {
  code: string;
  bank: string;
  branch: string;
  owner: string;
  amount: number;
  status: string;
};

type SettingsState = {
  otpRequired: boolean;
  attachmentHashing: boolean;
  branchRestrictedView: boolean;
  darkDefault: boolean;
};

type PlatformState = {
  banks: ManagementRow[];
  branches: ManagementRow[];
  users: ManagementRow[];
  depositRequests: DepositRequest[];
  cashBags: CashBag[];
  denominations: DenominationLine[];
  discrepancyCases: DiscrepancyCase[];
  timeline: TimelineEvent[];
  reports: ReportRow[];
  audit: AuditRow[];
  settings: SettingsState;
};

type CreateRequestInput = Omit<DepositRequest, "status">;
type CreateBagInput = Omit<CashBag, "status" | "tagCode" | "sealNumber" | "actualAmount">;
type ManagementInput = Omit<ManagementRow, "status">;

type PlatformContextValue = {
  state: PlatformState;
  createRequest: (input: CreateRequestInput) => string;
  saveBag: (input: CreateBagInput) => string;
  addDenomination: (bagCode: string, input: { label: string; units: number; unitValue: number }) => void;
  approveBag: (bagCode: string, decision: "approve" | "return", note?: string) => void;
  bindTag: (bagCode: string, tagCode: string, sealNumber: string) => void;
  moveBag: (bagCode: string, status: string, noteAr: string, noteEn: string) => void;
  countBag: (bagCode: string, actualAmount: number) => void;
  respondCase: (caseCode: string, response: string) => void;
  resolveCase: (caseCode: string, resolution: string) => void;
  saveManagementRow: (kind: "banks" | "branches" | "users", row: ManagementInput) => void;
  saveSettings: (input: Partial<SettingsState>) => void;
  resetDemo: () => void;
};

const STORAGE_KEY = "cbi-platform-demo-v3";
const PlatformContext = createContext<PlatformContextValue | null>(null);

function makeNow() {
  return new Date().toISOString().slice(0, 16).replace("T", " ");
}

function nextCode(prefix: string, size: number, offset = 1) {
  return `${prefix}-${String(size + offset).padStart(4, "0")}`;
}

function buildInitialState(): PlatformState {
  return {
    banks: mockData.managementRows.banks,
    branches: mockData.managementRows.branches,
    users: mockData.managementRows.users,
    depositRequests: mockData.depositRequestsTable.map((item) => ({ ...item })),
    cashBags: mockData.cashBagsTable.map((item) => ({
      ...item,
      requestCode: mockData.depositRequestsTable[0]?.code ?? "DR-2026-00091"
    })),
    denominations: [
      { id: "DEN-1", bagCode: "BAG-2026-00482", label: "25,000", units: 720, unitValue: 25000, total: 18000000 },
      { id: "DEN-2", bagCode: "BAG-2026-00483", label: "10,000", units: 2400, unitValue: 10000, total: 24000000 }
    ],
    discrepancyCases: mockData.discrepancyRows.map((item, index) => ({
      ...item,
      bagCode: index === 0 ? "BAG-2026-00485" : "BAG-2026-00484"
    })),
    timeline: mockData.timeline,
    reports: mockData.reportRows,
    audit: mockData.auditRows,
    settings: {
      otpRequired: true,
      attachmentHashing: true,
      branchRestrictedView: true,
      darkDefault: false
    }
  };
}

function requireValue(value: string | number, message: string) {
  if (typeof value === "number") {
    if (!Number.isFinite(value) || value <= 0) {
      throw new Error(message);
    }
    return;
  }

  if (!String(value).trim()) {
    throw new Error(message);
  }
}

export function PlatformProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PlatformState>(buildInitialState);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setState(JSON.parse(stored) as PlatformState);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const appendAudit = (draft: PlatformState, action: string, reference: string, note: string) => {
    draft.audit = [
      {
        code: nextCode("AUD", draft.audit.length, 90081),
        bank: reference,
        branch: action,
        owner: note,
        amount: 0,
        status: "Closed"
      },
      ...draft.audit
    ];
  };

  const appendTimeline = (
    draft: PlatformState,
    bagCode: string,
    status: string,
    titleAr: string,
    titleEn: string,
    descriptionAr: string,
    descriptionEn: string
  ) => {
    draft.timeline = [
      {
        bagCode,
        status,
        title: { ar: titleAr, en: titleEn },
        description: { ar: descriptionAr, en: descriptionEn },
        time: makeNow()
      },
      ...draft.timeline
    ];
  };

  const value = useMemo<PlatformContextValue>(
    () => ({
      state,
      createRequest: (input) => {
        requireValue(input.bank, "اسم البنك مطلوب.");
        requireValue(input.branch, "اسم الفرع مطلوب.");
        requireValue(input.owner, "اسم المالك التشغيلي مطلوب.");
        requireValue(input.amount, "المبلغ المعلن يجب أن يكون أكبر من صفر.");

        const code =
          input.code ||
          `DR-${new Date().getFullYear()}-${String(state.depositRequests.length + 91).padStart(5, "0")}`;

        setState((current) => {
          const draft = structuredClone(current);
          const existingIndex = draft.depositRequests.findIndex((item) => item.code === code);
          const requestRecord: DepositRequest = {
            ...input,
            code,
            status: existingIndex >= 0 ? draft.depositRequests[existingIndex].status : "Prepared"
          };

          if (existingIndex >= 0) {
            draft.depositRequests[existingIndex] = requestRecord;
            appendAudit(draft, "UPDATE_REQUEST", code, input.owner);
          } else {
            draft.depositRequests.unshift(requestRecord);
            appendAudit(draft, "CREATE_REQUEST", code, input.owner);
          }

          return draft;
        });

        return code;
      },
      saveBag: (input) => {
        requireValue(input.requestCode, "يجب اختيار طلب إيداع.");
        requireValue(input.bank, "اسم البنك مطلوب.");
        requireValue(input.branch, "اسم الفرع مطلوب.");
        requireValue(input.owner, "اسم المالك التشغيلي مطلوب.");

        const code =
          input.code ||
          `BAG-${new Date().getFullYear()}-${String(state.cashBags.length + 482).padStart(5, "0")}`;

        setState((current) => {
          const draft = structuredClone(current);
          const existingIndex = draft.cashBags.findIndex((bag) => bag.code === code);
          const amountFromDenominations = draft.denominations
            .filter((line) => line.bagCode === code)
            .reduce((sum, line) => sum + line.total, 0);

          const bagRecord: CashBag = {
            code,
            requestCode: input.requestCode,
            bank: input.bank,
            branch: input.branch,
            owner: input.owner,
            amount: amountFromDenominations || input.amount,
            status: existingIndex >= 0 ? draft.cashBags[existingIndex].status : "Draft",
            tagCode: existingIndex >= 0 ? draft.cashBags[existingIndex].tagCode : undefined,
            sealNumber: existingIndex >= 0 ? draft.cashBags[existingIndex].sealNumber : undefined,
            actualAmount: existingIndex >= 0 ? draft.cashBags[existingIndex].actualAmount : undefined
          };

          if (existingIndex >= 0) {
            draft.cashBags[existingIndex] = bagRecord;
            appendAudit(draft, "UPDATE_BAG", code, input.owner);
          } else {
            draft.cashBags.unshift(bagRecord);
            appendTimeline(
              draft,
              code,
              "Draft",
              "إنشاء حقيبة جديدة",
              "New cash bag created",
              `تم إنشاء الحقيبة وربطها بالطلب ${input.requestCode}.`,
              `The bag was created and linked to request ${input.requestCode}.`
            );
            appendAudit(draft, "CREATE_BAG", code, input.owner);
          }

          return draft;
        });

        return code;
      },
      addDenomination: (bagCode, input) => {
        requireValue(bagCode, "يجب اختيار الحقيبة.");
        requireValue(input.label, "الفئة مطلوبة.");
        requireValue(input.units, "عدد الأوراق يجب أن يكون أكبر من صفر.");
        requireValue(input.unitValue, "قيمة الفئة يجب أن تكون أكبر من صفر.");

        setState((current) => {
          const draft = structuredClone(current);
          const bag = draft.cashBags.find((entry) => entry.code === bagCode);
          if (!bag) {
            throw new Error("الحقيبة المطلوبة غير موجودة.");
          }

          draft.denominations.unshift({
            id: nextCode("DEN", draft.denominations.length, 1),
            bagCode,
            label: input.label,
            units: input.units,
            unitValue: input.unitValue,
            total: input.units * input.unitValue
          });

          bag.amount = draft.denominations
            .filter((line) => line.bagCode === bagCode)
            .reduce((sum, line) => sum + line.total, 0);
          bag.status = "Prepared";

          appendTimeline(
            draft,
            bagCode,
            "Prepared",
            "إضافة فئة نقدية",
            "Denomination added",
            `تم تحديث فئات الحقيبة ${bagCode}.`,
            `Denomination lines updated for bag ${bagCode}.`
          );
          appendAudit(draft, "ADD_DENOMINATION", bagCode, input.label);
          return draft;
        });
      },
      approveBag: (bagCode, decision, note = "") => {
        setState((current) => {
          const draft = structuredClone(current);
          const bag = draft.cashBags.find((entry) => entry.code === bagCode);
          if (!bag) {
            throw new Error("الحقيبة غير موجودة.");
          }

          bag.status = decision === "approve" ? "Approved by Branch" : "Rejected";
          appendTimeline(
            draft,
            bagCode,
            bag.status,
            decision === "approve" ? "اعتماد من الفرع" : "إرجاع من الفرع",
            decision === "approve" ? "Approved by branch" : "Returned by branch",
            decision === "approve"
              ? `تم اعتماد الحقيبة ${bagCode} من مدير الفرع.`
              : `تم إرجاع الحقيبة ${bagCode} مع ملاحظة: ${note || "يرجى استكمال البيانات"}.`,
            decision === "approve"
              ? `Bag ${bagCode} approved by the branch manager.`
              : `Bag ${bagCode} returned with note: ${note || "Please complete missing details"}.`
          );
          appendAudit(draft, decision === "approve" ? "APPROVE_BAG" : "RETURN_BAG", bagCode, note || bag.owner);
          return draft;
        });
      },
      bindTag: (bagCode, tagCode, sealNumber) => {
        requireValue(bagCode, "يجب اختيار الحقيبة.");
        requireValue(tagCode, "رمز التتبع مطلوب.");
        requireValue(sealNumber, "رقم الختم مطلوب.");

        setState((current) => {
          const draft = structuredClone(current);
          const bag = draft.cashBags.find((entry) => entry.code === bagCode);
          if (!bag) {
            throw new Error("الحقيبة غير موجودة.");
          }

          const denominationCount = draft.denominations.filter((line) => line.bagCode === bagCode).length;
          if (!denominationCount) {
            throw new Error("لا يمكن ختم الحقيبة قبل إدخال الفئات النقدية.");
          }

          const duplicateTag = draft.cashBags.some((entry) => entry.code !== bagCode && entry.tagCode === tagCode);
          if (duplicateTag) {
            throw new Error("رمز QR / RFID مستخدم مسبقًا.");
          }

          const duplicateSeal = draft.cashBags.some((entry) => entry.code !== bagCode && entry.sealNumber === sealNumber);
          if (duplicateSeal) {
            throw new Error("رقم الختم مستخدم مسبقًا.");
          }

          bag.tagCode = tagCode;
          bag.sealNumber = sealNumber;
          bag.status = "Sealed";
          appendTimeline(
            draft,
            bagCode,
            "Sealed",
            "ربط الوسم والختم",
            "Tag and seal linked",
            `تم ربط الوسم ${tagCode} والختم ${sealNumber}.`,
            `Tag ${tagCode} and seal ${sealNumber} were linked.`
          );
          appendAudit(draft, "BIND_TAG", bagCode, `${tagCode}/${sealNumber}`);
          return draft;
        });
      },
      moveBag: (bagCode, status, noteAr, noteEn) => {
        setState((current) => {
          const draft = structuredClone(current);
          const bag = draft.cashBags.find((entry) => entry.code === bagCode);
          if (!bag) {
            throw new Error("الحقيبة غير موجودة.");
          }

          bag.status = status;
          appendTimeline(draft, bagCode, status, noteAr, noteEn, noteAr, noteEn);
          appendAudit(draft, "MOVE_BAG", bagCode, status);
          return draft;
        });
      },
      countBag: (bagCode, actualAmount) => {
        requireValue(actualAmount, "المبلغ الفعلي يجب أن يكون أكبر من صفر.");

        setState((current) => {
          const draft = structuredClone(current);
          const bag = draft.cashBags.find((entry) => entry.code === bagCode);
          if (!bag) {
            throw new Error("الحقيبة غير موجودة.");
          }

          bag.actualAmount = actualAmount;
          if (actualAmount === bag.amount) {
            bag.status = "Closed";
            appendTimeline(
              draft,
              bagCode,
              "Matched",
              "مطابقة العد",
              "Count matched",
              `تمت مطابقة مبلغ الحقيبة ${bagCode} وإغلاقها.`,
              `Bag ${bagCode} matched and was closed.`
            );
            appendAudit(draft, "COUNT_MATCHED", bagCode, String(actualAmount));
          } else {
            bag.status = "Pending Bank Response";
            const variance = actualAmount - bag.amount;
            const caseCode = nextCode("DIS", draft.discrepancyCases.length, 2201);
            draft.discrepancyCases.unshift({
              code: caseCode,
              bagCode,
              bank: bag.bank,
              branch: bag.branch,
              owner: "Awaiting bank response",
              amount: variance,
              status: "Pending Bank Response"
            });
            appendTimeline(
              draft,
              bagCode,
              "Discrepancy Found",
              "فتح حالة فرق",
              "Discrepancy case opened",
              `تم إنشاء القضية ${caseCode} بسبب فرق مقداره ${variance}.`,
              `Case ${caseCode} created for variance ${variance}.`
            );
            appendAudit(draft, "CREATE_DISCREPANCY", caseCode, String(variance));
          }

          return draft;
        });
      },
      respondCase: (caseCode, response) => {
        requireValue(caseCode, "يجب اختيار القضية.");
        requireValue(response, "رد البنك مطلوب.");

        setState((current) => {
          const draft = structuredClone(current);
          const caseItem = draft.discrepancyCases.find((entry) => entry.code === caseCode);
          if (!caseItem) {
            throw new Error("القضية غير موجودة.");
          }

          caseItem.response = response;
          caseItem.owner = response;
          caseItem.status = "Pending CBI Approval";
          appendAudit(draft, "BANK_RESPONSE", caseCode, response);
          return draft;
        });
      },
      resolveCase: (caseCode, resolution) => {
        requireValue(caseCode, "يجب اختيار القضية.");
        requireValue(resolution, "قرار الإغلاق مطلوب.");

        setState((current) => {
          const draft = structuredClone(current);
          const caseItem = draft.discrepancyCases.find((entry) => entry.code === caseCode);
          if (!caseItem) {
            throw new Error("القضية غير موجودة.");
          }

          caseItem.resolution = resolution;
          caseItem.status = "Resolved";
          const bag = draft.cashBags.find((entry) => entry.code === caseItem.bagCode);
          if (bag) {
            bag.status = "Closed";
            appendTimeline(
              draft,
              bag.code,
              "Resolved",
              "إغلاق قضية الفرق",
              "Discrepancy resolved",
              `تمت تسوية القضية ${caseCode} وإغلاق الحقيبة.`,
              `Case ${caseCode} resolved and bag closed.`
            );
          }
          appendAudit(draft, "RESOLVE_CASE", caseCode, resolution);
          return draft;
        });
      },
      saveManagementRow: (kind, row) => {
        requireValue(row.bank, "الاسم الرئيسي مطلوب.");
        requireValue(row.branch, "الوصف أو الفرع مطلوب.");
        requireValue(row.owner, "المالك التشغيلي مطلوب.");

        setState((current) => {
          const draft = structuredClone(current);
          const codePrefix = kind === "banks" ? "BNK" : kind === "branches" ? "BR" : "USR";
          const existingIndex = draft[kind].findIndex((item) => item.code === row.code);
          const record: ManagementRow = {
            ...row,
            code: row.code || nextCode(codePrefix, draft[kind].length, 1),
            status: existingIndex >= 0 ? draft[kind][existingIndex].status : "Approved by Branch"
          };

          if (existingIndex >= 0) {
            draft[kind][existingIndex] = record;
            appendAudit(draft, "UPDATE_MASTER_DATA", record.code, row.bank);
          } else {
            draft[kind].unshift(record);
            appendAudit(draft, "CREATE_MASTER_DATA", record.code, row.bank);
          }

          return draft;
        });
      },
      saveSettings: (input) => {
        setState((current) => {
          const draft = structuredClone(current);
          draft.settings = { ...draft.settings, ...input };
          appendAudit(draft, "UPDATE_SETTINGS", "SETTINGS", JSON.stringify(input));
          return draft;
        });
      },
      resetDemo: () => {
        setState(buildInitialState());
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }),
    [state]
  );

  return <PlatformContext.Provider value={value}>{children}</PlatformContext.Provider>;
}

export function usePlatform() {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error("usePlatform must be used inside PlatformProvider");
  }
  return context;
}
