import type { Metadata } from "next";
import { ReactNode } from "react";
import { locales, type Locale } from "@/lib/i18n";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "منصة الإيداع النقدي وتتبع الحقائب الذكية",
  description: "نموذج تشغيلي لمنصة البنك المركزي لتتبع الحقائب النقدية الذكية."
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale = locales.includes(locale as Locale) ? (locale as Locale) : "ar";

  return (
    <ThemeProvider>
      <div lang={safeLocale} dir={safeLocale === "ar" ? "rtl" : "ltr"}>
        {children}
      </div>
    </ThemeProvider>
  );
}
