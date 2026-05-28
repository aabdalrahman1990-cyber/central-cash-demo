"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Dictionary, type Locale } from "@/lib/i18n";
import { formatCompactCurrency } from "@/lib/utils";

const COLORS = ["#0f766e", "#0369a1", "#f59e0b", "#ef4444", "#14b8a6", "#1d4ed8"];

type ChartData = {
  cashByBank: { nameAr: string; nameEn: string; amount: number }[];
  bagsByStatus: { nameAr: string; nameEn: string; value: number }[];
};

export function DashboardCharts({
  locale,
  dict,
  data
}: {
  locale: Locale;
  dict: Dictionary;
  data: ChartData;
}) {
  return (
    <section className="grid gap-4 xl:grid-cols-3">
      <Card className="glass-panel executive-card metric-glow rounded-[24px] border border-white/50 shadow-panel sm:rounded-[28px] xl:col-span-2">
        <CardHeader>
          <CardTitle>{dict.dashboard.cashByBank}</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] sm:h-[340px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.cashByBank} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.16} />
              <XAxis
                dataKey={locale === "ar" ? "nameAr" : "nameEn"}
                tick={{ fontSize: 11 }}
                interval={0}
                angle={locale === "ar" ? 0 : -18}
                textAnchor={locale === "ar" ? "middle" : "end"}
                height={58}
              />
              <YAxis tickFormatter={(value) => formatCompactCurrency(Number(value), locale)} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(value) => formatCompactCurrency(Number(value), locale)} />
              <Legend />
              <Bar dataKey="amount" fill="#0369a1" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="glass-panel executive-card metric-glow rounded-[24px] border border-white/50 shadow-panel sm:rounded-[28px]">
        <CardHeader>
          <CardTitle>{dict.dashboard.bagsByStatus}</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] sm:h-[340px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.bagsByStatus}
                dataKey="value"
                nameKey={locale === "ar" ? "nameAr" : "nameEn"}
                innerRadius={54}
                outerRadius={92}
                paddingAngle={2}
              >
                {data.bagsByStatus.map((entry, index) => (
                  <Cell key={entry.nameEn} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </section>
  );
}
