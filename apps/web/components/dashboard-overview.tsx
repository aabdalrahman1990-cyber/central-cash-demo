import { ArrowUpRight, Clock3, ShieldCheck } from "lucide-react";
import { DashboardCharts } from "@/components/dashboard-charts";
import { SmartTable } from "@/components/smart-table";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Dictionary, type Locale } from "@/lib/i18n";
import { formatCurrency } from "@/lib/utils";
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
        <Card className="overflow-hidden rounded-[30px] border-0 bg-[linear-gradient(135deg,rgba(8,47,73,1),rgba(8,145,178,0.92),rgba(217,119,6,0.78))] text-white shadow-panel">
          <CardContent className="grid gap-8 p-7 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em]">
                <ShieldCheck className="size-4" />
                {dict.dashboard.heroBadge}
              </div>
              <div>
                <h1 className="text-3xl font-semibold lg:text-4xl">{dict.dashboard.title}</h1>
                <p className="mt-4 max-w-2xl text-sm leading-8 text-white/80">{dict.dashboard.subtitle}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-white text-slate-900 hover:bg-white/90">{dict.common.createRequest}</Button>
                <Button variant="outline" className="border-white/25 bg-white/10 text-white hover:bg-white/20">
                  {dict.common.export}
                </Button>
              </div>
            </div>
            <div className="grid gap-3 rounded-[28px] border border-white/15 bg-slate-950/15 p-5">
              {data.heroStats.map((item) => (
                <div key={item.label.en} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
                  <p className="text-sm text-white/75">{item.label[locale]}</p>
                  <p className="text-lg font-semibold">{item.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel rounded-[30px] border shadow-panel">
          <CardHeader>
            <CardTitle>{dict.dashboard.liveMonitor}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.liveMonitor.map((item) => (
              <div key={item.label.en} className="rounded-3xl border bg-card p-4">
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

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {data.kpis.map((item) => (
          <Card key={item.id} className="glass-panel rounded-[28px] border shadow-panel">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500 dark:text-slate-300">{item.label[locale]}</p>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.trend > 0 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" : "bg-rose-100 text-rose-700 dark:bg-rose-900/20 dark:text-rose-300"}`}>
                  {item.trend > 0 ? "+" : ""}
                  {item.trend}%
                </span>
              </div>
              <p className="mt-4 text-3xl font-semibold">
                {item.currency ? formatCurrency(item.value) : item.value.toLocaleString(locale)}
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <Clock3 className="size-3.5" />
                {item.caption[locale]}
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <DashboardCharts locale={locale} dict={dict} data={data} />

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="glass-panel rounded-[28px] border shadow-panel">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{dict.dashboard.recentBags}</CardTitle>
            <Button variant="outline">{dict.common.export}</Button>
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

        <Card className="glass-panel rounded-[28px] border shadow-panel">
          <CardHeader>
            <CardTitle>{dict.dashboard.timeline}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.timeline.slice(0, 6).map((event) => (
              <div key={`${event.bagCode}-${event.time}`} className="rounded-3xl border bg-card p-4">
                <div className="flex items-center justify-between gap-4">
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
