"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/status-badge";
import { formatCurrency } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

type Column = {
  key: string;
  label: string;
  format?: "currency";
  kind?: "status";
};

export function SmartTable({
  locale,
  columns,
  rows
}: {
  locale: Locale;
  columns: Column[];
  rows: Record<string, unknown>[];
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query) {
      return rows;
    }

    return rows.filter((row) =>
      Object.values(row).some((value) => String(value).toLowerCase().includes(query.toLowerCase()))
    );
  }, [query, rows]);

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search className="absolute inset-y-0 left-3 my-auto size-4 text-slate-400 rtl:left-auto rtl:right-3" />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={locale === "ar" ? "ابحث في السجلات" : "Search records"}
          className="pl-9 rtl:pl-4 rtl:pr-9"
        />
      </div>
      <div className="overflow-hidden rounded-3xl border">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border text-sm">
            <thead className="bg-muted/70">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="px-4 py-3 text-start font-semibold text-slate-600 dark:text-slate-200"
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              {filtered.map((row, index) => (
                <tr key={`${String(row[columns[0].key])}-${index}`} className="hover:bg-muted/40">
                  {columns.map((column) => {
                    const value = row[column.key];
                    const formatted =
                      column.format === "currency" && typeof value === "number"
                        ? formatCurrency(value)
                        : value;

                    return (
                      <td key={column.key} className="px-4 py-3 text-slate-600 dark:text-slate-200">
                        {column.kind === "status" ? (
                          <StatusBadge status={String(value)} />
                        ) : (
                          String(formatted ?? "-")
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
