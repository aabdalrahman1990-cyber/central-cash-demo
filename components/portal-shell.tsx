import Link from "next/link";
import { Bell, Globe, Search } from "lucide-react";
import { MobileNav } from "@/components/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { Input } from "@/components/ui/input";
import { type Dictionary, type Locale } from "@/lib/i18n";
import { SidebarNav } from "@/components/sidebar-nav";

export function PortalShell({
  children,
  locale,
  dict
}: {
  children: React.ReactNode;
  locale: Locale;
  dict: Dictionary;
}) {
  const oppositeLocale = locale === "ar" ? "en" : "ar";

  return (
    <div className="min-h-screen px-3 py-3 sm:px-4 lg:p-6">
      <div className="mx-auto grid max-w-[1680px] gap-4 lg:grid-cols-[300px_1fr]">
        <div className="hidden lg:block">
          <SidebarNav locale={locale} dict={dict} />
        </div>

        <div className="space-y-4">
          <header className="glass-panel flex flex-col gap-4 rounded-[24px] border p-4 shadow-panel sm:rounded-[28px] sm:p-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              <MobileNav locale={locale} dict={dict} />
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-300 sm:text-sm">{dict.product.kicker}</p>
                <h2 className="text-lg font-semibold text-foreground sm:text-2xl">{dict.product.title}</h2>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <div className="relative w-full sm:min-w-[240px] sm:flex-1">
                <Search className="absolute inset-y-0 left-3 my-auto size-4 text-slate-400 rtl:left-auto rtl:right-3" />
                <Input className="pl-9 rtl:pl-4 rtl:pr-9" placeholder={dict.common.search} />
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href={`/${oppositeLocale}/portal`}
                  className="inline-flex h-11 items-center gap-2 rounded-2xl border bg-card px-4 text-sm font-medium text-foreground transition hover:bg-muted"
                >
                  <Globe className="size-4" />
                  {oppositeLocale.toUpperCase()}
                </Link>
                <button className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border bg-card text-foreground transition hover:bg-muted">
                  <Bell className="size-4" />
                </button>
                <ThemeToggle />
              </div>
            </div>
          </header>

          {children}
        </div>
      </div>
    </div>
  );
}
