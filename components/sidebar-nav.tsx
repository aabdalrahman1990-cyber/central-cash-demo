"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Icons from "lucide-react";
import { navItems, type Dictionary, type Locale } from "@/lib/i18n";

type SidebarNavProps = {
  locale: Locale;
  dict: Dictionary;
  mobile?: boolean;
  onNavigate?: () => void;
};

export function SidebarNav({ locale, dict, mobile = false, onNavigate }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <aside
      className={
        mobile
          ? "flex h-full min-h-0 flex-col rounded-[26px] border border-white/10 bg-slate-950/35 p-4 text-white"
          : "glass-panel executive-card metric-glow rounded-[30px] border border-white/50 p-5 shadow-panel"
      }
    >
      <div className={`rounded-[26px] bg-[linear-gradient(140deg,rgba(8,47,73,1),rgba(21,128,61,0.95),rgba(234,179,8,0.72))] p-5 text-white ${mobile ? "mb-4" : "mb-6"}`}>
        <p className="text-sm text-white/70">{dict.sidebar.title}</p>
        <h3 className="mt-3 text-xl font-semibold">{dict.sidebar.subtitle}</h3>
        <p className="mt-4 text-sm leading-7 text-white/80">{dict.sidebar.description}</p>
      </div>

      <nav
        className={
          mobile
            ? "grid min-h-0 flex-1 gap-2 overflow-y-auto overscroll-contain pr-1 pb-20"
            : "space-y-2"
        }
      >
        {navItems.map((item) => {
          const Icon = Icons[item.icon as keyof typeof Icons] as Icons.LucideIcon;
          const href = item.href === "/portal" ? `/${locale}/portal` : `/${locale}${item.href}`;
          const active = pathname === href;

          return (
            <Link
              key={item.href}
              href={href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                active
                  ? "bg-[linear-gradient(135deg,rgba(3,105,161,1),rgba(13,148,136,0.92),rgba(217,119,6,0.82))] text-white shadow-lg shadow-cyan-900/20"
                  : mobile
                    ? "bg-white/5 text-white/85 hover:bg-white/10"
                    : "text-slate-600 hover:bg-muted dark:text-slate-300"
              }`}
            >
              <Icon className="size-4 shrink-0" />
              <span className={mobile ? "text-base leading-7" : "line-clamp-1"}>{dict.screens[item.key]}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
