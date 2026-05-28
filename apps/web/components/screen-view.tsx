import { StatusBadge } from "@/components/status-badge";
import { SmartTable } from "@/components/smart-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { screenDefinitions, type Dictionary, type Locale } from "@/lib/i18n";
import type { MockData } from "@/lib/mock-data";

export function ScreenView({
  locale,
  dict,
  screen,
  data
}: {
  locale: Locale;
  dict: Dictionary;
  screen: string;
  data: MockData;
}) {
  const definition = screenDefinitions[screen];
  const title = dict.screens[definition.key];

  return (
    <div className="space-y-4">
      <Card className="glass-panel rounded-[30px] border shadow-panel">
        <CardContent className="flex flex-col gap-4 p-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-300">{dict.screenMeta.workflow}</p>
            <h1 className="mt-2 text-3xl font-semibold">{title}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-8 text-slate-500 dark:text-slate-300">
              {definition.description[locale]}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button>{definition.primaryAction[locale]}</Button>
            <Button variant="outline">{dict.common.export}</Button>
          </div>
        </CardContent>
      </Card>

      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="glass-panel rounded-[28px] border shadow-panel">
          <CardHeader>
            <CardTitle>{dict.screenMeta.formSection}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {definition.formFields[locale].map((field) => (
              <Input key={field} label={field} placeholder={field} />
            ))}
            <div className="md:col-span-2 rounded-3xl border border-dashed bg-muted/60 p-5 text-sm leading-7 text-slate-500 dark:text-slate-300">
              {definition.rules[locale]}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel rounded-[28px] border shadow-panel">
          <CardHeader>
            <CardTitle>{dict.screenMeta.approvalRules}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {definition.badges[locale].map((item) => (
              <div key={item.title} className="rounded-3xl border bg-card p-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{item.title}</p>
                  <StatusBadge status={item.status} />
                </div>
                <p className="mt-2 text-sm leading-7 text-slate-500 dark:text-slate-300">{item.text}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <Card className="glass-panel rounded-[28px] border shadow-panel">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{dict.screenMeta.operationalData}</CardTitle>
          <div className="flex gap-3">
            <Button variant="outline">{dict.common.filters}</Button>
            <Button variant="outline">{dict.common.search}</Button>
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
            rows={definition.dataset(data)}
          />
        </CardContent>
      </Card>
    </div>
  );
}
