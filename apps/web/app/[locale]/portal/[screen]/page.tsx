import { notFound } from "next/navigation";
import { ScreenView } from "@/components/screen-view";
import { getDictionary, screenIds, type Locale, locales } from "@/lib/i18n";
import { mockData } from "@/lib/mock-data";

export default async function ScreenPage({
  params
}: {
  params: Promise<{ locale: string; screen: string }>;
}) {
  const { locale, screen } = await params;
  if (!screenIds.includes(screen as (typeof screenIds)[number])) {
    notFound();
  }

  const safeLocale = locales.includes(locale as Locale) ? (locale as Locale) : "ar";
  const dict = getDictionary(safeLocale);
  return <ScreenView locale={safeLocale} dict={dict} screen={screen} data={mockData} />;
}
