import Link from "next/link";
import { ArrowUpRight, Clock3, ShieldCheck } from "lucide-react";
import { DashboardCharts } from "@/components/dashboard-charts";
import { SmartTable } from "@/components/smart-table";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Dictionary, type Locale } from "@/lib/i18n";
import { formatCompactCurrency, formatCurrency, formatNumber } from "@/lib/utils";
import type { MockData } from "@/lib/mock-data";

export function DashboardOverview({
  locale,
  dict,
  data
}: {
  locale: Locale;
  dict: Dictionary;
  data: MockData;
}) {
  return (
    <div className="space-y-4">
      <section className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
        <Card className="overflow-hidden rounded-[24px] border-0 bg-[linear-gradient(135deg,rgba(7,31,58,1),rgba(9,93,122,0.96),rgba(185,112,25,0.88))] text-white shadow-panel sm:rounded-[30px]">
          <CardContent className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-8">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] backdrop-blur-sm sm:text-xs sm:tracking-[0.28em]">
                <ShieldCheck className="size-4" />
                {dict.dashboard.heroBadge}
              </div>
              <div>
                <h1 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">{dict.dashboard.title}</h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80 sm:leading-8">{dict.dashboard.subtitle}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-xs text-white/65">RFID / QR</p>
                  <p className="mt-2 text-lg font-semibold">Live Tagged Flow</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-xs text-white/65">Approvals</p>
                  <p className="mt-2 text-lg font-semibold">Maker Checker</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-xs text-white/65">Audit</p>
                  <p className="mt-2 text-lg font-semibold">Immutable Trace</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button asChild className="w-full bg-white text-slate-900 hover:bg-white/90 sm:w-auto">
                  <Link href={`/${locale}/portal/create-request`}>{dict.common.createRequest}</Link>
                </Button>
                <Button asChild variant="outline" className="w-full border-white/25 bg-white/10 text-white hover:bg-white/20 sm:w-auto">
                  <Link href={`/${locale}/portal/reports`}>{dict.common.export}</Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-3 rounded-[28px] border border-white/15 bg-slate-950/15 p-5 backdrop-blur-sm">
              {data.heroStats.map((item) => (
                <div
                  key={item.label.en}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/10 px-4 py-3"
                >
                  <p className="text-sm text-white/75">{item.label[locale]}</p>
                  <p className="shrink-0 text-base font-semibold sm:text-lg">{item.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel executive-card metric-glow rounded-[24px] border border-white/50 shadow-panel sm:rounded-[30px]">
          <CardHeader>
            <CardTitle>{dict.dashboard.liveMonitor}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.liveMonitor.map((item) => (
              <div key={item.label.en} className="rounded-3xl border border-white/50 bg-card/90 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-500 dark:text-slate-300">{item.label[locale]}</p>
                  <ArrowUpRight className="size-4 text-success" />
                </div>
                <p className="mt-2 text-2xl font-semibold">{item.value}</p>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{item.hint[locale]}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {data.kpis.map((item) => (
          <Card key={item.id} className="glass-panel executive-card metric-glow rounded-[24px] border border-white/50 shadow-panel sm:rounded-[28px]">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-3">
                <p className="max-w-[75%] text-sm leading-6 text-slate-500 dark:text-slate-300">
                  {item.label[locale]}
                </p>
                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                    item.trend > 0
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                      : "bg-rose-100 text-rose-700 dark:bg-rose-900/20 dark:text-rose-300"
                  }`}
                >
                  {item.trend > 0 ? "+" : ""}
                  {item.trend}%
                </span>
              </div>

              <div className="mt-4 space-y-2">
                <p className="break-words text-[clamp(1.55rem,4.1vw,2.7rem)] font-semibold leading-none tracking-tight text-slate-950 dark:text-white">
                  {item.currency
                    ? formatCurrency(item.value, locale)
                    : formatNumber(item.value, locale)}
                </p>
                {item.currency ? (
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {formatCompactCurrency(item.value, locale)}
                  </p>
                ) : null}
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <Clock3 className="size-3.5 shrink-0" />
                <span>{item.caption[locale]}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <DashboardCharts locale={locale} dict={dict} data={data} />

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="glass-panel executive-card metric-glow rounded-[24px] border border-white/50 shadow-panel sm:rounded-[28px]">
          <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>{dict.dashboard.recentBags}</CardTitle>
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href={`/${locale}/portal/cash-bag`}>{dict.common.export}</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <SmartTable
              locale={locale}
              columns={[
                { key: "bagCode", label: dict.table.bagCode },
                { key: "bank", label: dict.table.bank },
                { key: "branch", label: dict.table.branch },
                { key: "declaredAmount", label: dict.table.amount, format: "currency" },
                { key: "status", label: dict.table.status, kind: "status" }
              ]}
              rows={data.cashBags}
            />
          </CardContent>
        </Card>

        <Card className="glass-panel executive-card metric-glow rounded-[24px] border border-white/50 shadow-panel sm:rounded-[28px]">
          <CardHeader>
            <CardTitle>{dict.dashboard.timeline}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.timeline.slice(0, 6).map((event) => (
              <div key={`${event.bagCode}-${event.time}`} className="rounded-3xl border bg-card p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-medium">{event.title[locale]}</p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{event.bagCode}</p>
                  </div>
                  <StatusBadge status={event.status} />
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-300">{event.description[locale]}</p>
                <p className="mt-2 text-xs text-slate-400">{event.time}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
