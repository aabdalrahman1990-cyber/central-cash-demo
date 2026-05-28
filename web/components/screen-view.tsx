"use client";

import type { Dispatch, SetStateAction } from "react";
import { useMemo, useState } from "react";
import { Download, RotateCcw } from "lucide-react";
import { StatusBadge } from "@/components/status-badge";
import { SmartTable } from "@/components/smart-table";
import { usePlatform } from "@/components/platform-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { screenDefinitions, type Dictionary, type Locale, type ScreenId } from "@/lib/i18n";
import { formatCurrency } from "@/lib/utils";

type RequestForm = { code: string; bank: string; branch: string; owner: string; amount: number };
type BagForm = { code: string; requestCode: string; bank: string; branch: string; owner: string; amount: number };
type DenominationForm = { bagCode: string; label: string; units: number; unitValue: number };
type TagForm = { bagCode: string; tagCode: string; sealNumber: string };
type CountForm = { bagCode: string; actualAmount: number };
type CaseForm = { caseCode: string; response: string; resolution: string };
type MasterForm = { code: string; bank: string; branch: string; owner: string; amount: number };

export function ScreenView({
  locale,
  dict,
  screen
}: {
  locale: Locale;
  dict: Dictionary;
  screen: string;
}) {
  const definition = screenDefinitions[screen as ScreenId];
  const title = dict.screens[definition.key];
  const {
    state,
    createRequest,
    saveBag,
    addDenomination,
    approveBag,
    bindTag,
    moveBag,
    countBag,
    respondCase,
    resolveCase,
    saveManagementRow,
    saveSettings,
    resetDemo
  } = usePlatform();

  const [requestForm, setRequestForm] = useState<RequestForm>({
    code: "",
    bank: "مصرف الرافدين",
    branch: "فرع الكرادة",
    owner: "سارة علوان",
    amount: 0
  });
  const [bagForm, setBagForm] = useState<BagForm>({
    code: "",
    requestCode: state.depositRequests[0]?.code ?? "",
    bank: "مصرف الرافدين",
    branch: "فرع الكرادة",
    owner: "مسؤول الخزنة",
    amount: 0
  });
  const [denominationForm, setDenominationForm] = useState<DenominationForm>({
    bagCode: state.cashBags[0]?.code ?? "",
    label: "25,000",
    units: 0,
    unitValue: 25000
  });
  const [tagForm, setTagForm] = useState<TagForm>({
    bagCode: state.cashBags[0]?.code ?? "",
    tagCode: "",
    sealNumber: ""
  });
  const [countForm, setCountForm] = useState<CountForm>({
    bagCode: state.cashBags[0]?.code ?? "",
    actualAmount: 0
  });
  const [caseForm, setCaseForm] = useState<CaseForm>({
    caseCode: state.discrepancyCases[0]?.code ?? "",
    response: "",
    resolution: ""
  });
  const [masterForm, setMasterForm] = useState<MasterForm>({
    code: "",
    bank: "",
    branch: "",
    owner: "",
    amount: 0
  });
  const [settingsForm, setSettingsForm] = useState(state.settings);
  const [tableFilter, setTableFilter] = useState("all");
  const [feedback, setFeedback] = useState("");

  const rows = useMemo(() => getScreenRows(screen as ScreenId, state), [screen, state]);
  const filteredRows = useMemo(() => {
    if (tableFilter === "all") {
      return rows;
    }
    return rows.filter((row) => String(row.status) === tableFilter);
  }, [rows, tableFilter]);

  const statusOptions = useMemo(() => {
    const values = Array.from(new Set(rows.map((row) => String(row.status))));
    return values.filter(Boolean);
  }, [rows]);

  const exportRows = () => {
    const headers = ["code", "bank", "branch", "owner", "amount", "status"];
    const csv = [
      headers.join(","),
      ...filteredRows.map((row) => {
        const record = row as Record<string, unknown>;
        return (
        headers
          .map((header) => `"${String(record[header] ?? "").replace(/"/g, '""')}"`)
          .join(",")
        );
      })
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${screen}-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const run = (action: () => void, successAr: string, successEn: string) => {
    try {
      action();
      setFeedback(locale === "ar" ? successAr : successEn);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unexpected error";
      setFeedback(message);
    }
  };

  const handlePrimary = () => {
    switch (screen as ScreenId) {
      case "create-request":
      case "deposit-requests":
        run(
          () => createRequest({ ...requestForm, amount: Number(requestForm.amount) }),
          "تم حفظ طلب الإيداع بنجاح.",
          "Deposit request saved successfully."
        );
        break;
      case "cash-bag":
        run(
          () => saveBag({ ...bagForm, amount: Number(bagForm.amount) }),
          "تم حفظ الحقيبة النقدية بنجاح.",
          "Cash bag saved successfully."
        );
        break;
      case "denominations":
        run(
          () =>
            addDenomination(denominationForm.bagCode, {
              label: denominationForm.label,
              units: Number(denominationForm.units),
              unitValue: Number(denominationForm.unitValue)
            }),
          "تمت إضافة الفئة وربطها بالحقيبة.",
          "Denomination line added."
        );
        break;
      case "tag-binding":
        run(
          () => bindTag(tagForm.bagCode, tagForm.tagCode, tagForm.sealNumber),
          "تم ربط الوسم والختم بالحقيبة.",
          "Tag and seal linked to the bag."
        );
        break;
      case "counting":
        run(
          () => countBag(countForm.bagCode, Number(countForm.actualAmount)),
          "تم تسجيل العد وتحديث الحالة.",
          "Counting result registered."
        );
        break;
      case "discrepancies":
        run(
          () => {
            if (caseForm.response) {
              respondCase(caseForm.caseCode, caseForm.response);
            }
            if (caseForm.resolution) {
              resolveCase(caseForm.caseCode, caseForm.resolution);
            }
          },
          "تم تحديث قضية الفرق بنجاح.",
          "Discrepancy case updated."
        );
        break;
      case "banks":
        run(
          () => saveManagementRow("banks", { ...masterForm, amount: 0 }),
          "تم حفظ البنك بنجاح.",
          "Bank saved successfully."
        );
        break;
      case "branches":
        run(
          () => saveManagementRow("branches", { ...masterForm, amount: 0 }),
          "تم حفظ الفرع بنجاح.",
          "Branch saved successfully."
        );
        break;
      case "users-roles":
        run(
          () => saveManagementRow("users", { ...masterForm, amount: 0 }),
          "تم حفظ المستخدم أو الدور بنجاح.",
          "User/role saved successfully."
        );
        break;
      case "settings":
        run(
          () => saveSettings(settingsForm),
          "تم حفظ الإعدادات بنجاح.",
          "Settings saved successfully."
        );
        break;
      default:
        setFeedback(locale === "ar" ? "هذه الشاشة جاهزة للتشغيل من خلال الإجراءات السفلية." : "Use the actions below on this screen.");
        break;
    }
  };

  return (
    <div className="space-y-4">
      <Card className="glass-panel rounded-[24px] border shadow-panel sm:rounded-[30px]">
        <CardContent className="flex flex-col gap-4 p-5 sm:p-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-300">{dict.screenMeta.workflow}</p>
            <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">{title}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500 dark:text-slate-300 sm:leading-8">
              {definition.description[locale]}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button className="w-full sm:w-auto" onClick={handlePrimary}>
              {definition.primaryAction[locale]}
            </Button>
            <Button variant="outline" className="w-full sm:w-auto" onClick={exportRows}>
              <Download className="size-4" />
              {dict.common.export}
            </Button>
            {screen === "settings" ? (
              <Button variant="outline" className="w-full sm:w-auto" onClick={resetDemo}>
                <RotateCcw className="size-4" />
                {locale === "ar" ? "إعادة بيانات العرض" : "Reset demo data"}
              </Button>
            ) : null}
          </div>
        </CardContent>
      </Card>

      {feedback ? (
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-200">
          {feedback}
        </div>
      ) : null}

      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="glass-panel rounded-[24px] border shadow-panel sm:rounded-[28px]">
          <CardHeader>
            <CardTitle>{dict.screenMeta.formSection}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {renderForm(screen as ScreenId, {
              state,
              requestForm,
              setRequestForm,
              bagForm,
              setBagForm,
              denominationForm,
              setDenominationForm,
              tagForm,
              setTagForm,
              countForm,
              setCountForm,
              caseForm,
              setCaseForm,
              masterForm,
              setMasterForm,
              settingsForm,
              setSettingsForm,
              locale
            })}
            <div className="rounded-3xl border border-dashed bg-muted/60 p-5 text-sm leading-7 text-slate-500 dark:text-slate-300">
              {definition.rules[locale]}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel rounded-[24px] border shadow-panel sm:rounded-[28px]">
          <CardHeader>
            <CardTitle>{dict.screenMeta.approvalRules}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {definition.badges[locale].map((item) => (
              <div key={item.title} className="rounded-3xl border bg-card p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium">{item.title}</p>
                  <StatusBadge status={item.status} />
                </div>
                <p className="mt-2 text-sm leading-7 text-slate-500 dark:text-slate-300">{item.text}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <Card className="glass-panel rounded-[24px] border shadow-panel sm:rounded-[28px]">
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>{dict.screenMeta.operationalData}</CardTitle>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="grid gap-2 text-sm font-medium text-slate-600 dark:text-slate-200">
              <span>{dict.common.filters}</span>
              <select
                className="h-11 min-w-[180px] rounded-2xl border bg-card px-4 text-sm"
                value={tableFilter}
                onChange={(event) => setTableFilter(event.target.value)}
              >
                <option value="all">{locale === "ar" ? "كل الحالات" : "All statuses"}</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </CardHeader>
        <CardContent>
          <SmartTable
            locale={locale}
            columns={[
              { key: "code", label: dict.table.reference },
              { key: "bank", label: dict.table.bank },
              { key: "branch", label: dict.table.branch },
              { key: "owner", label: dict.table.owner },
              { key: "amount", label: dict.table.amount, format: "currency" },
              { key: "status", label: dict.table.status, kind: "status" }
            ]}
            rows={filteredRows}
          />
          {renderActionStrip(screen as ScreenId, state, locale, {
            approveBag,
            moveBag,
            exportRows,
            respondCase,
            resolveCase
          }, setFeedback)}
        </CardContent>
      </Card>
    </div>
  );
}

function renderForm(
  screen: ScreenId,
  context: {
    state: ReturnType<typeof usePlatform>["state"];
    requestForm: RequestForm;
    setRequestForm: Dispatch<SetStateAction<RequestForm>>;
    bagForm: BagForm;
    setBagForm: Dispatch<SetStateAction<BagForm>>;
    denominationForm: DenominationForm;
    setDenominationForm: Dispatch<SetStateAction<DenominationForm>>;
    tagForm: TagForm;
    setTagForm: Dispatch<SetStateAction<TagForm>>;
    countForm: CountForm;
    setCountForm: Dispatch<SetStateAction<CountForm>>;
    caseForm: CaseForm;
    setCaseForm: Dispatch<SetStateAction<CaseForm>>;
    masterForm: MasterForm;
    setMasterForm: Dispatch<SetStateAction<MasterForm>>;
    settingsForm: ReturnType<typeof usePlatform>["state"]["settings"];
    setSettingsForm: Dispatch<SetStateAction<ReturnType<typeof usePlatform>["state"]["settings"]>>;
    locale: Locale;
  }
) {
  const { state, locale } = context;

  if (screen === "create-request" || screen === "deposit-requests") {
    return (
      <div className="space-y-4">
        <SelectableRecord
          label={locale === "ar" ? "تحميل طلب موجود للتعديل" : "Load existing request"}
          value={context.requestForm.code}
          options={state.depositRequests.map((request) => ({ value: request.code, label: `${request.code} - ${request.bank}` }))}
          onChange={(value) => {
            const selected = state.depositRequests.find((item) => item.code === value);
            if (selected) {
              context.setRequestForm(selected);
            }
          }}
        />
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="البنك" value={context.requestForm.bank} onChange={(e) => context.setRequestForm((v) => ({ ...v, bank: e.target.value }))} />
          <Input label="الفرع" value={context.requestForm.branch} onChange={(e) => context.setRequestForm((v) => ({ ...v, branch: e.target.value }))} />
          <Input label="المالك التشغيلي" value={context.requestForm.owner} onChange={(e) => context.setRequestForm((v) => ({ ...v, owner: e.target.value }))} />
          <Input label="المبلغ المعلن" type="number" value={context.requestForm.amount} onChange={(e) => context.setRequestForm((v) => ({ ...v, amount: Number(e.target.value) }))} />
        </div>
      </div>
    );
  }

  if (screen === "cash-bag") {
    return (
      <div className="space-y-4">
        <SelectableRecord
          label={locale === "ar" ? "تحميل حقيبة موجودة للتعديل" : "Load existing bag"}
          value={context.bagForm.code}
          options={state.cashBags.map((bag) => ({ value: bag.code, label: `${bag.code} - ${bag.bank}` }))}
          onChange={(value) => {
            const selected = state.cashBags.find((item) => item.code === value);
            if (selected) {
              context.setBagForm(selected);
            }
          }}
        />
        <div className="grid gap-4 md:grid-cols-2">
          <SelectableRecord
            label="طلب الإيداع"
            value={context.bagForm.requestCode}
            options={state.depositRequests.map((request) => ({ value: request.code, label: request.code }))}
            onChange={(value) => context.setBagForm((v) => ({ ...v, requestCode: value }))}
          />
          <Input label="البنك" value={context.bagForm.bank} onChange={(e) => context.setBagForm((v) => ({ ...v, bank: e.target.value }))} />
          <Input label="الفرع" value={context.bagForm.branch} onChange={(e) => context.setBagForm((v) => ({ ...v, branch: e.target.value }))} />
          <Input label="المالك التشغيلي" value={context.bagForm.owner} onChange={(e) => context.setBagForm((v) => ({ ...v, owner: e.target.value }))} />
          <Input label="المبلغ المعلن" type="number" value={context.bagForm.amount} onChange={(e) => context.setBagForm((v) => ({ ...v, amount: Number(e.target.value) }))} />
        </div>
      </div>
    );
  }

  if (screen === "denominations") {
    const bagTotal = state.denominations
      .filter((line) => line.bagCode === context.denominationForm.bagCode)
      .reduce((sum, line) => sum + line.total, 0);

    return (
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <SelectableRecord
            label="الحقيبة"
            value={context.denominationForm.bagCode}
            options={state.cashBags.map((bag) => ({ value: bag.code, label: bag.code }))}
            onChange={(value) => context.setDenominationForm((v) => ({ ...v, bagCode: value }))}
          />
          <Input label="الفئة" value={context.denominationForm.label} onChange={(e) => context.setDenominationForm((v) => ({ ...v, label: e.target.value }))} />
          <Input label="عدد الأوراق" type="number" value={context.denominationForm.units} onChange={(e) => context.setDenominationForm((v) => ({ ...v, units: Number(e.target.value) }))} />
          <Input label="قيمة الفئة" type="number" value={context.denominationForm.unitValue} onChange={(e) => context.setDenominationForm((v) => ({ ...v, unitValue: Number(e.target.value) }))} />
        </div>
        <div className="rounded-3xl border bg-card p-4 text-sm text-slate-600 dark:text-slate-300">
          {locale === "ar" ? "إجمالي الحقيبة الحالي" : "Current bag total"}: <strong>{formatCurrency(bagTotal, locale)}</strong>
        </div>
      </div>
    );
  }

  if (screen === "tag-binding") {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <SelectableRecord
          label="الحقيبة"
          value={context.tagForm.bagCode}
          options={state.cashBags.map((bag) => ({ value: bag.code, label: bag.code }))}
          onChange={(value) => context.setTagForm((v) => ({ ...v, bagCode: value }))}
        />
        <Input label="رمز QR / RFID" value={context.tagForm.tagCode} onChange={(e) => context.setTagForm((v) => ({ ...v, tagCode: e.target.value }))} />
        <Input label="رقم الختم" value={context.tagForm.sealNumber} onChange={(e) => context.setTagForm((v) => ({ ...v, sealNumber: e.target.value }))} />
      </div>
    );
  }

  if (screen === "counting") {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <SelectableRecord
          label="الحقيبة"
          value={context.countForm.bagCode}
          options={state.cashBags.map((bag) => ({ value: bag.code, label: `${bag.code} - ${formatCurrency(bag.amount, locale)}` }))}
          onChange={(value) => context.setCountForm((v) => ({ ...v, bagCode: value }))}
        />
        <Input label="المبلغ الفعلي" type="number" value={context.countForm.actualAmount} onChange={(e) => context.setCountForm((v) => ({ ...v, actualAmount: Number(e.target.value) }))} />
      </div>
    );
  }

  if (screen === "discrepancies") {
    return (
      <div className="grid gap-4">
        <SelectableRecord
          label="القضية"
          value={context.caseForm.caseCode}
          options={state.discrepancyCases.map((item) => ({ value: item.code, label: `${item.code} - ${item.bank}` }))}
          onChange={(value) => {
            const selected = state.discrepancyCases.find((item) => item.code === value);
            if (selected) {
              context.setCaseForm({
                caseCode: selected.code,
                response: selected.response ?? "",
                resolution: selected.resolution ?? ""
              });
            }
          }}
        />
        <Input label="رد البنك" value={context.caseForm.response} onChange={(e) => context.setCaseForm((v) => ({ ...v, response: e.target.value }))} />
        <Input label="قرار الإغلاق" value={context.caseForm.resolution} onChange={(e) => context.setCaseForm((v) => ({ ...v, resolution: e.target.value }))} />
      </div>
    );
  }

  if (screen === "settings") {
    return (
      <div className="grid gap-3">
        <ToggleRow label="تفعيل OTP في الدخول" checked={context.settingsForm.otpRequired} onChange={(checked) => context.setSettingsForm((v) => ({ ...v, otpRequired: checked }))} />
        <ToggleRow label="تجزئة المرفقات وربطها بالسجل" checked={context.settingsForm.attachmentHashing} onChange={(checked) => context.setSettingsForm((v) => ({ ...v, attachmentHashing: checked }))} />
        <ToggleRow label="حصر عرض بيانات الفرع على الفرع نفسه" checked={context.settingsForm.branchRestrictedView} onChange={(checked) => context.setSettingsForm((v) => ({ ...v, branchRestrictedView: checked }))} />
        <ToggleRow label="الوضع الداكن افتراضيًا" checked={context.settingsForm.darkDefault} onChange={(checked) => context.setSettingsForm((v) => ({ ...v, darkDefault: checked }))} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <SelectableRecord
        label={locale === "ar" ? "تحميل سجل موجود للتعديل" : "Load record for editing"}
        value={context.masterForm.code}
        options={getMasterOptions(screen, state)}
        onChange={(value) => {
          const row = getMasterRows(screen, state).find((item) => item.code === value);
          if (row) {
            context.setMasterForm(row);
          }
        }}
      />
      <div className="grid gap-4 md:grid-cols-2">
        <Input label="الاسم الرئيسي" value={context.masterForm.bank} onChange={(e) => context.setMasterForm((v) => ({ ...v, bank: e.target.value }))} />
        <Input label="الوصف / الفرع" value={context.masterForm.branch} onChange={(e) => context.setMasterForm((v) => ({ ...v, branch: e.target.value }))} />
        <Input label="المالك التشغيلي" value={context.masterForm.owner} onChange={(e) => context.setMasterForm((v) => ({ ...v, owner: e.target.value }))} />
      </div>
    </div>
  );
}

function renderActionStrip(
  screen: ScreenId,
  state: ReturnType<typeof usePlatform>["state"],
  locale: Locale,
  actions: Pick<ReturnType<typeof usePlatform>, "approveBag" | "moveBag" | "respondCase" | "resolveCase"> & {
    exportRows: () => void;
  },
  setFeedback: (message: string) => void
) {
  const safe = (callback: () => void) => {
    try {
      callback();
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Unexpected error");
    }
  };

  if (screen === "branch-approval") {
    return (
      <div className="mt-4 flex flex-wrap gap-3">
        {state.cashBags.slice(0, 3).map((bag) => (
          <div key={bag.code} className="rounded-2xl border bg-muted/40 p-3">
            <p className="mb-2 text-sm font-medium">{bag.code}</p>
            <div className="flex gap-2">
              <Button onClick={() => safe(() => actions.approveBag(bag.code, "approve"))}>اعتماد</Button>
              <Button variant="outline" onClick={() => safe(() => actions.approveBag(bag.code, "return", "يرجى استكمال البيانات"))}>إرجاع</Button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (screen === "cit-handover" || screen === "cbi-gate" || screen === "cash-desk") {
    const statusConfig =
      screen === "cit-handover"
        ? { status: "Picked Up by CIT", ar: "استلام من شركة النقل", en: "Picked up by CIT" }
        : screen === "cbi-gate"
          ? { status: "Arrived at CBI Gate", ar: "الوصول إلى البوابة", en: "Arrived at gate" }
          : { status: "Accepted for Counting", ar: "اعتماد للعد", en: "Accepted for counting" };

    return (
      <div className="mt-4 flex flex-wrap gap-3">
        {state.cashBags.slice(0, 3).map((bag) => (
          <Button key={bag.code} variant="outline" onClick={() => safe(() => actions.moveBag(bag.code, statusConfig.status, statusConfig.ar, statusConfig.en))}>
            {bag.code} - {statusConfig.ar}
          </Button>
        ))}
      </div>
    );
  }

  if (screen === "reports" || screen === "audit-trail") {
    return (
      <div className="mt-4">
        <Button variant="outline" onClick={actions.exportRows}>
          {locale === "ar" ? "تنزيل ملف CSV" : "Download CSV"}
        </Button>
      </div>
    );
  }

  if (screen === "timeline") {
    return (
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {state.timeline.slice(0, 4).map((item) => (
          <div key={`${item.bagCode}-${item.time}`} className="rounded-3xl border bg-card p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="font-medium">{item.bagCode}</p>
              <StatusBadge status={item.status} />
            </div>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">{item.title[locale]}</p>
            <p className="mt-2 text-xs text-slate-400">{item.time}</p>
          </div>
        ))}
      </div>
    );
  }

  if (screen === "discrepancies") {
    return (
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {state.discrepancyCases.slice(0, 4).map((item) => (
          <div key={item.code} className="rounded-3xl border bg-card p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="font-medium">{item.code}</p>
              <StatusBadge status={item.status} />
            </div>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">{item.bank}</p>
            <div className="mt-3 flex gap-2">
              <Button className="px-3 py-2 text-xs" onClick={() => safe(() => actions.respondCase(item.code, "تمت مراجعة اعتراض البنك"))}>
                رد البنك
              </Button>
              <Button className="px-3 py-2 text-xs" variant="outline" onClick={() => safe(() => actions.resolveCase(item.code, "تم الإغلاق بعد المطابقة"))}>
                إغلاق
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
}

function SelectableRecord({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-slate-600 dark:text-slate-200">
      <span>{label}</span>
      <select className="h-11 rounded-2xl border bg-card px-4 text-sm" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">{label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function ToggleRow({
  label,
  checked,
  onChange
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-3xl border bg-card px-4 py-3">
      <span className="text-sm font-medium">{label}</span>
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="h-5 w-5 accent-emerald-600" />
    </label>
  );
}

function getMasterRows(screen: ScreenId, state: ReturnType<typeof usePlatform>["state"]) {
  if (screen === "banks") return state.banks;
  if (screen === "branches") return state.branches;
  return state.users;
}

function getMasterOptions(screen: ScreenId, state: ReturnType<typeof usePlatform>["state"]) {
  return getMasterRows(screen, state).map((item) => ({
    value: item.code,
    label: `${item.code} - ${item.bank}`
  }));
}

function getScreenRows(screen: ScreenId, state: ReturnType<typeof usePlatform>["state"]) {
  switch (screen) {
    case "banks":
      return state.banks;
    case "branches":
      return state.branches;
    case "users-roles":
      return state.users;
    case "deposit-requests":
    case "create-request":
      return state.depositRequests;
    case "cash-bag":
      return state.cashBags;
    case "denominations":
      return state.denominations.map((line) => ({
        code: line.id,
        bank: line.bagCode,
        branch: line.label,
        owner: `${line.units} x ${line.unitValue}`,
        amount: line.total,
        status: "Prepared"
      }));
    case "branch-approval":
      return state.cashBags;
    case "tag-binding":
      return state.cashBags.map((bag) => ({
        code: bag.code,
        bank: bag.bank,
        branch: bag.branch,
        owner: `${bag.tagCode ?? "Unbound"} / ${bag.sealNumber ?? "No seal"}`,
        amount: bag.amount,
        status: bag.status
      }));
    case "cit-handover":
    case "cbi-gate":
    case "cash-desk":
    case "counting":
      return state.cashBags;
    case "discrepancies":
      return state.discrepancyCases.map((item) => ({
        code: item.code,
        bank: item.bank,
        branch: item.branch,
        owner: item.response || item.owner,
        amount: item.amount,
        status: item.status
      }));
    case "timeline":
      return state.timeline.map((item, index) => ({
        code: `TL-${index + 1}`,
        bank: item.bagCode,
        branch: item.title.ar,
        owner: item.description.ar,
        amount: 0,
        status: item.status
      }));
    case "reports":
      return state.reports;
    case "audit-trail":
      return state.audit;
    case "settings":
      return [
        { code: "SET-OTP", bank: "Security", branch: "MFA", owner: state.settings.otpRequired ? "Enabled" : "Disabled", amount: 0, status: "Closed" },
        { code: "SET-HASH", bank: "Attachments", branch: "Hashing", owner: state.settings.attachmentHashing ? "Enabled" : "Disabled", amount: 0, status: "Closed" },
        { code: "SET-BRANCH", bank: "Visibility", branch: "Branch scope", owner: state.settings.branchRestrictedView ? "Enabled" : "Disabled", amount: 0, status: "Closed" }
      ];
  }
}
