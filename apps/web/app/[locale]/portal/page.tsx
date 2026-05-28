import { DashboardOverview } from "@/components/dashboard-overview";
import { getDictionary, type Locale, locales } from "@/lib/i18n";
import { mockData } from "@/lib/mock-data";

export default async function PortalPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale = locales.includes(locale as Locale) ? (locale as Locale) : "ar";
  const dict = getDictionary(safeLocale);

  return <DashboardOverview locale={safeLocale} dict={dict} data={mockData} />;
}
