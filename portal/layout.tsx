import { ReactNode } from "react";
import { PortalShell } from "@/components/portal-shell";
import { PlatformProvider } from "@/components/platform-provider";
import { getDictionary, type Locale } from "@/lib/i18n";

export default async function PortalLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale = (locale === "en" ? "en" : "ar") as Locale;
  const dict = getDictionary(safeLocale);

  return (
    <PlatformProvider>
      <PortalShell locale={safeLocale} dict={dict}>{children}</PortalShell>
    </PlatformProvider>
  );
}
