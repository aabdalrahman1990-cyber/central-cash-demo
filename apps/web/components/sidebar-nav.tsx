"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Icons from "lucide-react";
import { navItems, type Dictionary, type Locale } from "@/lib/i18n";

export function SidebarNav({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname();

  return (
    <aside className="glass-panel rounded-[30px] border p-5 shadow-panel">
      <div className="mb-6 rounded-[26px] bg-[linear-gradient(140deg,rgba(8,47,73,1),rgba(21,128,61,0.95),rgba(234,179,8,0.72))] p-5 text-white">
        <p className="text-sm text-white/70">{dict.sidebar.title}</p>
        <h3 className="mt-3 text-xl font-semibold">{dict.sidebar.subtitle}</h3>
        <p className="mt-4 text-sm leading-7 text-white/80">{dict.sidebar.description}</p>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = Icons[item.icon as keyof typeof Icons] as Icons.LucideIcon;
          const href = item.href === "/portal" ? `/${locale}/portal` : `/${locale}${item.href}`;
          const active = pathname === href;

          return (
            <Link
              key={item.href}
              href={href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                active
                  ? "bg-primary text-white shadow-lg shadow-cyan-900/20"
                  : "text-slate-600 hover:bg-muted dark:text-slate-300"
              }`}
            >
              <Icon className="size-4" />
              <span>{dict.screens[item.key]}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
