import Link from "next/link";
import { Bell, Globe, Search } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Input } from "@/components/ui/input";
import { navItems, type Dictionary, type Locale } from "@/lib/i18n";
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
    <div className="min-h-screen p-4 lg:p-6">
      <div className="mx-auto grid max-w-[1680px] gap-4 lg:grid-cols-[300px_1fr]">
        <SidebarNav locale={locale} dict={dict} />
        <div className="space-y-4">
          <header className="glass-panel flex flex-col gap-4 rounded-[28px] border p-5 shadow-panel md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-300">{dict.product.kicker}</p>
              <h2 className="text-2xl font-semibold text-foreground">{dict.product.title}</h2>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative min-w-[240px]">
                <Search className="absolute inset-y-0 left-3 my-auto size-4 text-slate-400 rtl:left-auto rtl:right-3" />
                <Input className="pl-9 rtl:pl-4 rtl:pr-9" placeholder={dict.common.search} />
              </div>
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
          </header>
          {children}
        </div>
      </div>
    </div>
  );
}
