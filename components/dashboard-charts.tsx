"use client";

import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Dictionary, type Locale } from "@/lib/i18n";
import type { MockData } from "@/lib/mock-data";

const COLORS = ["#0f766e", "#0369a1", "#f59e0b", "#ef4444", "#14b8a6", "#1d4ed8"];

export function DashboardCharts({
  locale,
  dict,
  data
}: {
  locale: Locale;
  dict: Dictionary;
  data: MockData;
}) {
  return (
    <section className="grid gap-4 xl:grid-cols-3">
      <Card className="glass-panel rounded-[28px] border shadow-panel xl:col-span-2">
        <CardHeader>
          <CardTitle>{dict.dashboard.cashByBank}</CardTitle>
        </CardHeader>
        <CardContent className="h-[340px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.cashByBank}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.16} />
              <XAxis dataKey={locale === "ar" ? "nameAr" : "nameEn"} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#0369a1" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="glass-panel rounded-[28px] border shadow-panel">
        <CardHeader>
          <CardTitle>{dict.dashboard.bagsByStatus}</CardTitle>
        </CardHeader>
        <CardContent className="h-[340px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data.bagsByStatus} dataKey="value" nameKey={locale === "ar" ? "nameAr" : "nameEn"} innerRadius={64} outerRadius={112}>
                {data.bagsByStatus.map((entry, index) => (
                  <Cell key={entry.nameEn} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </section>
  );
}
